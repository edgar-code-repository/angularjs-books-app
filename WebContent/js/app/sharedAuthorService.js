angular
	.module("myApp")
	.service('SharedAuthorService', function () {
	    var sharedAuthor = {};
	
	    var setAuthor = function(author) {
	        sharedAuthor = author;
	    };
	
	    var getAuthor = function(){
	        return sharedAuthor;
	    };
	
	    return {
	    	setAuthor: setAuthor,
	        getAuthor: getAuthor
	    };    
    
	});