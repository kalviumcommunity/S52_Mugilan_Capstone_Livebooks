import { useEffect, useState } from "react";
import "./App.css";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import SidebarCourse from "./components/SidebarCourse";
import Settings from "./pages/Settings";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loading from "./components/Loading.jsx";
import { useSelector } from "react-redux";
import { useGetFreeCoursesQuery } from "../redux/features/courses/courseApi";
import CoursesContent from "./components/Courses.jsx/CoursesContent";

function CourseLayout() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  const [freeCourses, setFreeCourses] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentContent, setCurrentContent] = useState(null)
  const { data, isSuccess, error } = useGetFreeCoursesQuery();

  useEffect(() => {
    if (isSuccess) {
      setFreeCourses(data.course);
      console.log(data.course);
    } else if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (auth == "") {
      navigate("/login");
    }
  }, []);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  console.log(selectedContent)

  return (
    <div className="flex flex-row justify-between w-full h-screen bg-[#1A1A1A]">
      <div className=" h-full w-[350px]">
        <SidebarCourse
          data={freeCourses}
          handleContentClick={handleContentClick}
        />
      </div>
      <div className=" h-full w-full p-3">
        <div className=" h-full w-full bg-[#FFFBF7] rounded-md p-3">
          <Outlet context={[selectedContent,data]}/>
        </div>
      </div>
    </div>
  );
}

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (auth == "") {
      navigate("/login");
    }
  }, []);

  return (
    <div className=" 800px:flex h-screen">
      <div className=" w-[330px]">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
      <div className=" w-[100%] 800px:mt-0 1000px:h-[100%] h-auto 800px:min-h-screen bg-[#1A1A1A] p-1 800px:p-2 1000px:p-3 ">
        <div className="w-full h-full bg-[#FFFBF7] rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const { data: userData, isSuccess, isLoading, isError } = useLoadUserQuery({});

  if (isLoading) {
    return <Loading />; // Render loading component while data is loading
  }

  return (
    <BrowserRouter>
      <div className="w-screen 2xl:max-w-[1650px] font-Unbounded m-auto">
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/course" element={<CourseLayout />}>
            <Route path=":id" element={<CoursesContent  />} />
            <Route path=":id/:moduleid/:contentid" element={<CoursesContent />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;