import React, {Component} from 'react';
import Sketch from 'containers/SketchContainer';
import EventBinder from 'containers/SketchEventBinder';
import Pallet from 'containers/pallet-container';
import style from './sketch.css';


class SketchApp extends Component {


    render() {
        const Group = (children) => children;
        return (
            <div>
                <EventBinder>
                    <Sketch />
                </EventBinder>
                <Pallet />
            </div>
        );
    }

} 

export default SketchApp;
