const {
    register,
    login,
    setAvatar,
    getAllUsers,
    addFriend,
    searchFriend,
    getAllFriends,
    updateUserProfile,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers);
router.post("/add-friend", addFriend);
router.post("/search-friend", searchFriend);
router.get("/get-friends/:id", getAllFriends);
router.patch("/update-user-profile/:id", updateUserProfile);
module.exports = router;
