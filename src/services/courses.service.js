const CoursesDAO = require("../DAOs/mongodb/coursesMongo.dao");
const { ApiResponse } = require("../util");

class coursesService {
  constructor() {
    this.coursesDAO = new CoursesDAO();
  }

  getAll = async () => {
    let result = await this.coursesDAO.getAll();

    return result;
  };

  saveCourse = async (course) => {
    let result = await this.coursesDAO.saveCourse(course);

    return new ApiResponse("OK", "", result).response();
  };

  updateCourse = async (uid, course) => {
    let result = await this.coursesDAO.updateCourse(uid, course);

    if (result.matchedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  };

  deleteCourse = async (uid) => {
    let result = await this.coursesDAO.deleteCourse(uid);

    if (result.deletedCount > 0)
      return new ApiResponse("OK", "", null).response();

    return new ApiResponse("ERROR", "No encontrado", null).response();
  };
}

module.exports = coursesService;
