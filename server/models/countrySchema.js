const mongoose = require('mongoose');
const countrySchema = new mongoose.Schema({
    name: String,
    states: [
      {
        name: String,
        cities: [String]
      }
    ]
  });
  
  const Countrydata = mongoose.model('Country', countrySchema);

  module.exports=Countrydata