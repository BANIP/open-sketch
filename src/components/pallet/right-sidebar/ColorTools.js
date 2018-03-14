import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ImmutablePropTypes from "react-immutable-proptypes";
import { SketchPicker } from 'react-color';

import { ToolItem } from './sources';
import ToolsGroup from 'components/pallet/source/ToolsGroup';
import styles from './ColorTools.scss';
import transparentImage from './src/transparent.jpg'
import shortid from 'shortid';

const ColorBox = ( {onClick, color, name, isStroke, className} ) => {
    const transparentImageStyle = {
        background: `url(${transparentImage})`
    }
    const colorStyle = {
        background:color
    };

    return (
        <div className={ styles.colorBoxWrap } onClick={ onClick }>
            <div className={ classnames([styles.colorBox, className]) } style={transparentImageStyle} >
                <div className={ styles.innerBox } style={ colorStyle } >
                    { isStroke? (<div className={styles.strokeDivider} />) : undefined }
                </div>
            </div>
            <div className={ styles.coloBoxName}>
                {name}
            </div>
        </div>
    )
}

class ColorToolItem extends Component {
  static propTypes = {
    colorType:PropTypes.string,
    onChangeColor:PropTypes.func.required,
    colorBoxProps:PropTypes.object.required,
    children:PropTypes.any,
    activeColorPicker: PropTypes.string,
    onSetColorPicker: PropTypes.func,
    colorPickerId: PropTypes.string
  }

  state = {
      colorPickerId : shortid.generate(),
  }
  static defaultProps = {
    children: (<div />),
    colorType: "fillStyle",
  }

  handlePickerToggle = () => {
    const { onSetColorPicker, activeColorPicker } = this.props;
    const { colorPickerId } = this.state;
    const nextColorPickerId = colorPickerId === activeColorPicker ? null : colorPickerId
    onSetColorPicker({activeColorPicker: nextColorPickerId});
  }

  handleColorChange = ({ rgb }) => {
    const { onChangeColor,colorType } = this.props;
    const rgbaString = `rgba(${Object.values(rgb).join(",")})`;
    return onChangeColor({[colorType]: rgbaString});
  }


  render() {
    const { handlePickerToggle, handleColorChange } = this; 
    const { children,colorBoxProps, activeColorPicker } = this.props;
    const { colorPickerId } = this.state;

    const ColorBoxLabel = (
        <ColorBox {...colorBoxProps} onClick={handlePickerToggle} />
    );

    const ColorPicker = (
        <SketchPicker 
            className={styles.sketchPicker}
            color={colorBoxProps.color}
            onChangeComplete={handleColorChange} />
    );

    return (
        <ToolItem 
            label={ColorBoxLabel}
            modal={ColorPicker}
            isModalHide={!(activeColorPicker === colorPickerId)}>
            { children }
        </ToolItem>
    )
  }
};

const ColorToolsContainer = ({
    onChangeFillStyle,
    onChangeStrokeStyle,
    fillStyle,
    strokeStyle,
    onChangeStrokeWidth,
    strokeWidth,
    activeColorPicker,
    onSetColorPicker,
}) => (
    <ToolsGroup title="모양" className={styles.colorTools}>
        <div className={ styles.colorBoxWrap }>
            <ColorToolItem 
                colorType="fillStyle"
                onChangeColor={ onChangeFillStyle }
                activeColorPicker= {activeColorPicker}
                onSetColorPicker= {onSetColorPicker}
                colorBoxProps={
                    {color:fillStyle,
                    name:"채우기"}} />
            <ColorToolItem 
                colorType="strokeStyle"
                onChangeColor={ onChangeStrokeStyle }
                activeColorPicker= {activeColorPicker}
                onSetColorPicker= {onSetColorPicker}

                colorBoxProps={
                    {color:strokeStyle,
                    name:"테두리",
                    isStroke:true}}>
                <input 
                    className="inp"
                    type="number"
                    onChange={
                        ({target}) => onChangeStrokeWidth({strokeWidth:parseInt(target.value)}) 
                    }
                    value={strokeWidth}
                />
            </ColorToolItem>
        </div>
    </ToolsGroup>
)

ColorToolsContainer.propTypes = {
    onChangeStrokeStyle: PropTypes.func,
    strokeStyle: PropTypes.string,
    onChangeFillStyle: PropTypes.func,
    fillStyle: PropTypes.string,
    onChangeStrokeWidth: PropTypes.func,
    strokeWidth: PropTypes.number,
    onChangeFigureData: PropTypes.func,
    activeColorPicker: PropTypes.string,
    onSetColorPicker: PropTypes.func,
}

ColorToolsContainer.defaultProps = {
    onChangeStrokeStyle: (color) => console.log("strokeStyle changed "+color),
    strokeStyle: "#000",
    onChangeFillStyle: (color) => console.log("fillStyle changed "+color),
    fillStyle: "#fff",
    onChangeStrokeWidth: (size) => console.log("strokeWidth changed "+size),
    strokeWidth: 2,
    onChangeFigureData: () => console.log("is not binded props"),
    activeColorPicker: null,
    onSetColorPicker: () => console.log("is not binded props"),
}

export default ColorToolsContainer;