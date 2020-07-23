import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LayoutSide from './index';

storiesOf('layouts/LayoutSide', module)
  .addDecorator(story => (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>{story()}</div>
  ))
  .add('default', () => (
    <LayoutSide>
      <div>{'{content}'}</div>
    </LayoutSide>
  ));
