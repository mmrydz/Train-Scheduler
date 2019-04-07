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
  var trainName = $("#name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFirst = $("#trainFirst").val().trim();
  var trainFrequency = $("#trainFrequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    trainFirst: trainFirst,
    tFrequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.trainFirst);
  console.log(newTrain.tFrequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#trainFirst").val("");
  $("#trainFrequency").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
    
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().trainFirst;
  var trainFrequency = childSnapshot.val().tFrequency;

  var timeArr = trainFirst.split(":");
  var trainTime = moment() 
    .hours(timeArr[0])
    .minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  // If the first train is later than the current time, set arrival to 
  // the first train time

  if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
  } else {
  // Calculate theminutes until arrival using hardcore math
  // To calculate the minutes until arrival, take the current time in unix
  // and subrtact the trainFirst, then find the modulus between
  // the difference and the frequency.
    var differenceTimes = moment().diff(trainTime, "minutes");
    console.log("differenceTimes: " + differenceTimes);
    var tRemainder = differenceTimes % trainFrequency;
    console.log("tRemainder: " + tRemainder);
    tMinutes = trainFrequency - tRemainder;
  // to calculate arrival time, add the tMinutes to the current time
    tArrival = moment()
      .add(tMinutes, "m")
      .format("hh:mm A")
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);


  // Create the new row in the table and add the new train's data
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(tArrival),
    $("<td>").text(tMinutes)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

});