# challengecode
Challenge Code for Company

Live Demo:
https://patientproviders.herokuapp.com

The Stack used for this project is MEAN stack.

Architecture Details:

Angular version 1.4.14
Node version 6.0
On Angular side used services to query backend with $http.

On The express side, tried to avoid using static jade parser. parsed all the file in html/javascript only.
Node js involves usage of a total of 3 routes(controllers for each) tried to segregate code with respect to routes.

Used Mongoose for Mongo DB connection setup and mLab for remote mongodb services on heroku.

Implementation Details:

Used JWT to authorize the backend api callsafter successful login, used localstorage anular service to store current user session

Implemented the custom datapoints fetch logic(bonus) by adding a header[“options”] to the /provider route which gives me access to the datapoint options I want to send as response object.

Added a separate header as options as I did not want to change the get query request parameters for challenge purpose. 

Used mongoose select to dynamically generate query responses based on dynamic column selection

Used UI Grid for heavy data loading and doing heavy weight operations.

Used infinite scroll on ui-grid to have lazy loading effect(data comes from server in chunks through paging).
 
Used bootstrap grid layout to design the search filter form.

Added Jasmin Karma test cases (Unit Test cases), Can be run through <Karma start> command from root directory.

Achieved:

An API endpoint that implements the url ending with /providers –Done
Every possible combination of query string parameters works --Done
Some datastore is used – done Used MongoDB
Bonus 1 Login Page and api authorization --Done
Bonus 2 Optional datapoints in response object --Done can be verified through networks tab of browser in the response object of providers call.
All responsive pages implemented (as well as any HTML/CSS/Javascript associated with it) --Done
Automated tests (i.e. tests that can be run from command line) –Done 

Was not able to add to many tests for provider endpoint specifically the multiple
Search filters because of time constraints, moreover it was not entirely necessary as unit test cases are independent of a functions inner functionality.
In this case provider endpoint. 

Open Issues:
 There are two main issue at large:
1: The UI grid bug fix(infinite-scroll): load more data if needed Resolves issue
[4363](angular-ui#4363)


I tried to explicitly invoke the refresh of grid but to no avail will add a bug request as this issue is not entirely fixed by ui-grid.

2: sub routes return cannot get when page is refreshed from browser refresh button. which should not be the case as it destroys routing tables in dns and prevents crawlers to add url for faster indexing and higher google rank(SEO). Will look into the issue when I get time.

Prerequisites:

Node
Mongodb(to run locally)

Project Setup:
I have included all the bower dependencies in the project directory itself for ease of use.
However project can be setup through:

run npm install for node related dependencies
run bower install for angular related dependencies

node server.js to start.

run karma start to run the test cases.

I HAVE ACTIVELY LEFT OUT MINOR DETAILS LIKE SORTING, PASSWORD VALIDATORS AND OTHER SMALL UI FEATURES TO SAVE TIME ON THE CRUD LOGIC FOR THIS DEMO PURPOSE. 




