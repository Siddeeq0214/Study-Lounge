import React, { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@mui/material';
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
    SpeakerLayout
} from '@stream-io/video-react-sdk';
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

    if (callingState !== CallingState.JOINED) {
        return <CircularProgress />;
    }

    return (
        <StreamTheme>
            <SpeakerLayout participantsBarPosition="bottom" />
            {/*<MyParticipantList participants={remoteParticipants} />*/}
            {/*<MyFloatingLocalParticipant participant={localParticipant} />*/}
            <CallControls />
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
