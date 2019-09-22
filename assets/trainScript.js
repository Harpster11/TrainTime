// call firebase

var trainTimeData = firebase.database();
// create functions to record inputs from form on button click
$("#addTrain").on("click", function() {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $('#destinationInput').val().trim();
    var firstTrain = moment($('#firstTrainInput').val().trim(),"HH:mm").subtract(10, "years").format("X");
    var frequency = $('#frequencyInput').val().trim();

    console.log(firstTrain);
// create train object for firebase
    var nextTrain = {
        name: trainName, 
        destination: destination, 
        firstTrain: firstTrain,
        frequency: frequency    
    }
// push train object to firebase
    trainTimeData.ref().push(nextTrain);
    alert("Train Added")
    $("#trainNameInput").val("");
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");


// stop the function after one entry is made
    return(false);
})
// create listener function for firebase, pull variables out of firebase objects
trainTimeData.ref().on("child_added", function(snapshot){

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;
// create function to calculate the minutes until arrival
    var remainingTime = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency-remainder;
    var arrival = moment().add(minutes,"m").format('hh:mm A');

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);
// append our table with train data
    $("trains > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})