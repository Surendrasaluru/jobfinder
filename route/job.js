const express = require("express");
const jobRouter = express.Router();
const Job = require("../model/jobModal");
const verifyToken = require("../middleware/authMiddleware");

jobRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,

      jobLocation,
      jobDescription,
      aboutCompany,
    } = req.body;
    if (
      !companyName ||
      !jobPosition ||
      !jobDescription ||
      !aboutCompany ||
      !monthlySalary ||
      !jobType
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const newJob = new Job({
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      jobLocation,
      jobDescription,
      aboutCompany,
    });

    await newJob.save();

    res
      .status(200)
      .json({ message: "Job listing created successfully", data: newJob });
  } catch (err) {
    console.log(err.message);
  }
});

jobRouter.get("/details/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return res.status(400).json({ message: "no job found with that id" });
    }
    res.json({ jobDetails });
  } catch (err) {
    console.log(err.message);
    res.json({ message: "no job found with given id" });
  }
});
module.exports = jobRouter;
