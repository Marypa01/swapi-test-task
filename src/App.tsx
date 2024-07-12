import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/routes";

function App() {
    return (
        <div className="App">
            <RouterProvider router={AppRouter} />
        </div>
    );
}

export default App;
