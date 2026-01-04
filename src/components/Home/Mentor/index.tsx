"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import React from "react";
import { MentorData } from "@/app/api/data";
import { getImagePrefix } from "@/utils/util";

export default function Mentor() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      id="mentor"
      className="bg-deepSlate py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-midnight_text leading-tight">
            Meet our <br /> expert mentors
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Learn from experienced professionals guiding your success.
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {MentorData.map((mentor, i) => (
            <div key={i} className="px-4">
              <div
                className="
                  group
                  bg-white dark:bg-gray-900
                  rounded-2xl
                  p-8
                  text-center
                  shadow-sm
                  hover:shadow-xl
                  transition-all duration-300
                  hover:-translate-y-2
                "
              >
                {/* Avatar */}
                <div className="relative mx-auto w-44 h-44">
                  <Image
                    src={`${getImagePrefix()}${mentor.imgSrc}`}
                    alt={mentor.name}
                    fill
                    className="
                      rounded-full
                      object-cover
                      border-4 border-deepSlate
                    "
                  />

                  {/* LinkedIn */}
                  <a
                    href={mentor.linkedin || "#"}
                    target="_blank"
                    className="
                      absolute
                      bottom-2 right-2
                      bg-white
                      p-3
                      rounded-full
                      shadow
                      opacity-0
                      group-hover:opacity-100
                      transition
                    "
                  >
                    <Image
                      src={`${getImagePrefix()}images/mentor/linkedin.svg`}
                      alt="LinkedIn"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>

                {/* Info */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-lightblack">
                    {mentor.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {mentor.profession}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}



// "use client"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React from "react";
// import Image from "next/image";
// import { MentorData } from "@/app/api/data";
// import { getImagePrefix } from "@/utils/util";

// const Mentor = () => {

//     const settings = {
//         dots: false,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         arrows: false,
//         autoplay: true,
//         cssEase: "linear",
//         responsive: [
//             {
//                 breakpoint: 1200,
//                 settings: {
//                     slidesToShow: 3,
//                 }
//             },
//             {
//                 breakpoint: 1000,
//                 settings: {
//                     slidesToShow: 2,
//                 }
//             },
//             {
//                 breakpoint: 530,
//                 settings: {
//                     slidesToShow: 1,
//                 }
//             }
//         ]
//     };

//     return (
//         <section className="bg-deepSlate" id="mentor" >
//             <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative'>
//                 <h2 className="text-midnight_text text-5xl font-semibold">Meet with our <br /> mentor.</h2>

//                 <Slider {...settings}>
//                     {MentorData.map((items, i) => (
//                         <div key={i}>
//                             <div className='m-3 py-14 md:my-10 text-center'>
//                                 <div className="relative">
//                                     <Image src={`${getImagePrefix()}${items.imgSrc}`} alt="user-image" width={306} height={0} className="inline-block m-auto h-64 w-64
//               rounded-full
//               border-2 border-deepSlate" />
//                                     <div className="absolute right-[84px] bottom-[102px] bg-white rounded-full p-4">
//                                         <Image src={`${getImagePrefix()}images/mentor/linkedin.svg`}alt="linkedin-image" width={25} height={24} />
//                                     </div>
//                                 </div>
//                                 <div className="-mt-10">
//                                     <h3 className='text-2xl font-semibold text-lightblack'>{items.name}</h3>
//                                     <h4 className='text-lg font-normal text-lightblack pt-2 opacity-50'>{items.profession}</h4>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </section>
//     );
// }

// export default Mentor