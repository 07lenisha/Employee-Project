import Employee from "../model/employeemodel.js";
import xlsx from "xlsx";
import { validationResult } from "express-validator";
import { validateRow } from "../Vallidation/employeeval.js";
const employeectler = {};
employeectler.uploadEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.file) {
      console.log(errors);
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const validRows = [];
    const allErrors = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(worksheet);
      rows.forEach((row, index) => {
      const rowErrors = validateRow(row, index + 2);
     
      if (rowErrors.length === 0) {
          validRows.push(row);
        } else {
          allErrors.push(rowErrors);
        }
      });
    });
    if (validRows.length === 0) {
      return res.status(400).json({ errors: allErrors });
    }

    await Employee.insertMany(validRows);
    console.log("Valid rows to insert:", validRows);
    res.status(200).json({
      message: "Employees uploaded successfully",
      count: validRows.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

employeectler.addemployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, username, email, mobile } = req.body;
  try {
    const employee = await Employee.create({
      firstName,
      lastName,
      username,
      email,
      mobile,
    });
    res.status(201).json({ message: "employee added successfully", employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

employeectler.getemployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

employeectler.getemployeeById = async (req, res) => {
  const { empId } = req.params;
  try {
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

employeectler.updateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const empId = req.params.empId;
 try {
    const { firstName, lastName, username, email, mobile } = req.body;
    const updateEmeplyee = { firstName, lastName, username, email, mobile };
    const employee = await Employee.findByIdAndUpdate(empId, updateEmeplyee, {new: true, runValidators: true,});
    res .status(200).json({ message: "employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
employeectler.deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { empId } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(empId);
    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }
    res.status(200).json({ message: "employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default employeectler;
