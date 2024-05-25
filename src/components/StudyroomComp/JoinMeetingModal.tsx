import React, { ReactNode, useState } from 'react';
import { Dialog, DialogContent, Button, TextField } from '@mui/material';
import useGetStream from "@/hooks/useGetStream";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    buttonText?: string;
    instantMeeting?: boolean;
    buttonClassName?: string;
}

const JoinMeetingModal = ({
                              isOpen,
                              onClose,
                              title,
                              className,
                              children,
                              buttonText,
                              instantMeeting,
                              buttonClassName,
                          }: MeetingModalProps) => {
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [callId, setCallId] = useState('');

    const {
        goToJoinMeetingPage
    } = useGetStream()

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingTime(event.target.value);
    };

    const handleCallIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCallId(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        goToJoinMeetingPage(callId)
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                    <h1 className={className}>{title}</h1>
                    {title === "Schedule a Meeting" && (
                        <>
                            <TextField
                                label="Date"
                                type="date"
                                value={meetingDate}
                                onChange={handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Time"
                                type="time"
                                value={meetingTime}
                                onChange={handleTimeChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                            />
                        </>
                    )}
                    {children}
                    {title === "Join a Meeting" && (
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                label="Call ID"
                                type="text"
                                value={callId}
                                onChange={handleCallIdChange}
                                fullWidth
                            />
                            <Button
                                className={buttonClassName}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {buttonText || "Join Meeting"}
                            </Button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default JoinMeetingModal;
