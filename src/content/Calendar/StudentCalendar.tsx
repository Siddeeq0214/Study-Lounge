import {useEffect, useState, MouseEvent} from "react";
import FullScreenSpinner from "@/components/Spinners/FullScreenSpinner";
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"

import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"
import {DatePickerEventFormData, EventFormData, generateId, getUnixTimestamp, IEventInfo} from "@/atoms/calendarAtom";

import EventInfo from "./EventInfo"
import AddEventModal from "./AddEventModal"
import EventInfoModal from "./EventInfoModal"
import AddDatePickerEventModal from "./AddDatePickerEventModal"
import ManageEventModal from "@/content/Calendar/ManageEventModal";
import useStudentCalendar from "@/hooks/useStudentCalendar";


function StudentCalendar() {
  const [loading, setLoading] = useState<boolean>(true);

  const {
    createCalEvent,
    listCalEvents,
    updateCalEvent,
    deleteCalEvent,
  } = useStudentCalendar();

  // calendar stuff
  const locales = {
    "en-US": enUS,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const initialEventFormState: EventFormData = {
    course: "",
    description: ""
  }

  const initialDatePickerEventFormData: DatePickerEventFormData = {
    course: "",
    description: "",
    start: undefined,
    end: undefined
  }

  const [openSlot, setOpenSlot] = useState(false)
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<IEventInfo | null>(null)

  const [eventInfoModal, setEventInfoModal] = useState(false)

  const [events, setEvents] = useState<IEventInfo[]>([])

  const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

  const [datePickerEventFormData, setDatePickerEventFormData] =
      useState<DatePickerEventFormData>(initialDatePickerEventFormData)

  const handleSelectSlot = (event: any) => {
    setOpenSlot(true)
    setCurrentEvent(event)
  }

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event)
    setEventFormData({
      description: event.description,
      course: event.course
    })
    setEventInfoModal(true)
  }

  const handleClose = () => {
    setEventFormData(initialEventFormState)
    setOpenSlot(false)
  }

  const handleDatePickerClose = () => {
    setDatePickerEventFormData(initialDatePickerEventFormData)
    setOpenDatepickerModal(false)
  }

  const onAddEvent = async (e : MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEventFormData(initialEventFormState)

    const data : IEventInfo = {
      ...eventFormData,
      _id: getUnixTimestamp(),
      start: currentEvent?.start,
      end: currentEvent?.end,
    }

    await createCalEvent(data);

    const newEvents = [...events, data]

    setEvents(newEvents)
    handleClose()
  }

  const onEditEvent = async (e : MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    console.log("edit: ", eventFormData)
    // call db edit hook here
    await updateCalEvent(currentEvent, eventFormData)
    setCurrentEvent({
      ...currentEvent,
      description: eventFormData.description,
      course: currentEvent.course
    })
    // update events array here for the frontend state
    const updatedEvents = events.map(event => {
      if (event._id === currentEvent._id) {
        // Assuming updatedEvent is the new data you get back from the DB
        event.course = eventFormData.course
        event.description = eventFormData.description
      }
      return event;
    });

    setEvents(updatedEvents); // might need prevState =>
    handleClose()
    setEventInfoModal(false)
  }

  const onAddEventFromDatePicker = async (e : MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEventFormData(initialEventFormState)

    const addHours = (date : Date | undefined, hours : number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined
    }

    const setMinToZero = (date : any) => {
      date.setSeconds(0)

      return date
    }

    const data : IEventInfo = {
      ...datePickerEventFormData,
      _id: getUnixTimestamp(),
      start: setMinToZero(datePickerEventFormData.start),
      end: setMinToZero(datePickerEventFormData.end)
    }

    await createCalEvent(data)

    const newEvents = [...events, data]

    setEvents(newEvents)
    setDatePickerEventFormData(initialDatePickerEventFormData)
    setOpenDatepickerModal(false)
  }

  const onDeleteEvent = async () => {
    // db call
    await deleteCalEvent(currentEvent._id)
    setEvents(() => [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!))
    setEventFormData(initialEventFormState)
    setEventInfoModal(false)
  }


  useEffect( () => {
    listCalEvents().then(response => {
      setEvents(response)
    });
    setLoading(false)
  }, [])


  return (
      <>
        {
          loading ? (
              <FullScreenSpinner />
          ) : (
              <Box
                  mt={1} // Reduced margin-top
                  mb={1} // Reduced margin-bottom
                  component="main"
                  sx={{
                    flexGrow: 1,
                    py: 4, // Adjusted padding; reduce further if necessary
                    overflow: 'auto', // Add scroll if content is too large
                    // Ensure the box does not exceed the viewport height
                    maxHeight: 'calc(100vh - [TotalHeightOfOtherElements]px)',
                  }}
              >
                <Container
                    sx={{
                      maxHeight: 'calc(100vh - [TotalHeightOfOtherElements]px)', // Set the maximum height
                      overflow: 'auto', // Add scroll if content is too large
                      // Other styles you might want to include
                    }}
                    maxWidth={false}
                >
                  <Card>
                    <CardHeader title="Calendar" subheader="Create Events and manage them easily" />
                    <Divider />
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                          <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
                            Add event
                          </Button>
                        </ButtonGroup>
                      </Box>
                      <Divider style={{ margin: 10 }} />
                      <AddEventModal
                          open={openSlot}
                          handleClose={handleClose}
                          eventFormData={eventFormData}
                          setEventFormData={setEventFormData}
                          onAddEvent={onAddEvent}
                      />
                      <AddDatePickerEventModal
                          open={openDatepickerModal}
                          handleClose={handleDatePickerClose}
                          datePickerEventFormData={datePickerEventFormData}
                          setDatePickerEventFormData={setDatePickerEventFormData}
                          onAddEvent={onAddEventFromDatePicker}
                      />
                      <ManageEventModal
                          open={eventInfoModal}
                          handleClose={() => setEventInfoModal(false)}
                          onDeleteEvent={onDeleteEvent}
                          currentEvent={currentEvent}
                          onEditEvent={onEditEvent}
                          eventFormData={eventFormData}
                          setEventFormData={setEventFormData}
                      />
                      <Calendar
                          localizer={localizer}
                          events={events}
                          onSelectEvent={handleSelectEvent}
                          onSelectSlot={handleSelectSlot}
                          selectable
                          startAccessor="start"
                          components={{ event: EventInfo }}
                          endAccessor="end"
                          defaultView="week"
                          style={{
                            height: 600
                          }}
                      />
                    </CardContent>
                  </Card>
                </Container>
              </Box>
          )
        }
      </>
  );
}

export default StudentCalendar;
