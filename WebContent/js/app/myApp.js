var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

app.run(function($http) {
    var login = "user";
    var password = "pwd";
    var encodedString = btoa(login + ":" + password);

    $http.defaults.headers.common.Authorization = 'Basic ' + encodedString;	
});

app.config(function($routeProvider) {
    $routeProvider
	    .when("/", {
	        controller: 'BookController',
	        templateUrl: "views/booksList.html"
	    })
	    .when("/createBook", {
	        controller: 'CreateBookController',
	        templateUrl: "views/createBook.html"
	    })
	    .when("/viewBook", {
	        controller: 'ViewBookController',
	        templateUrl: "views/viewBook.html"
	    })	    
	    .when("/editBook", {
	        controller: 'EditBookController',
	        templateUrl: "views/editBook.html"
	    })
	    .when("/authorsList", {
	        controller: 'AuthorsController',
	        templateUrl: "views/authorsList.html"
	    })	
	    .when("/createAuthor", {
	        controller: 'CreateAuthorController',
	        templateUrl: "views/createAuthor.html"	    	
	    })
	    .when("/editAuthor", {
	        controller: 'EditAuthorController',
	        templateUrl: "views/editAuthor.html"
	    })		    
	    .when("/categoriesList", {
	        controller: 'CategoriesController',
	        templateUrl: "views/categoriesList.html"
	    })
	    .when("/editCategory", {
	        controller: 'EditCategoryController',
	        templateUrl: "views/editCategory.html"
	    })	    
	    .when("/createCategory", {
	        controller: 'CreateCategoryController',
	        templateUrl: "views/createCategory.html"	    	
	    })	    
	    .otherwise({ redirectTo: '/'});
});
