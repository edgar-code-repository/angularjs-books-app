angular
	.module("myApp")
	.service('SharedCategoryService', function () {
	    var sharedCategory = {};
	
	    var setCategory = function(category) {
	    	sharedCategory = category;
	    };
	
	    var getCategory = function(){
	        return sharedCategory;
	    };
	
	    return {
	    	setCategory: setCategory,
	    	getCategory: getCategory
	    };    
    
	});