//This Code is not guaranteed to not not break. It is merely a starting point right now which is why I have pushed it so early. It needs to be refined.
//Most of these functions have been tried in very limited enviornments so they do work but no guarantees that they will work with our product exactly
//In this code there are many places where it needs to be linked up with HTML and CSS that I have not implementated because I do not have access to the
//front end designs at this point. Use this code however you like I still have a copy in my private repo. If you need me dont hesitate to get ahold of me
//by phone 4029177931. Pushed from my Hotel Room

//for our sort function can we return date time in TimeStamp format? We will have then have it already converted to seconds/miliseconds and can sort biggest to largest
//largest to smallest

//This will be our list of functions that interact with the HTML Page it pieces together other functions found in the JavaScript
//Folder. The functions here include, The Initial Load, Create, Delete, Edit, Sort(Newest Top, Oldest Top for now), and Drag and Drop Sorting
//We will declare a global JavaScript Array Notes that we will interact with in all functions. 
//We will either need to change the way the server sends inital data or loop through and pull down notes one by one pushing them onto the array each time;

<script>
	var Notes = [];
//called when the page loads
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
        Notes = data;
    },
    error: function (xhr) {
        alert('error');
        //call a page refresh, this will run once when the page loads and only when the page loads
    }
});

function addRowToTable(color, message, author)
{
//fill in the tblSample box with the name of the table in our HTML design
//this then assign the JavaScript variable tbl to the HTML table
  var tbl = document.getElementById('tblSample');
//sets lastRow to how many rows exist
  var lastRow = tbl.rows.length;
  // We dont have a header table so count starts at the top row
  var iteration = lastRow;
//inserts our row (tbl.insertRow(lastRow)at the posistion of lastRow
  var row = tbl.insertRow(lastRow);
  var cell1 = row.insertCell(0);
//Need to throw in some CSS and HTML to size this table and cell up
//add HTML and Javascript to create a new text box
}

//Create Note and Send It to the Server
function CreateNote(color, message, author)
{
    //compile note and send to server
    $.ajax({
    url: '/notes',
    dataType: "json",
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({ note:{color: color, message: message, author: author} }),
    async: true,
    processData: false,
    cache: false,
//modify to suit our functionality would not be a bad idea to have success call the function that creates the note on the screen
    success: function (data) {
        //will go on to visually add the note and expand the table
        //data param is our note that was returned
        addRowToTable(color, author, message);
        Notes.push(data);

    },
//can have error then put a popup up that will tell us that the note failed to create
    error: function (xhr) {
        //send popup and have a button for the user to retry that implementation needs to be installed
        alert('error');
    }
}) 
}
function getRowNumber(element)
{
    var row = element.parentNode.parentNode.rowIndex;
    return row;
}
function DeleteNote()
{
    //Click the Button and Get The Row Number Need To Test Returns Row Number
    var row = getRowNumber(/*need to pass in the element, eg. the button we clicked on would set this to button onClick*/);
    //delete the object in the server
    //check this to be sure that the right index  is being called
    alert(row-1);
    note = Notes[row-1]
    var noteID = note.note_id;
    $.ajax({
    url: '/notes/?note=' + noteID,
    dataType: "json",
    type: "DELETE",
    contentType: 'text/plain; charset=utf-8',
    async: true,
    processData: false,
    cache: false,
//need to modify to suit our functionality
    success: function (data) {
        //delete the table row at the row value established earlier
        tbl.deleteRow(row);
        //may need to move everything up will leave that out for now in case we dont have to
        //remove value from our array
        //we will move the item to to the end of the array so that we can pop it off
        var endObject = Notes[Notes.length-1];
        Notes[row-1] = endObject;
        Notes.pop();
    },
    error: function (xhr) {
        //ask the user if he wishes to try the delete request again do nothing else
        alert('error');
    }
});

}

//Code that follows if for drag and drop see example homepage.html on these parts fit together
//Function drop appened to the HTML on drop event on the table, fill in parameter with event that should work
function drop(ev) {
    //starting at index loop through and push down in the array
    
    //send list to server with new order to save
    //PUT REQUEST
$.ajax({
    url: '/notes',
    dataType: "json",
    type: "PUT",
    contentType: 'text/plain; charset=utf-8',
    data: JSON.stringify({note: Notes}),
    async: true,
    processData: false,
    cache: false,
//need to change these to suit our functionality
    success: function (data) {
        alert(data);
    },
    error: function (xhr) {
        alert('error');
        //code to refresh webpage
    }
});
    //copy the contents to their respective elements while looping through the array
    //through in after the ajax call so that while the ajax is waiting on the server our webpage is reloading elements


     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     ev.target.appendChild(document.getElementById(data));
 }

//our JavaScript object that is being moved, first is set to the information in the table 
var objectMoving;
//variable we will use to keep track of our object
var index;
//Function drag set to ondragstart happens when we pick up the object
 function drag(ev) {
    //copy the current contents in table to a javascript variable
    objectMoving = 
    //grab the row number
    index = getRowNumber(objectMoving) - 1;
    //set the variable to the variable located in the list
    alert("Is the Index that follows right?");
    objectMoving = Notes[index];

 }

 //allowDrop function append this to drag on drag over
function allowDrop(ev) {
     ev.preventDefault();
 }

 //Our edit code will be called on button click

 function edit(ev)
 {
    //get the row that the button is on
    var row = getRowNumber(ev) - 1;
    var noteForActions = Notes[row];
    //turn the tag into a textbox and and load the contents from the existing tag into the text box


    //pop up a finish box

    //after clicking the finish box that load the finished text into the Note

    //send an ajax request on success copy new text into its element in the array
    $.ajax({
    url: '/notes',
    dataType: "json",
    type: "PUT",
    contentType: 'text/plain; charset=utf-8',
    data: JSON.stringify({/* put our object we are updating here */}),
    async: true,
    processData: false,
    cache: false,
    //at success load the new noteForActions into the note list 
    success: function (data) {
        Notes[row] = noteForActions;
    },
    //at failure pop up another box to try again or close and revert text
    error: function (xhr) {
        alert('error');
    }
});

 }
</script>

