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

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Neela Nilave",
    artist: "RDX",
    mp3: new Audio("/assets/song/Neela Nila.mp3"),
    img: "/assets/RDX.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Arjan Vailly",
    artist: "Aninal",
    mp3: new Audio("/assets/song/Arjan Vailly Animal .mp3"),
    img: "/assets/Animal.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Jawan",
    artist: "Jawaan",
    mp3: new Audio("/assets/song/JAWAN.mp3"),
    img: "/assets/chaleya.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "",
    artist: "DDD",
    mp3: new Audio("/assets/song/Jeevamshamayi.mp3"),
    img: "/assets/theevandi.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "jacobinte Swargaragyam",
    artist: "Ennilerinju",
    mp3: new Audio("/assets/song/Ennilerinju.mp3"),
    img: "/assets/Ennilerinju.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Anugraheethan-Antony",
    artist: "Kamini ",
    mp3: new Audio("/assets/song/Kamini-KS-Harisankar.mp3"),
    img: "/assets/Anugraheethan-Antony.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Anuv",
    artist: "B",
    mp3: new Audio("/assets/song/Anuv.mp3"),
    img: "/assets/Husan.jpeg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Jawan",
    artist: "C",
    mp3: new Audio("/assets/song/JAWAN.mp3"),
    img: "/assets/chaleya.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Lutt",
    artist: "DDD",
    mp3: new Audio("/assets/song/Lutt.mp3"),
    img: "/assets/Lutt Putt Gaya.jpg",
  },
  
];



export const songsss = [
  {
    id: Math.random() * Date.now(),
    title: "Animal",
    artist: "Arjan Vailly",
    mp3: new Audio("/assets/song/Oru-Nokku.mp3"),
    img: "/assets/Sunday_Holiday.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "RDX",
    artist: "Neela Nila",
    mp3: new Audio("/assets/song/Neela Nila.mp3"),
    img: "/assets/RDX.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Neela nilave",
    artist: "Ks Harishankar",
    mp3: new Audio("/assets/song/Kamini-KS-Harisankar.mp3"),
    img: "/assets/Anugraheethan-Antony.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Jeevamshamayi",
    artist: "Jeevamshamayi",
    mp3: new Audio("/assets/song/Jeevamshamayi.mp3"),
    img: "/assets/theevandi.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "jacobinte Swargaragyam",
    artist: "Ennilerinju",
    mp3: new Audio("/assets/song/Ennilerinju.mp3"),
    img: "/assets/Ennilerinju.jpg",
  },
  
  
];


export const songss = [
  {
    id: Math.random() * Date.now(),
    title: "Animal",
    artist: "Animal",
    mp3: new Audio("/assets/song/Arjan Vailly Animal .mp3"),
    img: "/assets/Animal.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Javan",
    artist: "JAWAN",
    mp3: new Audio("/assets/song/JAWAN.mp3"),
    img: "/assets/chaleya.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "LUTT",
    artist: "LUTT",
    mp3: new Audio("/assets/song/Lutt.mp3"),
    img: "/assets/Lutt Putt Gaya.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Pathaan",
    artist: "Pathaan",
    mp3: new Audio("/assets/song/Jhoome-Jo-Pathaan.mp3"),
    img: "/assets/Pathaan.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Tiger 3",
    artist: "Tiger 3",
    mp3: new Audio("/assets/song/Leke-Prabhu-Ka-Naam.mp3"),
    img: "/assets/tiger 3.jpeg",
  },
  
];

const Home = () => {

  const { getUser } = useGlobalContext();

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Top Malayalam songs
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songsss.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
          Trending
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songss.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Home;
