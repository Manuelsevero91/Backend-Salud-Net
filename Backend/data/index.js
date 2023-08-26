const doctors = require('./doctors.json');
const patients = require('./patients.json');


module.exports = () => ({
  doctors: doctors,
  patients: patients
 
});