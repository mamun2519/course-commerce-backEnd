const CoursesDB = require("../modal/coursesModal");
const cloudinary = require("cloudinary");

exports.createCourse = async (req, res, next) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
    //       folder: "products",
    //       width: 150,
    //       crop: "scale",
    //     });

    const { name, description, price, category } = req.body;
    const sendProudcts = await CoursesDB.create({
      name,
      description,
      price,
      category,
      images: {
        public_id: "xx",
        url: "xx",
      },
    });
    res.status(200).json({
      message: "course Added SuccessFull",
      product: sendProudcts,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllCourse = async (req, res, next) => {
  const { category } = req.query;
  console.log(category);
  const course = await CoursesDB.find({  $and: [
    { category: { $regex: category, $options: "i" } },
  ],});
  res.send({ success: true, course });
};

exports.updateCourser = async (req, res, next) => {
  const id = req.params.id;
  let course = await CoursesDB.findById(id);
  if (!course) {
    res.status(500).json({
      success: false,
      message: "Course Not found",
    });
  }

  course = await CoursesDB.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    course,
  });
};

exports.deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  let course = await CoursesDB.findById(id);
  if (!course) {
    res.status(500).json({
      success: false,
      message: "Course Not found",
    });
  }
  await course.remove();
  res.status(200).json({
    success: true,
    message: "Course Delete Successfull",
  });
};

exports.getCourseDetels = async (req, res, next) => {
  const id = req.params.id;
  const course = await CoursesDB.findById(id);
  res.json({
    success: true,
    course,
  });
};
