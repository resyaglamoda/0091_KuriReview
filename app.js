const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Penyimpanan poster anime
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint utama
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Selamat datang di REST API KuriReview"
    });
});

// Endpoint pengecekan server
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        application: "KuriReview",
        status: "Running"
    });
});

// Endpoint tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server"
    });
});

module.exports = app;
