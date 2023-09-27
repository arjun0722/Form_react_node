import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { parse } from "date-fns";
import { dividerClasses } from "@mui/material";
import './form.css';

const Form = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/country");
        setCountriesData(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "country") {
      setSelectedCountry(value);
      setSelectedState("");
      setFormData({ ...formData, country: value, state: "", city: "" });
    } else if (name === "state") {
      setSelectedState(value);
      setFormData({ ...formData, state: value, city: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3030/users", formData);

      console.log("User data submitted successfully.");
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////
  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = parse(dob, "yyyy-MM-dd", new Date());
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age.toString();
  };
  //////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const age = calculateAge(formData.dob);
    setFormData({ ...formData, age });
  }, [formData.dob]);

  return (
    <div className="container">
      <form className="Forms" onSubmit={handleSubmit}>
      <TextField
        name="name"
        className="textinput"
        label="Name"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
        value={formData.name}
      />
      <TextField
        name="lastname"
        className="textinput"
        label="Last Name"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
        value={formData.lastname}
      />
      <TextField
        name="email"
        className="textinput"
        label="Email"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
        value={formData.email}
      />
      <FormControl component="fieldset">
        <RadioGroup
          name="gender"
          className="textinput"
          value={formData.gender}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <TextField
        name="dob"
        className="textinput"
        label="Date of Birth"
        type="date"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
        value={formData.dob}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="age"
        className="textinput"
        label="Age"
        type="number"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
        value={formData.age}
      />
      <FormControl fullWidth variant="outlined" required>
        <InputLabel>Country</InputLabel>
        <Select
          name="country"
          value={formData.country}
          onChange={handleChange}
          label="Country"
        >
          {countriesData.map((countryData) => (
            <MenuItem key={countryData.name} value={countryData.name}>
              {countryData.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" required>
        <InputLabel>State</InputLabel>
        <Select
          name="state"
          className="textinput"
          value={formData.state}
          onChange={handleChange}
          label="State"
          disabled={!selectedCountry}
        >
          {countriesData
            .find((countryData) => countryData.name === selectedCountry)
            ?.states.map((stateData) => (
              <MenuItem key={stateData.name} value={stateData.name}>
                {stateData.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" required>
        <InputLabel>City</InputLabel>
        <Select
          name="city"
          className="textinput"
          value={formData.city}
          onChange={handleChange}
          label="City"
          disabled={!selectedState}
        >
          {countriesData
            .find((countryData) => countryData.name === selectedCountry)
            ?.states.find((stateData) => stateData.name === selectedState)
            ?.cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className="btnbox">
        <Button className="btn" type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
    </div>
  );
};

export default Form;
