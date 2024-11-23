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
      skillsRequired,
    } = req.body;
    if (
      !companyName ||
      !jobPosition ||
      !jobDescription ||
      !aboutCompany ||
      !monthlySalary ||
      !jobType ||
      !skillsRequired
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
      skillsRequired,
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

jobRouter.patch("/edit/:jobId", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.jobId; //extracting jobid
    const jobDetails = await Job.findById(jobId); //finding that job in DB.
    if (!jobDetails) {
      return res.status(400).json({ message: "no job found with that id" }); //handling
    }

    Object.keys(req.body).forEach((key) => (jobDetails[key] = req.body[key]));

    await jobDetails.save();
    res.json({
      message: "your  update was succesful",
      data: jobDetails,
    });
  } catch (err) {
    console.log(err.msg);
    res.json({ message: "cant edit sorry" });
  }
});

jobRouter.get("/alljobs", async (req, res) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills || "";

    let filteredSkills;
    let filter = {};
    if (skills && skills.length > 0) {
      filteredSkills = skills.split(",");
      const caseInsensitiveFilteredSkills = filteredSkills.map(
        (element) => new RegExp(element, "i")
      );
      filteredSkills = caseInsensitiveFilteredSkills;
      filter = { skillsRequired: { $in: filteredSkills } };
    }

    const allJobs = await Job.find({
      jobPosition: { $regex: title, $options: "i" },
      ...filter,
    });

    if (allJobs.length === 0) {
      await res.json({ message: "no jobs found with given criteria" });
    } else {
      await res.json(allJobs);
    }
  } catch (err) {
    console.log(err.message);
    res.json({ message: "internal error happened in catch" });
  }
});

module.exports = jobRouter;

/*companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      jobLocation,
*/
