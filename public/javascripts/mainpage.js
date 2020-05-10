var app = angular.module('MainPage', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/main.html',
			controller: 'MainCtrl'
		})
		// .when('/add-course', {
		// 	templateUrl: 'partials/courseForm.html',
		// 	controller: 'AddCourseCtrl'
		// })
		// .when('/add-course', {
		// 	templateUrl: 'partials/courseForm.html',
		// 	//controller: 'AddCourseCtrl'
		// })
		// .otherwise({
		// 	redirectTo: '/'
		// });
}]);
app.controller('MainCtrl', ['$scope', '$resource',
	function($scope, $resource){
		console.log("main")
		//var MyCourses = $resource('/cart/myCourses');
		//MyCourses.query(function(myCourses){
		//	$scope.myCourses = myCourses;
		//});
}]);
