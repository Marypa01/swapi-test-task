import { createBrowserRouter } from "react-router-dom";
import { APP_PATHS } from "./paths";
import Personage from "../pages/Personage/Personage";
import PersonageList from "../pages/PersonagesList/PersonageList";
import { RoutesTypes } from "./types";

export const routes: RoutesTypes[] = [
    {
        path: APP_PATHS.root,
        element: <PersonageList />,
    },
    { path: APP_PATHS.personage, element: <Personage /> },
];

const AppRouter = createBrowserRouter(routes);
export default AppRouter;
