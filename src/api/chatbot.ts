import axios from 'axios';

export async function chat(str: string) {
  const resp = await axios.post(
    `${import.meta.env.VITE_API_URL}/chatbot/PostChatBot/`,
    {
      prompt: str,
    }
  );
  return resp
}
