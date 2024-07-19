import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useSelector } from "react-redux";
import {  useGetcurrentEventQuery } from "../../../../redux/features/calender/calenderApi";
import EventModal from "./EventModel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleMeet from "../../../assets/Meeticon/Google Meet icon.svg"
function CalendarComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [admin, setAdmin] = useState(false);

  const { data, isLoading, isSuccess, error } = useGetcurrentEventQuery(); // Replace with your actual API hook
  const user = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    if (user === 'admin') {
      setAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setEvents(data.events);
    } else if (error) {
      console.error(error);
    }
  }, [isSuccess, error, data]);

  const handleCreateEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventClick = (event) => {
    window.open(event.meetLink, '_blank');
  };

  const scheduleNotification = (event) => {
    const eventTime = new Date(event.date).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = eventTime - currentTime;

    if (timeDifference > 0 && timeDifference <= 600000) { // 600000 milliseconds = 10 minutes
      setTimeout(() => {
        toast.info(`Event "${event.title}" starts in 10 minutes!`, {
          autoClose: 10000, // 10 seconds
          pauseOnHover: true,
          position: "bottom-right",
          onClose: () => {
            // Play notification sound here if needed
          }
        });
      }, timeDifference);
    }
  };

  return (
    <div className="p-3 flex flex-col border-2 border-black h-full w-full bg-[#FEC901] rounded-lg shadow-[4px_4px_1px__rgba(0,0,0,0.8)]">
      <ToastContainer />
      <div className="shadow-[5px_5px_2px__rgba(0,0,0,0.7)] border-2 border-black rounded-md flex justify-center bg-[#84DACB]">
        <Calendar />
      </div>
      <div className="overflow-y-auto w-full mt-5 h-full">
        <div className="flex flex-col gap-4 h-full w-full overflow-y-auto p-2">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className="bg-[#84DACB] cursor-pointer p-2 border border-black flex rounded-xl shadow-[4px_4px_1px__rgba(0,0,0,0.7)]"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex w-[80%]">
                  <div className="w-[50px] h-[50px] bg-slate-500 rounded-full">
                    <img src={googleMeet} alt="" />
                  </div>
                  <div className="w-[60%] flex flex-col justify-between pl-2">
                    <div className="text-sm">{event.title}</div>
                    <div className="font-light text-xs overflow-y-auto">
                      {event.description}
                    </div>
                  </div>
                </div>
                <div className="w-[20%] flex items-end">
                  <a
                    href={event.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs"
                  >
                    {event.time}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {admin && (
        <div className="flex justify-center mt-5">
          <Button
            className="bg-[#FE90E8] text-black p-2 rounded-sm border-2 border-black shadow-[4px_4px_1px__rgba(0,0,0,0.7)]"
            onClick={() => setIsModalOpen(true)}
          >
            Create event
          </Button>
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}

export default CalendarComponent;