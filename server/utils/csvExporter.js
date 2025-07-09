import fs from 'fs';
import path from 'path';
import createCsvWriter from 'csv-writer';
import moment from 'moment';

export const exportContactsToCSV = async (contacts, dateRange = null) => {
  try {
    // Create exports directory if it doesn't exist
    const exportsDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    // Generate filename with timestamp
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const dateRangeStr = dateRange ? `_${dateRange.from}_to_${dateRange.to}` : '';
    const filename = `contact_submissions${dateRangeStr}_${timestamp}.csv`;
    const filePath = path.join(exportsDir, filename);

    // Define CSV structure
    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'company', title: 'Company' },
        { id: 'role', title: 'Role' },
        { id: 'message', title: 'Message' },
        { id: 'status', title: 'Status' },
        { id: 'submissionDate', title: 'Submission Date' },
        { id: 'submissionTime', title: 'Submission Time' }
      ]
    });

    // Transform contacts data for CSV
    const csvData = contacts.map(contact => ({
      id: contact._id.toString(),
      name: contact.name || '',
      email: contact.email || '',
      company: contact.company || '',
      role: contact.role || '',
      message: contact.message || '',
      status: contact.status || 'new',
      submissionDate: moment(contact.createdAt).format('YYYY-MM-DD'),
      submissionTime: moment(contact.createdAt).format('HH:mm:ss')
    }));

    // Write CSV file
    await csvWriter.writeRecords(csvData);

    return {
      success: true,
      filename,
      filePath,
      recordCount: csvData.length,
      fileSize: fs.statSync(filePath).size
    };

  } catch (error) {
    console.error('CSV Export Error:', error);
    throw new Error(`Failed to export CSV: ${error.message}`);
  }
};

export const getContactsByDateRange = async (collection, startDate, endDate) => {
  try {
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();

    const contacts = await collection
      .find({
        createdAt: {
          $gte: start,
          $lte: end
        }
      })
      .sort({ createdAt: -1 })
      .toArray();

    return contacts;
  } catch (error) {
    console.error('Date Range Query Error:', error);
    throw new Error(`Failed to fetch contacts by date range: ${error.message}`);
  }
};

export const generateContactSummaryByDate = (contacts) => {
  const summary = {};
  
  contacts.forEach(contact => {
    const date = moment(contact.createdAt).format('YYYY-MM-DD');
    
    if (!summary[date]) {
      summary[date] = {
        date,
        count: 0,
        contacts: []
      };
    }
    
    summary[date].count++;
    summary[date].contacts.push({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      time: moment(contact.createdAt).format('HH:mm:ss')
    });
  });

  return Object.values(summary).sort((a, b) => new Date(b.date) - new Date(a.date));
};
