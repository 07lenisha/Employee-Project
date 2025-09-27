import { useState } from 'react';
import axios from '../config/axios';

export default function Import() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
     if (!selectedFile) {
      setError('No file selected.');
      setMessage('');
      setFile(null);
      return;
    }
    const fileName = selectedFile.name.toLowerCase();
    const isExcel = fileName.endsWith('.xls') || fileName.endsWith('.xlsx');
    if (!isExcel) {
      setError('Invalid file type. Please upload a .xls or .xlsx file.');
      setMessage('');
      setFile(null);
    } else {
      setError('');
      setMessage('');
      setFile(selectedFile);
    }
  };
const handleUpload = async () => {
    if (!file) {
      setError('Please select a valid Excel file first.');
      setMessage('');
      return;
    }
    const formData = new FormData();
    formData.append('excel', file); 

    try {
      await axios.post('/api/employees/upload', formData)
      setMessage('File uploaded successfully');
      setError('');
      setFile(""); 
    } catch (err) {
      setError(' Failed to upload file.');
      setMessage('');
    }
  };
return (
    <div className='employee-box'>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} /><br />
      <button onClick={handleUpload} style={{ marginTop: '1rem' }}>Upload</button>
      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
