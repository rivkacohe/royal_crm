# royal-crm

Mini CRM project aimed at managing customers, products and orders.

### Tech Stack
* Node.js
* Express.js
* MySQL
* nodemon

## Prepare The Environment
1. Create a new MySQL database, follow instructions in the docs folder.
2. Clone project: `git clone https://github.com/rivkacohe/royal_crm.git`
3. Install dependencies: `npm install`
4. Install nodemon globally:` npm i -g nodemon` and update package.json accordingly.
5. In project, add configuration file: config/dev.js with database connection details.
6. In project, add folder `exports`.
7. Install dependencies for Angular client:   
`cd client-angular`  
`npm install`
8. Run the server:
 * Windows: `SET DEBUG='crm:*'; npm start`
 * MacOS/Linux: `$ DEBUG=royal-crm:* npm start`