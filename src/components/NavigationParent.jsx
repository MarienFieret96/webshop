import React, { useState } from "react";
import { Navbar, Sidebar } from "../components";

const NavigationParent = () => {
	const [sidebarStatus, setSidebarStatus] = useState(false);

	const handleClick = (str) => {
		if (str === "close") {
			setSidebarStatus(false);
		}
		if (str === "open") {
			setSidebarStatus(true);
		}
	};
	const onWindowResize = () => {
		if (window.innerWidth > 820) {
			setSidebarStatus(false);
		}
	};
	window.onresize = onWindowResize;

	return (
		<>
			<Navbar
				handleClick={handleClick}
				sidebarStatus={sidebarStatus}
			/>
			<Sidebar
				handleClick={handleClick}
				sidebarStatus={sidebarStatus}
			/>
		</>
	);
};

export default NavigationParent;
