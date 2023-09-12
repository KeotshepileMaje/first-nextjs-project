import EventList from "@/components/events/EventsList"
import { getFilteredEvents } from "@/components/helpers/api-util"
import ResultsTitle from "@/components/results-title/results-title"
import Button from "@/components/ui/Button"
import ErrorAlert from "@/components/ui/error-alert/error-alert"
import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment } from "react"

export default function FilteredEventPage(props) { 
    const { events, date, hasError } = props
    const filteredEvents = events

    function PageHeadData() {
        return (
            <Head>
                <title>Filtered Events</title>
                <meta 
                    name='description'
                    content={`List of filtered Events`}
                />
            </Head>
        )
    }

    if (hasError) {
        return (
            <Fragment>
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values!</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
            </Fragment>
        )
    }

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

    const setDate = new Date(date.year, date.month - 1)
    
    return (
        <Fragment>
            <PageHeadData/>
            <ResultsTitle date = {setDate} />
            <EventList items = {filteredEvents} />
        </Fragment>
    )
}


export async function getServerSideProps(context) {
    const filterData = context.params.slug
  
    const filteredYear = filterData[0]
    const numYear = +filteredYear
    const filteredMonth = filterData[1] 
    const numMonth = +filteredMonth 

    if (
        isNaN(numMonth) || 
        isNaN(numYear) || 
        numMonth < 1 || 
        numMonth > 12 ||
        numYear <2021 ||
        numYear> 2030
    ){
        return {
            props: { hasError: true },
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    return {
        props: {
            events : filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}