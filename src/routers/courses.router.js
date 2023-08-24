let { Router } = require("express");
const router = Router();

const { ApiResponse } = require("../response");
let CoursesController = require("../controllers/courses.controller");
let coursesController = new CoursesController();

router.get("/", async (req, res) => {
  let response;
  try {
    response = await coursesController.getAll();
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.post("/", async (req, res) => {
  let response;
  try {
    let course = req.body;
    response = await coursesController.saveCourse(course);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.put("/:uid", async (req, res) => {
  let response;
  try {
    let { uid } = req.params;
    let courseToReplace = req.body;
    response = await coursesController.updateCourse(uid, courseToReplace);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.json(response);
});

router.delete("/:uid", async (req, res) => {
  let response;
  try {
    let { uid } = req.params;
    response = await coursesController.deleteCourse(uid);
  } catch (error) {
    response = new ApiResponse("ERROR", error.message, null).response();
  }
  res.send(response);
});

module.exports = router;
