angular
	.module("myApp")
    .controller('CreateCategoryController', function($scope, CategoryFactory, $location) {
	    console.log("CreateCategoryController - Inicio");
    	
	    $scope.saveCategory = function() {
	    	console.log("CreateCategoryController - saveCategory - $scope.name: " + $scope.name);
	    	
	    	if ($scope.name == undefined || $scope.name == ""  || $scope.name.length == 0) {
	    		alert("Name is required");
	    		$("#name").focus();
	    		return;
	    	}	     	
	    	
	    	var newCategory = {
	    		"name": $scope.name
	    	};
	    	
	    	CategoryFactory.saveCategory(newCategory).then(
		        function successCallback(response) {
		        	console.log("CreateCategoryController - saveCategory - Llamada exitosa a CategoryFactory.saveCategory()");
		        	$location.path("/categoriesList");
		        },
		        function errorCallback(response) {
		            console.log("CreateCategoryController - saveCategory - Se ha producido un error al llamar a CategoryFactory.saveCategory()");
		        }
			);	
	    	
	    	
	    };
	    
	    $scope.goToLocation = function(path) {
	    	console.log("CreateCategoryController - goToLocation - path: " + path);
	        $location.path(path);
	    };	    
	    
    	
    });


