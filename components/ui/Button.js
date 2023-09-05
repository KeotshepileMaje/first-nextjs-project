import Link from "next/link";
import classes from './Button.module.css'

export default function Button (props) {
    const {children, link, onClick} = props
    if (link) {
    return(
        <Link href= {link} legacyBehavior>
            <a className={classes.btn} >{children}</a>
        </Link>
    )
    }

    return <button className={classes.btn} onClick={onClick}>{children}</button>
}