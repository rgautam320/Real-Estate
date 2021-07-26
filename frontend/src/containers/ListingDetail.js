import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Email, Person, Phone } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import setAlert from "../store/actions/alert";

const ListingDetail = ({ match, isAuthenticated, setAlert }) => {
    const [listing, setListing] = useState({});
    const [realtor, setRealtor] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [cart_slug, setCartSlug] = useState("");

    const { name, email, subject, message } = formData;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const slug = match.params.id;
        setCartSlug(slug);

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

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        setLoading(true);
        let seller_email = realtor.email;
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/contactSeller/`,
                { name, email, seller_email, subject, message },
                config
            )
            .then((res) => {
                setAlert("Message Sent", "success");
                setLoading(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                setAlert("Error with Sending Message", "error");
                setLoading(false);
                window.scrollTo(0, 0);
            });
    };

    return (
        <>
            <Helmet>
                <title>Real Estate - {`${listing.title}`}</title>
                <meta name="description" content="Listing detail" />
            </Helmet>
            {isAuthenticated ? (
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
                                / {listing.title}
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
                        <hr />
                        <div className="buynow d-flex justify-content-center align-items-center my-5">
                            <Link to={`/listing/${cart_slug}/buy`}>
                                <button className="btn btn-buynow">
                                    <h1 className="m-0">BUY NOW</h1>
                                </button>
                            </Link>
                        </div>
                        <hr />
                        <div className="contact-section">
                            <div className="link-bar my-4">
                                <h3>Contact Seller</h3>
                            </div>
                            <div className="row my-3" data-aos="fade-in">
                                <div className="col-md-6">
                                    <div className="row address">
                                        <div className="col-2 d-flex align-items-center justify-content-center pl-3">
                                            <Person
                                                color="primary"
                                                style={{ fontSize: 40 }}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <h4>Name:</h4>
                                            <p>{realtor.name}</p>
                                        </div>
                                    </div>

                                    <div className="row email">
                                        <div className="col-2 d-flex align-items-center justify-content-center">
                                            <Email
                                                color="primary"
                                                style={{ fontSize: 40 }}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <h4>Email:</h4>
                                            <p>{realtor.email}</p>
                                        </div>
                                    </div>

                                    <div className="row phone">
                                        <div className="col-2 d-flex align-items-center justify-content-center">
                                            <Phone
                                                color="primary"
                                                style={{ fontSize: 40 }}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <h4>Phone:</h4>
                                            <p>{realtor.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <form
                                        className="form"
                                        onSubmit={(e) => onSubmit(e)}
                                    >
                                        <div className="form-group my-2">
                                            <label
                                                className="contact__form__label"
                                                htmlFor="name"
                                            >
                                                Name{" "}
                                                <span style={{ color: "red" }}>
                                                    {" "}
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                className="form-control"
                                                name="name"
                                                type="text"
                                                placeholder="Full Name"
                                                onChange={(e) => onChange(e)}
                                                value={name}
                                                required
                                            />
                                        </div>
                                        <div className="form-group my-2">
                                            <label
                                                className="contact__form__label"
                                                htmlFor="email"
                                            >
                                                Email{" "}
                                                <span style={{ color: "red" }}>
                                                    {" "}
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                className="form-control"
                                                name="email"
                                                type="email"
                                                placeholder="example@gmail.com"
                                                onChange={(e) => onChange(e)}
                                                value={email}
                                                required
                                            />
                                        </div>
                                        <div className="form-group my-2">
                                            <label
                                                className="contact__form__label"
                                                htmlFor="subject"
                                            >
                                                Subject{" "}
                                                <span style={{ color: "red" }}>
                                                    {" "}
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                className="form-control"
                                                name="subject"
                                                type="text"
                                                placeholder="Buying Home"
                                                onChange={(e) => onChange(e)}
                                                value={subject}
                                                required
                                            />
                                        </div>
                                        <div className="form-group my-2">
                                            <label
                                                className="contact__form__label"
                                                htmlFor="message"
                                            >
                                                Message{" "}
                                                <span style={{ color: "red" }}>
                                                    {" "}
                                                    *
                                                </span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="message"
                                                cols="30"
                                                rows="5"
                                                placeholder="Message"
                                                style={{ resize: "none" }}
                                                onChange={(e) => onChange(e)}
                                                value={message}
                                            />
                                        </div>
                                        {loading ? (
                                            <div className="my-3 d-flex justify-content-center">
                                                <Loader
                                                    type="Oval"
                                                    color="#424242"
                                                    height={50}
                                                    width={50}
                                                />
                                            </div>
                                        ) : (
                                            <div className="send-btn d-flex justify-content-center">
                                                <button
                                                    className="btn btn-primary my-3 px-5"
                                                    htmltype="submit"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        )}
                                    </form>
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
});

export default connect(mapStateToProps, { setAlert })(ListingDetail);
