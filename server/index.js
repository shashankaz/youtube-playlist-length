import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

app.post("/playlist", async (req, res) => {
  const { url } = req.body;
  const playlistId = new URL(url).searchParams.get("list");

  if (!playlistId) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let nextPageToken = "";
    let totalDuration = 0;
    let videoCount = 0;

    do {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${nextPageToken}&key=${API_KEY}`
      );

      const items = response.data.items;
      nextPageToken = response.data.nextPageToken;

      for (const item of items) {
        const videoId = item.contentDetails.videoId;
        const videoDetails = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`
        );

        const duration = videoDetails.data.items[0].contentDetails.duration;
        totalDuration += convertDurationToSeconds(duration);
        videoCount++;
      }
    } while (nextPageToken);

    const durations = calculateDurations(totalDuration, videoCount);

    res.json(durations);
  } catch (error) {
    // console.error("Error fetching playlist details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const convertDurationToSeconds = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1], 10) || 0;
  const minutes = parseInt(match[2], 10) || 0;
  const seconds = parseInt(match[3], 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  return { hours, minutes, seconds };
};

const calculateDurations = (totalDuration, videoCount) => {
  const averageVideoDuration = totalDuration / videoCount;

  return {
    normal: formatDuration(totalDuration),
    speed1_25: formatDuration(totalDuration / 1.25),
    speed1_5: formatDuration(totalDuration / 1.5),
    speed1_75: formatDuration(totalDuration / 1.75),
    speed2: formatDuration(totalDuration / 2),
    averageVideo: formatDuration(averageVideoDuration),
    totalVideos: videoCount,
  };
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
