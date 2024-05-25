/**
 * EventInfoModal:
 * This modal serves as an information panel that displays details about selected events.
 * It provides users with a quick glance at the event description and offers an option to delete the event if necessary.
 */

import { Typography } from "@mui/material"
import {IEventInfo} from "@/atoms/calendarAtom";

interface IProps {
    event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
    return (
        <>
            <Typography>{event.description}</Typography>
        </>
    )
}

export default EventInfo
