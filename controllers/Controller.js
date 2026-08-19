import asyncHandler from "express-async-handler";
import axios from "axios";

const handle_prompt = asyncHandler(async (req, res) => {
  const { prompt, chat_history } = req.body;

  try {
    console.log("endpoint hit!");

    console.log("Current prompt:");
    console.log(prompt);

    console.log("Conversation history:");
    console.log(chat_history);

    const fastapiResponse = await axios.post(
      `${process.env.FASTAPI_URL}/generate`,
      {
        prompt: prompt,
        conversation: chat_history || [],
      }
    );

    console.log("FastAPI response received!");

    res.status(200).json({
      response: fastapiResponse.data,
    });

  } catch (err) {
    console.error("Error sending request to FastAPI:");

    if (axios.isAxiosError(err)) {
      console.error("Status:", err.response?.status);
      console.error("FastAPI error:", err.response?.data);
    } else {
      console.error(err);
    }

    return res.status(500).json({
      error: "FastAPI request failed",
      details: axios.isAxiosError(err)
        ? err.response?.data
        : err.message,
    });
  }
});

export { handle_prompt };



