import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Alert } from "react-bootstrap";
import BackspaceIcon from "@material-ui/icons/Backspace";

const Buy = ({ match, isAuthenticated, email }) => {
    const [listing, setListing] = useState({});
    const [coupon, setCoupon] = useState({
        coupon: "",
    });
    const [loading, setLoading] = useState(false);
    const [cart_slug, setCartSlug] = useState("");
    const [alert, setAlert] = useState("");
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
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

    const onChange = (e) => {
        setCoupon({
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();

        if (coupon.coupon === "DISCOUNT100") {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            setLoading(true);
            let buyer = email;
            let realtor = listing.realtor;
            let title = listing.title;
            let total_price = listing.price + listing.price * 0.13;
            console.log(buyer, realtor, cart_slug, title, total_price);
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/orders/place_order/`,
                    { buyer, realtor, cart_slug, title, total_price },
                    config
                )
                .then((res) => {
                    setLoading(false);
                    setShow(true);
                    setError(false);
                    setAlert("Order Placed Successfully");
                    console.log(res);
                    setCoupon({
                        coupon: "",
                    });
                })
                .catch((err) => {
                    setAlert("Couldn't Place the Order");
                    setError(true);
                    setLoading(false);
                });
        } else {
            setAlert("COUPON not valid");
            setError(true);
            setShow(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Real Estate - {`${listing.title}`} - Buy</title>
                <meta name="description" content="Listing detail" />
            </Helmet>
            {isAuthenticated ? (
                <div className="container my-3">
                    <div className="row">
                        <div className="col-md-8 col-12 add-border">
                            <h1 className="text-center py-2">
                                {listing.title}
                            </h1>
                            <figure>
                                <img
                                    src={listing.photo_main}
                                    alt="Main Tasbir"
                                    width="100%"
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
                                                Bathrooms: {listing.bathrooms}
                                            </p>
                                        </li>
                                        <li>
                                            <p className="m-1">
                                                Sale Type: {listing.sale_type}
                                            </p>
                                        </li>
                                        <li>
                                            <p className="m-1">
                                                Home Type: {listing.home_type}
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
                        <div className="col-md-4 col-12 add-border p-0">
                            <div className="price-detail-div">
                                <h2 className="text-center">Price Details</h2>
                            </div>
                            <div className="row p-2 py-3">
                                <div className="col-md-7">
                                    <p>Price: </p>
                                    <p>Tax: </p>
                                </div>
                                <div className="col-md-5">
                                    <p>$ {listing.price}</p>
                                    <p>$ {listing.price * 0.13}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row p-2">
                                <div className="col-md-7">
                                    <p>Total: </p>
                                </div>
                                <div className="col-md-5">
                                    <p>
                                        $ {listing.price + listing.price * 0.13}
                                    </p>
                                </div>
                            </div>
                            <div className="make-payment-div">
                                <h2 className="text-center">
                                    Make Payment Now
                                </h2>
                            </div>
                            <div className="form-div mt-3 mx-2">
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div class="form-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="CouponCode"
                                            name="coupon"
                                            onChange={(e) => onChange(e)}
                                            value={coupon.coupon}
                                            aria-describedby="couponHelp"
                                            placeholder="Enter Coupon Code"
                                        />
                                        <small
                                            id="couponHelp"
                                            class="form-text text-muted"
                                        >
                                            We're now accepting only coupon.
                                        </small>
                                        {loading ? (
                                            <button className="btn btn-primary my-3">
                                                <Loader
                                                    type="Oval"
                                                    color="#424242"
                                                    height={32}
                                                    width={32}
                                                />
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary my-3">
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                            {show ? (
                                <Alert
                                    show={show}
                                    variant={error ? "danger" : "success"}
                                    role="alert"
                                >
                                    <p className="d-flex justify-content-between m-0">
                                        {alert}
                                        <div className="right-btn float-end">
                                            <button
                                                className="btn"
                                                onClick={() => setShow(false)}
                                            >
                                                <BackspaceIcon />
                                            </button>
                                        </div>
                                    </p>
                                </Alert>
                            ) : null}
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, {})(Buy);
