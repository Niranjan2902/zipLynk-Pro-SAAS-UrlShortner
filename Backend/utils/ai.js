const axios = require("axios");
const { GEMINI_API_KEY } = process.env; 

const summarizeAnalytics = async (analyticsData) => {
  try {
    // Example data: { totalClicks: 50, topDevices: ['mobile:30'], peakDays: ['Sat'] }
    const prompt = `Summarize these URL analytics for actionable insights: ${JSON.stringify(analyticsData)}. 1-2 sentences, focus on patterns/tips.`;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.candidates[0]?.content?.parts[0]?.text?.trim() || "Insight: Analyze your click patterns for better promotion.";
  } catch (err) {
    console.error("AI Summary Error:", err.message);
    return "Fallback Insight: Your traffic is growing—keep sharing on social media!";
  }
};

module.exports = { summarizeAnalytics };