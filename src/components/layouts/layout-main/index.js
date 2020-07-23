import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import themes from '@utils/themes';

import './style.less';

function LayoutMain(props) {
  return (
    <div className={cn(`LayoutMain`, themes('LayoutMain', props.theme))}>
      <div className="LayoutMain__head">
        <div className="LayoutMain__head-content">{props.head}</div>
      </div>
      <div className="LayoutMain__center">
        <div className="LayoutMain__center-content">{props.children}</div>
      </div>
    </div>
  );
}
LayoutMain.propTypes = {
  head: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

LayoutMain.defaultProps = {
  theme: ['default'],
};

export default React.memo(LayoutMain);
