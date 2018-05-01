Lab 11: Single Resource Express API
Author: Dawn Version: 1.0.0

Overview
POST /api/<resource-name>
pass data as stringifed JSON in the body of a POST request to create a new resource
on success respond with a 200 status code and the created note
on failure due to a bad request send a 400 status code
GET /api/<resource-name> and GET /api/<resource-name>/:id
no id in the query string responds with an array of all of your resources
with an id in the query string it should respond with the details of a specifc resource (as JSON)
if the id is not found respond with a 404
DELETE /api/<resource-name>/:id
delete an idea with the given id
on success this should return a 204 status code with no content in the body
on failure due to lack of id in the query respond with a 400 status code
on failure due to a resource with that id not existing respond with a 404 status code

Write tests to ensure the /api/resource-name endpoint responds as described for each condition below:
GET: test 404, it should respond with 'not found' for valid requests made with an id that was not found
GET: test 200, it should contain a response body for a request made with a valid id
POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
POST: test 200, it should respond with the body content for a post request with a valid body

Getting Started
Clone the repo
npm init -y
npm i -D eslint-config-airbnb-base eslint-plugin-import eslint-plugin-jest jest babel eslint babel-preset-env babel-eslint babel-register
npm i winston@next dotenv
npm i superagent
Install mongodb


Architecture
node, express, jQuery, javascript, babel, mongodb

