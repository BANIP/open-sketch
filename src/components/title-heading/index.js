import React from 'react';
import PropTypes from "prop-types";
import style from './index.scss'
const TitleHeading = ({main, sub, id}) => (
    <div className={style.titleHeading} id={ id } >
        <h1>
            <div className={style.titieWrap}>
                <div className={style.titleContainer}>
                    { main }
                </div>
            </div>
            <div className={style.subWrap}>
                <div className={style.subContainer}>
                    <small>{ sub }</small>
                </div>
            </div>
        </h1>
    </div>
);

TitleHeading.propTypes = {
    main: PropTypes.string,
    sub: PropTypes.string,
    id: PropTypes.string,
}

TitleHeading.defaultProps = {
    main: "maintext",
    sub: "subtext",
    id: null,
}

export default TitleHeading;