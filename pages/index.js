import Head from 'next/head'
import { getFeaturedEvents } from '@/components/helpers/api-util'
import EventList from '../components/events/EventsList'

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
            <main>
                <EventList items={props.events} />
            </main>
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
