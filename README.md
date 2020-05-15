### Simple Chat Application

Instructions

We’d like you to build a web-based chat app (similar to this design) that has a dual purpose: walking users through a pre-defined onboarding flow and connecting users to a representative physician.


This exercise should take no longer than 5 hours, and should be done within ~7 days.


Your app should fetch this JSON file for the onboarding questions. Each question has three key parts: the question itself, the validation rules, and the proceeding paths.


Question: For each question, the app should prompt the user with question, in chat, and await a valid response. Behavior for invalid responses is undefined by design -- you should define it.


Validation: A boolean validation rule means validation will always resolve to that value. An array means that a limited set of (case-insensitive) options are valid. A string means that the value should be used as a regex to validate the response.


Paths: When this value is missing, it represents an end state. When the value is a number, that number is the ID of the question the app should proceed to once a valid input has been given. When the value is an object, the keys are valid responses and the values are the next-question IDs.


Implement a simple MVC pattern in the server side and design the API to collect answers. The review button that you’ve created should extract data from the server.


Finally, and optionally, there are two stretch features. The first is a button that outputs the completed questions and answers into chat. The second is a button that “summons a doctor” by connecting to this WebSocket connection: wss://echo.websocket.org. (Don’t worry about actually receiving anything over the socket, just connect to it successfully.)

General Guidelines

There are several tools we’re attempting to evaluate your experience with; please use them in this project:

Git / Github

React (preferred)

Do all work on a branch other than master. To submit, create a repository on Github and add @dskurbatov. Then create a PR for your work to merge into master, and request the evaluator’s review.

Feel free to use any third party libraries you think will be helpful, but keep in mind that we may ask questions about your particular library choices.

Evaluation

You’ll be evaluated on the following criteria:

Functioning UI

Preference for canonical use of React

Code for server side to collect answers by RESTful API and MVC pattern

Ability to save data

Code organization and formatting

Code reusability

Explanation of what you did and why you did it
