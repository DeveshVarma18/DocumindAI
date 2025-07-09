import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Eye, Calendar, Mail, Building, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
  _id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ContactsTable: React.FC = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchTerm]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      } else {
        toast.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Error fetching contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'replied':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <div className="text-sm text-gray-400">
          {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Company</TableHead>
              <TableHead className="text-gray-300">Role</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                  No contacts found
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact._id} className="border-gray-700">
                  <TableCell className="text-white font-medium">{contact.name}</TableCell>
                  <TableCell className="text-gray-300">{contact.email}</TableCell>
                  <TableCell className="text-gray-300">{contact.company || 'N/A'}</TableCell>
                  <TableCell className="text-gray-300">{contact.role || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsViewModalOpen(true);
                      }}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Contact Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Name:</span>
                  </div>
                  <p className="text-white ml-6">{selectedContact.name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email:</span>
                  </div>
                  <p className="text-white ml-6">{selectedContact.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">Company:</span>
                  </div>
                  <p className="text-white ml-6">{selectedContact.company || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Role:</span>
                  </div>
                  <p className="text-white ml-6">{selectedContact.role || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Date:</span>
                  </div>
                  <p className="text-white ml-6">
                    {new Date(selectedContact.createdAt).toLocaleDateString()} at{' '}
                    {new Date(selectedContact.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="font-medium">Status:</span>
                  </div>
                  <Badge className={getStatusColor(selectedContact.status)}>
                    {selectedContact.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">Message:</span>
                </div>
                <div className="ml-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Copy email to clipboard
                    navigator.clipboard.writeText(selectedContact.email);
                    toast.success('Email copied to clipboard');
                  }}
                  className="border-gray-600 hover:bg-gray-700"
                >
                  Copy Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsTable;
