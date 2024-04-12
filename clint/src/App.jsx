import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes , Route} from "react-router-dom";
function App() {
  return (
    <div className="w-screen 2xl:max-w-[2000px]">
      
    <BrowserRouter>
      <Routes >

        <Route path="/" element={<Home />} />

      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
