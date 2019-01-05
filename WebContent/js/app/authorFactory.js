angular
	.module("myApp")
	.factory('AuthorFactory', function($http) {
	    var factory = {};
	    var books = [];
	    
	    var urlBase = "http://" + apiHost + ":" + apiPort + apiName + "/authors";
	    console.log("AuthorFactory - urlBase: " + urlBase);
	    
	    
	    factory.getAuthors = function() {
	    	return $http.get(urlBase);
	    };
	    
	    factory.saveAuthor = function(newAuthor) {
	        return $http.post(urlBase, newAuthor);
	    };  
	    
	    factory.updateAuthor = function(authorModified) {	    	
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