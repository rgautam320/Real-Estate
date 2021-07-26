import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Profile = ({ isAuthenticated, email }) => {
    const [userInfo, setUserInfo] = useState({});
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const value = email;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        if (isAuthenticated) {
            axios
                .get(
                    `${process.env.REACT_APP_API_URL}/api/accounts/${value}/`,
                    config
                )
                .then((res) => {
                    setUserInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [email]);

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
                        return val.buyer === value;
                    });
                    setOrder(x);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [email]);

    return (
        <>
            <Helmet>
                <title>Real Estate - Profile</title>
                <meta name="description" content="sign up page" />
            </Helmet>
            {isAuthenticated ? (
                <>
                    <div className="container">
                        <div className="profile">
                            <div className="heading-component">
                                <h1>Profile</h1>
                            </div>
                            <div className="container px-5 py-5">
                                <div className="row">
                                    <div className="col-3">
                                        <h3>ID: </h3>
                                        <h3>Email: </h3>
                                        <h3>Name: </h3>
                                    </div>
                                    <div className="col-9">
                                        <h3>{userInfo.id}</h3>
                                        <h3>{email}</h3>
                                        <h3>{userInfo.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="orders">
                            <div className="heading-component mb-4">
                                <h1>Orders</h1>
                            </div>
                            {order ? (
                                <div className="table">
                                    <center>
                                        <table>
                                            <tr>
                                                <th>S.N.</th>
                                                <th>Buyer</th>
                                                <th>Title</th>
                                                <th>Total Price</th>
                                                <th>Order Time</th>
                                            </tr>
                                            {order.map((val, ind) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <th>{ind + 1}</th>
                                                            <th>{val.buyer}</th>
                                                            <th>
                                                                <Link
                                                                    to={`brought/${val.slug}`}
                                                                >
                                                                    {val.title}
                                                                </Link>
                                                            </th>
                                                            <th>
                                                                {
                                                                    val.total_price
                                                                }
                                                            </th>
                                                            <th>
                                                                {val.order_date.substring(
                                                                    0,
                                                                    10
                                                                )}{" "}
                                                                {val.order_date.substring(
                                                                    11,
                                                                    19
                                                                )}
                                                            </th>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </table>
                                    </center>
                                </div>
                            ) : (
                                <center>
                                    <h1>No Order Yet</h1>
                                </center>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-center">
                        Login to see your profile. <br /> <br />
                        <Link to="/login">
                            <h1>Login</h1>
                        </Link>
                    </h2>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    email: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
