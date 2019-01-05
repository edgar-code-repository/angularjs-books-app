angular
	.module("myApp")
	.controller('AuthorsController', function($scope, $route, AuthorFactory, $location, SharedAuthorService) {
	    console.log("AuthorsController - Inicio");   
    
	    $scope.authors = [];
	    
	    AuthorFactory.getAuthors().then(
		        function successCallback(response) {
		        	//console.log("AuthorsController - Llamada exitosa a AuthorFactory.getAuthors()");
		            $scope.authors = response.data;
		        },
		        function errorCallback(response) {
		            console.log("AuthorsController - Se ha producido un error al llamar a AuthorFactory.getAuthors()");
		        }
			);	
	    
	    $scope.deleteAuthor = function(authorId, authorName) {
	    	console.log("AuthorsController - deleteAuthor - authorId: " + authorId);

	    	mensaje = "Are you sure you want to delete the author '" + authorName + "'?";
	    	if (confirm(mensaje)) {
	    		AuthorFactory.deleteAuthor(authorId).then(
			        function successCallback(response) {
			        	console.log("AuthorsController - Llamada exitosa a AuthorFactory.deleteAuthor()");
			        	console.log("AuthorsController - status: " + response.status);
			        	
			        	$route.reload();
			        },
			        function errorCallback(response) {
			            console.log("AuthorsController - Se ha producido un error al llamar a CategoryFactory.deleteAuthor()");
			            console.log("AuthorsController - status: " + response.status);
			            
			            if (response.status == 409) {
			            	alert("An error ocurred when deleting the author: author has books.");
			            	return;
			            }			            
			        }
				);
	    	}	    	
	    };
	    
	    $scope.editAuthor = function(author) {
	        console.log("AuthorsController - editAuthor - id: " + author.authorId);
	        console.log("AuthorsController - editAuthor - name: " + author.firstName + " " + author.lastName);
	        
	        SharedAuthorService.setAuthor(author);
	        
	        $location.path("/editAuthor");	    	
	    };
	    
	    $scope.goToLocation = function(path) {
	    	console.log("AuthorsController - goToLocation - path: " + path);
	        $location.path(path);
	    };	    
	    
	});