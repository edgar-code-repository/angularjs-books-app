angular
	.module("myApp")
	.factory('BookFactory', function($http) {
	    var factory = {};
	    var books = [];
	    var urlBase = "http://localhost:9096/bookstore-api/books";
	    
	    factory.getBooks = function() {
	    	//console.log("BookFactory - Ejecutando getBooks...");
	    	return $http.get(urlBase);
	    };
	    
	    factory.saveBook = function(newBook) {
	        return $http.post(urlBase, newBook);
	    };  
	    
	    factory.updateBook = function(bookModified) {
	        var updateUrl = urlBase + "/" + bookModified.bookId;
	        return $http.put(updateUrl, bookModified);
	    }; 
	    
	    factory.deleteBook = function(bookId) {
	        var deleteUrl = urlBase + "/" + bookId;
	        return $http.delete(deleteUrl);
	    };     
	
	    return factory;     
	});