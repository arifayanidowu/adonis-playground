"use strict";

class CreateUser {
  get rules() {
    return {
      // validation rules
      username: "required|unique:users",
      email: "required|unique:users",
      password: "required"
    };
  }

  get messages() {
    return {
      required: "whoops!, {{ field }} is required.",
      unique: "{{ field }} already exists."
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = CreateUser;
