import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
	return (
		<div className='container my-3'>
			<h1 className='text-center class-404 py-3'>404</h1>
			<h2 className='text-center class-oops class-404 py-3'>
				<span className='res-oops'>OOPS!</span> PAGE NOT FOUND
			</h2>
			<h5 className='text-center py-3'>
				Sorry, the page you're looking for doesn't exist. Please check the URL.
			</h5>
			<center>
				<NavLink
					exact
					activeClassName='my-active'
					className='nav-item link-item'
					to='/'
				>
					<button type='button' class='btn my-3 getbackbtn'>
						Get Back to Home Page
					</button>
				</NavLink>
			</center>
		</div>
	);
};

export default NotFound;
