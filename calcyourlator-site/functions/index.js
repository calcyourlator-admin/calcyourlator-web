const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");

exports.getMortgageRate = onRequest({ cors: true }, async (req, res) => {
    // PASTE YOUR 32-DIGIT KEY BETWEEN THE QUOTES BELOW
    const FRED_API_KEY = "ee47508072467cd10bdff17a52145b5a"; 
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;

    try {
        const response = await axios.get(url);
        const rate = response.data.observations[0].value;
        res.status(200).json({ rate: parseFloat(rate) });
    } catch (error) {
        console.error("FRED API Error:", error);
        res.status(200).json({ rate: 7.01 }); // Fallback rate
    }
});