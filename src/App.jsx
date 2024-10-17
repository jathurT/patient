import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./Layout";
import BookingPage from "./pages/BookingPage";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "services", element: <ServicesPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "booking", element: <BookingPage /> },
        {
          path: "booking/:id",
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
