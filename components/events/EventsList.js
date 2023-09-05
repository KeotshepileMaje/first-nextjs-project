import EventItem from "./EventItem"
import classes from './EventsList.module.css'

export default function EventList(props) {
    const { items } = props

    return(
        <ul className={classes.list}>
            {items.map(
                (event) =>(
                    <EventItem 
                        key = {event.id}
                        id = {event.id}
                        date = {event.date}
                        title = {event.title}
                        image = {event.image}
                        location = {event.location}
                    />
                )
            )}
        </ul>
    )
}