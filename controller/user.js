const User = require("../models/user");

async function getAllUsers(req, res) {
  const alldbusers = await User.find({});
  res.send(alldbusers);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "User Not Found" });
  }
  return res.json(user);
}
async function updateUserById(req, res) {
  const user = await User.findById(req.params.id);
  const body = req.body;
  await User.findByIdAndUpdate(user, { lastName: "changed" });
  return res.json({ status: "success" });
}
async function deleteUserById(req, res) {
  // const user = await User.findById(req.params.id);
  await User.findByIdAndDelete(user);
  return res.json({ status: "success" });
}
async function createUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.gender ||
    !body.country ||
    !body.email
  ) {
    return res.status(400).json({ status: "Fill The Required Fields" });
  }
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    country: body.country,
  });
  return res.status(200).json({ msg: "Success" });
}
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
};
