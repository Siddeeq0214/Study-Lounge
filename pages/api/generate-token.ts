// https://getstream.io/chat/docs/other-rest/tokens_and_authentication/?language=nodejs
// @ts-ignore
import { NextApiRequest, NextApiResponse } from 'next';
import { StreamChat } from 'stream-chat';

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_GET_STREAM_IO_API_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' });
        }

        const serverClient = StreamChat.getInstance(apiKey, apiSecret);
        const token = serverClient.createToken(userId);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
