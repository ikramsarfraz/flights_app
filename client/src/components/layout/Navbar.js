import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">flight</i>
                Flight App
              </Link>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: ".1rem",
                  marginRight: "1rem",
                  float: "right"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large btn-flat waves-effect hoverable white red-text"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">flight</i>
                Flight App
              </Link>
            </div>
          </nav>
        </div>
      );
    }
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
