import Layout from "../../Layout/Layout";
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import SongBar from "../MasterBar/SongBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userActor } from "../../states/Actors/UserActor";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Library = () => {

  const { title } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getUser } = useGlobalContext();
console.log(title);


  const fetchData = async () => {
    try {

      const token = localStorage.getItem('token');
      console.log("ahjvhgc",title);
      const response = await axios.get(`http://localhost:3000/api/playlist/get-songs/${title}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      setSongs(response.data.songs);
      console.log("response",response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Error fetching songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    getUser();
    
    fetchData();

  }, [title]);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            your Library {title}
            
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
        {songs.map((song, i) => (
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
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Library;
