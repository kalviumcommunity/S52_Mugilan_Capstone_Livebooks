import "./App.css";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Courses from "./pages/Courses";
function App() {
  return (
    <div className="w-screen 2xl:max-w-[2000px]">
      
    <BrowserRouter>
      <Routes >

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/courses" element={<Courses />} />

      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
