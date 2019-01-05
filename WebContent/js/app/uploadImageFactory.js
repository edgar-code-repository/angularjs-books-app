angular
	.module("myApp")
	.factory('UploadImageFactory', ['$http', function ($http) {

		var factory = {
			uploadBookImage: uploadBookImage
		};
	
		return factory;
	
		function uploadBookImage(file) {
	        var formData = new FormData();
	        formData.append('file', file);
	
	        return $http.post("http://localhost:9096/uploadBookImage/", formData, 
	        	{
	        		transformRequest : angular.identity,
	        		headers : { "Content-Type": undefined }
	        	}
	        );
	        
	    };

	}
]);