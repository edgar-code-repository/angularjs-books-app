<%
    ServletContext sc = request.getServletContext();

    String apiHost = (String) sc.getAttribute("BOOKSTORE_API_HOST");
    String apiPort = (String) sc.getAttribute("BOOKSTORE_API_PORT");
    String apiName = (String) sc.getAttribute("BOOKSTORE_API_NAME");
%>

<!DOCTYPE html>
<html ng-app="myApp">
    <head>
    	<meta charset="utf-8">
        <link rel="stylesheet" href="css/bootstrap/3.3.5/bootstrap.min.css"/>
        <link rel="stylesheet" href="css/style.css"/>
        
        <script src="js/angular/1.4.7/angular.min.js"></script>
        <script src="js/angular/1.4.7/angular-route.min.js"></script>
                
		<script src="js/jquery/3.3.1/jquery.min.js"></script>
		<script src="js/bootstrap/3.3.7/bootstrap.min.js"></script>        
        
        <script src="js/angular-ui-bootstrap/0.13.4/ui-bootstrap.min.js"></script>
        <script src="js/angular-ui-bootstrap/0.13.4/ui-bootstrap-tpls.min.js"></script>
        
        <script src="js/app/myApp.js"></script>	
        
        <script src="js/app/uploadImageFactory.js"></script>
        <script src="js/app/bookFactory.js"></script>
        <script src="js/app/categoryFactory.js"></script>
        <script src="js/app/authorFactory.js"></script>
        <script src="js/app/preventTemplateCache.js"></script>
        
        <script src="js/app/categoryFilter.js"></script>
        
        <script src="js/app/bookController.js"></script>
        <script src="js/app/viewBookController.js"></script>
        <script src="js/app/createBookController.js"></script>
        <script src="js/app/editBookController.js"></script>
        
        <script src="js/app/authorsController.js"></script>
        <script src="js/app/createAuthorController.js"></script>
        <script src="js/app/editAuthorController.js"></script>
        
        <script src="js/app/categoriesController.js"></script>
        <script src="js/app/createCategoryController.js"></script>
        <script src="js/app/editCategoryController.js"></script>
        
        <script src="js/app/sharedBookService.js"></script>
        <script src="js/app/sharedCategoryService.js"></script>
        <script src="js/app/sharedAuthorService.js"></script>
        
        <script src="js/app/onlyNumbersDirective.js"></script>
        <script src="js/app/fileModelDirective.js"></script>
        
        
        
    </head>
    <body>
    	<input type="hidden" name="apiHost" id="apiHost" value="<%=apiHost%>" />
    	<input type="hidden" name="apiPort" id="apiPort" value="<%=apiPort%>" />
    	<input type="hidden" name="apiName" id="apiName" value="<%=apiName%>" />
    	
        <div ng-view></div>                
    </body>
    
    <script>
		$(function() {
    		$("#selectCategory").val("-1");
		});    
	</script>
	
</html>