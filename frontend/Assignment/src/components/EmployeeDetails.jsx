import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

export default function EmployeeDetails() {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/api/employees/${empId}`);
      setEmployee(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employee details");
      setLoading(false); 
    }
  };
  fetchEmployee();
}, [empId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!employee) return <div>No employee found</div>;
return (
    <>
    <h1>Employe details</h1>
    <div className="employee-box">
    <ul className="employee-list">
      <li className="employee-name"> {employee.firstName}{employee.lastName} </li>
      <li>Email: {employee.email}</li>
      <li>Username: {employee.username}</li>
      <li>Mobile: {employee.mobile}</li>
    </ul>
  </div>
  </>
);
}

