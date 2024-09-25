import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NavLink = ({ title, href, handleClick }) => {
	const navigate = useNavigate();
	return (
		<motion.div
			onClick={() => {
				handleClick("close");
				navigate(href);
			}}
			className={`link ${href}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<h6>{title}</h6>
		</motion.div>
	);
};

const navLinks = [
	{ title: "Over Ons", href: "/over-ons" },
	{ title: "Producten", href: "/producten" },
	{ title: "Veel gestelde vragen", href: "/faq" },
];

const menuVars = {
	initial: {
		width: 0,
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	animate: {
		width: "100%",
		transition: {
			duration: 0.3,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		width: 0,
		transition: {
			delay: 0.1,
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const Sidebar = ({ handleClick, sidebarStatus }) => {
	return (
		<Wrapper>
			<AnimatePresence mode="wait">
				{sidebarStatus && (
					<>
						<motion.div
							className="overlay"
							variants={menuVars}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							<div className="sidebar">
								<div className="content">
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
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
			<div className="line"></div>
		</Wrapper>
	);
};

const Wrapper = styled.nav`
	z-index: 998;
	position: sticky;
	top: 5rem;

	.line {
		content: "";
		width: 100%;
		height: 1px;
		background-color: var(--clr-grey-7);
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		transform-origin: left;
		border-bottom: var(--border);
		background-color: var(--clr-grey-10);
		z-index: 998;
		.sidebar {
			height: calc(100vh - 5rem - 1px);
			overflow: hidden;
			.content {
				width: var(--width);
				margin-inline: auto;
				display: flex;
				flex-direction: column;
				gap: 2rem;

				.nav-container {
					overflow: hidden;

					display: flex;
					align-items: center;
					.link h6 {
						text-align: start;
						font-size: var(--fs-400);
						font-weight: 600;
						cursor: pointer;
						white-space: nowrap;
					}
					.search {
						color: var(--clr-accent);
						border: var(--border-dark);
						border-radius: var(--radius);
					}
				}
			}
		}
	}
`;

export default Sidebar;
