import React, {Component} from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

import './ColorCircles.css';
import { connect } from "react-redux";
import { changeColor } from "actions";

class ColorCircle extends Component {
    shouldComponentUpdate(props){
        const isColorChanged = props.colorType != this.props.colorType;
        if( isColorChanged ) return true

        const isprevActive = this.props.colorType == this.props.activeColor;
        const isnextActive = props.colorType == props.activeColor;
        if( isprevActive != isnextActive ) return true
        
        return false
    }

    render() {
        const { colorType, isActive, onChangeStyle }  = this.props;

        return (
            <div style={ {backgroundColor:colorType} }
                 className={ classNames( {active:isActive} ,"color-circle") }
                 onClick={ () => onChangeStyle(colorType) } />
        );
    }
}

ColorCircle.propTypes = {
    colorType: propTypes.string,
    onChangeStyle: propTypes.func,
    isActive: propTypes.bool
}

export default ColorCircle;
