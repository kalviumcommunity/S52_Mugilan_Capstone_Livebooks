import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../Components/HomepageComponents/Header";
import ContactUs1 from "../Components/Contactus/CotactUs1";
function ContactUs() {
  const [open, setOpen] = useState(false);
  const [activeItem, setactiveItem] = useState(0);

  return (
    <>
      <Heading
        title="Contact Us - Hogwarts"
        description="Contact Hogworts team"
        keywords="connect, contact, email, phone , number , phone no, gmail, contact us"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />

      <ContactUs1 />
    </>
  );
}

export default ContactUs;
