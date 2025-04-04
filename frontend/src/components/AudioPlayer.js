import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

function AudioPlayer({ audioSrc, expirationDate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [isLessThanADay, setIsLessThanADay] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleFastForward = () => {
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const handleRewind = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  function formatExpirationDate(dateString) {
    if (!dateString) {
      console.error("Expiration date is undefined or empty");
      return "No expiration date";
    }
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
      return "Invalid Date";
    }
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  function calculateTimeLeft(dateString) {
    const now = new Date();
    const expiration = new Date(dateString);
    const difference = expiration - now;

    if (difference <= 0) return "Expired";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setIsLessThanADay(days < 1);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("ended", handleAudioEnd);
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  useEffect(() => {
    if (expirationDate) {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(expirationDate));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [expirationDate]);

  return (
    <div className="player-card">
      <img 
        src="/images/aesthetic/ae6.jpg" 
        alt="Cover Image" 
        className={isPlaying ? "player-card-image spinning" : "player-card-image"}
      />

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />

      <audio ref={audioRef} src={audioSrc} />

      <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>

      <div className="controls">
        <button onClick={handleRewind} className="rewind-button">
          <FaBackward />
        </button>
        <button onClick={handlePlayPause} className="play-pause-button">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleFastForward} className="fast-forward-button">
          <FaForward />
        </button>
      </div>

      <div className="expiration-date">
        <p>Expires on: {formatExpirationDate(expirationDate)}</p>
        <p className={`countdown ${isLessThanADay ? 'red' : 'green'} beat`}>Time left: {timeLeft}</p>
      </div>
    </div>
  );
}

export default AudioPlayer;