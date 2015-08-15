/**
 * Created by parkhomenko on 14.08.15.
 */
var app = angular.module('clientPageApp',['ngRoute']);

'use strict'

//  ng-route config
// when we go to "/" load homePage.html with homePageCtrl
// $locationProvider disable hashtag in url


app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'homePage.html',
            controller: 'homePageCtrl'
        })
        .when('/clientsDetails', {
            templateUrl: 'clientsDetails.html',
            controller: 'clientsDetailsCtrl'
        })
        .otherwise({
            redirectTo: '/404'
        });
    //
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

//  controller for home page

    app.controller('homePageCtrl', function($scope,$location,$http) {
        $scope.clients = [
            {id:1,CreationDate:1112,site: 'Cali Roll', lastname: 2,firstname: 2,email:'qwe@mail.com',phoneNumber:'0933664213'},
            {id:2,CreationDate:1113,site: 'Philly',  lastname: 4,firstname: 2,email:'qwe@mail.com',phoneNumber:'0933664213'},
            {id:3,CreationDate:1114,site: 'Tiger',  lastname: 7,firstname: 2,email:'qwe@mail.com',phoneNumber:'0933664213'},
            {id:4,CreationDate:1115,site: 'Rainbow',  lastname: 6,firstname: 2,email:'qwe@mail.com',phoneNumber:'0933664213'}
        ];

        //$http.get("/api/contacts")
        //    .success(function (data) {
        //        console.log("Success");
        //        $scope.clients = data;
        //    })
        //    .error(function (data) {
        //        console.log("WRONG");
        //        console.log(data);
        //    });

        $scope.clientDetails = function (id) {
            $http.get("/api/contacts/" + id)
                .success(function (data) {
                    console.log("Success");
                    console.log(data);
                    $location.path("/clientsDetails" + '?id=' + id);
                })
                .error(function () {
                    console.log("WRONG")
                });
        }
    });
app.directive('clientButton', function() {
    return {
        restrict: 'E',
        template: '<button type="button" class="btn btn-default" ng-click="clientDetails(client.id)" >Default</button>'
    };
});
app.factory('translatorRequest',function($q, $http){
    var futureLoadedData = $q.defer();
    $http.get('translations.json')
        .success(function(data){
            futureLoadedData.resolve(data);
            console.log("Loaded")
        })
        .error(function(data){
            console.log(data)
        });
    return {
        afterDataLoaded : futureLoadedData.promise
    };
});
app.controller('clientsDetailsCtrl', function($scope,$location,$http) {


});

app.directive('translate', function ($compile, translatorRequest) {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        scope: {
            data: '='
        },
        link: function(scope, element ) {
            var html ='<h1>{{replacement}}</h1>';

            translatorRequest.afterDataLoaded.then(function(data){
                var key = element[0].innerHTML;
                scope.replacement = data[key];
                element.replaceWith($compile(html)(scope));
            });
        }
    }
});