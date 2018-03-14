import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './sources.scss';

export const ToolItem = ({ children, label, modal, isModalHide}) => {
    return (
        <div className={styles.toolItem}>
            <div className={styles.label}>
                { label }
            </div>
            <div className={styles.content}>
                { children }
            </div>
            <div className={classnames({
                [styles.modal] : true, 
                [styles.hidden] : isModalHide 
            })}>
                { modal }
            </div>
        </div>
    )
}

ToolItem.propTypes = {
    label: PropTypes.instanceOf(Component),
    modal: PropTypes.instanceOf(Component),
    isModalHide: PropTypes.bool,
    children: PropTypes.any.required,
}

ToolItem.defaultProps = {
    label: "이름",
    modal: undefined,
    isModalHide: true,
    children: "값",
}