$(document).ready(function () {
  var Config = {
    apiKey: "AIzaSyCme_0cj2L8y_4z_MzOXS_ZEQLcR_gnzPA",
    authDomain: "train-schedule-ef43d.firebaseapp.com",
    databaseURL: "https://train-schedule-ef43d.firebaseio.com",
    projectId: "train-schedule-ef43d",
    storageBucket: "train-schedule-ef43d.appspot.com",
    messagingSenderId: "427439336537",
    appId: "1:427439336537:web:d8b38151769b8359099548",
  };
  // Initialize Firebase
  firebase.initializeApp(Config);
  var database = firebase.database();
  var train = "";
  var destination = "";
  var frequency = "";
  var time = "";
  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    (train = $("#trainInput").val()),
      (destination = $("#destinationInput").val()),
      (frequency = $("#frequencyInput").val()),
      (time = $("#timeInput").val());

    database.ref().push({
      train: train,
      destination: destination,
      frequency: frequency,
      time: time,
    });

    // database.ref("user").on("value", function(snapshot) {
    //   // Print the local data to the console.
    //   console.log(snapshot.val());
    // });
  });

  $("#addTrain").on("click", function () {
    // Append the new row to the table
    var train = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var time = $("#timeInput").val().trim();
    var date = new Date();
    var currentTime = date.getMinutes();
    var minsAway = currentTime - frequency;
    var trainRow = $("<tr>").append(
      $("<td>").text(train),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(time),
      $("<td>").text(minsAway)
    );
    // $("tbody").append(trainRow);

    console.log(date);
    console.log(currentTime);
  });
  database.ref().on(
    "child_added",
    function (childSnapshot) {
      var trainRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().train),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text(childSnapshot.val().time),
        $("<td>").text(childSnapshot.val().minsAway)
      );
      // full list of items to the well
      $("tbody").append(trainRow);
    },
    // Handle the errors),
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});
