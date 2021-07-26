import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { connect } from "react-redux";
import setAlert from "../store/actions/alert";
import Loader from "react-loader-spinner";
import { Email, LocationOn, Phone } from "@material-ui/icons";

const Contact = ({ setAlert }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const { name, email, subject, message } = formData;

    const [loading, setLoading] = useState(false);

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
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/contacts/`,
                { name, email, subject, message },
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
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="contact">
            <Helmet>
                <title>Real Estate - Contact</title>
                <meta name="description" content="Contact us" />
            </Helmet>
            <div className="heading-component">
                <h1>Contact</h1>
            </div>
            <div className="container mb-5">
                <div className="row my-3" data-aos="fade-in">
                    <div className="col-md-6">
                        <div className="row address">
                            <div className="col-2 d-flex align-items-center justify-content-center pl-3">
                                <LocationOn
                                    color="primary"
                                    style={{ fontSize: 40 }}
                                />
                            </div>
                            <div className="col-10">
                                <h4>Location:</h4>
                                <p>
                                    B2-710, High Rise Hostel, PDEU, Gandhinagar,
                                    382007, Gujarat
                                </p>
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
                                <p>rajan@rockriver.com</p>
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
                                <p>+91 9512245920</p>
                            </div>
                        </div>
                        <div>
                            <iframe
                                width="100%"
                                height="250"
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                                src="https://maps.google.com/maps?width=100%25&amp;height=250&amp;hl=en&amp;q=Pandit%20Deendayal%20Energy%20University+(Pandit%20Deendayal%20Energy%20University)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form className="form" onSubmit={(e) => onSubmit(e)}>
                            <div className="form-group my-2">
                                <label
                                    className="contact__form__label"
                                    htmlFor="name"
                                >
                                    Name{" "}
                                    <span style={{ color: "red" }}> *</span>
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
                                    <span style={{ color: "red" }}> *</span>
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
                                    <span style={{ color: "red" }}> *</span>
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
                                    <span style={{ color: "red" }}> *</span>
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
    );
};

export default connect(null, { setAlert })(Contact);
