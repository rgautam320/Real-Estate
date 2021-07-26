import React from "react";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

const Heading = () => {
	return (
		<>
			<div className='heading'>
				<h1 className='text-center font-weight-bolder brand-heading'>
					<Link exact to='/'>
						Welcome to River Rock Real Estate
					</Link>
				</h1>
			</div>
			<Alert />
		</>
	);
};

export default Heading;
