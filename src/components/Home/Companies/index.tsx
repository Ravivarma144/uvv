"use client"
import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TruestedCompanies } from "@/app/api/data";
import { getImagePrefix } from "@/utils/util";

// CAROUSEL SETTINGS
const Companies = () => {

   const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  arrows: false,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


 const ExamCategories = [
  {
    title: "SSC",
    img: "https://ssc.nic.in/Content/library/assets/images/ssc-logo.png",
  },
  {
    title: "Banking",
    img: "https://images-platform.99static.com//169jw534b9BL6dI2D0x9KA0zF-E=/583x2324:1453x3195/fit-in/500x500/99designs-contests-attachments/153/153117/attachment_153117248",
  },
  {
    title: "AFCAT",
    img: "data:image/jpeg;base64,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",
  },
  {
    title: "RRB",
    img: "https://www.competitiveexamslibrary.com/assets/c-icons/productimage1551705008334.png",
  },
  {
    title: "ICET",
    img: "https://cdn.testbook.com/resources/productionimages/AP%20ICET%20Exam_All_1648702266.png",
  },
  {
    title: "MAT",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rmkCS5hfivpgGDOxy9fPgX04SjNuWYmmZw&s",
  },
  {
    title: "CAT",
    img: "https://dishaonline.co.in/_next/image?url=https%3A%2F%2Fdishaonline.co.in%2Fadmin%2Fassets%2Fimages%2Fpages%2Fcat_exam_logo.png&w=256&q=75",
  },
  {
    title: "NIMCET",
    img: "https://cdnbbsr.s3waas.gov.in/s33e6260b81898beacda3d16db379ed329/uploads/2022/05/2022052597.png",
  },
  {
    title: "RBI",
    img: "https://www.competitiveexamslibrary.com/assets/c-icons/productimage1545897017131.png",
  },

  // ✅ Additional Exams
  {
    title: "UPSC",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
  },
  {
    title: "NEET",
    img: "https://ik.imagekit.io/syustaging/SYU_PREPROD/CBSE-logo_DVy5Zq40Xc.webp?tr=w-1200",
  },
  {
    title: "JEE",
    img: "https://ik.imagekit.io/syustaging/SYU_PREPROD/CBSE-logo_DVy5Zq40Xc.webp?tr=w-1200",
  },
  {
    title: "GATE",
    img: "https://gate2026.iitg.ac.in/assets/img/logos/gate-logo.png",
  },
  {
    title: "STATE PSC",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
  },
];



    return (
        <section className='text-center' >
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <h2 className="text-midnight_text text-2xl font-semibold">Courses & Materials</h2>
                <div className="py-14 border-b ">
                    <Slider {...settings}>

                        {ExamCategories.map((item, index) => (
        <div key={index} className="px-4">
          <div className="flex flex-col items-center">
            
            {/* Circle */}
            <div className="
              h-32 w-32
              rounded-full
              border-2 border-deepSlate
              flex items-center justify-center
              bg-white
              shadow-sm
            ">
              <img
                src={item.img}
                alt={item.title}
                className="h-20 w-20 object-contain"
              />
            </div>

            {/* Label */}
            <p className="mt-4 text-base font-semibold text-gray-800">
              {item.title}
            </p>

          </div>
        </div>
      ))}
                        {/* {TruestedCompanies.map((item, i) =>
                            <div key={i}>
                                <Image src={`${getImagePrefix()}${item.imgSrc}`} alt={item.imgSrc} width={116} height={36} />

                                 <div className="absolute bottom-4 left-4 backdrop-blur-md bg-black/40 px-4 py-2 rounded-lg">
  <span className="text-white text-sm font-medium"> { item.title}</span>
</div>
                            </div>
                        )} */}
                    </Slider>
                </div>
            </div>
        </section>
    )

}

export default Companies;