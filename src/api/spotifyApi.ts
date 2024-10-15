import axios from 'axios';
import { SPOTIFY_API_URL, HTTP_STATUS_OK, HTTP_STATUS_CREATED } from '../utils/constants';
import { logInfo, logError } from '../utils/logger';


// Get user profile data
export const getUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === HTTP_STATUS_OK) {
      logInfo('User profile retrieved successfully');
      return response.data;
    }
  } catch (error) {
    logError('Error fetching user profile', error);
    throw error;
  }
};

export const createPlaylist = async (accessToken: string, userId: string, playlistName: string) => {
  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/users/${userId}/playlists`,
      {
        name: playlistName,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000, // Set timeout for the request (in milliseconds)
      }
    );

    if (response.status === HTTP_STATUS_CREATED) {
      logInfo('Playlist created successfully');
      return response.data;
    } else {
      throw new Error(`Failed to create playlist. Status code: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logError('Error creating playlist', error);
      // Optionally handle specific axios errors
      throw new Error(`Axios error: ${error.message}`);
    } else {
      logError('Unknown error', error);
      throw new Error('Unknown error occurred while creating the playlist');
    }
  }
};

// Function to fetch tracks from a specific Spotify playlist
export const fetchPlaylistTracks = async (accessToken: string, playlistId: string) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === HTTP_STATUS_OK) {
      console.log('Tracks fetched successfully');
      return response.data; // Returns the list of tracks
    }
  } catch (error) {
    console.error('Error fetching playlist tracks', error);
    throw error; // Rethrow error to be handled in the calling function
  }
};

// Function to add tracks to a specific Spotify playlist
export const addTracksToPlaylist = async (accessToken: string, playlistId: string, trackUris: string[]) => {
  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
      {
        uris: trackUris,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === HTTP_STATUS_CREATED) {
      console.log('Tracks added successfully to the playlist');
      return true; // Return true if tracks were added successfully
    }
  } catch (error) {
    console.error('Error adding tracks to playlist', error);
    throw error; // Rethrow error to be handled in the calling function
  }
};
