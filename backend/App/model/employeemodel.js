import { Schema, model } from "mongoose";
const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});
const Employee = model("Employee", employeeSchema);
export default Employee;
