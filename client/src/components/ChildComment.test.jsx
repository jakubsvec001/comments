// import React from 'react';
// import { shallow } from 'enzyme';

// import ChildComment from './ChildComment';

// function setup() {
//   const props = {
//     childComment: {
//       id: 3621,
//       user_id: 68,
//       parent_comment_id: 2660,
//       post_date: new Date(),
//       comment:
//         'Iste quis eos quibusdam pariatur reprehenderit. In…sciunt et et veritatis soluta similique nisi aut.',
//     },
//     parentTrackTime: '2:00',
//     allUsers: {
//       68: {
//         id: 68,
//         username: 'John Ham',
//         avatar_url:
//           'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
//         follower_count: 3,
//       },
//     },
//   };
//   const wrapper = shallow(
//     <ChildComment
//       childComment={props.childComment}
//       trackTime={props.trackTime}
//       allUsers={props.allUsers}
//     />,
//   );
//   return { wrapper, props };
// }

// describe('ChildComment Test Suite', () => {
//   it('Should have an image', () => {
//     const { wrapper } = setup();
//     expect(wrapper.find('.avatar').prop('src')).toBe(
//       'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
//     );
//   });
//   it('Should have a username', () => {
//     const { wrapper } = setup();
//     expect(wrapper.find('.user-name').text()).toBe('John Ham');
//   });
//   it('Should have a comment to render', () => {
//     const { wrapper } = setup();
//     expect(wrapper.find('.comment').text()).toBe(
//       'Iste quis eos quibusdam pariatur reprehenderit. In…sciunt et et veritatis soluta similique nisi aut.',
//     );
//   });
//   it('Should format the time into a "timeago" format', () => {
//     const { wrapper } = setup();
//     expect(wrapper.find('TimeAgo').dive().text().split(' ').slice(1).join(' ')).toBe('second ago');
//   });
//   it('Should format the time into a "timeago" format with plurals', () => {
//     const { wrapper } = setup();
//     setTimeout(() => {expect(wrapper.find('TimeAgo').dive().text().split(' ').slice(1).join(' ')).toBe('seconds ago')}, 2000)
//   });
// });
