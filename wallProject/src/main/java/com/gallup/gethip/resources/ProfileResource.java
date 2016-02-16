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

import AdditonalJSONStrucutreDocuments.FoundStatus;

@Path("/walls")
public class ProfileResource {
//Need to Modify the Paths in the FoundStatus links.
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
		
	@POST
    @Produces("application/json")
	@Consumes(MediaType.APPLICATION_JSON)
	public Wall addWall(Wall wall) {
		try {
			Wall wallAdd = getDao().createIfNotExists(wall);
			if(wallAdd == null){
				// handle error
			}else{
				return wallAdd;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return  null;
		
	}

	@PUT
	@Produces("text/plain")
    @Consumes("application/json")
	public String updateWall(Wall pro) {
		try {
			int num = getDao().update(pro);
			if(num == 1){
				return "Update successful for employee " + pro.getWallName();
			}else{
				return "Could not update " + pro.getWallName();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "Error updating " + pro.getWallName();
		}
	}
	
	 @DELETE
	 @Path("/{wall}")
	 @Produces("text/plain")
	 public String deleteWall(@PathParam("wall") String wallName){
	    try {
	    	int num = getDao().deleteById(wallName);
			if(num == 1){
				return "Profile was deleted successfully";
			}else{
				return "An error has occured. Unable to delete profile";
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return "Error in sql statement";
		}
	 }
	
	 private Dao<Wall, String> getDao(){
	    Dao<Wall, String> dao = DataSourceManager.getInstance().getDao(Wall.class);
	    return dao;
	 }
	
}
