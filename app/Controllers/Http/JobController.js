"use strict";

const Job = use("App/Models/Job");
const Antl = use("Antl");

class JobController {
  async home({ view, auth }) {
    const jobs = await Job.all();

    return view.render("welcome", { jobs: jobs.toJSON() });
  }

  async register({ view }) {
    const year = Antl.formatDate(new Date().getYear());

    return view.render("auth.register", { year });
  }
}

module.exports = JobController;
