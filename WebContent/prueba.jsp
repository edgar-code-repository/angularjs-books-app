<%

     ServletContext sc = request.getServletContext();
     out.println("Hellooooo!!! " + sc.getAttribute("bookstoreRestApiHost"));

%>