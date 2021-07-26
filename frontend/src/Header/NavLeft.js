import React from "react";
import { Home, ContactMail, ListAlt, Info } from "@material-ui/icons";
import { CircleMenu, CircleMenuItem } from "react-circular-menu";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NavLeft = () => {
	return (
		<div className='circular-nav-left'>
			<CircleMenu
				startAngle={-25}
				rotationAngle={180}
				itemSize={3}
				radius={5}
				menuToggleClassName='toggle-menu'
				rotationAngleInclusive={false}
			>
				<CircleMenuItem
					onClick={() => {}}
					tooltip='Home'
					tooltipPlacement='right'
					className='menu-item'
				>
					<Button>
						<Link exact to='/'>
							<Home color='primary' fontSize='large' />
						</Link>
					</Button>
				</CircleMenuItem>
				<CircleMenuItem
					tooltip='Listing'
					className='menu-item'
					tooltipPlacement='right'
				>
					<Button>
						<Link exact to='/listing'>
							<ListAlt color='primary' fontSize='large' />
						</Link>
					</Button>
				</CircleMenuItem>
				<CircleMenuItem
					tooltip='About'
					className='menu-item'
					tooltipPlacement='right-end'
				>
					<Button>
						<Link exact to='/about'>
							<Info color='primary' fontSize='large' />
						</Link>
					</Button>
				</CircleMenuItem>
				<CircleMenuItem
					tooltip='Contact'
					className='menu-item'
					tooltipPlacement='bottom'
				>
					<Button>
						<Link exact to='/contact'>
							<ContactMail color='primary' fontSize='large' />
						</Link>
					</Button>
				</CircleMenuItem>
			</CircleMenu>
		</div>
	);
};

export default NavLeft;
