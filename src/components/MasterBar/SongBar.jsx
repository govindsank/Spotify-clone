import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { CgScreen } from "react-icons/cg";
import { BiRepeat, BiShuffle } from "react-icons/bi";
import { toast } from "react-toastify";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiMicrophoneStageDuotone, PiQueueLight } from "react-icons/pi";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { BsArrowsAngleContract, BsSpeakerFill } from "react-icons/bs";
import axios from 'axios';
import {
    pauseMaster,
    playMaster,
    playSong,
} from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Contet";
import "./SongBar.css";
import { songs } from "../Home/Home";
const SongBar = () => {


    // let userId=localStorage.getItem(token);
    // console.log(userId);
    const [isLiked, setIsLiked] = useState(false);
    const [userLikedSongs, setUserLikedSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {
        progress,
        setProgress,
        resetEverything,
        songIdx,
        setSongIdx,
        currTime,
        setCurrTime,
        duration,
        setDuration,
    } = useGlobalContext();
    const dispatch = useDispatch();
    const handleMaster = () => {
        if (isPlaying) {
            dispatch(pauseMaster());
        } else {
            dispatch(playMaster());
        }
    };




    const addToLiked = async () => {


        const data = JSON.stringify({
            song_mp3: masterSong.mp3.src,
            song_title: masterSong.title,
            song_artist: masterSong.artist,
            song_thumbnail: masterSong.img,
        });

        const token = localStorage.getItem('token');
        console.log('Token:', token);

        try {
            const res = await axios.post('http://localhost:3000/api/playlist/like', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            });
            console.log(res.data);
            toast.success(res.data.message);

        } catch (error) {
            console.error('Error adding to liked songs:', error);
            toast.error(data.message);
        }

        // let d = await res.json();
        // console.log(d)
        fetchUserLikedSongs();

    };


    const handlePlaylistChange = async (event) => {
        const selectedPlaylistTitle = event.target.value;
        const data = JSON.stringify({
            song_mp3: masterSong.mp3.src,
            song_title: masterSong.title,
            song_artist: masterSong.artist,
            song_thumbnail: masterSong.img,
            playlist_title: selectedPlaylistTitle,
        });
        console.log(selectedPlaylistTitle);
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        try {
            const res = await axios.post('http://localhost:3000/api/playlist/add-to-library', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            });
            console.log("add-to-library",res.data);
            toast.success(res.data.message);

        } catch (error) {
            console.error('Error adding to library:', error);
            
            toast.error("Error adding to library");
        }

    };



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

    console.log(playlists);


    const fetchUserLikedSongs = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:3000/api/playlist/liked-songs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("likedsongs", res.data.songs);
            setUserLikedSongs(res.data.songs);
        } catch (error) {
            console.error('Error fetching liked songs:', error);
        }
    };

    useEffect(() => {
        const isSongLiked = userLikedSongs.some(
            (likedSong) => likedSong.song_title === masterSong.title && likedSong.song_artist === masterSong.artist
        );
        setIsLiked(isSongLiked);
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration));
            if (isPlaying) {
                masterSong?.mp3?.play();
            } else {
                masterSong?.mp3?.pause();
            }
        }

        if (isPlaying) {
            setInterval(() => {
                if (progress === 100) {
                    dispatch(pauseMaster());
                    resetEverything();
                } else {
                    setProgress(
                        Math.round(
                            (masterSong.mp3.currentTime /
                                masterSong.mp3.duration) *
                            100
                        )
                    );
                    setCurrTime(formatTime(masterSong.mp3.currentTime));
                }
            }, 1000);
        }

        fetchUserLikedSongs();
        getPlaylists();

    }, [masterSong, isPlaying]);





    const changeProgress = (e) => {
        setProgress(e.target.value);
        masterSong.mp3.currentTime =
            (e.target.value / 100) * masterSong.mp3.duration;
        console.log(progress);
    };
    const [volume, setVolume] = useState(50);
    const changeVolume = (e) => {
        setVolume(e.target.value);
        console.log(e.target.value);
        masterSong.mp3.volume = e.target.value / 100;
    };
    const formatTime = (durationInSeconds) => {
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = Math.round(durationInSeconds % 60);

        let formattedDuration = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 9 ? "0" + seconds : seconds
            }`;
        return formattedDuration;
    };
    const mouseEnter = () => {
        document.querySelector(".active_progress").style.background = "green";
    };
    const mouseLeave = () => {
        document.querySelector(".active_progress").style.background = "#fff";
    };
    const enterVolume = () => {
        document.querySelector("#volume").style.background = "green";
    };
    const leaveVolume = () => {
        document.querySelector("#volume").style.background = "#fff";
    };
    const backwardSong = () => {
        console.log("backward");
        if (songIdx <= 0)
            return;
        if (masterSong.mp3) {
            masterSong?.mp3?.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx((prevstate) => prevstate - 1);
        dispatch(playSong(songs[songIdx - 1]));
    };
    const forwardSong = () => {
        if (songIdx >= 5 - 1)
            return;
        if (masterSong.mp3) {
            masterSong?.mp3?.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        console.log("forward");
        setSongIdx((prevstate) => prevstate + 1);
        dispatch(playSong(songs[songIdx + 1]));
    };



    return (
        <div className="fixed w-full flex px-2 items-center justify-between bottom-0 left-0  bg-black" style={{ height: "120px" }}>
            <div className="w-3/12">
                <div className="flex items-center gap-7 ">
                    <img src={masterSong.img} alt="" className="" style={{ height: "80px", width: "80px" }} />
                    <div>
                        <h3 className="text-3xs font-medium mb-1">
                            {masterSong?.title}
                        </h3>
                        <span className="text-[15px]">
                            {masterSong?.artist}
                        </span>
                    </div>
                    <AiOutlineHeart
                        onClick={addToLiked}
                        className={`ml-3 cursor-pointer hover:text-${isLiked ? 'red' : 'green'}-400`}
                        style={{ height: "30px", width: "30px" }}
                    />
                </div>
            </div>
            <div className="w-5/12">
                <div className="flex justify-center items-center mb-2 gap-6">
                    <BiShuffle />
                    <IoMdSkipBackward onClick={backwardSong} />
                    {isPlaying ? (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-[50%] bg-white justify-center p-2"
                        >
                            <FaPause className="text-black text-lg" />
                        </button>
                    ) : (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-[50%] bg-white justify-center p-2"
                        >
                            <FaPlay className="text-black text-lg" />
                        </button>
                    )}
                    <IoMdSkipForward onClick={forwardSong} />
                    <BiRepeat />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs">{currTime}</span>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            name=""
                            min={0}
                            value={progress}
                            disabled={!masterSong.mp3}
                            onChange={changeProgress}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            className="w-full block"
                            max={100}
                        />

                        <div
                            className={`active_progress w-[${progress}%]`}
                        ></div>
                    </div>
                    <span className="text-xs">{duration}</span>
                </div>
            </div>
            <div className="w-2/12 flex items-center gap-2">


                <select name="playlist" id="playlist" onChange={handlePlaylistChange} style={{ backgroundColor: 'black', color: 'white' }} defaultValue="">
                    <option className="bg-blue-950" value="" >
                        Select Playlist
                    </option>

                    {playlists.map((playlist) => (
                        <option key={playlist._id} value={playlist.title}>
                            {playlist.title}
                        </option>
                    ))}
                </select>

                {volume <= 0 && <HiSpeakerXMark className="text-2xl" />}
                {volume > 0 && <HiSpeakerWave className="text-2xl" />}
                <div className="relative w-full flex items-center">
                    <input
                        type="range"
                        name=""
                        min={0}
                        onMouseEnter={enterVolume}
                        onMouseLeave={leaveVolume}
                        value={volume}
                        disabled={!masterSong.mp3}
                        onChange={changeVolume}
                        className="w-full block"
                        max={100}
                    />
                    <div
                        id="volume"
                        className={`active_progress w-[${volume}%]`}
                    ></div>
                </div>

                <BsArrowsAngleContract />
            </div>

        </div>
    );
};

export default SongBar;
