//This will be how we update our wall, in order to save time and resources we can upload all of the notes as a list to the server
//We will use a list and not an array because we do not know the definite size of our objects
//We could also loop through each object and send it if needed and on the bottom of this document is javascript that will iterate
//through a list of Note Objects and send them individually,
//The First is based on a save model. The second Ajax function is the one we want to implement it does it note by note

//Code that will send a list of objects, this needs to be parsed to JSON and put into a list on the server side to be seen as a list to the
//server
//this will be called on 
//var notes can be established as we pull down data from server and then proceed to add a note to this list whenever we create a new list
//this would be used for a save model which is a phase two item.
var notes = [];

jQuery.ajax({
//we need to specify the URL exactly I have set it to what is on the server for individual notes	
          url: "/notes",
          type: "PUT",
//we want to convert the Javascript list to a JSON string that is what JSON.Stringify does
          data: {notes: JSON.stringify(notes) },
          dataType: "json",
//if we want to perform an action before we send the data to the server, it happens here, everything here on out needs to be edited
          beforeSend: function(x) {
            if (x && x.overrideMimeType) {
              x.overrideMimeType("application/j-son;charset=UTF-8");
            }
          },
          success: function(result) {
 	     //Write your code here
          }
});

//this is the one that we will use the following are the POST, PUT, DELETE, and GET ajax functions for each note. GET will most likely not be used
//I do not forsee a use at this moment. 

//GET REQUEST

//need to pass in the var noteID so that we select Note
$.ajax({
    url: '/notes/'+ noteID,
    dataType: "json",
    type: "GET",
    contentType: 'application/json; charset=utf-8',
//states that we expect to recieve JSON
    async: true,
    processData: false,
    cache: false,
    //these need to be changed to suit our functionality
    success: function (data) {
        alert(data);
    },
    error: function (xhr) {
        alert('error');
    }
});

//PUT REQUEST
$.ajax({
    url: '/notes',
    dataType: "json",
    type: "PUT",
    contentType: 'text/plain; charset=utf-8',
    data: JSON.stringify({/* put our object we are updating here */}),
    async: true,
    processData: false,
    cache: false,
//need to change these to suit our functionality
    success: function (data) {
        alert(data);
    },
    error: function (xhr) {
        alert('error');
    }
});

//DELETE REQUEST
//create a String Variable named note to take the place of note in our query param
$.ajax({
    url: '/notes/?note=' + note,
    dataType: "json",
    type: "DELETE",
    contentType: 'text/plain; charset=utf-8',
    async: true,
    processData: false,
    cache: false,
//need to modify to suit our functionality
    success: function (data) {
        alert(data);
    },
    error: function (xhr) {
        alert('error');
    }
});

// POST REQUEST

$.ajax({
    url: '/notes',
    dataType: "json",
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({ note:{} /*put our note here */ }),
    async: true,
    processData: false,
    cache: false,
//modify to suit our functionality would not be a bad idea to have success call the function that creates the note on the screen
    success: function (data) {
        alert(data);
    },
//can have error then put a popup up that will tell us that the note failed to create
    error: function (xhr) {
        alert('error');
    }
}) 


//ONCE AGAIN THESE ARE ONLY BASE FUNCTIONS AND WILL NEED TO BE CHANGED AS CODE IS IMPLEMENTED AROUND THEM THEY ARE 
//MEANT TO BE USED AFTER AN EVENT eg. SOMEONE CLICKING A BUTTON. ANY QUESTIONS ASK SPENCER NUSSRALLAH 2016193@prep.creighton.edu
//402-917-9731