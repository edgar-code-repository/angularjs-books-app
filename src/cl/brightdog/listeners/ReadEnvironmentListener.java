package cl.brightdog.listeners;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ReadEnvironmentListener implements ServletContextListener{

	  @Override
	  public void contextDestroyed(ServletContextEvent arg0) {
		  
	    //do stuff
	  }

	  @Override
	  public void contextInitialized(ServletContextEvent context) {
		  //do stuff before web application is started
		  		  
		  System.out.println("[ReadEnvironmentListener][contextInitialized] BOOKSTORE_API_NAME: " + System.getenv("BOOKSTORE_API_NAME"));
		  System.out.println("[ReadEnvironmentListener][contextInitialized] BOOKSTORE_API_PORT: " + System.getenv("BOOKSTORE_API_PORT"));
		  System.out.println("[ReadEnvironmentListener][contextInitialized] BOOKSTORE_API_HOST: " + System.getenv("BOOKSTORE_API_HOST"));
		  
		  ServletContext servletContext = context.getServletContext();
		  servletContext.setAttribute("BOOKSTORE_API_NAME", System.getenv("BOOKSTORE_API_NAME"));
		  servletContext.setAttribute("BOOKSTORE_API_PORT", System.getenv("BOOKSTORE_API_PORT"));
		  servletContext.setAttribute("BOOKSTORE_API_HOST", System.getenv("BOOKSTORE_API_HOST"));		  
		  
	  }	
	
}
