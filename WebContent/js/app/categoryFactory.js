angular
	.module("myApp")
	.factory('CategoryFactory', function($http) {
	    var factory = {};
	    var urlBase = "http://localhost:9096/bookstore-api/categories";
	    
	    factory.getCategories = function() {
	    	//console.log("CategoryFactory - Ejecutando getCategories...");
	    	return $http.get(urlBase);
	    };
	    
	    factory.saveCategory = function(newCategory) {
	        return $http.post(urlBase, newCategory);
	    }; 	
	    
	    factory.updateCategory = function(categoryModified) {
	        var updateUrl = urlBase + "/" + categoryModified.categoryId;
	        return $http.put(updateUrl, categoryModified);
	    };
	    
	    factory.deleteCategory = function(categoryId) {
	        var deleteUrl = urlBase + "/" + categoryId;
	        
	        return $http(
	        	{ method: 'DELETE', url: deleteUrl, headers: { 'Content-Type': 'application/json', 'Accept':'application/json' } }
	        );
	        
	        //return $http.delete(deleteUrl);
	    };  	    
	    	
	    return factory;     
	});