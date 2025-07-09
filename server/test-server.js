import fetch from 'node-fetch';

const testEndpoints = async () => {
  try {
    console.log('🧪 Testing server endpoints...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
    
    // Test admin login
    console.log('\n2. Testing admin login...');
    const loginResponse = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'deveshvarma@admin.com',
        password: 'devehs@18'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('Token:', loginData.token.substring(0, 20) + '...');
      console.log('User:', loginData.user.name, '-', loginData.user.role);
      
      // Test authenticated endpoint
      console.log('\n3. Testing authenticated endpoint...');
      const profileResponse = await fetch('http://localhost:3001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        }
      });
      
      const profileData = await profileResponse.json();
      if (profileResponse.ok) {
        console.log('✅ Profile fetch successful!');
        console.log('Profile:', profileData.user.name, '-', profileData.user.role);
      } else {
        console.log('❌ Profile fetch failed:', profileData);
      }
      
    } else {
      console.log('❌ Login failed:', loginData);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testEndpoints();
