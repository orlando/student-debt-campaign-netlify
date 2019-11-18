import React, { useState, useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { trackOutboundLink } from "../../lib/metrics";
import { Collapse } from "react-bootstrap";
import { Link } from "gatsby";

const Profile = ({ user, ...rest }) => {
  return user.id ? (
    <div id="user-profile" className="user-profile" data-testid="profile">
      <a
        href={`${process.env.GATSBY_COMMUNITY_URL}/u/${user.username}/`}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        <img
          className="rounded-circle"
          src={user.avatar_url}
          alt={user.username}
        />
        <span className="profile-text ml-2 d-none d-sm-inline-block">
          {user.username}
        </span>
      </a>
    </div>
  ) : null;
};

Profile.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string
  })
};

const Header = ({ user }) => {
  const [scrollY, setScrollY] = useState(false);
  const [open, setOpen] = useState(false);
  const headerEl = useRef(null);
  const isLoggedIn = user.id;

  const isScrolled =
    headerEl.current && scrollY > headerEl.current.scrollHeight / 2;

  const headerClasses = classNames("header", "fixed-top", {
    "slider-nav-open": open,
    active: isScrolled
  });
  const menuTriggerClasses = classNames("menu-trigger", { active: open });

  useLayoutEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <header ref={headerEl} className={headerClasses}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-lg-3 d-xl-none">
              <div className="header-col justify-content-start">
                <div
                  id="menu-trigger"
                  className={menuTriggerClasses}
                  role="button"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-controls="slider-nav"
                >
                  <div className="menu-icon">
                    <span className="menu-stripe"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-6 col-xl-9">
              <div className="header-col justify-content-xl-start">
                <Link to="/">
                  <img
                    className="logo"
                    src="/img/logo-light.svg"
                    alt="debtcollective logo"
                    width="100%"
                  />
                </Link>
                <div className="d-none d-xl-flex">
                  <ul className="nav align-items-center" role="navigation">
                    <li className="nav-item">
                      <Link to="#faq" className="nav-link">
                        FAQ
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://debtcollective.org/donate"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={trackOutboundLink}
                      >
                        Donate
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-3 col-lg-3">
              <div className="header-col justify-content-end buttons">
                {isLoggedIn ? (
                  <Profile user={user} />
                ) : (
                  <>
                    {/* >= lg */}
                    <a
                      href={`${process.env.GATSBY_COMMUNITY_URL}/signup`}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="button"
                      onClick={trackOutboundLink}
                      className="btn btn-lg btn-outline-dark d-none d-xl-block btn-session"
                    >
                      Sign up
                    </a>
                    {/* >= md */}
                    <a
                      href={`${process.env.GATSBY_COMMUNITY_URL}/login`}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="button"
                      onClick={trackOutboundLink}
                      className="btn btn-primary btn-lg d-none d-md-block btn-session"
                    >
                      Login
                    </a>
                    {/* small */}
                    <a
                      href={`${process.env.GATSBY_COMMUNITY_URL}/login`}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="button"
                      onClick={trackOutboundLink}
                      className="btn btn-primary btn-sm d-md-none d-xs-block d-sm-block btn-session"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Collapse in={open}>
        <div id="slider-nav" className="slider-nav d-xl-none">
          <ul className="nav flex-column" role="navigation">
            <li className="nav-item">
              <Link to="#faq" className="nav-link">
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://debtcollective.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackOutboundLink}
              >
                Donate
              </a>
            </li>
          </ul>
        </div>
      </Collapse>
    </>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string
  })
};

Header.defaultProps = {
  user: {}
};

export default Header;
