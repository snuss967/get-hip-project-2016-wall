//Javascript that adds a row onto the table when it is activated, will be part 
//of creating a new note
function addRowToTable()
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
}

//Javascript that removes a row, will be part of deleting a note
function removeRowFromTable()
{
//replace table sample with our actual table name
  var tbl = document.getElementById('tblSample');
//sets last row to the length of our tables
  var lastRow = tbl.rows.length;
//item at last row has not been created yet, hence we use lastrow - 1
  if (lastRow > 0) tbl.deleteRow(lastRow - 1);
}
