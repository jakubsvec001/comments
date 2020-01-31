import React from 'react';
import { shallow } from 'enzyme';
import nock from 'nock';

import CommentApp from './CommentApp';

const mockServerData_ParentComment = {
  totalCount: 2,
  comments: [
    {
      comment: "Quidem distinctio facilis placeat quo molestiae. Aut sunt deleniti rerum consectetur. Officiis est a. Nostrum nisi voluptas aut inventore eum quaerat ipsum.",
      id: 4921,
      post_date: "2020-02-11T23:58:51.000Z",
      song_id: 5,
      sub_comments: {
        comment: "Doloribus ratione sit a doloremque aspernatur. Omnis sed quia quis doloremque voluptas quas itaque. Deleniti nisi commodi dolores architecto ratione impedit. Vero labore voluptatem deserunt at eligendi assumenda voluptas.",
        id: 3646,
        parent_comment_id: 4921,
        post_date: "2019-09-26T02:25:01.000Z",
        user_id: 68,  // USER 68
      },
      track_time: "2:34",
      user_id: 74, // USER 74
    },
    {
      comment: "Et enim reiciendis. Nobis quas aut voluptatem et. Est error ducimus enim dolorum est expedita. Et temporibus vitae eaque aperiam voluptate quia. Sequi praesentium eaque porro ut possimus quasi reiciendis et.",
      id: 95,
      post_date: "2020-01-25T07:35:28.000Z",
      song_id: 5,
      sub_comments: [],
      track_time: "3:13",
      user_id: 26, // USER 26
    },
  ],
  users: [
    {
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/donjain/128.jpg",
      follower_count: 0,
      id: 74,
      username: "Lance Quigley",
    },
    {
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/mandalareopens/128.jpg",
      follower_count: 43,
      id: 68,
      username: "Jerel Runte",
    },
    {
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/iamkarna/128.jpg",
      follower_count: 70,
      id: 26,
      username: "Dexter Bosco",
    },
  ]
}

console.log(mockServerData_ParentComment)

function setup() {
  const props = {
    songId: 1
  }
  const wrapper = shallow(
    <CommentApp
      songId = {props.songId}
    />,
  );
  return { wrapper, props };
}

describe('CommentApp Test Suite', () => {
  beforeAll(() => {
    nock('http:127.0.0.1:3000/api/songs/1')
  })
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.avatar').prop('src')).toBe(
      'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
    );
  });
});
