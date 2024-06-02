import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/utils/Header";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/StudentPages/Dashboard";
import Courses from "./pages/StudentPages/Courses";
import Login from "./pages/Login";
import Settings from "./pages/StudentPages/Settings";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loading from "./components/utils/Loading.jsx";
import { useSelector } from "react-redux";
import CoursesContent from "./components/Students/Courses.jsx/CoursesContent";
import CourseLayout from "./components/Students/Layouts/CourseLayout";
import FreeCourses from "./pages/AdminPages/FreeCourses";
import PaidCourses from "./pages/AdminPages/PaidCourses";
import Mentors from "./pages/AdminPages/Mentors";
import Students from "./pages/AdminPages/Students";

import CreateCourse from "./components/Admin/AddCourses";

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
  const { data: userData, isLoading } = useLoadUserQuery({});

  const [role, setRole] = useState(false);

  const userRole = useSelector((state) => state.auth.user?.role);
  useEffect(() => {
    if (userRole == "admin") {
      setRole(true);
    } else {
      if (userRole == "student") {
        setRole(false);
      }
    }
  });

  if (isLoading) {
    return <Loading />; // Render loading component while data is loading
  }

  return (
    <BrowserRouter>
      <div className="w-screen 2xl:max-w-[1650px] font-Unbounded m-auto">
        <Routes>
          {role ? (
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/free-courses" element={<FreeCourses />} />
              <Route path="/admin/paid-courses" element={<PaidCourses />} />
              <Route path="/admin/mentors" element={<Mentors />} />
              <Route path="/admin/Students" element={<Students />} />
              <Route path="/create/freeCourse" element={<CreateCourse />} />
              <Route path="/create/PaidCourse" element={<CreateCourse />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          ) : (
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/message" element={<Courses />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          )}
          <Route path="/course" element={<CourseLayout />}>
            <Route path=":id" element={<CoursesContent />} />
            <Route
              path=":id/:moduleid/:contentid"
              element={<CoursesContent />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
