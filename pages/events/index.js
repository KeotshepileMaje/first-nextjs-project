import EventList from "@/components/events/EventsList"
import EventsSearch from "../../components/events/EventsSearch"
import { Fragment } from "react"
import { useRouter } from "next/router"
import { getAllEvents } from "@/components/helpers/api-util"
import Head from "next/head"

export default function AllEventsPage(props) {
    const router = useRouter()

    function findEventsHandler (year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <Fragment>
            <Head>
                <title>Browse All Events</title>
                <meta 
                    name='description'
                    content='All Events'
                />
            </Head>
            <EventsSearch onSearch = {findEventsHandler}/>
            <EventList 
                items = {props.events}
            />
        </Fragment>
    )
}
export async function getStaticProps() {
    const allEvents = await getAllEvents()

    return{
        props: { events: allEvents},
        revalidate: 60
    }
}