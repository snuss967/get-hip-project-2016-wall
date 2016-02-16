package com.gallup.gethip.resources;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.gallup.gethip.DataSourceManager;
import com.gallup.gethip.model.Wall;
import com.j256.ormlite.dao.Dao;

import AdditonalJSONStructureDocuments.FoundStatus;


@Path("/walls")

public class SearchResource {
	@GET
	@Path("/{wallName}")
	@Produces("application/json")
	public FoundStatus getWall(@PathParam("wallName") String wallName) {
		FoundStatus found;
		Wall pro = null;
		//why is this called pro?
		try {
			//If it is sucessful when we search for the wall we will get a JSON document that is returned
			//telling us that the wall is found and will point us to where we need to make our GetRequest
			//If it is unsucessful when we search for the wall we will get a JSON document that is returned
			//telling us that the wall was not found and it will point us to where we need to make our post request
			//after the user confirms that they want to create a new Wall
			pro = getDao().queryForId(wallName);
			if(pro == null){
				found = new FoundStatus(false, "Path");
				return found;
			}else{
				found = new FoundStatus(true, "Path");
				return found;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Error.");
		}			
			
		 found = new FoundStatus(false, "Redirect To Main Page");
		 return found;
	}
	 private Dao<Wall, String> getDao(){
		    Dao<Wall, String> dao = DataSourceManager.getInstance().getDao(Wall.class);
		    return dao;
		 }
		
}
