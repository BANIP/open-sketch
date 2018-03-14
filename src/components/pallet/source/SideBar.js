import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';
import classNames from 'classnames';
const SideBar = ({ children, direction, width,className }) => (
    <div className={
        classNames([ 
            styles[direction], 
            styles.sideBar,
            className
        ])} 
        style={
            {width}
        }>
      { children }
    </div>
  )
  
  SideBar.propTypes = {
      children: PropTypes.any,
      direction: PropTypes.oneOf(["left","right","top","bottom"]),
      width: PropTypes.string,
      className: PropTypes.string,
  }

  SideBar.defaultProps = {
    width: "2.4em",
}

export default SideBar;