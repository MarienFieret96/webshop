import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar } from "../../components";

const LinkVars = {
	initial: {
		y: "30vh",
		transition: {
			duration: 0.3,
			ease: [0.37, 0, 0.63, 1],
		},
	},
	open: {
		y: 0,
		transition: {
			ease: [0, 0.55, 0.45, 1],
			duration: 0.5,
		},
	},
};

const NavLink = ({ title, href, handleClick }) => {
	const navigate = useNavigate();
	return (
		<motion.div
			onClick={() => {
				handleClick("close");
				navigate(href);
			}}
			variants={LinkVars}
			className={`link ${href}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<h6>{title}</h6>
		</motion.div>
	);
};

const navLinks = [
	{ title: "Producten", href: "/producten" },
	{ title: "Openingstijden", href: "/openingstijden" },
];

const menuVars = {
	initial: {
		scaleY: 0,
	},
	animate: {
		scaleY: 1,
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		scaleY: 0,
		transition: {
			delay: 0.1,
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};
const menuHomeVars = {
	initial: {
		scaleY: 0,
	},
	animate: {
		scaleY: 1,
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		scaleY: 0,
		transition: {
			// delay: 0.1,
			duration: 0,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};
const containerVars = {
	initial: {
		transition: {
			staggerChildren: 0.09,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			delayChildren: 0.1,
			staggerChildren: 0.09,
			staggerDirection: 1,
		},
	},
};

const Sidebar = ({ handleClick, sidebarStatus }) => {
	const { pathname } = useLocation();
	return (
		<Wrapper>
			<AnimatePresence mode="wait">
				{sidebarStatus && (
					<>
						<motion.div
							className="overlay"
							variants={
								pathname === "/" ? menuHomeVars : menuVars
							}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							<div className="sidebar">
								<motion.div
									className="content"
									variants={containerVars}
									initial="initial"
									animate="open"
									exit="initial"
								>
									{navLinks.map((link, index) => {
										return (
											<div
												key={index}
												className="nav-container"
											>
												<NavLink
													handleClick={handleClick}
													title={link.title}
													href={link.href}
												/>
											</div>
										);
									})}
									<SearchBar handleClick={handleClick} />
								</motion.div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</Wrapper>
	);
};

const Wrapper = styled.nav`
	z-index: 999;
	position: sticky;
	top: 5rem;
	.overlay {
		position: absolute;
		top: -1px;
		left: 0;
		width: 100%;
		height: auto;
		transform-origin: top;
		box-shadow: 0px 4px 3px #33333310;
		background-color: var(--clr-white);
		z-index: 998;

		.sidebar {
			height: 100%;
			.content {
				padding: 3.25rem;
				padding-top: 1rem;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				.nav-container {
					overflow: hidden;
					.link h6 {
						text-align: center;
						font-size: var(--fs-400);
						font-weight: 600;
						cursor: pointer;
						padding: 0.5rem 1rem;
					}
					.search {
						border: var(--border-dark);
						border-radius: var(--radius);
					}
				}
				.nav-container:nth-child(3) {
					margin-bottom: 1rem;
				}
			}
		}
	}
`;

export default Sidebar;
