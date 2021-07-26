import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

const ListingForm = (props) => {
    const [formData, setFormData] = useState({
        sale_type: "For Sale",
        price: "$0+",
        bedrooms: "0+",
        home_type: "House",
        bathrooms: "0+",
        sqft: "1000+",
        days_listed: "Any",
        has_photos: "1+",
        keywords: "",
    });

    const {
        sale_type,
        price,
        bedrooms,
        home_type,
        bathrooms,
        sqft,
        days_listed,
        has_photos,
        keywords,
    } = formData;
    const open_house = "true";

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
                `${process.env.REACT_APP_API_URL}/api/listings/search`,
                {
                    sale_type,
                    price,
                    bedrooms,
                    home_type,
                    bathrooms,
                    sqft,
                    days_listed,
                    has_photos,
                    open_house,
                    keywords,
                },
                config
            )
            .then((res) => {
                setLoading(false);
                props.setListings(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                setLoading(false);
                window.scrollTo(0, 0);
            });
    };

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/listings/search`,
                {
                    sale_type,
                    price,
                    bedrooms,
                    home_type,
                    bathrooms,
                    sqft,
                    days_listed,
                    has_photos,
                    open_house,
                    keywords,
                },
                config
            )
            .then((res) => {
                setLoading(false);
                props.setListings(res.data);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <form className="px-1" onSubmit={(e) => onSubmit(e)}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="listingform__section">
                            <label
                                className="listingform__label"
                                htmlFor="sale_type"
                            >
                                Sale or Rent
                            </label>
                            <select
                                className="form-control"
                                name="sale_type"
                                onChange={(e) => onChange(e)}
                                value={sale_type}
                            >
                                <option>For Sale</option>
                                <option>For Rent</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="sqft">
                            Square Foot
                        </label>
                        <select
                            className="form-control"
                            name="sqft"
                            onChange={(e) => onChange(e)}
                            value={sqft}
                        >
                            <option>1000+</option>
                            <option>1200+</option>
                            <option>1500+</option>
                            <option>2000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="price">
                            Minimum Price
                        </label>
                        <select
                            className="form-control"
                            name="price"
                            onChange={(e) => onChange(e)}
                            value={price}
                        >
                            <option>$0+</option>
                            <option>$200,000+</option>
                            <option>$400,000+</option>
                            <option>$600,000+</option>
                            <option>$800,000+</option>
                            <option>$1,000,000+</option>
                            <option>$1,200,000+</option>
                            <option>$1,500,000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="days_listed"
                        >
                            Days Listed
                        </label>
                        <select
                            className="form-control"
                            name="days_listed"
                            onChange={(e) => onChange(e)}
                            value={days_listed}
                        >
                            <option>Any</option>
                            <option>1 or less</option>
                            <option>2 or less</option>
                            <option>5 or less</option>
                            <option>10 or less</option>
                            <option>20 or less</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="bedrooms"
                        >
                            Bedrooms
                        </label>
                        <select
                            className="form-control"
                            name="bedrooms"
                            onChange={(e) => onChange(e)}
                            value={bedrooms}
                        >
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                            <option>5+</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="has_photos"
                        >
                            Has Photos
                        </label>
                        <select
                            className="form-control"
                            name="has_photos"
                            onChange={(e) => onChange(e)}
                            value={has_photos}
                        >
                            <option>1+</option>
                            <option>3+</option>
                            <option>5+</option>
                            <option>10+</option>
                            <option>15+</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="home_type"
                        >
                            Home Type
                        </label>
                        <select
                            className="form-control"
                            name="home_type"
                            onChange={(e) => onChange(e)}
                            value={home_type}
                        >
                            <option>House</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label
                            className="listingform__label"
                            htmlFor="bathrooms"
                        >
                            Baths
                        </label>
                        <select
                            className="form-control"
                            name="bathrooms"
                            onChange={(e) => onChange(e)}
                            value={bathrooms}
                        >
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label
                            className="listingform__label"
                            htmlFor="keywords"
                        >
                            Keywords
                        </label>
                        <input
                            className="form-control"
                            name="keywords"
                            type="text"
                            onChange={(e) => onChange(e)}
                            value={keywords}
                        />
                    </div>
                    <div className="col-md-6">
                        {loading ? (
                            <div className="form-group d-flex justify-content-center px-4 mt-4">
                                <Loader
                                    type="Oval"
                                    color="#424242"
                                    height={48}
                                    width={48}
                                />
                            </div>
                        ) : (
                            <div className="form-group d-flex justify-content-center">
                                <button className="btn btn-primary py-2 px-4 mt-4">
                                    Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
            <hr />
        </div>
    );
};

ListingForm.propTypes = {
    setListings: PropTypes.func.isRequired,
};

export default ListingForm;
