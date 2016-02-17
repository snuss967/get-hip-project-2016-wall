package com.gallup.gethip;

import com.gallup.gethip.model.Note;
import com.gallup.gethip.model.Wall;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.sun.jersey.api.container.grizzly2.GrizzlyServerFactory;
import com.sun.jersey.api.core.PackagesResourceConfig;
import com.sun.jersey.api.core.ResourceConfig;
import org.glassfish.grizzly.http.server.HttpServer;

import javax.ws.rs.core.UriBuilder;
import java.io.IOException;
import java.net.URI;
import java.sql.SQLException;


public class Main {
	
	private static void createDatabaseConnection(){
		String databaseUrl = "jdbc:mysql://45.55.93.26:3306/?user=wall";
		//updated the connection String to match James' server
		ConnectionSource connectionSource;
		try {
			connectionSource = new JdbcConnectionSource(databaseUrl);
			//updated login information to log into database on James' Server
			((JdbcConnectionSource)connectionSource).setUsername("wall");
			((JdbcConnectionSource)connectionSource).setPassword("gethip");
			DataSourceManager.setConnectionSource(connectionSource);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private static void buildDaos(){
		try {
			DataSourceManager.addDao(Wall.class);
			DataSourceManager.addDao(Note.class);
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

    private static int getPort(int defaultPort) {
        //grab port from environment, otherwise fall back to default port 9998
        String httpPort = System.getProperty("jersey.test.port");
        if (null != httpPort) {
            try {
                return Integer.parseInt(httpPort);
            } catch (NumberFormatException e) {
            }
        }
        return defaultPort;
    }

    private static URI getBaseURI() {
        return UriBuilder.fromUri("http://localhost/").port(getPort(9998)).build();
    }

    public static final URI BASE_URI = getBaseURI();
    
    protected static HttpServer startServer() throws IOException {
        ResourceConfig resourceConfig = new PackagesResourceConfig("com.gallup.gethip.resources");

        System.out.println("Starting grizzly2...");
        return GrizzlyServerFactory.createHttpServer(BASE_URI, resourceConfig);
    }
    
    public static void main(String[] args) throws IOException {
        // Grizzly 2 initialization
        HttpServer httpServer = startServer();
        System.out.println(String.format("Jersey app started with WADL available at "
                + "%sapplication.wadl\nHit enter to stop it...",
                BASE_URI));
        createDatabaseConnection();
        buildDaos();
        System.in.read();
        httpServer.stop();
    }    
}
