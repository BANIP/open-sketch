import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

export default class SetModeItem extends Component {
  static propTypes = {
    activeTitle: PropTypes.string,
    title: PropTypes.string,
    onSetMode: PropTypes.func,
    name: PropTypes.string,
  }

  static defaultProps = {
    onSetMode: () => console.log("onSetMode event was not binded")
  }

  componentWillUpdate(nextProps){
    const prevProps = this.props;
    const isActive = (props) => props.title === props.activeTitle;
    const [ prevActive, nextActive ] = [ isActive(prevProps), isActive(nextProps) ];
    return prevActive !== nextActive;
  }

  render() {
    const {activeTitle, title, name, onSetMode} = this.props;
    return (
        <Item
            onClick={ () => onSetMode({mode:title}) }
            name={ name }
            title={ title }
            isActive={ activeTitle === title }
        />
    )
  }
};
