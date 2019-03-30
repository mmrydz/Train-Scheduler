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
var trainFirst = moment($("#first-train-time-input").val().trim(), "MM/DD/YYYY").format("X");
var trainFrequency = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding employee data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  first: trainFirst,
  frequency: trainFrequency
};

// Uploads train data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

alert("Train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-time-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainFirst = moment.unix(childSnapshot.val().first, "HH:mm").format ("HH:mm");
var minutes = moment(trainFirst).minutes();
var trainFrequency = childSnapshot.val().frequency;
console.log("minutes to first train: " + minutes);


var convertTime = moment(trainFirst, "HH:mm").subtract(1, "years");
console.log(convertTime);

var timeDiff = moment().diff(moment(convertTime), "minutes");
console.log(timeDiff);

var remaining = timeDiff % trainFrequency;

var trainMinAway = trainFrequency - remaining;

var next = moment().add(trainMinAway, "minutes");

var trainNext = moment(next).format("HH:mm");


// Calculate the next Arrival and min away ***********
// First figure out the difference in minutes between now and the first train


// Then calculate the remainder (that's that %, or "modulo") given the train frequency


// The difference between train Frequency and the ramainder is the minutes awy

// From here we can determine the next arrival:

console.log(trainName);
console.log(trainDestination);
console.log(trainFirst);
console.log(trainFrequency);
console.log(trainMinAway);
console.log(trainNext);


// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),
  $("<td>").text(trainNext),
  $("<td>").text(trainMinAway)
);

// Append the new row to the table
$("#train-table > tbody").append(newRow);
});
