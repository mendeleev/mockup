var dir = angular.module("Directives", []);

dir.directive("navigationBar", function() {
	return {
		restrict: "E",
		templateUrl: "app/views/navigation-bar.html",
		controller: "navigationCtrl",
		controllerAs: "nav"
	};
});