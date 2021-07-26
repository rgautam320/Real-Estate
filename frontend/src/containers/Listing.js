import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Helmet } from "react-helmet";
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

const Listing = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/listings/`)
            .then((res) => {
                setListings(res.data.results);
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                window.scrollTo(0, 0);
            });
    }, []);
    return (
        <>
            <Helmet>
                <title>Real Estate - Listing</title>
                <meta name="description" content="sign up page" />
            </Helmet>
            <div className="heading-component">
                <h1 className="text-center">Listings</h1>
            </div>
            <div className="container">
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
        </>
    );
};

export default Listing;
