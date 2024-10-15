
import { useRoutes, BrowserRouter } from "react-router-dom"
import Home from './Pages/Home'
import MyAccount from './Pages/MyAccount'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import NotFound from './Pages/NotFound'
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import { MarvicProvider } from "./Context/Context"
import AccountPet from "./Pages/AccountPet"
import ChangeDataPet from "./Pages/ChangeDataPet"
import ChangePassword from "./Pages/ChangePassword"
import AdminRoute from "./Context/AdminRoute"
import AdminDashboard from "./Pages/AdminDashboard"
import DetailsUser from "./Pages/DetailsUser"
import AppointmentUser from "./Pages/AppointmentUser"
import DetailsAppointment from "./Pages/DetailsAppointment"

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/myaccount", element: <MyAccount /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
    { path: "/acount/pets/:petId", element: <AccountPet/> },
    { path: "/changeDataPet/:petId", element: <ChangeDataPet/>},
    { path: "/changepassword/:userId", element:<ChangePassword/> },
    { path: "/admin", element: <AdminRoute> <AdminDashboard/> </AdminRoute>},
    { path: "/detailUser/:userId", element: <AdminRoute> <DetailsUser/> </AdminRoute>  },
    { path: "/citas", element: <AdminRoute> <AppointmentUser/> </AdminRoute>},
    { path: "/citas/:appointmentId", element: <AdminRoute> <DetailsAppointment/> </AdminRoute> }
  ])

  return routes
}

function App() {
  return (
    <>
      <MarvicProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </MarvicProvider>
    </>
  )
}

export default App
