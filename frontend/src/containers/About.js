import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

const About = () => {
	const [topSeller, setTopSeller] = useState([]);
	const [realtors, setRealtors] = useState([]);

	useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const getTopSeller = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/realtors/topseller/`,
					config
				);
				setTopSeller(res.data);
			} catch (err) {
				console.log("Error" + err);
			}
		};

		getTopSeller();
	}, []);

	useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const getRealtors = async () => {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/realtors/`,
					config
				);
				setRealtors(res.data);
			} catch (err) {
				console.log("Error" + err);
			}
		};

		getRealtors();
	}, []);

	return (
		<main className='about'>
			<Helmet>
				<title>Real Estate - About</title>
				<meta name='description' content='About us' />
			</Helmet>
			<header className='heading-component'>
				<h1 className='font-weight-bold'>River Rock Real Estate</h1>
			</header>
			<section className='container my-3'>
				<div className='row'>
					<div className='col-md-9'>
						<h1 className='subheading-about py-3'>
							We find the perfect home for you
						</h1>
						<p className='text-justify'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Sed vitae sapien a diam eleifend faucibus. Suspendisse
							vitae sodales leo. Proin hendrerit aliquam interdum.
							Maecenas tellus ante, ultrices id justo id, venenatis
							hendrerit orci. Orci varius natoque penatibus et magnis
							dis parturient montes, nascetur ridiculus mus. Praesent
							aliquam condimentum ligula eget ullamcorper.
						</p>
						<div className='about__display'>
							<img
								width='100%'
								height='auto'
								src='https://pbs.twimg.com/media/EYuaH_GWkAAsA5A.jpg'
								alt='Cristiano Ronaldo Ghar'
							/>
						</div>
						<p className='text-justify mt-3'>
							Suspendisse gravida magna posuere purus laoreet, et
							elementum velit placerat. Fusce at convallis erat.
							Curabitur placerat eros eu interdum lacinia. Nulla
							facilisi. Duis pretium tristique porta. Donec vehicula est
							a massa interdum vehicula. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Mauris malesuada lacus
							mauris, eu ultrices neque egestas eu. Class aptent taciti
							sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos. Morbi elementum enim vitae purus
							pulvinar tincidunt. Aenean id viverra leo, non vehicula
							odio. Vestibulum volutpat a nulla at mattis. Nam cursus
							semper sapien, eu consequat lacus iaculis vel.
						</p>
					</div>
					<div className='col-md-3'>
						{topSeller.map((val, ind) => {
							return (
								<div key={ind}>
									<div className='heading-component mb-4'>
										<h2>Top Seller</h2>
									</div>
									<figure>
										<img
											src={val.photo}
											alt='Realtor Tasbir'
											width='100%'
											height='auto'
										/>
									</figure>
									<div className='details-realtor'>
										<h2>{val.name}</h2>
										<h5>{val.phone}</h5>
										<h5 className='pb-3'>{val.email}</h5>
										<p
											className='text-justify'
											style={{ color: "black" }}
										>
											{val.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			<section className='container my-4'>
				<h1 className='subheading-about py-3'>Meet out awesome team!</h1>
				<div className='row'>
					{realtors.map((val, ind) => {
						return (
							<div className='col-md-4' key={ind}>
								<div className='other-realters-card'>
									<figure>
										<img
											src={val.photo}
											alt='Realtor Tasbir'
											width='100%'
											height='auto'
										/>
									</figure>
									<div className='details-realtor'>
										<h2>{val.name}</h2>
										<h5>{val.phone}</h5>
										<h5 className='pb-3'>{val.email}</h5>
										<p
											className='text-justify'
											style={{ color: "black" }}
										>
											{val.description.length < 120
												? val.description
												: val.description.substring(
														0,
														120
												  )}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default About;
