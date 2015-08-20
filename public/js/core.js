var myCareer = angular.module('myCareer', ['ngMap']);
var loader = function(){
	$(".timeline-panel").each(function(){
 
		if (isScrolledIntoView(this) === true) {
			$(this).addClass('timeline-panel-anim').parent().addClass('visible');
		} else  {
			console.log("not adding class on " + $(this).parent().index())
			$(this).removeClass('timeline-panel-anim').parent().removeClass('visible');
		}
	});
	
}
$(document).ready(loader())
$(window).scroll(
	function(){
		console.log(this)
		loader();
	}
);
function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();
	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function mainController($scope, $http) {
    $scope.formData = {};
    $scope.timeSpan = function(from,to){
		return moment(from).format("MMM YY") + " to " +  moment(to).format("MMM YY");
	};
	$scope.stripCo = function(str) {
		return str.replace(/\s/g,'');
	}
    $scope.diffDate = function(from,to){
		now = moment(to)
		return Math.round(now.diff(moment(from), 'months', true)/ 12);
	};
    // when landing on the page, get all todos and show them
    $http.get('/data/roles')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}