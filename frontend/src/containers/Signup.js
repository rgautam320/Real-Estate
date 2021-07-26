import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../store/actions/auth";
import setAlert from "../store/actions/alert";

const Signup = ({ setAlert, isAuthenticated, signup }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		re_password: "",
	});

	const { email, name, password, re_password } = formData;
	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== re_password) {
			setAlert("Passwords do not match", "danger");
		} else {
			signup(name, email, password, re_password);
		}
	};

	if (isAuthenticated) return <Redirect to='/' />;

	return (
		<div className='container'>
			<Helmet>
				<title>Real Estate - Signup</title>
				<meta name='description' content='sign up page' />
			</Helmet>
			<h1 className='text-center font-weight-bolder brand-heading title-heading py-3'>
				Create Your Account Here
			</h1>
			<form className='mt-3 px-3' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group mt-2'>
					<input
						type='text'
						className='form-control my-3 py-4'
						placeholder='Full Name'
						name='name'
						id='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
					<input
						type='email'
						className='form-control my-3 py-4'
						placeholder='Email Address'
						name='email'
						id='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
					<input
						type='password'
						className='form-control my-3 py-4'
						placeholder='Password'
						name='password'
						id='password'
						value={password}
						minLength='6'
						onChange={(e) => onChange(e)}
						required
					/>
					<input
						type='password'
						className='form-control my-3 py-4'
						placeholder='Confirm Password'
						name='re_password'
						id='re_password'
						value={re_password}
						minLength='6'
						onChange={(e) => onChange(e)}
						required
					/>
					<button
						type='submit'
						className='btn btn-primary my-2 py-2 px-5 font-weight-bolder'
					>
						SIGN UP
					</button>
					<div className='my-3'>
						<h5>
							Already have an Account?{" "}
							<Link to='/login' variant='body2'>
								Login
							</Link>
						</h5>
					</div>
				</div>
			</form>
			<div className='mt-5'>
				<h5 className='text-center'>
					Copyright &copy; Rajan Gautam, 2021 | All Right Reserved
				</h5>
			</div>
		</div>
	);
};

Signup.propTypes = {
	signup: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, signup })(Signup);
