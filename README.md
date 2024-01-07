# polling-system
Basic polling-system dashboard created using PERN stack.

Video - [Dropbox Link](https://www.dropbox.com/scl/fi/1scre194a4ky7hnpzzfe8/screen-capture.webm?rlkey=eu2qkrxww1p809vw8rh5yhvnf&dl=0)

Additional libraries used - [Material UI](https://mui.com/material-ui/), [Chart.js](https://www.chartjs.org/),  [knex.js](https://knexjs.org/), [date-fns](https://date-fns.org/)

# Installation
1. Clone the repository:
  ```
  git clone https://github.com/zardulu/polling-system.git
  ```


2. Navigate to the project directory:
  ```
  cd polling-system
  ```

3. Install dependencies:
  ```
  npm install
  ```

4. Install PostgreSQL and start a database.

5. Configure `knexfile.js` located in `/server/database/knexfile.js`
```
{
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: '<USERNAME>', //postgres by default
      password: '<PASSWORD>',
      database: '<DATABASE-NAME>',
      port: 5432,
    }
```

6. To start the express server, navigate to the root directory and run:
```
cd server
npm start
```

7. To start the client, navigate to the root directory and run:
```
cd client
npm start  
```




