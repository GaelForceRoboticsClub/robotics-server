angular.module('5327CApp').controller('entriesController', ['$scope','$location','$route', '$window', function($scope, $location, $route, $window){
	$scope.$on('$routeChangeSuccess', function(){
		$scope.docs = $window.docs;
	});
}]);