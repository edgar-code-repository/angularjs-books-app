angular
	.module("myApp")
	.factory('AuthorFactory', function($http) {
	    var factory = {};
	    var books = [];
	    var urlBase = "http://localhost:9096/bookstore-api/authors";
	    
	    factory.getAuthors = function() {
	    	return $http.get(urlBase);
	    };
	    
	    factory.saveAuthor = function(newAuthor) {
	        return $http.post(urlBase, newAuthor);
	    };  
	    
	    factory.updateAuthor = function(authorModified) {
	    	console.log("AuthorFactory - updateAuthor - authorModified.authorId: " + authorModified.authorId);
	    	console.log("AuthorFactory - updateAuthor - authorModified.firstName: " + authorModified.firstName);
	    	console.log("AuthorFactory - updateAuthor - authorModified.lastName: " + authorModified.lastName);
	    	
	        var updateUrl = urlBase + "/" + authorModified.authorId;
	        return $http.put(updateUrl, authorModified);
	    }; 
	    
	    factory.deleteAuthor = function(authorId) {
	    	console.log("AuthorFactory - deleteAuthor - authorId: " + authorId);
	        var deleteUrl = urlBase + "/" + authorId;
	        return $http.delete(deleteUrl);
	    };     
	
	    return factory;     
	});