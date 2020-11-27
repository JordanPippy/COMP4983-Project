INSTALL
For the database, the server looks for a user named 'root' with a password 'mypw'. I'm not sure if the dump will take care of that or not.
So that either needs to happen or be changed in the testprojectserver/index.js file to match accordingly.
But it seems that the dump.sql file will handle setting up all the tables. So thats kinda cool.

'cd ./testprojectweb'
'npm install'
'npm run build'
'cd ../testprojectserver'
'npm install'
'node index.js'

Browse to http://localhost:3000

Pray it works.
