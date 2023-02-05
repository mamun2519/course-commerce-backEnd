const UserDB = require("../modal/userModal");
const sendToken = require("../utilities/sendToken");

exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, role, adviserUserName } = req.body;
    const user = await UserDB.findOne({ email: email });
    if (user)
      return res
        .status(202)
        .send({ success: false, message: "User Already Exists" });
    const adduser = await UserDB.create({ name, email, role, adviserUserName });
    // res.send({ success: true, message: "register Successfull" });
    sendToken(adduser, 200, res);
  } catch (e) {
    console.log(e);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserDB.findOne({ email: email });
    if (!user)
      return res
        .status(202)
        .send({ success: false, message: "User Not Found!" });
    sendToken(user, 200, res);
  } catch (e) {
    console.log(e);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    // const search = req.query.search || "";
    const user = await UserDB.find({
      $and: [{ role: "user" }],
    })
      .skip(page * limit)
      .limit(limit);
    res.json({ success: true, user, page: page + 1, limit });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllAdvaiser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    // const search = req.query.search || "";
    const user = await UserDB.find({
      $and: [{ role: "Adviser" }],
    });
    // .skip(page * limit)
    // .limit(limit);
    res.json({ success: true, user, page: page + 1, limit });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllOwner = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    // const search = req.query.search || "";
    const user = await UserDB.find({
      $and: [{ role: "owner" }],
    });
    // .skip(page * limit)
    // .limit(limit);
    res.json({ success: true, user, page: page + 1, limit });
  } catch (e) {
    console.log(e);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserDB.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Please provide valid user Information",
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await UserDB.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "user Not Found",
      });
    } else {
      user.remove();
      res.status(200).json({
        success: true,
        message: "User Delete Successfull",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email);
    const adminRequester = req.decoded.email;
    const requestAdmin = await UserDB.findOne({ email: adminRequester });
    if (requestAdmin.role == "owner") {
      const roleAction = req.query.roleAction;

      if (roleAction == "Adviser") {
        const makeAdmin = await UserDB.updateOne(
          { email },
          {
            $set: { role: "Adviser" },
          }
        );
        if (makeAdmin.modifiedCount > 0) {
          res.status(200).json({
            success: true,
            message: "Advaiser Make Successfull",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Advaiser request fail",
          });
        }
      } else if (roleAction === "owner") {
        const makeUser = await UserDB.updateOne(
          { email },
          {
            $set: { role: "owner" },
          }
        );
        if (makeUser.modifiedCount > 0) {
          res.status(200).json({
            success: true,
            message: "Owner Make Succssfull",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Owner request fail",
          });
        }
      }
    } else {
      res.status(403).send({ message: "forbiden Accescc" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.removeAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;

    const adminRequester = req.decoded.email;
    console.log(adminRequester);
    const requestAdmin = await UserDB.findOne({ email: adminRequester });
    if (requestAdmin.role == "owner") {
      const roleAction = req.query.roleAction;
      if (roleAction == "user") {
        const makeAdmin = await UserDB.updateOne(
          { email },
          {
            $set: { role: "user" },
          }
        );
        if (makeAdmin.modifiedCount > 0) {
          res.status(200).json({
            success: true,
            message: "Remove Admin Role",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Remove request fail",
          });
        }
      }
    } else {
      res.status(403).send({ message: "forbiden Accescc" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cheackAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await UserDB.findOne({ email });
    console.log(email);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isAdmin = user.role === "owner" ;
      res.status(200).json({
        success: true,
        admin: isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cheackAdviser = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email)
    const user = await UserDB.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isAdviser = user.role === "Adviser";
      res.status(200).json({
        success: true,
        adviser: isAdviser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
