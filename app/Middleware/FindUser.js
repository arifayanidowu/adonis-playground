"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Job = use("App/Models/Job");

class FindUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params }, next) {
    // call next to advance the request
    const job = await Job.find(params.id);

    request.job = job;

    await next();
  }
}

module.exports = FindUser;
