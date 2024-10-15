// Spotify API base URL
export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Spotify Accounts service URL for authentication (OAuth token endpoint)
export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

// Client ID and Client Secret should be stored in environment variables
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';


// The redirect URI is defined when setting up the Spotify app and stored in your .env file
export const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback';

// Scope for accessing user data
export const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'user-follow-modify',
  'user-follow-read',
].join(' ');

// Axios default timeout
export const AXIOS_TIMEOUT = 5000; // 5 seconds

// HTTP Status Codes
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_NO_CONTENT = 204;

