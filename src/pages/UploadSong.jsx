import { useState } from "react";
import { uploadSong } from "../services/api";
import "../styles/App.css";

const FIELDS = [
  { name: "title",    placeholder: "Song Title *",               required: true  },
  { name: "artist",   placeholder: "Artist Name *",              required: true  },
  { name: "album",    placeholder: "Album Name",                 required: false },
  { name: "genre",    placeholder: "Genre (Pop, Hip-Hop...)",    required: false },
  { name: "duration", placeholder: "Duration in seconds (e.g. 234)", required: false },
  { name: "imageUrl", placeholder: "Cover Image URL (optional)", required: false },
];

export default function UploadSong() {
  const [form, setForm] = useState({
    title: "", artist: "", album: "",
    genre: "", duration: "", imageUrl: "",
  });
  const [file, setFile]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpload = async () => {
    if (!form.title.trim() || !form.artist.trim()) {
      return setMsg("❌ Title and Artist are required.");
    }
    if (!file) {
      return setMsg("❌ Please select an MP3 file.");
    }

    setLoading(true);
    setMsg("");

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) data.append(key, form[key]);
    });
    data.append("file", file);

    try {
      await uploadSong(data);
      setMsg("✅ Song uploaded successfully!");
      setForm({ title: "", artist: "", album: "", genre: "", duration: "", imageUrl: "" });
      setFile(null);
      // reset file input
      document.getElementById("mp3-input").value = "";
    } catch (err) {
      setMsg("❌ Upload failed. Make sure Spring Boot is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h2 className="section-title" style={{ margin: "0 0 1.5rem" }}>
        🎵 Upload New Song
      </h2>

      <div className="upload-card">
        {/* Text fields */}
        {FIELDS.map((f) => (
          <input
            key={f.name}
            name={f.name}
            placeholder={f.placeholder}
            value={form[f.name]}
            onChange={handleChange}
            className="form-input"
          />
        ))}

        {/* MP3 File picker */}
        <div className="file-zone">
          <span className="file-zone-label">🎵 Select your MP3 file</span>
          <input
            id="mp3-input"
            type="file"
            accept=".mp3,audio/mpeg,audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Montserrat, sans-serif" }}
          />
          {file && (
            <p className="file-selected">✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
          )}
        </div>

        {/* Upload Button */}
        <button className="upload-btn" onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "⬆  Upload Song"}
        </button>

        {/* Message */}
        {msg && (
          <p className={msg.startsWith("✅") ? "success-msg" : "error-msg"}>{msg}</p>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: "1.5rem",
        background: "#181818",
        borderRadius: "0.75rem",
        padding: "1rem 1.25rem",
        fontSize: "0.82rem",
        opacity: 0.6,
        lineHeight: 1.7,
      }}>
        <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📋 How it works:</p>
        <p>1. Fill in the song details above</p>
        <p>2. Select your MP3 file from your computer</p>
        <p>3. Click Upload — your song saves to the server and MySQL database</p>
        <p>4. Go to Home to see and play your uploaded song!</p>
      </div>
    </div>
  );
}
