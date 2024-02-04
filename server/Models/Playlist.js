import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
userId:{
  type:String,
},
  songs: [
    {
      song_mp3: {
        type: String,
      },
      song_title: {
        type: String,
      },
      song_artist: {
        type: String,
      },
      song_thumbnail: {
        type: String,
      },
    },
  ],
});

const PlaylistModel = mongoose.model("Playlist", schema);

export default PlaylistModel;
