import express from "express";
import Playlist from "../Models/Playlist.js";
import LibreryModel from "../Models/Librery.js";

const router = express.Router();


// get /
export async function getAll(req, res) {
  try {
    const playlists = await Playlist.find();
    res.json({ playlists, success: true, message: "Playlists found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// post /like
export async function liked(req, res) {
  try {
    const { song_mp3, song_title, song_artist, song_thumbnail } = req.body;
    const { userId } = req.user;

    console.log("user", userId);
    console.log("abc", song_artist);
    const playlistTitle = "Liked Songs";
    let playlist = await Playlist.findOne({ title: playlistTitle, userId });

    if (!playlist) {
      playlist = new Playlist({
        title: playlistTitle,
        userId,
      });
    }

    const existingSongIndex = playlist.songs.findIndex(
      (song) => song.song_title === song_title && song.song_artist === song_artist
    );

    if (existingSongIndex !== -1) {

      playlist.songs.splice(existingSongIndex, 1);

      await playlist.save();

      return res.json({ playlist, success: true, message: "Song disliked" });
    }

    playlist.songs.push({
      song_mp3,
      song_title,
      song_artist,
      song_thumbnail,
    });


    await playlist.save();

    res.json({ playlist, success: true, message: "Song liked" });
    console.log("Song liked");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}




export async function likedSongs(req, res) {
  try {
    const { userId } = req.user;


    const playlist = await Playlist.findOne({ userId });
    console.log(playlist);

    if (!playlist) {
      return res.status(404).json({ message: 'Liked songs not found for the user' });
    }

    const likedSongs = playlist.songs;
    res.json({ songs: likedSongs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// post /create
export async function create(req, res) {
  try {
    const { singers, songs, title } = req.body;
    const playlist = await Playlist.create({ singers, songs, title });

    res.json({ playlist, success: true, message: "Playlist created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}



export async function uploadPlaylist(req, res) {
  try {
    const { name } = req.body;
    const { userId } = req.user;

    // Check if a playlist with the same title already exists for the same user
    const existingPlaylist = await LibreryModel.findOne({ title: name, userId });

    if (existingPlaylist) {
      // Playlist with the same title already exists for the same user
      return res.status(400).json({ success: false, message: "Playlist already exists with the same name for the current user." });
    }

    // Create a new playlist
    const newLibrary = new LibreryModel({ title: name, userId });
    const savedLibrary = await newLibrary.save();

    res.json({ library: savedLibrary, success: true, message: "Playlist added successfully" });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export async function getPlaylist(req, res) {
  try {

    const { userId } = req.user;
    const playlists = await LibreryModel.find({ userId });

    res.status(200).json({ playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export async function uploadLibrary(req, res) {
  try {
    const { userId } = req.user;
    const { song_mp3, song_title, song_artist, song_thumbnail, playlist_title } = req.body;

    const existingLibrary = await LibreryModel.findOne({
      userId,
      title: playlist_title,
    });

    if (!existingLibrary) {
      return res.status(404).json({ error: 'Playlist not found for the user' });
    }

    const existingSong = existingLibrary.songs.find(
      (song) => song.song_title === song_title
    );

    if (existingSong) {
      return res.status(400).json({ error: 'Song already exists in the playlist' });
    }

    existingLibrary.songs.push({
      song_mp3,
      song_title,
      song_artist,
      song_thumbnail,
    });

    await existingLibrary.save();

    res.status(201).json({ message: 'Song added to the playlist successfully' });
  } catch (error) {
    console.error('Error adding song to the playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export async function fetchLibreryDetails(req, res) {
  try {
    const { title } = req.params;
    const { userId } = req.user;
    console.log(title, userId);
    const library = await LibreryModel.findOne({
      // userId: userId,
      title: title,
    });


    console.log(library);
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }

    res.status(200).json({ songs: library.songs });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
