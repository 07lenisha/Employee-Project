
export const employeeval={
     firstName:{
        exists:{
            errorMessage:"name is required"
        },
        notEmpty: {
      errorMessage: "firstName should not be empty",
    },
     matches: {
      options: /^[A-Za-z]+$/,
      errorMessage: 'FirstName must contain only alphabetic characters',
    },
     trim: true,
     },
      lastName:{
        exists:{
            errorMessage:"name is required"
        },
        notEmpty: {
      errorMessage: "LastName should not be empty",
    },
     matches: {
      options: /^[A-Za-z]+$/,
      errorMessage: 'LastName must contain only alphabetic characters',
    },
     trim: true,
     },

     username:{
        exists:{
            errorMessage:"name is required"
        },
        notEmpty: {
      errorMessage: "userName should not be empty",
    },
    
     trim: true,
     },
    email:{
        exists:{
            errorMessage:"email is required"
        },
        isEmail:{
            errorMessage:"invalid email"
        },
        notEmpty:{
            errorMessage:"email should not be empty"
        },
    trim:true,
    normalizeEmail:true,
        
    },
     mobile: {
    notEmpty: {
      errorMessage: 'Mobile number is required',
    },
    matches: {
      options: /^[6-9]\d{9}$/,
      errorMessage: 'Mobile must be a 10-digit  number',
    },
    trim: true,
  },
}
export function validateRow(row, rowNum) {
  const errors = [];


  const firstName = typeof row.firstName === 'string' ? row.firstName.trim() : '';
  if (!firstName) {
    errors.push(`Row ${rowNum}: First name is required`);
  } else if (!/^[A-Za-z]+$/.test(firstName)) {
    errors.push(`Row ${rowNum}: First name must contain only alphabetic characters`);
  }

 
  const lastName = typeof row.lastName === 'string' ? row.lastName.trim() : '';
  if (!lastName) {
    errors.push(`Row ${rowNum}: Last name is required`);
  } else if (!/^[A-Za-z]+$/.test(lastName)) {
    errors.push(`Row ${rowNum}: Last name must contain only alphabetic characters`);
  }

  
  const username = typeof row.username === 'string' ? row.username.trim() : '';
  if (!username) {
    errors.push(`Row ${rowNum}: Username is required`);
  } else if (!/^[A-Za-z]+$/.test(username)) {
    errors.push(`Row ${rowNum}: Username must contain only alphabetic characters`);
  }

  
  const email = typeof row.email === 'string' ? row.email.trim() : '';
  if (!email) {
    errors.push(`Row ${rowNum}: Email is required`);
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push(`Row ${rowNum}: Invalid email format`);
    }
  }

 
const mobile = row.mobile !== undefined && row.mobile !== null ? String(row.mobile).trim() : '';
if (!mobile) {
  errors.push(`Row ${rowNum}: Mobile number is required`);
} else if (!/^[6-9]\d{9}$/.test(mobile)) {
  errors.push(`Row ${rowNum}: Mobile must be a 10-digit Indian number starting with 6-9`);
}

return errors;
  }
