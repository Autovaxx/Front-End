// Tempaltes for the database - inserted when account is created to help with collection queries
const address = {
  city: "",
  country: "",
  postalCode: "",
  provinceState: "",
  streetName: "",
  streetNumber: "",
  unitNumber: "",
};

const appointment = [
  {
    booked: false,
    date: "",
    pharmacy: "",
    pharmacy_address: "",
    time: "",
    vaccine: "",
  },
];

const emergency_contact = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  relationship: "",
};

const previous_vaccine = {
  vaccines: [
    {
      brand: "",
      dateOfVaccine: "",
      location: "",
    },
    {
      brand: "",
      dateOfVaccine: "",
      location: "",
    },
  ],
};

const user_profile = {
  dateOfBirth: "",
  email: "",
  firstName: "",
  gender: "",
  healthCard: "",
  lastName: "",
  phoneNumber: "",
};

const required_steps = {
  userProfile: false,
  vaccinationDetails: false,
  searchPreferences: false,
};

const search_preference = {
  pharmacy: "",
  vaccinationPref: "",
  startDate: "",
  endDate: "",
};

export {
  address,
  appointment,
  emergency_contact,
  previous_vaccine,
  user_profile,
  required_steps,
  search_preference,
};
