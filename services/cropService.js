const axios = require('axios');

const STREAMLIT_CROP_API = process.env.STREAMLIT_CROP_API || 'http://localhost:8502';

async function detectTopCrops(location) {
  const response = await axios.post(`${STREAMLIT_CROP_API}/detect-crops`, { location });
  return response.data.top_crops.slice(0, 3); // Get top 3 crops
}

module.exports = { detectTopCrops };