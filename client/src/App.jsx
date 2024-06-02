import "./App.css";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import Verification from "./pages/Verification";

function App() {


  return (
    <div  className=" w-screen 2xl:max-w-[2000px] font-Unbounded">
      
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
