angular
	.module("myApp")
	.service('SharedBookService', function () {
	    var sharedBook = {};
	
	    var setBook = function(book) {
	        sharedBook = book;
	    };
	
	    var getBook = function(){
	        return sharedBook;
	    };
	
	    return {
	        setBook: setBook,
	        getBook: getBook
	    };    
    
	});