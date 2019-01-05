angular
	.module("myApp")
	.controller('BookController', function($scope, BookFactory, CategoryFactory, $location, SharedBookService, $route) {
	    //console.log("BookController - Inicio");
	    
	    $scope.books = [];
	    $scope.categories = [];
	    $scope.flagContent = false;
	    $scope.flagError = false;
	    $scope.errorMessage = "";
	    
	    $scope.bookDescription = "";
	    
	    CategoryFactory.getCategories().then(
	        function successCallback(response) {
	        	//console.log("BookController - getCategories - Llamada exitosa a CategoryFactory.getCategories()");
	            $scope.categories = response.data;
	            $scope.categorySelectedId = -1;
	        },
	        function errorCallback(response) {
	            console.log("BookController - getCategories - Se ha producido un error al llamar a CategoryFactory.getCategories()");
	        }
		);	    
	
	    BookFactory.getBooks().then(
	        function successCallback(response) {
	        	//console.log("BookController - getBooks - Llamada exitosa a BookFactory.getBooks()");
	            $scope.books = response.data;
	            $scope.flagContent = true;
	            $scope.flagError = false;
	            $scope.errorMessage = "";
	        },
	        function errorCallback(response) {
	        	console.log("BookController - getBooks - Llamada exitosa a BookFactory.getBooks()");
	            console.log("getBooks - Response status: " + response.status);
	            console.log("getBooks - Response status text: " + response.statusText);
	            console.log("getBooks - Response data: " + response.data);
	            console.log("getBooks - Response headers: " + response.headers);
	            
	            $scope.flagContent = false;
	            $scope.flagError = true; 
	            $scope.errorMessage = "An error ocurred while getting books.";
	        }
	    );  
	    
	    $scope.goToLocation = function(path) {
	        $location.path(path);
	    };   
	    
	    $scope.viewBook = function(book) {
	        console.log("BookController - viewBook - bookId: " + book.bookId);
	        console.log("BookController - viewBook - name: " + book.name);
	        
	        SharedBookService.setBook(book);
	        
	        $location.path("/viewBook");
	        
	    };  	    
	    
	    $scope.editBook = function(book) {
	        console.log("BookController - editBook - id: " + book.bookId);
	        console.log("BookController - editBook - name: " + book.name);
	        
	        SharedBookService.setBook(book);
	        
	        $location.path("/editBook");
	        
	    };    
	    
	    $scope.deleteBook = function(bookId) {
	        console.log("BookController - deleteBook - bookId: " + bookId);
	        
	        if (confirm("Are you sure you want to delete selected book  ?")) {
	        	console.log("BookController - deleteBook - Calling BookFactory.deleteBook");
	            var request = BookFactory.deleteBook(bookId);
	            request.then(
	            	function successCallback(response) {
	            		console.log("BookController - deleteBook - status: " + response.status);
	            		$route.reload();
	            	},
	            	function errorCallback(response) {
	            		console.log("BookController - deleteBook - An error ocurred");
	            		console.log("BookController - deleteBook - status: " + response.status);
	            	}
	            );         
	        }
	    };   
    
	});

