angular
	.module("myApp")
	.controller('ViewBookController', function($scope, $location, SharedBookService) {
	    console.log("ViewBookController - Inicio");
	    
    	$scope.flagContinueViewBook = false;
    	$scope.categories = [];
    	$scope.authors = [];
    	$scope.selectedAuthors = [];	
    	
    	$scope.file = '';
    	
	    var sharedBook = SharedBookService.getBook();
	    console.log("ViewBookController - sharedBook - id: " + sharedBook.bookId);
	    console.log("ViewBookController - sharedBook - name: " + sharedBook.name);  
	    console.log("ViewBookController - sharedBook - category: " + sharedBook.category.categoryId);
	    console.log("ViewBookController - sharedBook - authors.length: " + sharedBook.authors.length);
	    
	    $scope.selectedAuthors = sharedBook.authors;
	    $scope.bookCategory = sharedBook.category.name; 
   	
	    	    
	    $scope.bookId = sharedBook.bookId;
	    $scope.bookName = sharedBook.name;
	    $scope.bookIsbn = sharedBook.isbn;
	    $scope.bookDescription = sharedBook.description;
	    $scope.bookImage = sharedBook.imageName;
	    
	    $scope.goToLocation = function(path) {
	        $location.path(path);
	    }; 	    
	    
	    $scope.continueViewBook = function() {	    	
	    	$scope.flagContinueViewBook = true;
	    };
	    
	    $scope.continueCancel = function() {
	    	$scope.flagContinueViewBook = false;
	    }; 	        
	        
	        
	      
	    
	});
