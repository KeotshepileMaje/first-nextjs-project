import EventList from "@/components/events/EventsList"
import ResultsTitle from "@/components/results-title/results-title"
import Button from "@/components/ui/Button"
import ErrorAlert from "@/components/ui/error-alert/error-alert"
import { getFilteredEvents } from "@/data/dummyData"
import { useRouter } from "next/router"
import { Fragment } from "react"

export default function FilteredEventPage() { 
    const router = useRouter()

    const filterData = router.query.slug

    if (!filterData) {
        return <p className="center">Loading</p>
    }

    const filteredYear = filterData[0]
    const numYear = +filteredYear
    const filteredMonth = filterData[1] 
    const numMonth = +filteredMonth 

    if (isNaN(numMonth) || isNaN(numYear) || 
        numMonth < 1 || numMonth > 12 ||
        numYear <2021 || numYear> 2030
        ){
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. PLease adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All events</Button>
                </div>  
            </Fragment>
        )
    }
        

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    if (!filteredEvents || filteredEvents.length === 0) {
        return(
            <Fragment> 
                <ErrorAlert>
                    <p>No events found for the chosen</p>
                </ErrorAlert>
                <div className='center'>
                <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
       
    }

    const date = new Date(numMonth, numMonth - 1)

    return (
        <Fragment>
            <ResultsTitle date = {date} />
            <EventList items = {filteredEvents} />
        </Fragment>
    )
}