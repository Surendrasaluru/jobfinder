const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      uppercase: true,
    },
    addLogoURL: {
      type: String,
      default: "https://eu.ui-avatars.com/api/?name=durga+saluru&size=250",
    },
    jobPosition: {
      type: String,
      required: [true, "Job position is required"],
      uppercase: true,
    },
    monthlySalary: {
      type: String,
      required: [true, "Monthly salary is required"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
    },

    jobLocation: {
      type: String,
      default: "Hyderabad",
      // required: [true, "Job location is required"],
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    aboutCompany: {
      type: String,
      required: [true, "About company is required"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema); // creating model with name User.

module.exports = Job;
