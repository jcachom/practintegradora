const CoursesService = require("../services/courses.service");

const { EErrors } = require("../errors/enum");
const CustomError = require("../errors/customError");

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
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id curso",
      value: uid,
    });

    let result = await this.coursesservice.updateCourse(uid, course);
    return result;
  };

  deleteCourse = async (uid) => {
    CustomError.validateCreateError({
      code: EErrors.INVALID_TYPES_UUID,
      field: "id curso",
      value: uid,
    });

    let result = await this.coursesservice.deleteCourse(uid);
    return result;
  };
}

module.exports = coursesController;
