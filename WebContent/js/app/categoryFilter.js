angular
	.module("myApp")
	.filter("categoryFilter", function() {
	
		return function(books, categorySelectedId) {
			//console.log("CategoryFilter - Inicio - categorySelectedId: " + categorySelectedId);
			
			var filtered = [];
			
			angular.forEach(books, function(book) {
				//console.log("CategoryFilter - forEach - book.category.categoryId: " + book.category.categoryId);
				if (categorySelectedId == -1) {
					filtered.push(book);
				}
				else {
					if (book.category.categoryId == categorySelectedId) {
						filtered.push(book);
					}					
				}
			});
			
			//console.log("CategoryFilter - Fin - size length: " + filtered.length);
			return filtered;
			
		}
		
	});