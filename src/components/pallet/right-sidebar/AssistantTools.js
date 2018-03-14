import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import Toggle from 'react-toggle-button';
//import classnames from 'classnames';
//import styles from './AssistantTools.scss';

import ToolsGroup from 'components/pallet/source/ToolsGroup';
import { ToolItem } from './sources';


export default class AssistantTools extends Component {
  static propTypes = {
    isDown:PropTypes.object,
    keyLabel:PropTypes.object,
    setKeyStatus:PropTypes.func,
  }

  static defaultProps = {
    isDown:Map({alt: false, ctrl: false, shift: false}),
    keyLabel:Map({alt: "직선", ctrl: "곡선"}),
    setKeyStatus:() => console.log("toggled key"),
  }

  render() {
    const { isDown, keyLabel, setKeyStatus } = this.props
    const keysItem = keyLabel.map((value, key) => (
      <ToolItem label={ `${value}(${key})` } >
          <Toggle
            value={ isDown[key] }
            onToggle={() => setKeyStatus(
              {key, status: null}
            )} />
      </ToolItem>
    )).toArray();

    return (
      <ToolsGroup 
        title="보조도구"
        isShow={true}>
        { keysItem }
      </ToolsGroup>
    )
  }
};
