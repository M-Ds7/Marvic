
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

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/blog", element: <Blog /> },
    { path: "/myaccount", element: <MyAccount /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
    { path: "/acountpet/:petId", element: <AccountPet/> }
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
