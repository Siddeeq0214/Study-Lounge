import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import { AddCircle, VideoCall } from '@mui/icons-material'; // Importing icons
import MeetingModal from '@/components/StudyroomComp/MeetingModal'
import JoinMeetingModal from "@/components/StudyroomComp/JoinMeetingModal";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import AppUtil from "@/AppUtil";

const MeetingTypeList = () => {
    const [authUser] = useAuthState(auth);

    const [isStartMeetingModalOpen, setStartMeetingModalOpen] = useState(false);
    const [isJoinMeetingModalOpen, setJoinMeetingModalOpen] = useState(false);
    const [isScheduleMeetingModalOpen, setScheduleMeetingModalOpen] = useState(false);

    const handleStartMeetingClick = async () => {
        setStartMeetingModalOpen(true);
    };

    const handleJoinMeetingClick = () => {
        setJoinMeetingModalOpen(true);
    };

    const handleScheduleMeetingClick = () => {
        setScheduleMeetingModalOpen(true);
    };

    const handleCloseModal = () => {
        setStartMeetingModalOpen(false);
        setJoinMeetingModalOpen(false);
        setScheduleMeetingModalOpen(false);
    };

    return (
        <div className="flex flex-row justify-center my-4"> {/* Aligned containers in a row and centered */}
            <Box
                className="bg-blue-200 px-4 py-6 flex flex-col justify-between w-full max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
                onClick={handleStartMeetingClick} // Add functionality to start a new meeting
                sx={{
                    border: '2px solid blue',
                    borderRadius: '8px',
                    width: '280px', // Increased width
                    height: '250px', // Increased height
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                    marginLeft: '350px', // Added margin to create space between containers
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                    }
                }}
            >
                <AddCircle sx={{ fontSize: 60 }} /> {/* Increased icon size */}
                <Typography variant="h6" sx={{ marginTop: '10px' }}>Start a New Meeting</Typography> {/* Added text */}
            </Box>

            <Box
                className="bg-green-200 px-4 py-6 flex flex-col justify-between w-full max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
                onClick={handleJoinMeetingClick} // Add functionality to join a meeting
                sx={{
                    border: '2px solid green',
                    borderRadius: '8px',
                    width: '280px', // Increased width
                    height: '250px', // Increased height
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                    marginLeft: '950px', // Added margin to create space between containers
                    marginTop: '-250px',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 255, 0, 0.3)',
                    }
                }}
            >
                <VideoCall sx={{ fontSize: 60 }} /> {/* Increased icon size */}
                <Typography variant="h6" sx={{ marginTop: '10px' }}>Join a Meeting</Typography> {/* Added text */}
            </Box>

            {/*<Box*/}
            {/*    className="bg-purple-200 px-4 py-6 flex flex-col justify-between w-full max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"*/}
            {/*    onClick={handleScheduleMeetingClick} // Add functionality to schedule a meeting*/}
            {/*    sx={{*/}
            {/*        border: '2px solid purple',*/}
            {/*        borderRadius: '8px',*/}
            {/*        width: '280px', // Increased width*/}
            {/*        height: '250px', // Increased height*/}
            {/*        display: 'flex',*/}
            {/*        flexDirection: 'column',*/}
            {/*        alignItems: 'center',*/}
            {/*        justifyContent: 'center',*/}
            {/*        backgroundColor: 'rgba(128, 0, 128, 0.1)', // Purple color with alpha*/}
            {/*        transition: 'background-color 0.3s ease', // Smooth transition for hover effect*/}
            {/*        marginLeft: '1050px', // Added margin to create space between containers*/}
            {/*        marginTop: '-250px',*/}
            {/*        '&:hover': {*/}
            {/*            backgroundColor: 'rgba(128, 0, 128, 0.3)', // Purple color with alpha on hover*/}
            {/*        }*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Schedule sx={{ fontSize: 60 }} /> /!* Increased icon size *!/*/}
            {/*    <Typography variant="h6" sx={{ marginTop: '10px' }}>Schedule a Meeting</Typography> /!* Added text *!/*/}
            {/*</Box>*/}

            {/* Render the Start Meeting modal */}
            <MeetingModal
                isOpen={isStartMeetingModalOpen}
                onClose={handleCloseModal}
                title="Start a New Meeting"
                buttonText="Start Meeting"
                handleClick={handleCloseModal}
                url={`/studyroom/meeting?cid=${AppUtil.cleanEmail(authUser.email)}`}
            />

            {/* Render the Join Meeting modal */}
            <JoinMeetingModal
                isOpen={isJoinMeetingModalOpen}
                onClose={handleCloseModal}
                title="Join a Meeting"
                buttonText="Join Meeting"
            />

            {/* Render the Schedule Meeting modal */}
            {/*<MeetingModal*/}
            {/*    isOpen={isScheduleMeetingModalOpen}*/}
            {/*    onClose={handleCloseModal}*/}
            {/*    title="Schedule a Meeting"*/}
            {/*    buttonText="Schedule Meeting"*/}
            {/*    handleClick={handleCloseModal}*/}
            {/*/>*/}
        </div>
    );
};



export default MeetingTypeList;
