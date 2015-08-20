var myCareer = angular
    .module('myCareer', ['ngMap', 'ngRoute', 'ngResource'])
    .controller("mainController", mainController)
    .directive('onFinishRender',['$timeout', '$parse', function ($timeout, $parse) {
    return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                        if(!!attr.onFinishRender){
                          $parse(attr.onFinishRender)(scope);
                        }
                    });
                }
            }
        }
    }]);
mainController.$inject = ["$scope", "$http"];
function mainController($scope, $http) {
    $scope.formData = {};
    $scope.loader = function(){
        loader();
        $("html").removeClass("loading");
    }
    $scope.timeSpan = function(from, to) {
        return moment(from).format("MMM YY") + " to " + moment(to).format("MMM YY");
    };
    $scope.stripCo = function(str) {
        return str.replace(/\s/g, '');
    }
    $scope.diffDate = function(from, to) {
        now = moment(to)
        return Math.round(now.diff(moment(from), 'months', true) / 12);
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
myCareer.factory('myHttpInterceptor', function($q, $window) {
    return function(promise) {
        return promise.then(function(response) {
            $("#spinner").hide();
            return response;
        }, function(response) {
            $("#spinner").hide();
            return $q.reject(response);
        });
    };
});
myCareer.config(function($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
    var spinnerFunction = function spinnerFunction(data, headersGetter) {
        $("#spinner").show();
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
});

var loader = function() {
    $(".timeline-panel").each(function() {
        var first = false;
        if (!first && isScrolledIntoView(this) === true) {
            if (!first && !$(this).hasClass('timeline-panel-first')) {
                $(this).addClass('timeline-panel-first');
                first = true;
                           
            } else if($(this).hasClass('timeline-panel-first')) {
                    $(this).removeClass('timeline-panel-first');                                
            }
            if(!$(this).hasClass('timeline-panel-anim')) {
                $(this).addClass('timeline-panel-anim').parent().addClass('visible');
            }
        } else {
            $(".reveal", this).removeClass(".reveal").addClass(".reveal");
            $(this).removeClass('timeline-panel-anim').parent().removeClass('visible');
            if($(this).hasClass('timeline-panel-first')) {
                $(this).removeClass('timeline-panel-first');
            }                                

        }
    });

}
$(window).scroll(
    function() {
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