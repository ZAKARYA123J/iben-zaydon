import React, { useRef } from "react";
import { useCountUp } from "react-countup";
import { Waypoint } from "react-waypoint";
import {  FaBuilding, FaExpandArrowsAlt , FaTruck } from "react-icons/fa";
import { MdMeetingRoom  } from "react-icons/md";


const Counters = () => {
  // Counter Component Logic
  const Counter = ({ end, text, Icon }) => {
    const ref = useRef(null);
    const { start } = useCountUp({ ref, end, duration: 1.5 });

    const handleWaypointEnter = () => {
      start();
    };

    return (
      <Waypoint onEnter={handleWaypointEnter}>
        <div className="counter text-center flex flex-col items-center">
          <div className="icon text-white text-3xl  md:text-3xl lg:text-4xl mb-4">
            <Icon />
          </div>
          <div className="counter-value my-4">
            <span ref={ref} className="text-3xl  md:text-3xl lg:text-4xl text-white font-extrabold" />
            <span className="text-3xl  md:text-3xl lg:text-4xl text-white font-extrabold">+</span>
          </div>
          <span className="text-white text-xl  md:text-xl lg:text-2xl font-bold">{text}</span>
        </div>
      </Waypoint>
    );
  };

  return (
    <div className="counters bg-blue-600  py-24 lg:px-40 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6 md:col-span-3">
            <Counter
              end={560}
              text="Surface totale m²"
              Icon={FaExpandArrowsAlt}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <Counter
              end={983}
              text="Appartements vendus"
              Icon={FaBuilding}
            />
          </div>
          <div className="col-span-6 md:col-span-3 mt-8 md:mt-0">
            <Counter
              end={268}
              text="Total Constructions"
              Icon={FaTruck}
            />
          </div>
          <div className="col-span-6 md:col-span-3 mt-8 md:mt-0">
            <Counter
              end={340}
              text="Chambres immobilières"
              Icon={MdMeetingRoom }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counters;
