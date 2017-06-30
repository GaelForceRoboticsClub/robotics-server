angular.module('5327CApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider
			.when('/',{
				templateUrl: '/public/src/views/home.html'
			})
			.when('/add',{
				templateUrl: '/public/src/views/add.html'
			})
			.when('/about',{
				templateUrl: '/public/src/views/about.html'
			})
			.when('/team',{
				templateUrl: '/public/src/views/team.html'
			})
			.when('/member',{
				templateUrl: '/public/src/views/member.html',
				controller: 'memberController'
			})
			.when('/entries',{
				templateUrl: '/public/src/views/entries.html',
				controller: 'entriesController'
			})
			.when('/entry',{
				templateUrl: '/public/src/views/entry.html',
				controller: 'entryController'
			})
			.when('/builds',{
				templateUrl: '/public/src/views/builds.html',
				controller: 'buildsController'
			})
			.otherwise({
				redirectTo: '/'
			})
	$locationProvider.html5Mode(true);
}])
.run(["$rootScope", "$location", function ($rootScope, $location) {
     $rootScope.$on("$viewContentLoaded", function () {
         componentHandler.upgradeAllRegistered();
     });
 }]);