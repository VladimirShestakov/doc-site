import React, { useMemo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './style.less';

function CustomScroll(props) {
  const { paddingPosition, children, onInitStyles, ...rest } = props;
  const [wrapStyles, setWrapStyles] = useState({});

  const refs = {
    simpleBar: useRef(null),
    wrap: useRef(null),
  };

  const options = useMemo(
    () => ({
      styles: { height: '100%' },
      defaultPadding: 8,
    }),
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const simpleBar = refs.simpleBar.current;
      let styles = {};
      //есть вертикальный скролл

      if (simpleBar.contentWrapperEl.offsetHeight < simpleBar.contentEl.offsetHeight) {
        if (~paddingPosition.indexOf('right')) {
          styles.paddingRight = options.defaultPadding;
        }
        if (~paddingPosition.indexOf('left')) {
          styles.paddingLeft = options.defaultPadding;
        }
      }

      setWrapStyles(styles);
      onInitStyles(styles);
    }, 1000);

    return () => clearTimeout(timer);
  }, [paddingPosition, onInitStyles, refs.simpleBar, refs.wrap, children, rest]);

  return (
    <SimpleBar autoHide={false} style={options.styles} {...rest} ref={refs.simpleBar}>
      <div className="CustomScroll" style={wrapStyles} ref={refs.wrap}>
        {children}
      </div>
    </SimpleBar>
  );
}

CustomScroll.propTypes = {
  children: PropTypes.node,
  paddingPosition: PropTypes.array,
  onInitStyles: PropTypes.func,
};

CustomScroll.defaultProps = {
  children: null,
  paddingPosition: ['right'],
  onInitStyles: () => {},
};

export default React.memo(CustomScroll);
