import { useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle download button click
  const handleDownload = async () => {
    if (!url) {
      setError('Please provide a valid YouTube URL');
      return;
    }

    try {
      // Make the API request to download the video
      const response = await fetch(`/api/getapi?url=${encodeURIComponent(url)}`);

      if (response.ok) {
        // If successful, trigger the download
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'video.mp4'; // You can set any name for the video
        link.click();
      } else {
        setError('Failed to download video');
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
      />
      <button onClick={handleDownload} style={{ padding: '10px' }}>
        Download Video
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Home
