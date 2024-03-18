import "./App.css";
import React from "react";
import { useCallback, useRef } from "react";
import Logo from "./Map - Solid.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Keyboard, Pagination, Navigation } from "swiper";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Vector1 =
  "https://cdn.nuego.co.in/greencell/assets/images/static-images/Vector1.jpg";
const Vector2 =
  "https://cdn.nuego.co.in/greencell/assets/images/static-images/Vector2.jpg";

function App() {
  const sliderRef = useRef(null);
  const [ourRoutes, setOurRoutes] = useState([]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    fetch(`https://cms.nuego.in/api/our-routes/?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        setOurRoutes(res?.error?.status === 500 ? [] : res?.data);
      })
      .catch((err) => {
        setOurRoutes([]);
      });

    return () => {};
  }, []);

  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <div className="subbox">
          <div className="headingbox">
            <div className="headingplogo">
              <img className="Logo" src={Logo} />
              <p className="heading">Our Routes</p>
            </div>
            <p className="tagline">
              Explore the most visited places of Summer 2023
            </p>
          </div>
          {isDesktopOrLaptop && (
            <div className="control-icon gap-24">
              <button
                onClick={handlePrev}
                className="carousel-control-prev-sec me-2"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <div className="right-icon">
                  <img src={Vector1} alt="Vector" />
                </div>
              </button>
              <button
                onClick={handleNext}
                className="carousel-control-prev-sec"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <div className="right-icon">
                  <img src={Vector2} alt="Vector" />
                </div>
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="photo-container">
            <div className="our-routes">
              <div className="our-routes-places">
                <div className="slider-content mt-3">
                  <div id="carouselExampleCaptions" className="carousel slide ">
                    <div className="carousel-inner">
                      <Swiper
                        className={"py-2 px-1"}
                        spaceBetween={32}
                        ref={sliderRef}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        breakpoints={{
                          1200: {
                            slidesPerView: 5,
                          },
                          1024: {
                            slidesPerView: 4,
                          },
                          300: {
                            slidesPerView: 3,
                          },
                        }}
                      >
                        {ourRoutes.map((data, index) => {
                          return (
                            <SwiperSlide key={index} className="box-1">
                              <div>
                                <div className="imagediv">
                                  <img
                                    alt="alt"
                                    className="teamMemberImage"
                                    src={
                                      isDesktopOrLaptop
                                        ? data?.attributes?.primaryCityImage
                                        : data?.attributes?.primaryCityImage
                                    }
                                  ></img>
                                  <div className="banner">
                                    <p className="cityname">
                                      {data?.attributes?.primaryCity?.cityName}
                                    </p>
                                    {isDesktopOrLaptop && (
                                      <p className="trips">
                                        12 trips Available
                                      </p>
                                    )}
                                    {!isDesktopOrLaptop && (
                                      <p className="trips">12 trips </p>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className={
                                    "d-flex align-items-center routes-down"
                                  }
                                ></div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
