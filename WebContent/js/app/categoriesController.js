angular
	.module("myApp")
	.controller('CategoriesController', function($scope, CategoryFactory, SharedCategoryService, $route, $location) {
	    console.log("CategoriesController - Inicio");   
	    
	    $scope.categories = [];
	    
	    
	    console.log("CategoriesController - Llamando a CategoryFactory.getCategories()");  
	    CategoryFactory.getCategories().then(
	        function successCallback(response) {
	        	console.log("CategoriesController - Llamada exitosa a CategoryFactory.getCategories()");
	            $scope.categories = response.data;
	            console.log("CategoriesController - $scope.categories.length: " + $scope.categories.length);
	        },
	        function errorCallback(response) {
	            console.log("CategoriesController - Se ha producido un error al llamar a CategoryFactory.getCategories()");
	        }
		);	 
	    
	    $scope.deleteCategory = function(categoryId, categoryName) {
	    	console.log("CategoriesController - deleteCategory - categoryId: " + categoryId);

	    	mensaje = "Are you sure you want to delete the category '" + categoryName + "'?";
	    	if (confirm(mensaje)) {
			    CategoryFactory.deleteCategory(categoryId).then(
			        function successCallback(response) {
			        	console.log("CategoriesController - Llamada exitosa a CategoryFactory.deleteCategory()");
			        	console.log("CategoriesController - status: " + response.status);
			        	
			        	$route.reload();
			        },
			        function errorCallback(response) {
			            console.log("CategoriesController - Se ha producido un error al llamar a CategoryFactory.deleteCategory()");
			            console.log("CategoriesController - status: " + response.status);
			            
			            if (response.status == 409) {
			            	alert("An error ocurred when deleting the category: category has books.");
			            	return;
			            }
			        }
				);
	    	}
	    	
	    	
	    };
	    
	    $scope.editCategory = function(category) {
	        console.log("CategoriesController - editCategory - id: " + category.categoryId);
	        console.log("CategoriesController - editCategory - name: " + category.name);
	        
	        SharedCategoryService.setCategory(category);
	        
	        $location.path("/editCategory");	    	
	    };
	    
	    
	    $scope.goToLocation = function(path) {
	    	console.log("CategoriesController - goToLocation - path: " + path);
	        $location.path(path);
	    };	    
    
	});

