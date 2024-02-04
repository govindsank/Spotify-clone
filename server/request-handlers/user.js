import express from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Playlist from "../Models/Playlist.js";
import LibreryModel from "../Models/Librery.js";
import { generateToken } from "../helper/generateToken.js";
import jsonWeb from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();


const { sign } = jwt;
// post /register
export async function register(req, res) {

  try {
    console.log(req.body);
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    let userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({
        message: `${username == userExists.username ? "Username" : "email"} already exists!`
      })
    }


    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      username,
      password: hash,
    });
    return res.status(201).json({
      message: "Registration successful!"
    })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "internal server error" });
  }
}

// post /login
export async function login(req, res) {


  try {
    console.log(req.body);

    const { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json({
        message: "Username or password cannot be empty!"
      })
  }

    let user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      user = await User.findOne({ email: username });
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    } else {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify)
        return res.json({ success: false, message: "Invalid Credentials" });
      else {
        let token = sign({
          username: user.username,
          userId: user._id
      }, process.env.SECRET_KEY,{
          expiresIn: "48h"
      });
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "login successful",
      })

      }
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}



// get /me
export async function getMe(req, res) {
  try {
    const { token } = req.headers;
    if (!token)
      return res
        .status(401)
        .json({ success: true, message: "user Unauthorized" });

    const data = jsonWeb.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(data.id);
    if (user) {
      return res.json({ user, success: true, message: "user found" });
    } else {
      return res.status(404).json({ success: true, message: "user not found" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "session has expire please login again",
    });
  }
}

// get /users
export async function getUsers(req, res) {
  const users = await User.find();
  res.json({ users, success: true, message: "users found" });
}



export async function admindeleteuser(req, res) {
  const userId = req.params.userId;
  console.log(userId);

  try {

    const userDelete = await User.deleteOne({ _id: userId });
    const playlistDelete = await Playlist.deleteOne({ userId: userId });
    const libraryDelete = await LibreryModel.deleteOne({ userId: userId });

    if (userDelete && playlistDelete && libraryDelete) {
      res.status(200).json({ message: 'User and related records deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user and related records:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
