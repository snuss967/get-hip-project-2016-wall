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
</script>