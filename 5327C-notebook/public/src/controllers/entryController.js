angular.module('5327CApp').controller('entryController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		$scope.docs = $window.docs;
		$scope.doc;
		for(var i = 0; i < $scope.docs.length; i++){
			if($location.search().t == $scope.docs[i].timestamp){
				$scope.doc = $scope.docs[i];
			}
		}
	});

	$scope.getCode = $window.getCode;
}]);