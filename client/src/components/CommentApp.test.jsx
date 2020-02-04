import React from 'react';
import { shallow } from 'enzyme';
import nock from 'nock';
import {
  mockServerData_ParentComment_51,
  mockServerData_ParentComment_2,
} from './testHelpers';


import CommentApp from './CommentApp';

const setup = (customProps) => {
  const defaultProps = {
    songId: 1,
  };
  const wrapper = shallow(<CommentApp {...defaultProps } />);
  return { wrapper, props };
}

const findByAttr = (wrapper, value) => {
  return wrapper.find(`[data-test]='${value}`);
}

describe('CommentApp Test Suite', () => {
  beforeAll(() => {
    nock('http:127.0.0.1:3000/api/songs')
      .get('/1?page=0&limit=10&join=false')
      .delay({
        head: 500,
        body: 1000,  
      })
      .reply(200, mockServerData_ParentComment_51)
    })
  });

  test('should fetch comment data from songs comments API', () => {
    const { wrapper } = setup();
  });

  test('renders comment-list without error', () => {
    const wrapper = setup();
    const appComponent = findByAttr(wrapper, 'comment-list')
    expect(appComponent.length).toBe(1);
  });
  
  test('renders comment-icon without error', () => {
    const wrapper = setup();
    const appComponent = findByAttr(wrapper, 'comment-icon')
    expect(appComponent.length).toBe(1);
  });
});  

