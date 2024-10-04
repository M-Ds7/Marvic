
import { useRoutes, BrowserRouter } from "react-router-dom"
import Home from './Pages/Home'
import Blog from './Pages/Blog'
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

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/blog", element: <Blog /> },
    { path: "/myaccount", element: <MyAccount /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
    { path: "/acount/pets/:petId", element: <AccountPet/> },
    { path: "/changeDataPet/:petId", element: <ChangeDataPet/>},
    { path: "/changepassword/:userId", element:<ChangePassword/> }

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
