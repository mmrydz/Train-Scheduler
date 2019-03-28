/* global moment firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvZYb5DqF9caevjDtniUVBbOdo9ogOKW0",
    authDomain: "train-scheduler-f0a9c.firebaseapp.com",
    databaseURL: "https://train-scheduler-f0a9c.firebaseio.com/",
    projectId: "train-scheduler-f0a9c",
    storageBucket: "train-scheduler-f0a9c.appspot.com",
    messagingSenderId: "526461221535"
    };
  
firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
  
// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  // var trainFirst = moment($("#first-train-time-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    // first: trainFirst,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  // console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  // $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  // var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  // console.log(trainFirst);
  console.log(trainFrequency);

  // Prettify the employee start ***** change to military time
  // var trainFirstPretty = moment.unix(trainFirst).format("MM/DD/YYYY");

  // Calculate the next arrival ***********
  // var trainNext = moment().diff(moment(trainFirst, "X"), "minutes");
  // console.log(empMonths);

  // Calculate the minutes away ***********
  // var trainMinAway = empMonths * empRate;
  // console.log(trainMinAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    // $("<td>").text(trainNext),
    // $("<td>").text(trainMinAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
