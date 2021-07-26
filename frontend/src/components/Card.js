import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Card = (props) => {
    const address = `${props.address}, ${props.city}, ${props.state}, ${props.country}`;

    return (
        <div className="card m-2">
            <h3 className="card-title text-center pt-2">{props.title}</h3>
            <div className="card-image">
                <img
                    height="250"
                    width="100%"
                    className="card__header__photo"
                    src={props.photo_main}
                    alt=""
                />
            </div>
            <p className="my-2 font-weight-bold">
                {address.length < 35
                    ? address
                    : address.substring(0, 35) + " ..."}
            </p>
            <div className="row">
                <div className="col-md-6">
                    <p className="m-0">Price: ${props.price}</p>
                    <p className="m-0">Bedrooms: {props.bedrooms}</p>
                    <p className="m-0">Bathrooms: {props.bathrooms}</p>
                </div>
                <div className="col-md-6">
                    <p className="m-0">Sale: {props.sale_type}</p>
                    <p className="m-0">Type: {props.home_type}</p>
                    <p className="m-0">Area: {props.sqft} sqft.</p>
                </div>
            </div>
            <Link className="my-2" to={`/listing/${props.slug}`}>
                <Button variant="outlined" color="primary">
                    View Listing
                </Button>
            </Link>
        </div>
    );
};

export default Card;
