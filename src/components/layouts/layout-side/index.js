import React from 'react';
import PropTypes from 'prop-types';

import './style.less';
import CustomScroll from '@components/elements/custom-scroll';

function LayoutSide(props) {
  return (
    <div className="LayoutSide">
      <CustomScroll>{props.children}</CustomScroll>
    </div>
  );
}

LayoutSide.propTypes = {
  children: PropTypes.node,
};

export default React.memo(LayoutSide);
