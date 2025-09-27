import dotenv from"dotenv"
dotenv.config()
import express from"express"
import cors from "cors"
import configureDb from "./App/config/db.js"
import upload from "./App/config/multer.js"
import { checkSchema } from "express-validator"
import { employeeval, validateRow } from "./App/Vallidation/employeeval.js";
import employeectler from "./App/controller/employee.js"
const app=express();
const port=3077;
app.use(express.json())
app.use(cors());
configureDb()
app.get('/api/employees' ,employeectler.getemployee);  
app.get('/api/employees/:empId',employeectler.getemployeeById);
app.post('/api/employees/upload', upload.single('excel'),checkSchema(validateRow),employeectler.uploadEmployee);
app.post('/api/employees',checkSchema(employeeval) ,employeectler.addemployee);
app.put('/api/employees/:empId',checkSchema(employeeval) ,employeectler.updateEmployee);
app.delete('/api/employees/:empId',checkSchema(employeeval) ,employeectler.deleteEmployee);

app.listen(port,()=>{
    console.log(`server is running on port ,${port}`)
})