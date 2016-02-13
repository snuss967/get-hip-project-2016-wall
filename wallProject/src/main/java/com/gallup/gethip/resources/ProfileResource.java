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

@Path("/walls")
public class ProfileResource {
	
	@GET
	@Path("/{wallName}")
	@Produces("application/json")
	public Wall getWall(@PathParam("wallName") String wallName) {
		Wall pro = null;
		try {
			pro = getDao().queryForId(wallName);
			if(pro == null){
				System.out.println("Error: Profile not found.");
			}else{
				return pro;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Error.");
		}			
			
		return pro;
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
