package com.gallup.gethip.model;

import java.util.Date;
import javax.xml.bind.annotation.XmlRootElement;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@XmlRootElement
@DatabaseTable(tableName="walls")
public class Wall {
	
	@DatabaseField(generatedId = true, columnName = "wall_id")
	private long wallID;
	
	@DatabaseField(columnName = "wall_name")
	private String wallName;
	
	@DatabaseField(columnName = "date")
	private Date created;
	
	public Wall() {
		
	}

	public Wall(long id, String wallName) {
		
		this.wallID = id;
		this.wallName = wallName;
	}

	public long getId() {
		return wallID;
	}

	public void setId(long id) {
		this.wallID = id;
	}

	public String getWallName() {
		return wallName;
	}

	public void setWallName(String wallName) {
		this.wallName = wallName;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}
	
	
	
}
