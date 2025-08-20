import {
  type Configuration,
  PublicClientApplication,
} from "@azure/msal-browser";

// MSAL configuration using provided Microsoft Entra ID settings
export const msalConfig: Configuration = {
  auth: {
    clientId: "be2e9c5d-7a77-4d7d-8bb1-4bf9c03f0b23",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
