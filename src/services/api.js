import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// ── Songs ──────────────────────────────────────────────────────────────────
export const getAllSongs    = ()         => axios.get(`${BASE_URL}/songs`);
export const getSongById   = (id)       => axios.get(`${BASE_URL}/songs/${id}`);
export const searchSongs   = (title)    => axios.get(`${BASE_URL}/songs/search?title=${title}`);
export const deleteSong    = (id)       => axios.delete(`${BASE_URL}/songs/${id}`);
export const getStreamUrl  = (fileName) => `${BASE_URL}/songs/stream/${fileName}`;
export const uploadSong    = (formData) =>
  axios.post(`${BASE_URL}/songs`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── Playlists ──────────────────────────────────────────────────────────────
export const getAllPlaylists    = ()           => axios.get(`${BASE_URL}/playlists`);
export const createPlaylist    = (data)       => axios.post(`${BASE_URL}/playlists`, data);
export const deletePlaylist    = (id)         => axios.delete(`${BASE_URL}/playlists/${id}`);
export const renamePlaylist    = (id, data)   => axios.put(`${BASE_URL}/playlists/${id}`, data);
export const addSongToPlaylist = (pid, sid)   => axios.post(`${BASE_URL}/playlists/${pid}/songs/${sid}`);
