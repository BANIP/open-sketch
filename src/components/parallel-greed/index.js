import React from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';

const Point = ({children,title}) => (
    <div className={styles.point} >
        <h3> { title } </h3>
        <p> { children } </p>
    </div>
)

const ParallelGreed = ({items,title}) => (
    <div className={styles.highlight}>
        <h2> {title} </h2>
        <div className={styles.body}>
            {
                items.map(({content,title}) => (
                    <Point title={title}>{ content }</Point>
                ))
            }
        </div>
    </div>
);

ParallelGreed.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
        })
    ),
    title: PropTypes.string,
}
export default ParallelGreed;