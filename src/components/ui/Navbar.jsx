import React, { useState, useEffect } from "react";
import {
	Link,
	NavLink,
	useLocation,
	useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../../context/cart_context";
import { NavSearch } from "../../components";
import {
	Cart,
	Close,
	Profile,
	Menu,
	Search,
} from "../../assets/icons";
import LogoWit from "../../assets/images/Logo_FVZ_wit.png";
import LogoWit2 from "../../assets/images/Frame22.png";
import LogoBlauw from "../../assets/images/Logo_FVZ_blauw.png";

const Navbar = ({ handleClick, sidebarStatus }) => {
	const { total_items, nav_layout, add_background } =
		useCartContext();
	console.log(nav_layout);
	// console.log(add_background);

	const { pathname } = useLocation();
	const [offset, setOffset] = useState(0);
	const navigate = useNavigate();

	const logoClick = () => {
		handleClick("close");
		navigate("/");
	};

	useEffect(() => {
		const onScroll = () => setOffset(window.scrollY);
		// clean up code
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll, {
			passive: true,
		});
		return () =>
			window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<Wrapper
			style={{
				backgroundColor:
					sidebarStatus || pathname !== "/" || !nav_layout
						? "var(--clr-white)"
						: "transparent",
				boxShadow:
					offset > 50 ? "0px 4px 3px #33333310" : "none",
				backdropFilter:
					offset > 50 && !add_background
						? "blur(5px)"
						: "none",
			}}
		>
			<nav
				className={
					pathname === "/" && nav_layout && !sidebarStatus
						? "wrapper home"
						: "wrapper"
				}
			>
				{sidebarStatus ? (
					<div
						className="icon hamburger"
						onClick={() => handleClick("close")}
					>
						<Close />
					</div>
				) : (
					<div
						className="icon hamburger"
						onClick={() => handleClick("open")}
					>
						<Menu />
					</div>
				)}
				{pathname === "/" &&
				nav_layout &&
				!sidebarStatus ? (
					<div className="logo wit" onClick={logoClick}>
						<img src={LogoWit2} alt="" />
					</div>
				) : (
					<div className="logo blauw" onClick={logoClick}>
						<img src={LogoBlauw} alt="" />
					</div>
				)}

				<div className="links">
					<NavLink to="/producten">Producten</NavLink>
					<NavLink to="/openingstijden">
						Openingstijden
					</NavLink>
				</div>
				<div className="icons">
					<div className="desktop">
						<NavSearch />
					</div>
					<div
						className="icon user"
						onClick={() => handleClick("close")}
					>
						<Link to="/gebruiker">
							<Profile />
						</Link>
					</div>
					<div
						className="icon cart"
						onClick={() => handleClick("close")}
					>
						{total_items !== 0 && (
							<div className="cart-items center">
								{total_items}
							</div>
						)}

						<Link to="/winkelwagen">
							<Cart />
						</Link>
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	height: 5rem;
	z-index: 989;
	position: sticky;
	top: 0;
	/* transition: var(--transition); */
	.wrapper {
		display: flex;
		align-items: center;
		height: 100%;
		h3 {
			margin: 0;
		}
		.logo {
			margin-right: auto;
			padding: 10px 0;
			cursor: pointer;
			img {
				max-width: auto;
				height: 48px;
			}
		}

		.links {
			gap: 16px;
			margin-right: 8px;
			display: none;
			.active {
				border-bottom: 1px solid black;
			}
		}
		.icons {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 8px;
			height: 48px;
			.desktop {
				display: none;
			}
		}
		.icon {
			height: 48px;
			min-height: 48px;
			width: 48px;
			min-width: 48px;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			a {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 100%;
			}
		}
		.cart {
			position: relative;
			.cart-items {
				position: absolute;
				top: 5px;
				right: 5px;
				background-color: var(--clr-dark-beige);
				aspect-ratio: 1;
				height: 15px;
				border-radius: 999px;
				font-size: var(--fs-200);
				pointer-events: none;
			}
		}
		.logo,
		.hamburger {
			transform: translateX(-14px);
		}
	}
	.wrapper a:first-child {
		flex: 1;
	}
	.home {
		.links a {
			color: var(--clr-white);
		}
		.hamburger svg {
			path {
				stroke: var(--clr-white);
			}
		}
		.user svg path {
			fill: var(--clr-white);
		}
		.cart svg {
			path,
			circle {
				stroke: var(--clr-white);
			}
		}
	}
	@media screen and (min-width: 700px) {
		.wrapper {
			.links {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 32px;
				a svg {
					transform: translateY(3.3px);
				}
			}
			.icons {
				.desktop {
					display: block;
				}
				.navbar-search-overlay {
					position: fixed;
					inset: 0;
					background-color: #00000040;

					z-index: 990;
				}
				.navbar-search {
					display: flex;
					border-radius: 999px;
					background-color: #fff;
					/* box-shadow: 0px 0px 1px var(--clr-dark-blue); */
					overflow-x: clip;
					width: 48px;
					height: 48px;
					background-color: var(--clr-white);
					z-index: 991;
					position: relative;

					input {
						width: 100%;
						border: none;
						padding: 12px 0;
						background-color: transparent;
					}
					input:focus {
						border: none;
						outline: none;
					}
					.search-results {
						position: absolute;
						bottom: -308px;
						width: 100%;
						background-color: #fff;
						display: flex;
						flex-direction: column;
						border-radius: var(--radius);

						overflow: clip;
						.search-result {
							width: 100%;
							height: 50px;
							display: flex;
							padding: 0 8px;
							align-items: center;
							border-top: 1px solid var(--clr-light-grey);
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-line-clamp: 1;
							line-clamp: 1;
							-webkit-box-orient: vertical;
							cursor: pointer;
							h4 {
								padding: 0 8px;
							}
						}
					}
					.white svg {
						path {
							fill: var(--clr-white);
						}
						circle {
							stroke: var(--clr-white);
						}
					}
				}
			}
			.logo {
				transform: none;
			}

			.hamburger {
				display: none;
			}
		}
	}
`;

export default Navbar;
