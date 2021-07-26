import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Brought = ({ match, isAuthenticated, email }) => {
    const [listing, setListing] = useState({});
    const [realtor, setRealtor] = useState({});
    const [buyer, setBuyer] = useState("");

    useEffect(() => {
        const slug = match.params.id;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/listings/${slug}`,
                config
            )
            .then((res) => {
                setListing(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [match.params.id]);

    useEffect(() => {
        const id = listing.realtor;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        if (id) {
            axios
                .get(
                    `${process.env.REACT_APP_API_URL}/api/realtors/${id}/`,
                    config
                )
                .then((res) => {
                    setRealtor(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [listing.realtor]);

    useEffect(() => {
        const value = email;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        if (isAuthenticated) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/api/orders/`, config)
                .then((res) => {
                    const x = res.data.results.filter((val) => {
                        return val.buyer == value;
                    });
                    setBuyer(x[0].buyer);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [email]);

    return (
        <>
            <Helmet>
                <title>Real Estate - {`${listing.title}`}</title>
                <meta name="description" content="Listing detail" />
            </Helmet>
            {email === buyer ? (
                <>
                    <header className="heading-component">
                        <h1 className="font-weight-bold">{listing.title}</h1>
                        <h6 className="">
                            {listing.city}, {listing.state}, {listing.zipcode}
                        </h6>
                    </header>
                    <div className="container mt-3">
                        <div className="link-bar">
                            <h4>
                                <Link exact to="/">
                                    Home
                                </Link>{" "}
                                / Your House
                            </h4>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-9 col-12">
                                <figure>
                                    <img
                                        src={listing.photo_main}
                                        alt="Main Tasbir"
                                        width="100%"
                                        height="auto"
                                    />
                                </figure>
                                <div className="row detail font-weight-bold">
                                    <div className="col-md-6">
                                        <ul>
                                            <li>
                                                <p className="m-1">
                                                    Price: ${listing.price}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    Bedrooms: {listing.bedrooms}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    Bathrooms:{" "}
                                                    {listing.bathrooms}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    Sale Type:{" "}
                                                    {listing.sale_type}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    Home Type:{" "}
                                                    {listing.home_type}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    Area: {listing.sqft} sqft.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul>
                                            <li>
                                                <p className="m-1">
                                                    Street: {listing.address}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    City: {listing.city}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    State: {listing.state}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    Zipcode: {listing.zipcode}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="m-1">
                                                    country: {listing.country}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-12">
                                <div className="heading-component ">
                                    <h2>Seller</h2>
                                </div>
                                <figure>
                                    <img
                                        src={realtor.photo}
                                        alt="Realtor Tasbir"
                                        width="100%"
                                        height="auto"
                                    />
                                </figure>
                                <div className="detail">
                                    <h2>{realtor.name}</h2>
                                    <h5>{realtor.phone}</h5>
                                    <h5 className="pb-3">{realtor.email}</h5>
                                    <p
                                        className="text-justify"
                                        style={{ color: "black" }}
                                    >
                                        {realtor.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="listing-description">
                            <div className="link-bar my-4">
                                <h3>Description</h3>
                            </div>
                            <p className="text-justify">
                                {listing.description}
                            </p>
                        </div>
                        <div className="image-section">
                            <div className="link-bar my-4">
                                <h3>Photos</h3>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    {listing.photo_1 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_1}
                                                    alt="First Tasbir"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_2 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_2}
                                                    alt="SecondTasbire"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_3 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_3}
                                                    alt="Third Tasbir"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_4 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_4}
                                                    alt="FourthTasbire"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_5 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_5}
                                                    alt="Fifth Tasbir"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_6 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_6}
                                                    alt="Sixth Tasbir"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_7 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_7}
                                                    alt="SeventTasbirge"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_8 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_8}
                                                    alt="EighthTasbire"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_9 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_9}
                                                    alt="Ninth Tasbir"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    {listing.photo_10 ? (
                                        <div className="image-div">
                                            <figure>
                                                <img
                                                    width="100%"
                                                    height="auto"
                                                    src={listing.photo_10}
                                                    alt="Tenth Tasbir"
                                                />
                                            </figure>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-center">
                        You must login to see details.
                    </h1>
                    <h1 className="text-center">
                        <Link exact to="/login">
                            Login
                        </Link>
                    </h1>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    email: state.auth.user,
});

export default connect(mapStateToProps, {})(Brought);
