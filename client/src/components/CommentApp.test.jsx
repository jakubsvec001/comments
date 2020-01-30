import React from 'react';
import { shallow } from 'enzyme';

import CommentApp from './CommentApp';

function setup() {
  const props = {
    parentComment: {
      comment: "Assumenda quod rerum. Deleniti esse ipsum nihil aut quaerat reiciendis. Nihil at sequi voluptatem minus fuga facere praesentium voluptatibus voluptas. Ut sunt minima ex rerum facilis illo.",
      id: 2660,
      post_date: new Date(),
      song_id: 99,
      track_time: "2:00",
      user_id: 62,
      sub_comments: [
        {
          comment: "Iste quis eos quibusdam pariatur reprehenderit. Incidunt tenetur ducimus. Omnis omnis perferendis velit illum. Sit fuga provident eveniet enim velit dolores. Cupiditate voluptatum quia omnis et repudiandae doloremque repellendus iste. Suscipit nesciunt et et veritatis soluta similique nisi aut.",
          id: 3621,
          parent_comment_id: 2660,
          post_date: "2019-08-16 12:36:22",
          user_id: 68,
        }
      ],
    },
    allUsers: {
      62: {
        id: 62,
        username: 'John Ham',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
        follower_count: 3,
      },
    },
  }
  const wrapper = shallow(
    <ParentComment
      parentComment={props.parentComment}
      allUsers={props.allUsers}
    />,
  );
  return { wrapper, props };
}

describe('Parent Comment Test Suite', () => {
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.avatar').prop('src')).toBe(
      'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
    );
  });
  it('Should have a username', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.user-name').text()).toBe('John Ham');
  });
  it('Should have a comment to render', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.comment').text()).toBe(
      "Assumenda quod rerum. Deleniti esse ipsum nihil aut quaerat reiciendis. Nihil at sequi voluptatem minus fuga facere praesentium voluptatibus voluptas. Ut sunt minima ex rerum facilis illo.",
    );
  });
  it('Should format the time into a "timeago" format', () => {
    const { wrapper } = setup();
    expect(wrapper.find('TimeAgo').dive().text().split(' ').slice(1).join(' ')).toBe('second ago');
  });
  it('Should format the time into a "timeago" format with plurals', () => {
    const { wrapper } = setup();
    setTimeout(() => {expect(wrapper.find('TimeAgo').dive().text().split(' ').slice(1).join(' ')).toBe('seconds ago')}, 2000)
  });
})