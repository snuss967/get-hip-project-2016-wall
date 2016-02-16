//Javascript Function For the First Page Does Not Necessitate a page refresh rather it 
//performs on the same page. 
//This is activated when the go button is clicked will send a get request to the server asking if the wall is "there"
//the server will respond with a json document that will tell us if it was found or not
//this code not fit for execution on its own

//path variable that we need to declare with the text entered from the text box left out but needs to be added

var xhttp = new XMLHttpRequest();

//creates a new XMLHttpRequest Object does all of the heavy lifting

//callback whenever state is changed this functions
xhttp.onreadystatechange = function() {

//when the XMLHttpRequest OBbject xhttp is ready this function will execute. 
//The Ready state is split into five categories and each time that category changes ready state change is called
//4 represents that the request is finished and the response is ready and status of 200 says that the site was found

     if (xhttp.readyState == 4 && xhttp.status == 200) {
        
	// Action to be performed when the document is read;
	//Where we will redirect     
	}

};
xhttp.open("GET", "need to set the final path here", true);
xhttp.send();
//sends a request to the server
