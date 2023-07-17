  const apiKey = 'YOUR_API_KEY';
  const movieId = '12345'; // Replace with the actual movie ID
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  // Fetch video information from TMDb API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const videos = data.results;
      const videoContainer = document.getElementById('video-container');

       
      // Loop through videos and create video elements
      videos.forEach(video => {
        const videoElement = document.createElement('iframe');
        videoElement.src = `https://www.youtube.com/embed/${video.key}`; // Assuming videos are from YouTube
        videoElement.width = '640';
        videoElement.height = '360';
        videoContainer.appendChild(videoElement);
      });
    })
    .catch(error => console.error('Error fetching video information:', error));

    