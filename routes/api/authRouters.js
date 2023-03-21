const express = require("express");

const authCtrl = require("../../controllers/uathControllers");

const { validateBody, authentificate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.authSchema),
  authCtrl.register
);

authRouter.post("/login", validateBody(schemas.authSchema), authCtrl.login);

authRouter.get("/current", authentificate, authCtrl.getCurrent);

authRouter.post("/logout", authentificate, authCtrl.logout);

authRouter.patch(
  "/",
  authentificate,
  validateBody(schemas.updateSubscrition),
  authCtrl.subscription
);

module.exports = authRouter;