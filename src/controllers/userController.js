import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  // check email exist
  // compare password
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

const handleGetDetailUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({
      errCode: 1,
      errMessage: "User not found",
      users: null,
    });
  }
  let users = await userService.getDetailUser(id);
  return res.status(200).json({
    data: users,
  });
};

let handleCreateNewUsers = async (req, res) => {
  let message = await userService.createNewUsers(req.body);
  console.log(message);
  return res.status(200).json(message);
};

const getBookingHistory = async (req, res) => {
  const patientId = req.params.id;
  let data = await userService.getBookingHistory(patientId);

  return res.status(200).json(data);
};

let handleEditUsers = async (req, res) => {
  let data = req.body;
  let message = await userService.updataUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get allcode error", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUsers: handleCreateNewUsers,
  handleEditUsers: handleEditUsers,
  handleDeleteUsers: handleDeleteUsers,
  getAllCode: getAllCode,
  handleGetDetailUser: handleGetDetailUser,
  getBookingHistory: getBookingHistory,
};
