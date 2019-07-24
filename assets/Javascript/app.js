

  
    // Firebase config object
    // This is provided by firebase
    var config = {
      apiKey: "AIzaSyBgIqpE1oOVhsUM8ZfkGS90A0jNCL3ZGfg",
      authDomain: "authentication-practice-42535.firebaseapp.com",
      databaseURL: "https://authentication-practice-42535.firebaseio.com",
      projectId: "authentication-practice-42535",
      storageBucket: "",
      messagingSenderId: "468395106756",
      appId: "1:468395106756:web:522f875bb7f6bd30"
    }; 
 firebase.initializeApp(config);
 console.log(firebase)

 var trainData = firebase.database();

 $("#addTrainBtn").on("click",function(){
     var trainName = $("#trainNameInput").val().trim();
     var destination = $("#destinationInput").val().trim();
     var firstTrain = moment($("#firstTrainInput").val().trim(),"hh:mm").subtract(10,"years").format("X");
     var frequency = $("#frequencyInput").val().trim();

     var newTrain = {
         name: trainName,
         destination: destination,
         firstTrain: firstTrain,
         frequency: frequency
     }

     trainData.ret().push(newTrain);

     alert("Train Added!");

     $("#trainNameInput").val("");
     $("#destinationInput").val("");
     $("#firstTrainInput").val("");
     $("#frequencyInput").val("");

     return false;

     
 });

 trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().ass(minutes,"m").format("hh:mm A");
    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  

 });