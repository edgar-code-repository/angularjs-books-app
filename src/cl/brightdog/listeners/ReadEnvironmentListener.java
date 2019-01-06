package cl.brightdog.listeners;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

public class ReadEnvironmentListener implements ServletContextListener{
	
	final static Logger logger = Logger.getLogger(ReadEnvironmentListener.class);

	  @Override
	  public void contextDestroyed(ServletContextEvent arg0) {
	
		  logger.debug("[ReadEnvironmentListener][contextDestroyed]");
		  
	  }

	  @Override
	  public void contextInitialized(ServletContextEvent context) {
		  //do stuff before web application is started
		  
		  logger.debug("[ReadEnvironmentListener][contextInitialized][START]");
		  
		  logger.debug("[ReadEnvironmentListener][contextInitialized][BOOKSTORE_API_NAME: " + System.getenv("BOOKSTORE_API_NAME") + "]");
		  logger.debug("[ReadEnvironmentListener][contextInitialized][BOOKSTORE_API_PORT: " + System.getenv("BOOKSTORE_API_PORT") + "]");
		  logger.debug("[ReadEnvironmentListener][contextInitialized][BOOKSTORE_API_HOST: " + System.getenv("BOOKSTORE_API_HOST") + "]");
		   
		  ServletContext servletContext = context.getServletContext();
		  servletContext.setAttribute("BOOKSTORE_API_NAME", System.getenv("BOOKSTORE_API_NAME"));
		  servletContext.setAttribute("BOOKSTORE_API_PORT", System.getenv("BOOKSTORE_API_PORT"));
		  servletContext.setAttribute("BOOKSTORE_API_HOST", System.getenv("BOOKSTORE_API_HOST"));		  
		  
		  logger.debug("[ReadEnvironmentListener][contextInitialized][END]");
		  
	  }	
	
}
