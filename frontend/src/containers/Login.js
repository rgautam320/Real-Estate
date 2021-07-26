import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../store/actions/auth";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	if (isAuthenticated) return <Redirect to='/' />;

	return (
		<>
			<div className='container'>
				<Helmet>
					<title>Real Estate - Login</title>
					<meta name='description' content='login page' />
				</Helmet>
				<h1 className='text-center font-weight-bolder brand-heading title-heading py-3'>
					Login Here
				</h1>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className='form-group px-3'>
						<input
							type='email'
							className='form-control my-4 py-4'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
						<input
							type='password'
							className='form-control my-4 py-4'
							placeholder='Password'
							name='password'
							value={password}
							minLength='6'
							onChange={(e) => onChange(e)}
							required
						/>
						<button
							type='submit'
							className='btn btn-primary my-2 py-2 px-5 font-weight-bolder'
						>
							SIGN IN
						</button>
					</div>

					<div className='row d-flex justify-content-center align-items-center my-4'>
						<div className='col-md-6 col-12 d-flex justify-content-center'></div>
						<div className='col-md-6 col-12 d-flex justify-content-end'>
							<h5>
								Don't have an account?{" "}
								<Link to='/signup' variant='body2'>
									Sign Up
								</Link>
							</h5>
						</div>
					</div>
				</form>
				<div className='my-5'>
					<h5 className='text-center pt-5'>
						Copyright &copy; Rajan Gautam, 2021 | All Right Reserved
					</h5>
				</div>
			</div>
		</>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
