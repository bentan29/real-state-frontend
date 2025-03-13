import { Outlet } from "react-router-dom"
import { NavBarComponent } from "../common/NavBarComponent"

export const CommonLayout = () => {
    return (
        <div className="flex min-h-screen h-full">

            <NavBarComponent/>

            <div className="flex mt-8">
                <Outlet/>
            </div>

        
        </div>
    )
}
