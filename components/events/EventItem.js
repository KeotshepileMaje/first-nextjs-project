import Link from "next/link"
import classes from './EventItem.module.css'
import Button from "../ui/Button"
import DateIcon from "../icons/date-icon"
import AddressIcon from "../icons/address-icon"
import ArrowRightIcon from "../icons/arrow-right-icon"

export default function EventItem(props) {
    const { title, image, date, location, id} = props

    const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'long',
        year: "numeric"
    })

    const formattedAddress = location.replace(',', '\n')
    const exploreLink = `/event/${id}`

    return(
        <li className={classes.item}>
            <img src={'/' + image} alt={title}/>
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                    <div className={classes.action}>
                        <Button link = {exploreLink}> 
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon /></span>
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    )
}