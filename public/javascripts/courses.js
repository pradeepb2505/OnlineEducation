var app = angular.module('OnlineEducation', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})
		.when('/add-course', {
			templateUrl: 'partials/courseForm.html',
			controller: 'AddCourseCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
app.controller('HomeCtrl', ['$scope', '$resource',
	function($scope, $resource){
		var MyCourses = $resource('/cart/myCourses');
		MyCourses.query(function(myCourses){
			$scope.myCourses = myCourses;
		});
	}]);
app.controller('AddCourseCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		$scope.save = function(){
			var MyCourses = $resource('/cart/myCourses');
			MyCourses.save($scope.myCourses, function(){
				$location.path('/');
			});
		};
	}]);