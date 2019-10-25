
  var firebaseConfig = {
    apiKey: "AIzaSyAUI49FUBOUSVS92fP-aD8PFRFRVJ6V-PU",
    authDomain: "choochoo-68bea.firebaseapp.com",
    databaseURL: "https://choochoo-68bea.firebaseio.com",
    projectId: "choochoo-68bea",
    storageBucket: "choochoo-68bea.appspot.com",
    messagingSenderId: "365620856132",
    appId: "1:365620856132:web:4b038c775a4c2e0671c311"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
var trainTimeData = firebase.database();
// create functions to record inputs from form on button click
$("#addTrain").on("click", function() {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $('#destinationInput').val().trim();
    var firstTrain = $('#firstTrainInput').val().trim();
    var frequency = $('#frequencyInput').val().trim();

// create train object for firebase
    var nextTrain = {
        name: trainName, 
        destination: destination, 
        firstTrain: firstTrain,
        frequency: frequency    
    }
// push train object to firebase
    trainTimeData.ref().push(nextTrain);
    alert("Train Added");
    $("#trainNameInput").val("");
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");


// stop the function after one entry is made
    return(false);
})
// create listener function for firebase, pull variables out of firebase objects
trainTimeData.ref().on("child_added", function(childSnapshot){
console.log(childSnapshot.val());
    var name = childSnapshot.val().name;
    console.log("name: "+name);
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var timeArr = firstTrain.split(":");
    var trainTime = moment()
                          .hours(timeArr[0])
                          .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var minutes;
    var arrival;

    if (maxMoment === trainTime) {
        arrival = trainTime.format("hh:mm A");
        minutes = trainTime.diff(moment(), "minutes");
    } else {

        var difference = moment().diff(trainTime, "minutes");
        var remainder = difference % frequency;
        minutes = frequency - remainder;
        arrival = moment()
        .add(minutes, "m").format("hh:mm A");
    }

    console.log("minutes", minutes);
    console.log("arrival", arrival);
// create function to calculate the minutes until arrival

    
// append our table with train data
    $("#trains > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})