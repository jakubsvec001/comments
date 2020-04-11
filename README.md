SEED DB with "npm run seed"

# comments section for BoboBeats song page

This repo was built for deployment in a container using Docker, using React as a front-end framework, MySql as a database, and Node/Express as a server. 

This repo can be extended to accept user interaction to add comments to songs, as well as replies to comments. These features are not present in this repo at this time.

Feel free to submit pull requests with additional functionality.

Steps to getting up and running:

1) Clone this repo from Github to wherever you are deploying.
2) Run the following command within the root directory of the repo:
    > docker-compose up -d
3) Once the container is built, access the container instance's bash terminal with the following steps:
4) execute the following command
    > docker ps -a
    
5) Find the `container id` for the image named 'comments_comment_app' and copy it. For example, `b842a3defdfc` is the from the following example output:

`CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS                     PORTS                               NAMES
    
__b842a3defdfc__        comments_comment_app   "docker-entrypoint.s…"   20 hours ago        Exited (255) 3 hours ago   0.0.0.0:4001->3001/tcp              comments_comment_app_1

fce16a771d66        mysql:5.7              "docker-entrypoint.s…"   20 hours ago        Up 3 hours                 0.0.0.0:3306->3306/tcp, 33060/tcp   comments_bobo_beats_comment_db_1`


6) Enter the following command into your terminal in the root directory of the repo and replace <container_id> with the id you copied in the prior step:
    > docker exec -it <container_id> bash
    
7) Once in the container, execute the following command:
    > npm run seed
    
8) When prompted, enter the super-secret password 'andy-jake-vic'. The terminal will ask you to do this three times.

9) Now, using port 4001, you can access access the comments app within the container, which is listening on port 3001.

10) Congrats! Your in.
