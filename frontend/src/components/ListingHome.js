import React from "react";
import Card from "../components/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const ListingHome = ({ listings }) => {
    console.log(listings);
    return (
        <>
            {listings ? (
                <div className="container my-2">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="all 1s"
                        transitionDuration={1000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {listings.map((val, ind) => {
                            return (
                                <Card
                                    key={ind}
                                    title={val.title}
                                    photo_main={val.photo_main}
                                    address={val.address}
                                    city={val.city}
                                    state={val.state}
                                    price={val.price}
                                    bedrooms={val.bedrooms}
                                    bathrooms={val.bathrooms}
                                    sale_type={val.sale_type}
                                    home_type={val.home_type}
                                    sqft={val.sqft}
                                    slug={val.slug}
                                />
                            );
                        })}
                    </Carousel>
                </div>
            ) : null}
        </>
    );
};

export default ListingHome;
