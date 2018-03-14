import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorCircle from './ColorCircle';
import './index.css';
class Pallet extends Component {

    render() {
        const colorCircles = this._getColorTypes().map((color,i) => 
            (<ColorCircle 
                colorType={color} 
                isActive={ color === this.props.fillStyle}
                onChangeStyle={ this.props.fillStyle }
                key={i} />)
        )

        return (
            <div id="pallet">
                { colorCircles }
            </div>
        );
    }

    _getColorTypes(){
        const colorCount = this.props.colorCount - 2
        let colorTypes = [];
        colorTypes.push("#000", "#fff")
        for(let i = 0;i < colorCount; i++){
            colorTypes.push(`hsl(${ 255 / colorCount * i },100%,50%)`);
        }

        return colorTypes
    }
}

Pallet.propTypes = {
    colorCount: PropTypes.number,
    fillStyle: PropTypes.string,
    onChangeFillStyle: PropTypes.func,
    onChangeStrokeStyle: PropTypes.func,
    onChangeMode: PropTypes.func,
    onChangeStrokeWidth: PropTypes.func,
}

Pallet.defaultProps = {
    colorCount: window.innerWidth / 50
}

export default Pallet;