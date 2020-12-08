INSTALL

I had no problem porting over the database using the Dump.sql and MySQL workbench. Hopefully that will be the case for you too.
I *think* its important for the user to be 'root' and the password to be 'mypw'. This can be changed in 'testprojectserver/index.js'.
Once the database is happy, the hard work is over.

-----------------------------------------------------------------------------------------------------------------------------------------

Installation Instructions:
'cd ./testprojectweb'
'npm install'
'npm run build'
'cd ../testprojectserver'
'npm install'
'node index.js'

Browse to http://localhost:3000

Pray it works.

-----------------------------------------------------------------------------------------------------------------------------------------

NOTES: 
-There are some unused dependencies. If I was smarter, I would get rid of them. Unfortunately, I'm in the middle ground of knowing I should get
 rid of them, but not knowing how.
-On Github (https://github.com/JordanPippy/finalproject) There are two branches: 'main' and 'deploy'. Crazily enough, deploy is for the deployment of the app on Heroku.
 'main' is the branch that should be focused on. There were a lot of jank tricks that had to happen to deploy the app, and I would rather not have those graded ;) .
