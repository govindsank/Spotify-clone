import React, { useEffect, useState } from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);


  const getPlaylists = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/playlist/get-playlist", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 200) {
        setPlaylists(res.data.playlists);
        console.log(res.data);
      } else {
        console.error("Error fetching playlists:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleAddLibrary = async () => {
    let value = prompt("Enter library name:");
    console.log(value);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/playlist/upload-playlist",
        { name: value },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        getPlaylists();
      } else {
        console.error("Error adding library:", res.statusText);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error adding library:", error);
      toast.error("An error occurred.");
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="w-1/4 fixed left-0 mt-2 top-0 sidebar ">
      <div className="nav secondary_bg rounded-lg p-10 ">
        <Link to={"/"} className="flex items-center gap-6">
          <BiSolidHome className="font-bold text-4xl mb-4" />
          <span className="text-2xl font-bold mb-3">Home</span>
        </Link>
        <Link to={"/search"} className="flex mt-4 items-center gap-6">
          <FiSearch className="font-bold text-4xl" />
          <span className="text-2xl">Search</span>
        </Link>
        <Link to={"/likedsongs"} className="flex mt-4 items-center gap-6">
          <AiOutlineHeart className="font-bold text-4xl" />
          <span className="text-2xl">Liked Songs</span>
        </Link>
      </div>
      <div className="mt-3 secondary_bg rounded-lg px-2 py-2">
        <div className="flex px-4 justify-between mb-4 items-center gap-4">
          <div className="flex gap-2 items-center">
            <BiLibrary className="font-bold text-4xl ml-3 mt-4" />
            <span className="text-xl mt-4">Your library</span>
          </div>
          <button
            onClick={() => handleAddLibrary()}
            className="hover:bg-black/25 rounded-[50%] p-2 mt-4"
          >
            <FaPlus className="font-bold text-xl mt-4" />
          </button>
        </div>


        {playlists.map((library) => (
          <div key={library.id} className="library-list-item text-xl">
            <Link to={`/library/${encodeURIComponent(library.title)}`} className="flex mt-4 items-center gap-6 text-1xl ml-20">
              <h1>{library.title}</h1>
            </Link>
          </div>
        ))}


      </div>
    </div>
  );
};

export default Sidebar;
