import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import styles from './index.scss';

const Item = ({ isActive, title, onClick, name,  ...props }) => {
  return (
    <div className={classnames({
            [styles.active]:isActive,
            [styles.icon]:true }) }>
        <FontAwesome 
            size="2x"
            name={name}
            title={title} 
            onClick={onClick}
            {...props}
        />
    </div>
  )
};

Item.propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string,
    title: PropTypes.string,
    isActive: PropTypes.bool,
};

Item.defaultProps = {
    onClick: () => alert("Item onclick props was not bind"),
    name: "question-circle-o",
};

export default Item;
