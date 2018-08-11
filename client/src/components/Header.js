import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {

    renderLinks() {
        const { authenticated } = this.props;
        if(authenticated) {
            return (
                <div>
                    <Link to="/signout">Sign Out</Link>
                    <Link to="/feature">Feature</Link>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            ) 
        }

    }

    render() {
        return (
            <div className="header">
                <Link to="/">Redux Auth</Link>
                {this.renderLinks()}
            </div>
        );
    }
}

const mappStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mappStateToProps)(Header);