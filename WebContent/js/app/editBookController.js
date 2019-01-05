angular
	.module("myApp")
	.controller('EditBookController', function($scope, BookFactory, $location, SharedBookService, CategoryFactory, AuthorFactory, UploadImageFactory) {
	    console.log("EditBookController - Inicio");
	    
    	$scope.flagContinueSaveBook = false;
    	$scope.categories = [];
    	$scope.authors = [];
    	$scope.selectedAuthors = [];	
    	
    	$scope.file = '';
    	
	    var sharedBook = SharedBookService.getBook();
	    console.log("EditBookController - sharedBook - id: " + sharedBook.bookId);
	    console.log("EditBookController - sharedBook - name: " + sharedBook.name);  
	    console.log("EditBookController - sharedBook - category: " + sharedBook.category.categoryId);
	    console.log("EditBookController - sharedBook - authors.length: " + sharedBook.authors.length);
	    
	    $scope.selectedAuthors = sharedBook.authors;
    	
	    CategoryFactory.getCategories().then(
	        function successCallback(response) {
	        	console.log("EditBookController - Llamada exitosa a CategoryFactory.getCategories()");
	            $scope.categories = response.data;
	            $scope.categorySelectedId = sharedBook.category.categoryId;
	        },
	        function errorCallback(response) {
	            console.log("EditBookController - Se ha producido un error al llamar a CategoryFactory.getCategories()");
	        }
		);   
	    
	    AuthorFactory.getAuthors().then(
	        function successCallback(response) {
	        	console.log("EditBookController - Llamada exitosa a AuthorFactory.getAuthors()");
	            $scope.authors = response.data;
	            $scope.authorsSelectedId = -1;
	        },
	        function errorCallback(response) {
	            console.log("EditBookController - Se ha producido un error al llamar a AuthorFactory.getAuthors()");
	        }	    		
	    );    	
	    	    
	    $scope.bookId = sharedBook.bookId;
	    $scope.bookName = sharedBook.name;
	    $scope.bookIsbn = sharedBook.isbn;
	    $scope.bookDescription = sharedBook.description;
	    $scope.bookImage = sharedBook.imageName;
	    
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
	    	console.log("EditBookController - addAuthor - $scope.authorsSelectedId: " + $scope.authorsSelectedId);
	    	
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
	    	console.log("EditBookController - deleteAuthorFromList - addedAuthor: " + addedAuthor.firstName);
	    	console.log("EditBookController - deleteAuthorFromList - addedAuthor: " + addedAuthor.lastName);
	    	console.log("EditBookController - deleteAuthorFromList - index: " + $scope.selectedAuthors.indexOf(addedAuthor));
	    	
	    	authorIndex = $scope.selectedAuthors.indexOf(addedAuthor);
	    	if (authorIndex != -1) {
	    		$scope.selectedAuthors.splice(authorIndex,1);
	    	}
	    	
	    };	    
	        
	    $scope.updateBook = function() {
	    	console.log("EditBookController - updateBook: " + $scope.bookName);
	    	
	    	var file = $scope.file;
	    	console.log("EditBookController - updateBook - file: " + file);
	    	console.log("EditBookController - updateBook - file.name " + file.name);
	    	
            if (file != undefined && file.name != undefined) {
            	
                if ($scope.selectedAuthors.length == 0) {
                	alert("Author is required");
                	return;
                }            	
            	
                UploadImageFactory.uploadBookImage(file)
                .then(
                    function (response) {
                    	console.log("EditBookController - updateBook - uploaded was done - file: " + file.name);
                    	
            	        var modifiedBook = {
            	        	name : $scope.bookName,
            				isbn : $scope.bookIsbn,
            				category: $scope.categorySelectedId,
            				imageName: file.name,
            				description: $scope.bookDescription,
            				authors: $scope.selectedAuthors,
            				bookId : $scope.bookId
            			};
            	            
            	        console.log("EditBookController - updateBook - bookId: " + modifiedBook.bookId);
            		    console.log("EditBookController - updateBook - name: " + modifiedBook.name);
            		    console.log("EditBookController - updateBook - isbn: " + modifiedBook.isbn);
            		    console.log("EditBookController - updateBook - category: " + modifiedBook.category);
            		    console.log("EditBookController - updateBook - imageName: " + file.name);
            		    console.log("EditBookController - updateBook - description: " + modifiedBook.description);
            		    
            		    $scope.selectedAuthors.every(author => console.log(author.firstName + " " + author.lastName));
            	        
            		    var request = BookFactory.updateBook(modifiedBook);
            		    request.then(
            		    	function successCallback(response) {
            		            $location.path("/");
            		        },
            		        function errorCallback(response) {
            		            console.log("EditBookController - updateBook - An error ocurred");
            		        }
            		    );                        
                        
                    },
                    function (response) {
                    	alert("EditBookController - Upload Error:" + response.data);
                    	return;
                    }
                );
            }
            else {
            	
                if ($scope.selectedAuthors.length == 0) {
                	alert("Author is required");
                	return;
                }   
                
    	        var modifiedBook = {
        	        	name : $scope.bookName,
        				isbn : $scope.bookIsbn,
        				category: $scope.categorySelectedId,
        				imageName: $scope.bookImage,
        				description: $scope.bookDescription,
        				authors: $scope.selectedAuthors,
        				bookId : $scope.bookId
        			};
        	            
        	        console.log("EditBookController - updateBook - bookId: " + modifiedBook.bookId);
        		    console.log("EditBookController - updateBook - name: " + modifiedBook.name);
        		    console.log("EditBookController - updateBook - isbn: " + modifiedBook.isbn);
        		    console.log("EditBookController - updateBook - category: " + modifiedBook.category);
        		    console.log("EditBookController - updateBook - imageName: " + modifiedBook.imageName);
        		    console.log("EditBookController - updateBook - description: " + modifiedBook.description);
        		    
        		    $scope.selectedAuthors.every(author => console.log(author.firstName + " " + author.lastName));
        	        
        		    var request = BookFactory.updateBook(modifiedBook);
        		    request.then(
        		    	function successCallback(response) {
        		            $location.path("/");
        		        },
        		        function errorCallback(response) {
        		            console.log("EditBookController - updateBook - An error ocurred");
        		        }
        		);                 
            	
            }
	               
	    };     
	});
