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
		  
		  logger.debug("[ReadEnvironmentListener][contextInitialized][BOOKS_REST_APP_CONTEXT: " + System.getenv("BOOKS_REST_APP_CONTEXT") + "]");
		  logger.debug("[ReadEnvironmentListener][contextInitialized][BOOKS_REST_APP_PORT: " + System.getenv("BOOKS_REST_APP_PORT") + "]");
		  logger.debug("[ReadEnvironmentListener][contextInitialized][BOOKS_REST_APP_HOST: " + System.getenv("BOOKS_REST_APP_HOST") + "]");
		   
		  ServletContext servletContext = context.getServletContext();
		  servletContext.setAttribute("BOOKSTORE_API_NAME", System.getenv("BOOKS_REST_APP_CONTEXT"));
		  servletContext.setAttribute("BOOKSTORE_API_PORT", System.getenv("BOOKS_REST_APP_PORT"));
		  servletContext.setAttribute("BOOKSTORE_API_HOST", System.getenv("BOOKS_REST_APP_HOST"));		  
		  
		  logger.debug("[ReadEnvironmentListener][contextInitialized][END]");
		  
	  }	
	
}
