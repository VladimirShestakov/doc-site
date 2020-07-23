import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.less';

class LayoutDoc extends Component {
  static propTypes = {
    side: PropTypes.node,
    content: PropTypes.node,
    children: PropTypes.node,
  };

  render() {
    const { side, content, children } = this.props;

    return (
      <div className="LayoutDoc">
        <aside className="LayoutDoc__side">
          <div className="LayoutDoc__wrap">{side}</div>
        </aside>
        <div className="LayoutDoc__content">
          <div className="LayoutDoc__wrap">{children || content}</div>
        </div>
      </div>
    );
  }
}

export default LayoutDoc;
