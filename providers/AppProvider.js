"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const Request = use("Adonis/Src/Request");

class AppProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    Request.getter("time", async function() {
      return await new Date().getTime();
    });
  }
}

module.exports = AppProvider;
