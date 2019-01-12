"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use("Route");

Route.get("/", "JobController.home").as("home");

Route.get("/register", "JobController.register").as("register");

Route.post("/register", "UserController.create").validator("CreateUser");

Route.on("/login")
  .render("auth.login")
  .as("login");

Route.post("/login", "UserController.login").validator("LoginUser");

Route.get("/logout", async ({ auth, response }) => {
  await auth.logout();
  return response.redirect("/");
});

Route.get("/post", "JobController.userIndex").as("jobs");

Route.post("/post", "JobController.create").validator("CreateJob");

Route.group(() => {
  Route.get("/delete/:id", "JobController.destroy").as("delete");
  Route.get("/edit/:id", "JobController.edit").as("edit");
  Route.post("/update/:id", "JobController.update")
    .as("update")
    .validator("CreateJob");
}).prefix("/post");
