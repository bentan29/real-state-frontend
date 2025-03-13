// import SidebarLayout from "@/components/sidebar-layout/SidebarLayout"
import { Link } from "react-router-dom"

export const HomePage1 = () => {
  return (

        <div className="flex flex-col h-screen">

            <nav className="bg-gray-900 shadow border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-3">
                
                    <div className="text-white">
                        Inmobiliaria
                    </div>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <li>
                            <Link 
                                href="#" 
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                About
                            </Link>
                        </li>

                    </ul>
                    </div>
                </div>
            </nav>

            {/* <div className="flex mt-5 flex-1">
                <SidebarLayout className="mt-8"/> Sidebar + Contenido
            </div> */}
        </div>

  )
}
