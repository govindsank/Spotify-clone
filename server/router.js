import { Router } from "express";

import * as pl from "./request-handlers/playlist.js"
import * as us from "./request-handlers/user.js"
import { Auth} from "./middleware/auth.js";

const router = Router();

router.route("/playlist/").get(pl.getAll);
router.route("/playlist/like").post(Auth,pl.liked);
router.route("/playlist/create").post(pl.create);
router.route("/playlist/liked-songs").get(Auth,pl.likedSongs);
router.route("/playlist/upload-playlist").post(Auth,pl.uploadPlaylist);
router.route("/playlist/get-playlist").get(Auth,pl.getPlaylist);
router.route("/playlist/add-to-library").post(Auth,pl.uploadLibrary);
router.route("/playlist/get-songs/:title").get(Auth,pl.fetchLibreryDetails);






router.route("/user/login").post(us.login);
router.route("/user/register").post(us.register);
router.route("/user/me").get(us.getMe);
router.route("/user/get-users").get(us.getUsers);
router.route("/user/delete-user/:userId").delete(us.admindeleteuser);






export default router;