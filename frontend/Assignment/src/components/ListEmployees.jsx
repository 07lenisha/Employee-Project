import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../config/axios";
export default function ListEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        console.log('Response data:', response.data);  
        setEmployees(response.data);
     
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul className="employee-list">
      {employees.map(emp => (
    <li key={emp._id}>
      <Link to={`/employees/${emp._id}`} className="employee-box">
        <h2 className="employee-name">{emp.firstName} {emp.lastName}</h2>
        <p>Email: {emp.email}</p>
        <p>Username: {emp.username}</p>
        <p>Mobile: {emp.mobile}</p>
      </Link>
    </li>
  ))}
</ul>

    </div>
  );
}

