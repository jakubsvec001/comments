const express = require('express');
const path = require('path');
const cors = require('cors');
const { constructCommentsWithoutJoin } = require('./controller/constructComments');
const { constructUsers } = require('./controller/constructUsers');
const { getTotalCommentCountForSong } = require('./controller/getTotalCommentCountForSong');
const { parseUsersFromComments } = require('./controller/helpers');
const PORT = 3001;
const PUBLIC = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.static(PUBLIC));
app.use(cors());

app.get('/api/songs/:songId', (req, res) => {
  let { page, limit, join } = req.query;
  limit = +limit;
  const { songId } = req.params;
  if (page === undefined || join === undefined) {
    console.log('something is undefined');
    res.send(
      'The URL of the get request must possess a query for a pagination number (page=[num]) and a boolean for a join query or unjoined query (join=[false||true]',
    );
  }
  getTotalCommentCountForSong(songId).then((totalCount) => {
    constructCommentsWithoutJoin(+songId, limit, +page)
      .then((comments) => {
        if (comments.length === 0) res.sendStatus(404);
        return comments;
      })
      .then((comments) => {
        const userIdsArray = parseUsersFromComments(comments);
        constructUsers(userIdsArray)
          .then((users) => {
            // setTimeout(()=> res.json({ totalCount, comments, users }), 2000)  // Simulate delay
            res.json({ totalCount, comments, users });
          })
          .catch((err) => {
            console.log('ERROR:', err);
          });
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  });
});

app.listen(PORT, () => {
  console.log(`boboBeats server listening on port ${PORT}.`);
});

// EXAMPLE OUTPUT:
commentsWithJoin = [
  {
    id: 2455,
    song_id: 99,
    user_id: 53,
    track_time: '1:35',
    post_date: '2020-02-26T02:05:11.000Z',
    comment:
      'Odio culpa ratione alias. Et est rerum exercitationem dicta doloribus. Consequatur dolorem quam quaerat. Debitis totam vero adipisci nemo. Fugiat velit consequatur quod numquam iusto.',
    sub_comments: [
      {
        id: 3969,
        user_id: 32,
        parent_comment_id: 2455,
        post_date: '2019-04-25 14:29:26',
        comment:
          'Ea aspernatur nulla dolor officiis sapiente eaque. Quo dolor facilis inventore. At deleniti qui corporis in maiores fugit. Maiores voluptas voluptas eaque et unde dolorem repudiandae. Adipisci non hic nobis quam.',
      },
      {
        id: 4331,
        user_id: 45,
        parent_comment_id: 2455,
        post_date: '2019-03-03 19:56:50',
        comment:
          'Ut saepe sed. Qui et consequuntur saepe et. Saepe neque eos dicta inventore accusantium non repudiandae. Totam repudiandae tenetur amet asperiores molestiae vel. Occaecati aut quam. Ea eaque laborum eos rerum qui officia quia.',
      },
    ],
  },
  {
    id: 2660,
    song_id: 99,
    user_id: 62,
    track_time: '2:00',
    post_date: '2020-02-06T16:16:58.000Z',
    comment:
      'Assumenda quod rerum. Deleniti esse ipsum nihil aut quaerat reiciendis. Nihil at sequi voluptatem minus fuga facere praesentium voluptatibus voluptas. Ut sunt minima ex rerum facilis illo.',
    sub_comments: [
      {
        id: 3621,
        user_id: 68,
        parent_comment_id: 2660,
        post_date: '2019-08-16 12:36:22',
        comment:
          'Iste quis eos quibusdam pariatur reprehenderit. Incidunt tenetur ducimus. Omnis omnis perferendis velit illum. Sit fuga provident eveniet enim velit dolores. Cupiditate voluptatum quia omnis et repudiandae doloremque repellendus iste. Suscipit nesciunt et et veritatis soluta similique nisi aut.',
      },
    ],
  },
  {
    id: 1452,
    song_id: 99,
    user_id: 89,
    track_time: '1:05',
    post_date: '2020-01-30T12:53:38.000Z',
    comment:
      'Sunt ea et occaecati aut. Veritatis minima corporis. Veritatis at earum porro adipisci.',
    sub_comments: [
      {
        id: 422,
        user_id: 85,
        parent_comment_id: 1452,
        post_date: '2020-02-06 11:57:44',
        comment:
          'Ea dolor repellat. Sapiente voluptate repellat ab et dolore. Nostrum eaque sint dolorem quisquam iste dolorum. Iusto est molestiae non est.',
      },
      {
        id: 5087,
        user_id: 43,
        parent_comment_id: 1452,
        post_date: '2019-10-29 04:00:55',
        comment:
          'Ducimus qui laboriosam dicta nobis magni assumenda dolorem. Recusandae nobis facere repellendus voluptatem qui. Eius unde cupiditate qui reiciendis omnis.',
      },
    ],
  },
];

commentsWithoutJoin = [
  {
    id: 2455,
    song_id: 99,
    user_id: 53,
    track_time: '1:35',
    post_date: '2020-02-26T02:05:11.000Z',
    comment:
      'Odio culpa ratione alias. Et est rerum exercitationem dicta doloribus. Consequatur dolorem quam quaerat. Debitis totam vero adipisci nemo. Fugiat velit consequatur quod numquam iusto.',
    sub_comments: [
      {
        id: 3969,
        user_id: 32,
        parent_comment_id: 2455,
        post_date: '2019-04-25T21:29:26.000Z',
        comment:
          'Ea aspernatur nulla dolor officiis sapiente eaque. Quo dolor facilis inventore. At deleniti qui corporis in maiores fugit. Maiores voluptas voluptas eaque et unde dolorem repudiandae. Adipisci non hic nobis quam.',
      },
      {
        id: 4331,
        user_id: 45,
        parent_comment_id: 2455,
        post_date: '2019-03-04T03:56:50.000Z',
        comment:
          'Ut saepe sed. Qui et consequuntur saepe et. Saepe neque eos dicta inventore accusantium non repudiandae. Totam repudiandae tenetur amet asperiores molestiae vel. Occaecati aut quam. Ea eaque laborum eos rerum qui officia quia.',
      },
    ],
  },
  {
    id: 2660,
    song_id: 99,
    user_id: 62,
    track_time: '2:00',
    post_date: '2020-02-06T16:16:58.000Z',
    comment:
      'Assumenda quod rerum. Deleniti esse ipsum nihil aut quaerat reiciendis. Nihil at sequi voluptatem minus fuga facere praesentium voluptatibus voluptas. Ut sunt minima ex rerum facilis illo.',
    sub_comments: [
      {
        id: 3621,
        user_id: 68,
        parent_comment_id: 2660,
        post_date: '2019-08-16T19:36:22.000Z',
        comment:
          'Iste quis eos quibusdam pariatur reprehenderit. Incidunt tenetur ducimus. Omnis omnis perferendis velit illum. Sit fuga provident eveniet enim velit dolores. Cupiditate voluptatum quia omnis et repudiandae doloremque repellendus iste. Suscipit nesciunt et et veritatis soluta similique nisi aut.',
      },
    ],
  },
  {
    id: 1452,
    song_id: 99,
    user_id: 89,
    track_time: '1:05',
    post_date: '2020-01-30T12:53:38.000Z',
    comment:
      'Sunt ea et occaecati aut. Veritatis minima corporis. Veritatis at earum porro adipisci.',
    sub_comments: [
      {
        id: 422,
        user_id: 85,
        parent_comment_id: 1452,
        post_date: '2020-02-06T19:57:44.000Z',
        comment:
          'Ea dolor repellat. Sapiente voluptate repellat ab et dolore. Nostrum eaque sint dolorem quisquam iste dolorum. Iusto est molestiae non est.',
      },
      {
        id: 5087,
        user_id: 43,
        parent_comment_id: 1452,
        post_date: '2019-10-29T11:00:55.000Z',
        comment:
          'Ducimus qui laboriosam dicta nobis magni assumenda dolorem. Recusandae nobis facere repellendus voluptatem qui. Eius unde cupiditate qui reiciendis omnis.',
      },
    ],
  },
];

endpointExample = '127.0.0.1:3000/api/songs/99?page=0&join=false';

// console.log(JSON.stringify(commentsWithJoin) === JSON.stringify(commentsWithJoin))

// const users = parseUsersFromComments(commentsWithJoin)
