/**
 * ManageEventModal:
 * This modal allows users to edit or delete existing events when they click on an event in the cal
 */

import {ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState} from "react"
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Autocomplete,
    Box,
} from "@mui/material"
import {EventFormData, IEventInfo} from "@/atoms/calendarAtom";

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    onEditEvent: (e: MouseEvent<HTMLButtonElement>) => void
    onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void
    currentEvent: IEventInfo | null
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
}

const ManageEventModal = ({ open, handleClose, onEditEvent, onDeleteEvent, currentEvent, eventFormData, setEventFormData }: IProps) => {
    const onClose = () => handleClose()

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEventFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    useEffect(() => {
        console.log(currentEvent)
    }, []);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit event</DialogTitle>
            <DialogContent>
                <DialogContentText>Can edit the event.</DialogContentText>
                <Box component="form">
                    <TextField
                        name="description"
                        // defaultValue={currentEvent.description}
                        value={eventFormData.description}
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={onChange}
                    />
                    <TextField
                        name="course"
                        // defaultValue={currentEvent.course}
                        value={eventFormData.course}
                        margin="dense"
                        id="course"
                        label="course"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={onChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={eventFormData.description === ""} color="success" onClick={onEditEvent}>
                    Save
                </Button>
                <Button color="info" onClick={onDeleteEvent}>
                    Delete Event
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ManageEventModal

