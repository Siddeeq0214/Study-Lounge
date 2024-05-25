import React, { ReactNode, useState } from 'react';
import { Dialog, DialogContent, Button, TextField } from '@mui/material';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  buttonClassName?: string;
  url?: string; // Add the URL prop
}

const MeetingModal = ({
                        isOpen,
                        onClose,
                        title,
                        className,
                        children,
                        handleClick,
                        buttonText,
                        instantMeeting,
                        buttonClassName,
                        url, // Destructure the URL prop
                      }: MeetingModalProps) => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingTime(event.target.value);
  };

  // Modified handleClick function
  const handleButtonClick = () => {
    if (url) {
      const newWindow = window.open(url, '_blank');
      if (newWindow) newWindow.opener = null;
    }
    if (handleClick) {
      handleClick();
    }
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
            <Button
                className={buttonClassName}
                onClick={handleButtonClick} // Update the onClick handler
                variant="contained"
                color="primary"
            >
              {buttonText || "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default MeetingModal;
