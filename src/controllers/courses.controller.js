const CoursesService = require("../services/courses.service");
const { ApiResponse } = require("../response");

class coursesController {
  constructor() {
    this.coursesservice = new CoursesService();
  }

  getAll = async () => {
    let result = await this.coursesservice.getAll();

    return result;
  };

  saveCourse = async (course) => {
    let result = await this.coursesservice.saveCourse(course);
    return result;
  };

  updateCourse = async (uid, course) => {
    let result = await this.coursesservice.updateCourse(uid, course);
    return result;
  };

  deleteCourse = async (id) => {
    let result = await this.coursesservice.deleteCourse(id);
    return result;
  };
}

module.exports = coursesController;
