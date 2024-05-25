// streamClient.js
import { StreamChat } from 'stream-chat';

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY; // Replace with your Stream API key
const streamClient = StreamChat.getInstance(apiKey);

export default streamClient;
