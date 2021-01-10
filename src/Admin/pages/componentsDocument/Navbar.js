import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="empnav">
			<Link className="empnavLink" to="/docs">
				Home
			</Link>
			<Link className="empnavLink" to="/docs/add">
				Add Document
			</Link>
		</div>
	);
};
