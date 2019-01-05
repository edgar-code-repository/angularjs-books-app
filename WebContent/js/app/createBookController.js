angular
	.module("myApp")
    .controller('CreateBookController', function($scope, BookFactory, CategoryFactory, AuthorFactory, UploadImageFactory, $location) {
	    //console.log("CreateBookController - Inicio");
    	
    	$scope.flagContinueSaveBook = false;
    	$scope.categories = [];
    	$scope.authors = [];
    	$scope.selectedAuthors = [];
    	
    	$scope.file = '';
    	
	    CategoryFactory.getCategories().then(
	        function successCallback(response) {
	        	//console.log("CreateBookController - Llamada exitosa a CategoryFactory.getCategories()");
	            $scope.categories = response.data;
	            $scope.categorySelectedId = -1;
	        },
	        function errorCallback(response) {
	            console.log("CreateBookController - Se ha producido un error al llamar a CategoryFactory.getCategories()");
	        }
		);   
	    
	    AuthorFactory.getAuthors().then(
	        function successCallback(response) {
	        	//console.log("CreateBookController - Llamada exitosa a AuthorFactory.getAuthors()");
	            $scope.authors = response.data;
	            $scope.authorsSelectedId = -1;
	        },
	        function errorCallback(response) {
	            console.log("CreateBookController - Se ha producido un error al llamar a AuthorFactory.getAuthors()");
	        }	    		
	    );
    	
	    
	    $scope.goToLocation = function(path) {
	        $location.path(path);
	    };    
	    
	    $scope.continueAddBook = function() {
	    	
	    	if ($scope.bookName == undefined || $scope.bookName == "" || ($scope.bookName + "").length == 0) {
	    		alert("The name is required");
	    		$("#bookName").focus();
	    		return;
	    	}
	    	
	    	if ($scope.bookIsbn == undefined || $scope.bookIsbn == "" || $scope.bookIsbn.length == 0) {
	    		alert("The ISBN is required");
	    		$("#bookIsbn").focus();
	    		return;
	    	}
	    	
	    	if ($scope.categorySelectedId == undefined || $scope.categorySelectedId == "" || $scope.categorySelectedId == -1) {
	    		alert("The category is required");
	    		$("#selectCategories").focus();
	    		return;
	    	}	 
	    	
	    	if ($scope.bookDescription == undefined || $scope.bookDescription == "" || $scope.bookDescription.length == 0) {
	    		alert("The category is required");
	    		$("#bookDescription").focus();
	    		return;
	    	}	    	
	    	
	    	$scope.flagContinueSaveBook = true;
	    };
	    
	    $scope.continueCancel = function() {
	    	$scope.flagContinueSaveBook = false;
	    };    
	    
	    $scope.addAuthor = function() {
	    	console.log("CreateBookController - addAuthor - $scope.authorsSelectedId: " + $scope.authorsSelectedId);
	    	
	    	if ($scope.authorsSelectedId == -1) {
	    		alert("Select an author");
	    		return;
	    	}
	    	else {
	    		var flagExistsAuthor = false;
	    		if ($scope.selectedAuthors.length > 0) {
		    		for(i=0;i<$scope.selectedAuthors.length;i++) {
		    			if ($scope.selectedAuthors[i].authorId == $scope.authorsSelectedId) {
		    				flagExistsAuthor = true;
		    				alert("Author was already added");
		    				break;
		    			}
		    		}	    			
	    		}
	    		
	    		if (!flagExistsAuthor) {
		    		for(i=0;i<$scope.authors.length;i++) {
		    			if ($scope.authors[i].authorId == $scope.authorsSelectedId) {
		    				$scope.selectedAuthors.push($scope.authors[i]);
		    				break;
		    			}
		    		}
	    		}
	    		
	    		
	    	}
	    	
	    	
	    };
	    
	    $scope.deleteAuthorFromList = function(addedAuthor) {
	    	console.log("CreateBookController - deleteAuthorFromList - addedAuthor: " + addedAuthor.firstName);
	    	console.log("CreateBookController - deleteAuthorFromList - addedAuthor: " + addedAuthor.lastName);
	    	console.log("CreateBookController - deleteAuthorFromList - index: " + $scope.selectedAuthors.indexOf(addedAuthor));
	    	
	    	authorIndex = $scope.selectedAuthors.indexOf(addedAuthor);
	    	if (authorIndex != -1) {
	    		$scope.selectedAuthors.splice(authorIndex,1);
	    	}
	    	
	    };
	    
	    $scope.saveBook = function(){
	        console.log("CreateBookController - saveBook - Inicio");
	        
            var file = $scope.file;
            console.log("CreateBookController - saveBook - file: " + file);
            console.log("CreateBookController - saveBook - file.name: " + file.name);
            console.log("CreateBookController - saveBook - selectedAuthors.length:" + $scope.selectedAuthors.length);
            
            if (file == undefined || file.name == undefined) {
            	alert("Book image is required");
            	return;
            }
            
            if ($scope.selectedAuthors.length == 0) {
            	alert("Author is required");
            	return;
            }
            
            UploadImageFactory.uploadBookImage(file)
                .then(
                    function (response) {
                    	console.log("CreateBookController - saveBook - uploaded was done - file: " + file.name);
                    	
            	        var newBook = {
            	        	name : $scope.bookName,
            				isbn : $scope.bookIsbn,
            				category: $scope.categorySelectedId,
            				imageName: file.name,
            				description: $scope.bookDescription,
            				authors: $scope.selectedAuthors,
            				id : 0
            			};
            	            
            		    console.log("CreateBookController - saveBook - newBook - name: " + newBook.name);
            		    console.log("CreateBookController -saveBook - newBook - isbn: " + newBook.isbn);
            		    console.log("CreateBookController -saveBook - newBook - category: " + newBook.category);
            		    console.log("CreateBookController -saveBook - newBook - imageName: " + newBook.imageName);
            		    console.log("CreateBookController -saveBook - newBook - description: " + newBook.description);
            		    
            		    $scope.selectedAuthors.every(author => console.log(author.firstName + " " + author.lastName));
            	        
            		    var request = BookFactory.saveBook(newBook);
            		    request.then(
            		    	function successCallback(response) {
            		            $location.path("/");
            		        },
            		        function errorCallback(response) {
            		            console.log("CreateBookController - saveBook - An error ocurred");
            		        }
            		    );                        
                        
                    },
                    function (response) {
                    	alert("CreateBookController - Upload Error:" + response.data);
                    	return;
                    }
                );
            
	    };    
	    
    
    
    });

