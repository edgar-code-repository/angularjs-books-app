angular
	.module("myApp")
    .controller('CreateAuthorController', function($scope, AuthorFactory, $location) {
	    console.log("CreateAuthorController - Inicio");
    	
	    $scope.saveAuthor = function() {
	    	console.log("CreateAuthorController - $scope.firstName: " + $scope.firstName);
	    	console.log("CreateAuthorController - $scope.lastName: " + $scope.lastName);
	    	
	    	if ($scope.firstName == undefined || $scope.firstName == ""  || $scope.firstName.length == 0) {
	    		alert("First name is required");
	    		$("#firstName").focus();
	    		return;
	    	}	 
	    	
	    	if ($scope.lastName == undefined || $scope.lastName == "" || $scope.lastName.length == 0) {
	    		alert("Last name is required");
	    		$("#lastName").focus();
	    		return;
	    	}	    	
	    	
	    	var newAuthor = {
	    		"firstName": $scope.firstName,
	    		"lastName": $scope.lastName
	    	};
	    	
	    	AuthorFactory.saveAuthor(newAuthor).then(
		        function successCallback(response) {
		        	console.log("CreateAuthorController - Llamada exitosa a AuthorFactory.saveAuthor()");
		        	$location.path("/authorsList");
		        },
		        function errorCallback(response) {
		            console.log("CreateAuthorController - Se ha producido un error al llamar a AuthorFactory.saveAuthor()");
		        }
			);	
	    	
	    	
	    };
	    
	    $scope.goToLocation = function(path) {
	    	console.log("CreateAuthorController - goToLocation - path: " + path);
	        $location.path(path);
	    };	    
	    
    	
    });


