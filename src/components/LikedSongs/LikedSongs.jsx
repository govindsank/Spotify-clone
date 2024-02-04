import React, { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import SongBar from "../MasterBar/SongBar";
import { useGlobalContext } from "../../states/Contet";

const LikedSongs = () => {
  const { getUser } = useGlobalContext();
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserLikedSongs = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3000/api/playlist/liked-songs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSongsData(res.data.songs);
    } catch (error) {
      console.error('Error fetching liked songs:', error);
      setError('Error fetching liked songs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    fetchUserLikedSongs();
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="tertiary_bg ml-2 px-4 py-4 home">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Your Liked Songs
          </span>
          <span>Show All</span>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className="grid gap-6 grid-cols-5">
            {songsData.map((song, i) => (
              <Card
                key={i}
                idx={i}
                song={{
                  id: i, 
                  title: song.song_title,
                  artist: song.song_artist,
                  mp3: new Audio(song.song_mp3),
                  img: song.song_thumbnail, 
                }}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <SongBar songsData={songsData} />
    </Layout>
  );
};

export default LikedSongs;
