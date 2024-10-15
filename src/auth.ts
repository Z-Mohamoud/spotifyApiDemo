import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;
const TOKEN_FILE = 'access_token.json';
let accessToken: string | null = null; // Variable to hold the access token

// Step 1: Redirect user to Spotify's authorization page
app.get('/login', (req: Request, res: Response) => {
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${scope}`;
    res.redirect(authUrl);
});

// Step 2: Handle the callback from Spotify
app.get('/callback', async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
        // Exchange the authorization code for an access token
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: process.env.REDIRECT_URI as string,
            client_id: process.env.CLIENT_ID as string,
            client_secret: process.env.CLIENT_SECRET as string,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        accessToken = response.data.access_token; // Store access token in the variable

        // Optionally, save the access token to a file for reuse
        fs.writeFileSync(TOKEN_FILE, JSON.stringify({ access_token: accessToken }), 'utf-8');

        res.send(`Access Token generated and stored. You can now use it in your requests.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication failed');
    }
});

// Export the app instance for use in tests
export const getAccessTokenFromFile = (): string => {
    if (fs.existsSync(TOKEN_FILE)) {
        const data = fs.readFileSync(TOKEN_FILE, 'utf-8');
        const { access_token } = JSON.parse(data);
        if (!access_token) {
            throw new Error('Access token not found in the file.');
        }
        return access_token; // Returns access_token if it exists
    }
    throw new Error('Token file does not exist.'); // Handle case where the file doesn't exist
};

// Export the app for testing
export const startServer = () => {
    return app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};
