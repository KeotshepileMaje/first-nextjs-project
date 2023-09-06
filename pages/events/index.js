import EventList from "@/components/events/EventsList"
import { getAllEvents } from "@/data/dummyData"
import EventsSearch from "../../components/events/EventsSearch"
import { Fragment } from "react"
import { useRouter } from "next/router"

export default function AllEventsPage() {
    const router = useRouter() 
    const events = getAllEvents()


    function findEventsHandler (year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <Fragment>
            <EventsSearch onSearch = {findEventsHandler}/>
            <EventList 
                items = {events}
            />
        </Fragment>
    )
}