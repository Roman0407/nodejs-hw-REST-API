const express = require("express");
const controllers = require("../../controllers/contactsControllers");

const {
  validateBody,
  isValidId,
  authentificate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authentificate, controllers.getAll);

router.get("/:contactId", authentificate, isValidId, controllers.getById);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema),
  controllers.add
);

router.delete("/:contactId", authentificate, isValidId, controllers.deleteById);

router.put(
  "/:contactId",
  authentificate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

module.exports = router;