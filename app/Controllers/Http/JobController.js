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

  async userIndex({ auth, view }) {
    const jobs = await auth.user.jobs().fetch();

    return view.render("jobs", { jobs: jobs.toJSON() });
  }

  async create({ request, response, auth, session }) {
    const job = request.all();

    await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      user_id: auth.user.id,
      description: job.description
    });

    session.flash({ message: "Your Job has been posted" });

    return response.redirect("/post");
  }

  async destroy({ response, session, request: { job } }) {
    await job.delete();

    session.flash({ message: "Your Job has been removed" });

    return response.redirect("back");
  }

  async edit({ view, request: { job } }) {
    return view.render("edit", { job: job });
  }

  async update({ response, request, session }) {
    const { job } = request;
    job.title = request.all().title;
    job.link = request.all().link;
    job.description = request.all().description;

    await job.save();

    session.flash({ message: "Your Job has been updated" });
    return response.route("jobs");
  }
}

module.exports = JobController;
