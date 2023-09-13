import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import { getEventById, getFeaturedEvents } from '@/components/helpers/api-util'
import Comments from '@/components/input/comments'
import ErrorAlert from '@/components/ui/error-alert/error-alert'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

export default function EventsIdPage(props) { 
    const event = props.events

    if (!event) {
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta 
                    name='description'
                    content={event.description}
                />
            </Head>
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
            <Comments eventId={event.id} />
        
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId
    const eventById = await getEventById(eventId)

    if (!eventById) {
        return {
            notFound: true, 
        }
    }
    
    return {
        props: { events: eventById},
        revalidate: 30 
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents()

    const paths =events.map(
        (event) => ({params: {eventId: event.id}})
    )

    return {
        paths: paths,
        fallback: 'blocking'
    }
}