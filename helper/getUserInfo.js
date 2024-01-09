import User from "../modal/user.modal.js";

export default async function (id) {
  try {
    var user = await User.findById(id).select(["-password", "-__v"]);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log("Error on getUserInfo");
    console.log(e);
  }
}
