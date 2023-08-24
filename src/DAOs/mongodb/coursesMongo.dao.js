let coursesModel = require("./models/courses.model");

class coursesDAO {
  constructor() {}

  getAll = async () => {
    let result = await coursesModel.find().lean();
    return result;
  };

  saveCourse = async (course) => {
    let result = await coursesModel.create(course);
    return result;
  };

  updateCourse = async (uid,course) => {
    let result = await coursesModel.updateOne({ _id: uid },course);
    return result;
  };

  deleteCourse = async (uid ) => {
    let result = await coursesModel.deleteOne({ _id: uid });
    return result;

    //   let result = await userModel.updateOne({ _id: uid }, userToReplace);
  };



}

module.exports = coursesDAO;
