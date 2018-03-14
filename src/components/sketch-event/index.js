import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';


export default class componentName extends Component {
    propTypes = {
        drawStart: PropTypes.func,
        drawMove: PropTypes.func,
        drawEnd: PropTypes.func,

        zoomIn: PropTypes.func,
        zoomOut: PropTypes.func,

        setKeyStatus: PropTypes.func,

        setColorPicker: PropTypes.func,
    }

    bindHammerListener = ( stage ) => {
        const { drawStart, drawMove, drawEnd, setColorPicker } = this.props;
  
        const mc = new Hammer.Manager(stage,{
          recognizers: [
            [Hammer.Pan, { threshold: 0} ],
          ]
        })
  
        mc.on("panstart",(ev) => drawStart({ ev }));
        mc.on("panmove", (ev) => drawMove({ ev }));
        mc.on("panend", (ev) => drawEnd({ ev }));

        mc.on("panstart",(ev) => setColorPicker({ activeColorPicker: null }));
    }

    // altm shift
    getSpecialKey = (ev) => {
      switch(ev.key){
        case "Alt":
          return "alt";
        case "Shift":
          return "shift";
        case "Control":
          return "ctrl";
        default:
          return null;
      }

    }

    bindKeyListener = ( stage ) => {
      var { getSpecialKey } = this;
      var { setKeyStatus } = this.props;

      stage.addEventListener("keydown",(ev) => {
        const key = getSpecialKey(ev);
        const status = true;
        if(key){ setKeyStatus({key, status}) }
      });

      stage.addEventListener("keyup",(ev) => {
        const key = getSpecialKey(ev);
        const status = false;
        if(key){ setKeyStatus({key, status}) }
      });
    }

    bindWheelListener = ( stage ) => {
      const { zoomIn, zoomOut } = this.props;

      stage.addEventListener("wheel",(ev) => {
          if( ev.deltaY > 0 ){
            zoomOut({ ev })
          } else {
            zoomIn({ ev })
          }
      });
    }


    componentDidMount(){
        const { bindHammerListener, bindWheelListener, bindKeyListener } = this;
        const { stage } = this.refs;
        bindHammerListener( stage );
        bindWheelListener( stage );
        bindKeyListener( document.body );
    }

  render() {
    const { children } = this.props;

    return (
      <div ref="stage">
        {children}
      </div>
    )
  }
};
