# EINGLISH-MINGLISH

It is great project about english as minglish

## TODO List
- **Local Authentication** using Email and Password
- **Account Management** 
    - Avatar
    - Profile Details
    - Change Password
    - Forgot Password
    - Reset Password
    - Delete Account 

## Dependency
- [MongoDB 3.2.10+](https://www.mongodb.org/downloads)
- [Node.js 6.0+](http://nodejs.org/)

**NOTE:** If you are new to Node ot KOA, I recommend to watch 

- [Node.js](https://learn.javascript.ru/screencast/nodejs)
- [KOA](http://koajs.com/)

That can help you.

## Getting Started
- Clone the repository
```bash
#Get the last snapshot
git clone git@github.com:RuslanKasyanov/english-minglish.git
#Or
git clone https://github.com/RuslanKasyanov/english-minglish.git myproject
```
- Install NPM dependencies
```bash
npm install
```
- Run application
```bash
npm start
```
or you can use also
```bash
node ./bin/www
```

## Project Structure
|Name |Description |
|-----|------------|
|**config**/main.json|Application configuration|
|**front/views/layout**/main.pug|Base template|
|**front/views/partial**/footer.pug|Footer partial template|
|**front/views/partial**/header.pug|Header partial template|
|**front/views**/404.pug|404 Error template|
|**front/views**/error.pug|Error, info notification|
|**front/views**/index.pug|Home page template|
|**front/views**/user.pug|User page template|
|**handlers**/home.js|Handler for home page (index)|
|**handlers**/users.js|Handler for user account management|
|**libs**/config.js|Module for setup config from directory **"config"**|
|**libs**/crudHandlers.js|Module for create **"CRUD"** methods (**GENERAL**)|
|**libs**/error.js|Module for redirect to error page (**GENERAL**)|
|**libs**/mongoose.js|Module for setup MongoDB|
|**models**/users.js|Mongoose schema amd model for User|
|**routes**/|Bind all routes with their implementation|
|**app.js**|The main application file|
|**package.json**|NPM dependencies|
|**gulpfile.js**|TODO|

## License
TODO: Write license