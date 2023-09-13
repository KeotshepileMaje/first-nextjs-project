import Head from 'next/head'
import { getFeaturedEvents } from '@/components/helpers/api-util'
import EventList from '../components/events/EventsList'
import NewsletterRegistration from '@/components/input/newsletter-registration'

export default function Home(props) {
    console.log(props.events)
    return (
        <>
            <Head>
                <title>Event App</title>
                <meta name="description" content="Events happening around the world" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NewsletterRegistration />
            <EventList items={props.events} />
            
        </>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents()
    
    return{
        props: { events : featuredEvents },
        revalidate: 1800
    }
}
