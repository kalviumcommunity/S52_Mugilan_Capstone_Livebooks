import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../Components/HomepageComponents/Header";
import Hero from "../Components/HomepageComponents/Hero";
import BrowesCollection from "../Components/HomepageComponents/BrowesCollection";
import Hero2 from "../Components/HomepageComponents/Hero2";
import AddvertisingComponent from "../Components/HomepageComponents/AddvertisingComponent";
import Alumini from "../Components/HomepageComponents/Alumini";
import StudentsCompany from "../Components/HomepageComponents/StudentsCompany";
import Footer from "../Components/Footer";
import { InfiniteMovingCardsDemo } from "../Components/HomepageComponents/reviews";
<<<<<<< HEAD
import { useSelector } from "react-redux";

function Home() {
  const auth = useSelector((state) => state.auth)
  console.log(auth)
=======

function Home() {
>>>>>>> f661e90b4b1a9eea1c492fc42f6a217a1cd2a06c
  const [open, setOpen] = useState(false);
  const [activeItem, setactiveItem] = useState(0);
  return (
    <div className="font-Unbounded">
      <Heading
        title="Hogwarts"
        description="this is the e learning program"
        keywords="program, programming, mern stack , mern , full stack, stack"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero />
      <BrowesCollection />
      <Hero2 />
      <Alumini />
      <AddvertisingComponent />
      <StudentsCompany />
      <InfiniteMovingCardsDemo />
      <Footer />

    </div>
  );
}

export default Home;
