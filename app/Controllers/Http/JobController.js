"use strict";

const Job = use("App/Models/Job");

class JobController {
  async home({ view, auth }) {
    const jobs = await Job.all();

    return view.render("welcome", { jobs: jobs.toJSON() });
  }
}

module.exports = JobController;
