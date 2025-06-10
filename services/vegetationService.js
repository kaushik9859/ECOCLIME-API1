const axios = require('axios');

const STREAMLIT_VEGETATION_API = process.env.STREAMLIT_VEGETATION_API || 'http://localhost:8501';

async function getVegetationHealth(location) {
  const response = await axios.post(`${STREAMLIT_VEGETATION_API}/analyze`, { location });
  return {
    score: response.data.health_score,
    status: response.data.health_status,
    recommendations: response.data.recommendations
  };
}

module.exports = { getVegetationHealth };