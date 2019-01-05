angular
	.module("myApp")
	.controller('EditCategoryController', function($scope, CategoryFactory, $location, SharedCategoryService) {
	    console.log("EditCategoryController - Inicio");
	    
	    var sharedCategory = SharedCategoryService.getCategory();
	    console.log("EditCategoryController - sharedCategory - id: " + sharedCategory.categoryId);
	    console.log("EditCategoryController - sharedCategory - name: " + sharedCategory.name);
	    
	    $scope.categoryId = sharedCategory.categoryId;
	    $scope.categoryName = sharedCategory.name;
	    
	    $scope.updateCategory = function() {
	        console.log("EditCategoryController - updateCategory - Inicio");
	        
	    	if ($scope.categoryName == undefined || $scope.categoryName == ""  || $scope.categoryName.length == 0) {
	    		alert("Name is required");
	    		$("#name").focus();
	    		return;
	    	}	        
	        
	        var categoryModified = {
				name: $scope.categoryName,
				categoryId: $scope.categoryId
			};
	        
	        var request = CategoryFactory.updateCategory(categoryModified);
	        request.then(
	          function successCallback(response) {
	        	  console.log("EditCategoryController - updateCategory - Successful call to CategoryFactory.updateCategory()");
	        	  $location.path("/categoriesList");
	          },
	          function errorCallback(response) {
	        	  console.log("EditCategoryController - updateCategory - An error ocurred");
	          }
	        );         
	    };  
	    
	    $scope.goToLocation = function(path) {
	        $location.path(path);
	    };	    
	    	    
		
	});		