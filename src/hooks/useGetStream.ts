import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useStudentAppUser from "@/hooks/useStudentAppUser";
import { Call, StreamVideoClient, User } from "@stream-io/video-react-sdk";

const useGetStream = () => {
  const {
    streamUser,
  } = useStudentAppUser()


  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [videoCallError, setVideoCallError] = useState<any | null>(null);

  useEffect(() => {
    console.log('streamuser changed: ', streamUser)
    if (client == null && streamUser){
      prepareClient(streamUser).then(r => console.log(r))
      console.log('client changed: ', client)
    }
  }, [streamUser]);

  const getToken = async (userId: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.token;
      } else {
        console.error('Error generating token:', data.error);
        return null;
      }
    } catch (e) {
      console.error(e);
      setVideoCallError(e);
      return null;
    }
  };

  const prepareClient = async (streamUser: User): Promise<StreamVideoClient | null> => {
    try {
      const token = await getToken(streamUser.id);
      const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY!;
      const client1 = new StreamVideoClient({ apiKey, user: streamUser, token });
      setClient(client1);
      return client1;
    } catch (e) {
      console.error(e);
      setVideoCallError(e);
      return null;
    }
  };

  const createAndStartCall = async () => {
    try {
      if (client){
        const call1 = client.call('default', streamUser.id);
        await call1.join({ create: true });
        setCall(call1);
        setJoined(true);
      }
    } catch (e) {
      console.error(e);
      setVideoCallError(e);
    }
  };

  const joinExistingCall = async (cid: string) => {
    try {
      if (client){
        const call1 = client.call('default', cid);
        await call1.join({ create: true });
        setCall(call1);
        setJoined(true);
      }
    } catch (e) {
      console.error(e);
      setVideoCallError(e);
    }
  };

  const goToNewMeetingPage = () => {
    const url = '/studyroom/meeting';
    const newWindow = window.open(url, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  const goToJoinMeetingPage = (cid: string) => {
    const url = `/studyroom/meeting?cid=${cid}`;
    const newWindow = window.open(url, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  return {
    client,
    call,
    joined,
    videoCallError,
    prepareClient,
    createAndStartCall,
    joinExistingCall,
    goToNewMeetingPage,
    goToJoinMeetingPage,
  };
};

export default useGetStream;
