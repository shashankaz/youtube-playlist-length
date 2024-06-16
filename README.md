# YouTube Playlist Length Calculator

This project allows users to input a YouTube playlist URL and get the total duration of the playlist at various playback speeds, as well as the average video length and the total number of videos in the playlist.

## Features

- Calculate the total duration of a YouTube playlist.
- Display the duration at different playback speeds (normal, 1.25x, 1.5x, 1.75x, and 2x).
- Show the average length of videos in the playlist.
- Display the total number of videos in the playlist.
- Handle errors for invalid URLs.

## Technologies Used

- React for the frontend.
- Node.js and Express for the backend.
- Axios for making HTTP requests.
- CORS middleware to handle Cross-Origin Resource Sharing.
- dotenv for managing environment variables.

## Installation

### Prerequisites

- Node.js and npm installed.
- YouTube Data API v3 key.

### Steps

1. Clone the repository:

```sh
git clone https://github.com/shashankaz/youtube-playlist-length.git
cd youtube-playlist-length
```

2. Install the backend dependencies:

```sh
cd server
npm install
```

3. Create a `.env` file in the `server` directory and add your YouTube API key:

```env
PORT=5000
API_KEY=YOUR_YOUTUBE_API_KEY
```

4. Start the backend server:

```sh
npm run dev
```

5. Install the frontend dependencies:

```sh
cd ../client
npm install
```

6. Start the frontend development server:

```sh
npm start
```

The application should now be running on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a YouTube playlist URL in the input field.
3. Click on the "Get Duration" button.
4. View the total duration of the playlist, duration at various speeds, average video length, and the total number of videos.

---