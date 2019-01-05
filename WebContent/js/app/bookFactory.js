angular
	.module("myApp")
	.factory('BookFactory', function($http) {
		
	    apiHost = document.getElementById("apiHost").value;
	    apiPort = document.getElementById("apiPort").value;
	    apiName = document.getElementById("apiName").value;
	    
	    var factory = {};
	    var books = [];
	    
	    var urlBase = "http://" + apiHost + ":" + apiPort + apiName + "/books";
	    console.log("BookFactory - urlBase: " + urlBase);
	    
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