import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { loadSpotifyConfig } from './config.js';

let cachedSpotifyApi: SpotifyApi | null = null;

export function createSpotifyApi(): SpotifyApi {
  if (cachedSpotifyApi) {
    return cachedSpotifyApi;
  }

  const config = loadSpotifyConfig();

  if (config.accessToken && config.refreshToken) {
    const accessToken = {
      access_token: config.accessToken,
      token_type: 'Bearer',
      expires_in: 3600 * 24 * 30, // Default to 1 month
      refresh_token: config.refreshToken,
    };

    cachedSpotifyApi = SpotifyApi.withAccessToken(config.clientId, accessToken);
    return cachedSpotifyApi;
  }

  cachedSpotifyApi = SpotifyApi.withClientCredentials(
    config.clientId,
    config.clientSecret,
  );

  return cachedSpotifyApi;
}
