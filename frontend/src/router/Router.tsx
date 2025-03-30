import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../pages/main/Main";
import NotFound from "../pages/not-found/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <NotFound/>
    }
])

export default function Router() {
    return <RouterProvider router={router}/>
}