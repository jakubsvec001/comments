import React from 'react';
import { shallow } from 'enzyme';

import ChildComment from './ChildComment';

function setup() {
  const props = {
    imgPath: 'some/image/path/to/a/mock/image',
  };
  const wrapper = shallow(<ChildComment />);
  return { wrapper, props };
}

describe('ChildComment Test Suite', () => {
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.find('img').exists()).toBe(true);
  });
});
