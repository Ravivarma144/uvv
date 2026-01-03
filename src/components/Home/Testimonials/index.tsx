"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TestimonialData } from "@/app/api/data";
import { getImagePrefix } from "@/utils/util";

const Testimonial = () => {

    const settings = {
        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    const TestimonialData= [
  {
    name: "Ravi Kumar",
    profession: "SSC Aspirant",
    comment:
      "The free SSC preparation courses helped me understand concepts clearly. The mentors explained everything in a simple way, and the practice sessions boosted my confidence.",
    imgSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    // imgSrc: "/images/mentor/user3.png",
    rating: 5,
  },
  {
    name: "Anusha Reddy",
    profession: "NEET Student",
    comment:
      "I come from a rural background, and this platform gave me access to quality learning at no cost. The biology and chemistry classes were extremely helpful.",
    imgSrc: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Mohammed Faizan",
    profession: "Banking Exam Candidate",
    comment:
      "The aptitude and reasoning courses are well-structured. Regular quizzes and guidance from volunteers made preparation much easier.",
    imgSrc: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.5,
  },
  {
    name: "Sowmya Devi",
    profession: "JEE Aspirant",
    comment:
      "I liked the step-by-step teaching approach. Physics concepts that felt difficult earlier became easy to understand through these free classes.",
    imgSrc: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    profession: "UPSC Beginner",
    comment:
      "This platform helped me start my UPSC journey with the right guidance. The foundation courses and study materials are very useful.",
    imgSrc: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 4.8,
  },
  {
    name: "Lakshmi Narayana",
    profession: "Skill Development Learner",
    comment:
      "The computer basics and digital skills courses helped me improve my confidence and prepare for job opportunities. I am thankful for this initiative.",
    imgSrc: "https://randomuser.me/api/portraits/men/83.jpg",
    rating: 5,
  },
];

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {Array(fullStars).fill(<Icon icon="tabler:star-filled" className="text-yellow-500 text-xl inline-block" />)}
                {halfStars > 0 && <Icon icon="tabler:star-half-filled" className="text-yellow-500 text-xl inline-block" />}
                {Array(emptyStars).fill(<Icon icon="tabler:star-filled" className="text-gray-400 text-xl inline-block" />)}
            </>
        );
    };

    return (
        <section id="testimonial">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4'>
                <Slider {...settings}>
                    {TestimonialData.map((items, i) => (
                        <div key={i}>
                            <div className={`bg-white rounded-2xl m-4 p-5 my-20 relative ${i % 2 ? 'shadow-testimonial-shadow2' : 'shadow-testimonial-shadow1'}`}>
                                <div className="absolute top-[-45px]">
                                    <Image src={`${getImagePrefix()}${items.imgSrc}`}
                                        alt={items.name} width={80} height={80} className="inline-block
              rounded-full
              border-2 border-deepSlate" />
                                </div>
                                <h4 className='text-base font-normal text-darkgray my-4'>{items.comment}</h4>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className='text-lg font-medium text-darkbrown pt-4 pb-2'>{items.name}</h3>
                                        <h3 className='text-sm font-normal text-lightgray pb-2'>{items.profession}</h3>
                                    </div>
                                    <div className="flex">
                                        {renderStars(items.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonial;
