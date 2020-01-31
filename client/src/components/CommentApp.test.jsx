import React from 'react';
import { shallow } from 'enzyme';
import nock from 'nock';
import { mockServerData_ParentComment_51, mockServerData_ParentComment_2 } from './testHelpers';

import CommentApp from './CommentApp';


function setup() {
  const props = {
    songId: 1,
  };
  const wrapper = shallow(<CommentApp songId={props.songId} />);
  return { wrapper, props };
}

describe('CommentApp Test Suite', () => {
  beforeAll(() => {
    nock('http:127.0.0.1:3000/api/')
      .get('/1?page=0&limit=10&join=false')
      .reply(200, mockServerData_ParentComment_51);
  });
  it('Should fetch comment data from songs comments API', () => {
    const { wrapper } = setup();
  });
});
