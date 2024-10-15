import { getUserProfile, createPlaylist, fetchPlaylistTracks, addTracksToPlaylist } from "../api/spotifyApi";
import { getAccessTokenFromFile, startServer } from '../../src/auth';

describe('Spotify API Tests', () => {
  let userId: string;
  let accessToken: string;
  let server: any;
  let playlistId: any;

  // Set Jest timeout to avoid hanging tests
  jest.setTimeout(10000); // 10 seconds

  beforeAll(async () => {
    // Start server
    server = startServer(); // Start the server

    try {
      // Retrieve access token first
      accessToken = await getAccessTokenFromFile();

      // Fetch user profile using the access token
      const userProfile = await getUserProfile(accessToken);
      userId = userProfile.id;
    } catch (error) {
      console.error('Error in beforeAll setup:', error);
      throw new Error('Failed to set up before running tests');
    }
  });

  test('Get User Profile', async () => {
    try {
      // Fetch user profile using the access token
      const userProfile = await getUserProfile(accessToken);

      // Log User Profile Details
      console.log(userProfile);

      // Perform assertions
      expect(userProfile).toHaveProperty('id');
      expect(userProfile).toHaveProperty('display_name');
    } catch (error) {
      console.error('Error in Get User Profile test:', error);
      throw error;  // Fail the test if an error occurs
    }
  });

  test('Create Playlist', async () => {
    try {
      // Create a new playlist using the userId and access token
      const playlist = await createPlaylist(accessToken, userId, 'New Playlist');
      playlistId = playlist.id;

      // Perform assertions
      expect(playlist).toHaveProperty('id');
      expect(playlist.name).toBe('New Playlist');

      // Fetch the playlist tracks to verify it's empty initially
      const tracks = await fetchPlaylistTracks(accessToken, playlistId);
      expect(tracks).toHaveProperty('items');
      expect(tracks.items).toHaveLength(0);


    } catch (error) {
      console.error('Error in Create Playlist test:', error);
      throw error;  // Fail the test if an error occurs
    }
  });

  test('Negative Testing: Create Playlist with Invalid Token', async () => {
    try {
      const invalidToken = 'INVALID_TOKEN';
      await expect(createPlaylist(invalidToken, userId, 'Invalid Playlist')).rejects.toThrow();
    } catch (error) {
      console.error('Error in Negative Testing for Create Playlist:', error);
    }
  });

  test('Add Tracks to Playlist', async () => {
    // Example track URIs (Spotify track URIs must be valid)
    const trackUris = [
      'spotify:track:4iV5W9uYEdYUVa79Axb7Rh', // Replace with actual track IDs
      'spotify:track:1301WleyT98MSxVHPZCA6M', // Replace with actual track IDs
      'spotify:track:11dFghVXANMlKmJXsNCbNl'  // Replace with actual track IDs
    ];

    // Add tracks to the newly created playlist
    const success = await addTracksToPlaylist(accessToken, playlistId, trackUris);

    // Assert that tracks were added successfully
    expect(success).toBe(true);

    // Fetch the playlist tracks to verify it now has 3 tracks
    const tracks = await fetchPlaylistTracks(accessToken, playlistId);
    // Count only valid tracks (where track is not null)
    const validTracks = tracks.items.filter((item: { track: null; }) => item.track !== null);

    // Print the number of valid tracks in the playlist
    expect(validTracks).toHaveLength(3); // Expecting 3 tracks

  });


  afterAll(async () => {
    // Ensure the server is closed
    await new Promise((resolve) => server.close(resolve));
  });

});
