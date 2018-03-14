import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.scss';
import update from 'react-addons-update';


class ToolsGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    isShow: PropTypes.bool,
    isHideable: PropTypes.bool,
    children: PropTypes.any,
    contentClassName: PropTypes.string
  };
   
  static defaultProps = {
    title: null,
    isShow: true,
    isHideable: true,
  };

  state = {
    visible: true
  }
    
  onVisibleToggle = () => {
    const { isHideable } = this.props;
    if(!isHideable) return true;
    this.setState(update(this.state,{
      visible: {
        $apply: (visible) => !visible
      }
    }));
  }

  render() {
    const { title, isShow, isHideable, children, contentClassName } = this.props;
    const { visible } = this.state;
    const { onVisibleToggle } = this;
    const isTitleHide = title === null && isHideable === false;
    if(!isShow) return <div />

    return (
      <div className={styles.toolsGroup} >
        <Title { ...{visible,isHideable,title,isTitleHide,onClick: onVisibleToggle} } />
          <div 
            className={classNames(styles.content, contentClassName, {[styles.hide]:!visible})} >
            { children }
          </div>
      </div>
    )
  }
};

export default ToolsGroup;

const Title = ({ visible, isHideable, title, isTitleHide, onClick }) => {
  const Arrow = (<span className={
    classNames({
      [styles.isVisible]:visible,
      [styles.btnToggle]:true
    })
  }>▶</span>);

  const wrap = (<div className={styles.header} onClick={onClick} >
   { isHideable ? Arrow : undefined }
    <span className={styles.title} > { title } </span>
  </div>);

  return isTitleHide? undefined : wrap;
}