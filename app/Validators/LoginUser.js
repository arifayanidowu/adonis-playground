"use strict";

class LoginUser {
  get rules() {
    return {
      // validation rules
      email: "required|email",
      password: "required"
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required"
    };
  }

  async fails(error) {
    this.ctx.sessions.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = LoginUser;
