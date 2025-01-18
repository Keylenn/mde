export const IS_DEV = process.env.NODE_ENV === "development";

export const VERCEL_FUNS_API_ORIGIN =
  IS_DEV && new URLSearchParams(window.location.search).has("devApi")
    ? "https://192.168.3.17:3001"
    : "https://cf.vercel.keylenn.top";
