import asyncHandler from "express-async-handler";
import axios from "axios";

const handle_prompt = asyncHandler(async (req, res) => {
  const { prompt, chat_history } = req.body;

  try {
    console.log("========================================");
    console.log("ENDPOINT HIT!");
    console.log("========================================");

    console.log("Current prompt:");
    console.log(prompt);

    console.log("Conversation history:");
    console.log(chat_history);

    console.log("Sending request to FastAPI...");

    const fastapiResponse = await axios.post(
      `${process.env.FASTAPI_URL}/generate`,
      {
        prompt: prompt,
        conversation: chat_history || [],
      }
    );

    console.log("FastAPI response received!");

    console.log("FastAPI data:");
    console.log(JSON.stringify(fastapiResponse.data, null, 2));

    console.log("ABOUT TO SEND RESPONSE");

    res.status(200).json({
      response: fastapiResponse.data,
    });

    console.log("RESPONSE SENT");

    console.log("========================================");
    console.log("REQUEST COMPLETE");
    console.log("========================================");

  } catch (err) {
    console.error("========================================");
    console.error("ERROR SENDING REQUEST TO FASTAPI");
    console.error("========================================");

    if (axios.isAxiosError(err)) {
      console.error("Axios error code:", err.code);
      console.error("Status:", err.response?.status);
      console.error("FastAPI error:", err.response?.data);
      console.error("Request URL:", err.config?.url);
      console.error("Request method:", err.config?.method);
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


