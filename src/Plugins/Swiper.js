import { useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';

const ReusableSwiper = ({
  children,
  visibleCardLimit,
  spaceBetween = 25,
  pagination = { clickable: true },
  className = "mySwiper",
  uniqueId,
}) => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="custom-swiper-navigation d-flex">
        <button ref={prevButtonRef} className={`button-prev-${uniqueId}`}>
          <IoIosArrowBack size={40} />
        </button>
        <Swiper
          slidesPerView={visibleCardLimit}
          spaceBetween={spaceBetween}
          freeMode={true}
          pagination={pagination}
          navigation={{
            nextEl: `.button-next-${uniqueId}`,
            prevEl: `.button-prev-${uniqueId}`,
          }}
          modules={[Pagination, Navigation]}
          className={className}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              // spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              // spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              // spaceBetween: 50,
            },
          }}
        >
          {children}
        </Swiper>
        <button ref={nextButtonRef} className={`button-next-${uniqueId}`} style={{backgroundColor:'none'}}>
          <IoIosArrowForward size={40} />
        </button>
      </div>
    </>
  );
};

export default ReusableSwiper;
