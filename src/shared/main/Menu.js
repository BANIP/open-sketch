import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./Menu.scss"; 
const MenuItem = ({name, path, isExact}) => (
    <li className={ styles.menuitem }>
        <NavLink className={ styles.itemlink } to={path} activeClassName="active" exact={isExact}>
            {name}
        </NavLink>
    </li>
);

MenuItem.propTypes = {
    name: PropTypes.string,
    path: PropTypes.string,
    isExact: PropTypes.bool,
}

class Menu extends Component {

    render() {
        const { links } = this.props;
        const MenuItems = links.map( ({ name, path, isExact },i) => (
            <MenuItem isExact={isExact} name={name} path={path} key={i} />
        ));
        return (
            <ul id={styles.menu}>
                {MenuItems}
            </ul>
        );
    }
}

Menu.propTypes = {
    links : PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string,
            isExact: PropTypes.bool,
        })
    ).isRequired

}

export default Menu;