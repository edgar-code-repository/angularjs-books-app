angular
	.module("myApp")
	.controller('EditAuthorController', function($scope, AuthorFactory, $location, SharedAuthorService) {
	    console.log("EditAuthorController - Inicio");
	    
	    var sharedAuthor = SharedAuthorService.getAuthor();
	    console.log("EditAuthorController - sharedAuthor - id: " + sharedAuthor.authorId);
	    console.log("EditAuthorController - sharedAuthor - name: " + sharedAuthor.firstName + " " + sharedAuthor.lastName);
	    
	    $scope.authorId = sharedAuthor.authorId;
	    $scope.authorFirstName = sharedAuthor.firstName;
	    $scope.authorLastName = sharedAuthor.lastName;
	    
	    $scope.updateAuthor = function() {
	        console.log("EditAuthorController - updateAuthor - Inicio");
	        console.log("EditAuthorController - updateAuthor - $scope.authorId: " + $scope.authorId);
	        console.log("EditAuthorController - updateAuthor - $scope.authorFirstName: " + $scope.authorFirstName);
	        console.log("EditAuthorController - updateAuthor - $scope.authorLastName: " + $scope.authorLastName);
	        
	    	if ($scope.authorFirstName == undefined || $scope.authorFirstName == ""  || $scope.authorFirstName.length == 0) {
	    		alert("Firstname is required");
	    		$("#firstName").focus();
	    		return;
	    	}	
	    	
	    	if ($scope.authorLastName == undefined || $scope.authorLastName == ""  || $scope.authorLastName.length == 0) {
	    		alert("Lastname is required");
	    		$("#lastName").focus();
	    		return;
	    	}
	        
	        var authorModified = {
				firstName: $scope.authorFirstName,
				lastName: $scope.authorLastName,
				authorId: $scope.authorId
			};
	        
	        var request = AuthorFactory.updateAuthor(authorModified);
	        request.then(
	          function successCallback(response) {
	        	  console.log("EditAuthorController - updateAuthor - Successful call to AuthorFactory.updateAuthor()");
	        	  $location.path("/authorsList");
	          },
	          function errorCallback(response) {
	        	  console.log("EditAuthorController - updateAuthor - An error ocurred");
	          }
	        );         
	    };  
	    
	    $scope.goToLocation = function(path) {
	        $location.path(path);
	    };		    
		
	});		