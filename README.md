# Iinternal-Project-on-MEAN

1. Cerate new folder called internal-tool

2. Give npm init to start a new npm project

3. Give the details needed

4. Install the dependency needed like Express, mongoose, multer, body-parser

5. follow MVC (or MVW: Model-View-Whatever) archticture to keep the files



############################################################################
Steps to run on Windows machine
--------------------------------
1)		Open command prompt
2)		cd C:\Program Files\MongoDB\Server\3.2\bin
2.2)		mongod.exe --dbpath D:\mongodb 

3)		Open another command prompt
4)		cd C:\Program Files\MongoDB\Server\3.2\bin
4.2)		mongo.exe

5)		Open another command prompt

6)		Go upto internal-tool location e.g.
		>>>>>>>			cd D:\internalHitachiWorkspace\final working Code for demo NG\internal-tool
		
6.2)		npm install
		>>>>>>>>>	it'll install all the packages mentioned in package.json file; which aren't available
		>>>>>>>>>	otherwise manually we've to do like			npm install --save passport
		
7)		node app.js

8)		go to browser 
			>>>>>		localhost:3001/login.html
			localhost:3001/



############################################################################
Steps to run on Linux machine
------------------------------

1)		Open 3 command prompts (Ctrl+Alt+T) and run (2), (3), (4) commands in the same sequence

2)		chandresh@cj-pc:~$ sudo mongod       ==> to start the daemon

3)		chandresh@cj-pc:~$ sudo mongo        ==> to access the shell

4)		Go upto internal-tool location e.g.
		>>>>>>>			cd My\ Drive/Personal/Project/MEAN/CJ/full code working 18 oct/
		
5)		npm install
		>>>>>>>>>	it'll install all the packages mentioned in package.json file; which aren't available
		>>>>>>>>>	otherwise manually we've to do like			npm install --save passport
		>>>>>>>>>	if everything already updated, we can skip step (5)
		
6)		node app.js

7)		go to browser 
			>>>>>		localhost:3001/login.html
			localhost:3001/


############################################################################
Steps to create new login credential
-------------------------------------

1)		Open "Postman" and select "POST" method

2)		Enter request URL
		>>>>>>>>>	http://localhost:3001/api/userName

3)		Click on "Body" and select
		>>>>>>>>>	JSON (application/json)

4)		Type the User Name and Password in JSON format 
		>>>>>>>>>	{"user":"chandresh","password":"joshi"}



############################################################################
Steps to create new Project Type
-------------------------------------

1)		Open "Postman" and select "POST" method

2)		Enter request URL
		>>>>>>>>>	http://localhost:3001/api/projectTypes

3)		Click on "Body" and then "raw" and then select
		>>>>>>>>>	JSON (application/json)

4)		Type the User Name and Password in JSON format 
		>>>>>>>>>	{"typeName":"Analysis"}	



############################################################################
