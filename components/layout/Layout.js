import { Fragment } from "react";
import MainHeader from "./MainLayout";

export default function Layout(props) {
    const {children} = props
    
    return (
        <Fragment>
            <MainHeader />
            <main>
                {children}
            </main>
        </Fragment>
    )
}