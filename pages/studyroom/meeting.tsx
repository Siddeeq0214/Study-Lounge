import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Box, Button } from '@mui/material';
import {
    CallingState,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCall,
    useCallStateHooks,
    User,
    ParticipantView,
    StreamVideoParticipant,
    CallControls,
    SpeakerLayout,
    CallParticipantsList
} from '@stream-io/video-react-sdk';
import { AudioVolumeIndicator } from '@/components/StudyRoomUI/VolumeIndicator';
import useGetStream from "@/hooks/useGetStream";
import { useRouter } from "next/router";

const MeetingRoom = () => {
    // import hooks
    const router = useRouter();

    const {
        client,
        call,
        joined,
        videoCallError,
        createAndStartCall,
        joinExistingCall
    } = useGetStream();

    const { cid } = router.query; // Get the cid query parameter

    useEffect(() => {
        if (call == null && client) {
            console.log("joining call");
            if (cid) { // join
                joinExistingCall(cid as string);
            } else { // create
                createAndStartCall();
            }
        }
    }, [call, client]);

    return (
        <Container>
            {videoCallError ? <p>{videoCallError.toString()}</p> : <></>}
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    {joined ? <MyUILayout /> : <CircularProgress />}
                </StreamCall>
            </StreamVideo>
        </Container>
    );
};

const MyUILayout = () => {
    const { useCallCallingState, useLocalParticipant, useRemoteParticipants } = useCallStateHooks();
    const callingState = useCallCallingState();
    const localParticipant = useLocalParticipant();
    const remoteParticipants = useRemoteParticipants();
    const [showParticipantsList, setShowParticipantsList] = useState(false);

    const handleToggleParticipantsList = () => {
        setShowParticipantsList(prevState => !prevState);
    }

    if (callingState !== CallingState.JOINED) {
        return <CircularProgress />;
    }

    return (
        <StreamTheme>
            <Box sx={{ display: 'flex', flexGrow: 1, height: '100vh' }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                        <SpeakerLayout participantsBarPosition="bottom" />
                    </Box>
                    <CallControls />
                    <AudioVolumeIndicator />
                </Box>
                <Box sx={{ width: '300px', marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                    <Button onClick={handleToggleParticipantsList} variant="contained" color="primary">
                        Toggle Participants List
                    </Button>
                    {showParticipantsList && (
                        <CallParticipantsList onClose={handleToggleParticipantsList} />
                    )}
                </Box>
            </Box>
            {/*<MyParticipantList participants={remoteParticipants} />*/}
            {/*<MyFloatingLocalParticipant participant={localParticipant} />*/}
        </StreamTheme>
    );
};

const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
    const { participants } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            {participants.map((participant) => (
                <ParticipantView participant={participant} key={participant.sessionId} />
            ))}
        </div>
    );
};

const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
    const { participant } = props;
    return (
        <div
            style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                width: '240px',
                height: '135px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
                borderRadius: '12px',
            }}
        >
            <ParticipantView participant={participant} />
        </div>
    );
};

export default MeetingRoom;
