export const API_BASE_URL = window.location.origin + "/api";
export const OAUTH2_REDIRECT_URI = window.location.origin + "/oauth2/redirect";
export const GOOGLE_AUTH_URL =
  window.location.origin + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  window.location.origin + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const ACCESS_TOKEN = "accessToken";
export const DARK_MODE = "darkMode";
