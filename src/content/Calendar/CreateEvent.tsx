/**
 * AddEventModal:
 * This modal allows users to create new events with essential information such as event description, time, and date.
 * It acts as a simplified version of AddDatePickerEventModal, designed for quick event creation.
 */

import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"
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
import {EventFormData} from "@/atoms/calendarAtom";

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddEventModal = ({ open, handleClose, eventFormData, setEventFormData, onAddEvent }: IProps) => {
    const { description, course } = eventFormData

    const onClose = () => handleClose()

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEventFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add event</DialogTitle>
            <DialogContent>
                <DialogContentText>To add a event, please fill in the information below.</DialogContentText>
                <Box component="form">
                    <TextField
                        name="description"
                        value={description}
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
                        value={course}
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
                <Button disabled={description === ""} color="success" onClick={onAddEvent}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEventModal

