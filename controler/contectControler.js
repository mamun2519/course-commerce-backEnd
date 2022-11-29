const ContectDB = require("../modal/contectModal");

exports.createContect = async (req, res, next) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    const sendProudcts = await ContectDB.create({
      name,
      phone,
      email,
      subject,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Message Send Successfull",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllContectList = async (req, res, next) => {
  try {
    const contect = await ContectDB.find({});
    res.send({ success: true, contect });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteContect = async (req, res, next) => {
  const id = req.params.id;
  let contect = await ContectDB.findById(id);
  if (!contect) {
    res.status(500).json({
      success: false,
      message: "contect Not found",
    });
  }
  await contect.remove();
  res.status(200).json({
    success: true,
    message: "Message Delete Successfull",
  });
};

exports.getContectDetels = async (req, res, next) => {
  const id = req.params.id;
  const contect = await ContectDB.findById(id);
  res.json({
    success: true,
    contect,
  });
};
