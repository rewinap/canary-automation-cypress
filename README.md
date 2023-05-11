# Cypress-Canary-Automation
This repository contains the test automation project include the srcipt, the vidio and the screenshot of the test script that has been run before. This automation has been connected to Cypress cloud so when it is run in our local, it will update directly the vidio, result and the screenshot of the test. The purpose of this automation project is to automate the end-to-end testing of the following features of the Cypress Canary application:
Login Admin
Apply as Creator
Apply as Supplier

## Table of Contents
1. Installation
2. Run with Cypress Cloud
3. Testing manual docs
4. Testing Strategy
5. Testing Env
6. Automation Framework
7. Cypress cloud


### Installation
#### Clone project

```sh
git clone https://github.com/rewinap/cypress-canary-automation.git
```

#### Install npm dependencies by running the following command:

```sh
npm install
```

#### Install cypress:

```sh
npm install cypress --save-dev
```

#### Open cypress:

```sh
npx cypress open
```
 
The cypress UI will be displayed and you can choose your own browser, and type of testing(in this project is end to end testing) and then run the specs test

### Run with Cypress Cloud
To set up and run your Cypress tests on the Cypress Cloud, you can follow these steps:

1. Sign up for a Cypress Dashboard account at https://dashboard.cypress.io/signup and create a new project.
2. In your local project, install the Cypress Dashboard service by running the following command:
```sh
npm install cypress-dashboard --save-dev
```
This will install the Cypress Dashboard service as a development dependency in your project.
3. Create a cypress.json file in the root directory of your project, and add your Cypress Dashboard record key and project ID to it. You can find these values in your Cypress Dashboard project settings.
```sh
  { 
  "projectId": "your_project_id",
  "recordKey": "your_record_key"
  }
```

4. In your terminal, run the following command to authenticate your Cypress Dashboard account:
```sh
npx cypress dashboard login
```

5. To run your tests on the Cypress Cloud, use the following command:
```sh
npx cypress run --record --key your_record_key
```

This will run your tests on the Cypress Cloud and record the results in your project dashboard. You can also specify additional flags and options as needed, such as --headed or --headless to run your tests in different modes.
Once your tests have finished running, you can view the results in your Cypress Dashboard project. You can also view and manage your recorded test runs, screenshots, and videos from the dashboard.
With the Cypress Dashboard set up, you can easily run and manage your tests on the Cypress Cloud, and collaborate with your team to improve your application's quality and reliability.

In this project i have set up the cypress cloud and i run that with this command:
```sh 
npx cypress run --record --key 2f0abb70-d4f0-4192-84dd-4dabeefbe584
```

### Testing manual docs
all the test here refer to the test document:
https://docs.google.com/spreadsheets/d/16PbegRBbiYn7frCdcX6J4yzjZ8abpEGifd6S8A-idto/edit?usp=sharing

### Testing Env
staging url:
admin login: https://stg-canary-admin-dashboard.vercel.app/login
apply: https://stg-canary-admin-dashboard.vercel.app/apply

### Testing Strategy
For the testing strategy, we have chosen data-driven testing. Data-driven testing is a testing methodology in which test cases are designed based on different sets of input data. It enables us to run the same test case multiple times with different data sets, which helps to test the application's behavior under different scenarios and validate its expected behavior.

We have created test data for each test case, which includes valid and invalid test data to cover various scenarios. By using data-driven testing, we can ensure that the application behaves consistently and correctly for each test case.

### Automation Framework
We have chosen Cypress as our test automation framework for several reasons:
1. Cypress is a modern JavaScript-based test automation framework that is designed specifically for web applications. It provides a clean, intuitive, and easy-to-use API for writing tests.
2. Cypress has built-in support for end-to-end testing, which means we can write tests that simulate user interactions with the application, from the front-end to the back-end.
3. Cypress provides real-time feedback during test runs, which helps to identify issues quickly and easily.
4. Cypress has an active and growing community, which provides a wealth of resources, including documentation, examples, and plugins.

### Cypress Cloud
We have also leveraged the Cypress Cloud for running and managing our tests. The Cypress Cloud provides us with the following benefits:
1. Parallelization - We can run our tests in parallel, which means we can get faster feedback on our test results and reduce the overall testing time.
2. Cross-browser testing - We can run our tests on multiple browsers and devices to ensure that our application is compatible with different platforms and environments.
3. Test analytics - We can analyze our test results and identify issues quickly with detailed test reports and insights.
4. Easy integration - We can easily integrate our tests with our CI/CD pipeline and other tools, such as GitHub and Slack.
5. Result:
![image](https://github.com/rewinap/cypress-canary-automation/assets/70361569/c407a48f-8d5a-42d1-b986-71893d390250)
![image](https://github.com/rewinap/cypress-canary-automation/assets/70361569/4a766881-520b-41ef-b6a6-d935c22762bf)
![image](https://github.com/rewinap/cypress-canary-automation/assets/70361569/21368843-07ab-4aa3-9f9d-bd3959749140)
=======
# canary-automation-cypress
>>>>>>> 4d45f9afc8376a01b1e5bf060f453fbddeb33fb8
