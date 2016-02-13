Wall is a project in development that will serve as an online web utility that keeps track of thoughts, notes, and anything else.

Roles:
	Jason
		Server Side
		Front End Design
		
	Taylor
		Front End Design
	
	Gabby
		Front End Design
	
	Spencer
	
	Martin

	
Project Requirements:
	
	Users shall either search or create a new wall with a single search field. If a wall does not exist we will warn the user that they are about to create a new wall.
	User may click the circle add button to open a pop-up. The pop-up will allow a user to enter note information and chose color. The user hits confirm once finished and the page will refresh.
	Color options: yellow, orange, pink, red, green, blue, and purple.
	Once a user hovers over a note a pop-up will come-up giving them the option to edit or delete the note.
	User can move notes around with mouse, and use a sort button to “clean up” and organize the notes accordingly.

	
Data Contract:

	Note:
		note_id
			message
			date
			author
	
	Wall:
		wall_id
		wall_name
		date
