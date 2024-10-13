import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
			<header>
				<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
					<Container>
						<LinkContainer to="/">
							<Navbar.Brand>ProShop</Navbar.Brand>
						</LinkContainer>

						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<SearchBox />
							<Nav className="ml-auto">
								<LinkContainer to="/cart">
									<Nav.Link>
										<i className="fas fa-shopping-cart"></i>Cart
									</Nav.Link>
								</LinkContainer>

								{userInfo ? (
									<NavDropdown title={userInfo.name} id="username">
										<LinkContainer to="/profile">
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>

										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								) : (
									<LinkContainer to="/login">
										<Nav.Link>
											<i className="fas fa-user"></i>Login
										</Nav.Link>
									</LinkContainer>
								)}

								{userInfo && userInfo.role === "admin" && (
									<NavDropdown title="Admin" id="adminmenue">
										<LinkContainer to="/admin/userlist">
											<NavDropdown.Item>Users</NavDropdown.Item>
										</LinkContainer>

										{/* <LinkContainer to="/admin/orderlist">
											<NavDropdown.Item>Orders</NavDropdown.Item>
										</LinkContainer> */}
									</NavDropdown>
								)}

								{userInfo && userInfo.role === "shopper" && (
									// <LinkContainer to="#">
									<Nav.Link eventKey="disabled" className="text-white">
										Shopper
									</Nav.Link>
									// </LinkContainer>
								)}

								{userInfo && userInfo.role === "seller" && (
                                    <NavDropdown title="Seller" id="sellermenue">
                                        <LinkContainer to="/seller/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		);
}

export default Header
