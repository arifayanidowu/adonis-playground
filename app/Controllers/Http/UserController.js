"use strict";

const User = use("App/Models/User");

class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(["username", "email", "password"])
    );
    await auth.login(user);
    return response.redirect("/");
  }

  async login({ auth, request, response, session }) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect("/");
    } catch (e) {
      session.flash({ loginError: "Invalid Credentials." });
      return response.redirect("back");
    }
  }
}

module.exports = UserController;
