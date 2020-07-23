import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.less';

class LayoutPage extends Component {
  static propTypes = {
    header: PropTypes.node,
    content: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node,
  };

  render() {
    const { header, content, footer, children } = this.props;

    return (
      <div className="LayoutPage">
        <header className="LayoutPage__header">{header}</header>
        <div className="LayoutPage__content">{children || content}</div>
        <footer className="LayoutPage__footer">{footer}</footer>
      </div>
    );
  }
}

export default LayoutPage;
