/**
 * AddDatePickerEventModal:
 * This modal is specifically designed for adding new events to the calendar.
 * It comes equipped with date and time pickers for specifying the event's start and end times and also allows
 * the user to mark the event as an all-day event.
 */


import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent } from "react"
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
    Checkbox,
    Typography,
} from "@mui/material"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import {DatePickerEventFormData} from "@/atoms/calendarAtom";
import {Timestamp} from "firebase/firestore";


interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    datePickerEventFormData: DatePickerEventFormData
    setDatePickerEventFormData: Dispatch<SetStateAction<DatePickerEventFormData>>
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddDatePickerEventModal = ({
                                     open,
                                     handleClose,
                                     datePickerEventFormData,
                                     setDatePickerEventFormData,
                                     onAddEvent,
                                 }: IProps) => {
    const { description, course, start, end } = datePickerEventFormData

    const onClose = () => {
        handleClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const isDisabled = () => {
        const checkend = () => {
            if (end === null) {
                return true
            }
        }
        if (description === "" || start === null || checkend()) {
            return true
        }
        return false
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
                        label="Course"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={onChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box mb={2} mt={5}>
                            <DateTimePicker
                                label="Start date"
                                value={start}
                                ampm={true}
                                minutesStep={30}
                                onChange={(newValue) =>
                                    setDatePickerEventFormData((prevState) => ({
                                        ...prevState,
                                        start: new Date(newValue! as Date),
                                    }))
                                }
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>

                        <DateTimePicker
                            label="End date"
                            minDate={start}
                            minutesStep={30}
                            ampm={true}
                            value={end}
                            onChange={(newValue) =>
                                setDatePickerEventFormData((prevState) => ({
                                    ...prevState,
                                    end: new Date(newValue! as Date),
                                }))
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isDisabled()} color="success" onClick={onAddEvent}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDatePickerEventModal

