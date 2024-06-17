import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [durations, setDurations] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const response = await axios.post(`${backendUrl}/playlist`, {
        url: playlistUrl,
      });
      setDurations(response.data);
    } catch (error) {
      setError("Invalid URL. Please enter a valid YouTube playlist URL.");
      console.error("Error fetching playlist duration:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayDuration = (duration) => {
    return `${duration.hours} hours ${duration.minutes} minutes ${duration.seconds} seconds`;
  };

  return (
    <div className="app">
      <h1>Find the length of any YouTube playlist : </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube Playlist URL"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          required
          autoFocus
        />
        <button type="submit">Get Duration</button>
      </form>
      <h3>
        You can enter a playlist link or even a video link from the playlist!
      </h3>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        durations && (
          <div className="data">
            <p>No of videos : {durations.totalVideos}</p>
            <p>
              Average length of video :{" "}
              {displayDuration(durations.averageVideo)}
            </p>
            <p>
              Total length of playlist : {displayDuration(durations.normal)}
            </p>
            <p>At 1.25x Speed : {displayDuration(durations.speed1_25)}</p>
            <p>At 1.5x Speed : {displayDuration(durations.speed1_5)}</p>
            <p>At 1.75x Speed : {displayDuration(durations.speed1_75)}</p>
            <p>At 2x Speed : {displayDuration(durations.speed2)}</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;
