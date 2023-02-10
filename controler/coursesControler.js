const CoursesDB = require("../modal/coursesModal");
const cloudinary = require("cloudinary");
exports.createCourse = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "products",
      // width: 150,
      crop: "scale",
    });

    if (req.body.boxOneImage !== "") {
      var CloudboxOneImage = await cloudinary.v2.uploader.upload(
        req.body.boxOneImage,
        {
          folder: "products",
          // width: 150,
          crop: "scale",
        }
      );
    }
    if (req.body.boxTwoImage !== "") {
      var CloudboxTwoImage = await cloudinary.v2.uploader.upload(
        req.body.boxTwoImage,
        {
          folder: "products",
          // width: 150,
          crop: "scale",
        }
      );
    }
    if (req.body.boxThreeImage !== "") {
      var CloudboxThreeImage = await cloudinary.v2.uploader.upload(
        req.body.boxThreeImage,
        {
          folder: "products",
          // width: 150,
          crop: "scale",
        }
      );
    }

    const {
      name,
      description,
      email,
      category,
      courseTitle,
      Stock,
      about,
      goal,
      mission,
      log,
      lat,
      price,
      boxOneTitle,
      boxTwoTitle,
      boxThreeTitle,
    } = req.body;
    
    const sendProudcts = await CoursesDB.create({
      name,
      price,
      description,
      email,
      category,
      courseTitle,
      Stock,
      about,
      goal,
      mission,
      log,
      lat,
      boxOneTitle,
      boxTwoTitle,
      boxThreeTitle,
      images: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      boxOneImage: {
        public_id: CloudboxOneImage?.public_id,
        url: CloudboxOneImage?.secure_url,
      },
      boxTwoImage: {
        public_id: CloudboxTwoImage?.public_id,
        url: CloudboxTwoImage?.secure_url,
      },
      boxThreeImage: {
        public_id: CloudboxThreeImage?.public_id,
        url: CloudboxThreeImage?.secure_url,
      },
    });
    res.status(200).json({
      message: "Course Publish Successfull",
      product: sendProudcts,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const { category, kewword } = req.query;
    if (category) {
      if (category == "All") {
        const course = await CoursesDB.find({});
        res.send({ success: true, course });
      } else {
        const course = await CoursesDB.find({
          $or: [
            { category: { $regex: category, $options: "i" } },
            { name: { $regex: kewword, $options: "i" } },
            // { name: kewword },
          ],
        });
        res.send({ success: true, course });
      }
    } else {
      const course = await CoursesDB.find({});
      res.send({ success: true, course });
    }
  } catch (e) {
    console.log(e);
  }
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
 try{
  const id = req.params.id;
  let course = await CoursesDB.findById(id);
  console.log(course);
  if (!course) {
    res.status(500).send({
      success: false,
      message: "Course Not found",
    });
  }
  else{
    await course.remove();
  res.status(200).send({
    success: true,
    message: "Course Delete Successfull",
  });
  }
 }

 catch(e){

 }
};

exports.getCourseDetels = async (req, res, next) => {
  const id = req.params.id;
  const course = await CoursesDB.findById(id);
  res.json({
    success: true,
    course,
  });
};

exports.myActiveCourses = async (req , res , next) =>{
  const course = await CoursesDB.find({email: req.params.email})
  console.log(course)
  res.send({success: true , course})

}

exports.allPayments = async (req, res, next) =>{
  try{
    const payments = await Payment.find()
    console.log(payments)
    res.send({success: true , payments})
  }
  catch(e){
    console.log(e);
  }
 
}