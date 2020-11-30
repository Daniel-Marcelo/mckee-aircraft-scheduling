# AircraftSchedulingApp

This application was created by Daniel McKee. Built using Angular 10.

## Running the app
1. Clone the repo
2. Cd into mckee-aircraft-scheduling
3. Run npm install
4. Run ng serve --open

## Assumptions Made

1. As stated in specification:
   - Only one day worth of schedule can be entered (“tomorrow”).
   - Only one aircraft is considered.
2. Additional:
   - Given time constraints, decision made to prioiritise most important aspect - functionality. For this reason, there are no automation tests present. Note that I always strive      for 100% automation when writing code that will be deployed to a production environment.
   
## Codebase Outline

* The app has 3 main sections
* Each core section has its own underlying data source Angular service e.g. the the flight rotation list has an associated state management service called FlightRotationService
   1. The aircrafts list
   2. The rotation
      - This includes 1) The flights included in the rotation and 2) The rotation timeline
   3. The available flights list

## Criteria 1 - Functionality
* The app satisfies all user requirements
* 3 constraints are enforced:
   1. Min turnaround time of 20mins between flights
   2. Flight must be grounded at midnight
   3. No 'teleporting'
* If one of these constraints are violated, the flight is not moved into the rotation for the day and a sticky error toast is shown, outlining the violations.
  

## Criteria 2 - Maintainability

* The code is written in clear, concise manner with respect to the timelines given for completion of this project.
* The majority of classes have a single responsibility
* The majority of components are 'dum', with services being responsible for state management and logic.
* The retrieval of data from the api is abstracted away into services.
* I would have liked to spend more time organising the CSS overall, but am satisfied with the result given the timelines.

## Criteria 3 - Usability

* I've created the app in such a way that there is little to no instruction needed when using the app.
* The user can simply drag a flight into the rotation, if it does not cause a violation, the flight will be added to the rotation
* Built the app to be mobile friendly also.

## Criteria 4 - Visual Design
* The design of app follows Material Design
* This is one area I would have liked to spend more time on.
* Basic UI is in place although can be improved.
* App is responsive and adjusts accordingly based on screen size
