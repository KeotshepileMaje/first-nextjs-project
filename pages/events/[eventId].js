import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import ErrorAlert from '@/components/ui/error-alert/error-alert'
import { getEventById } from '@/data/dummyData'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

export default function EventsIdPage() { 
    const router = useRouter()

    const eventId = router.query.eventId

    const event = getEventById(eventId)

    if (!event) {
        return (
            <ErrorAlert><p>No Event found!</p></ErrorAlert>
        )
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics 
                date = {event.date}
                address = {event.location}
                image = {event.image}
                imageAlt = {event.title}
            />
            <EventContent>
                {event.description}
            </EventContent>
        
        </Fragment>
    )
}