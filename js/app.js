var app = angular.module('clientPageApp',['ngRoute',"highcharts-ng"]);

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
// directive include button intro clients table

app.directive('clientButton', function() {
    return {
        restrict: 'E',
        template: '<button type="button" class="btn btn-default" ng-click="clientDetails(client.id)" >Default</button>'
    };
});

app.controller('clientsDetailsCtrl', function($scope,$location,$http) {

    $scope.splineChartSettings =  {
        markerLineColor:'#f6a463',                              // set marker dots color
        chartName:'Pages per visits',                           // set chart name
        charType:'spline',                                      // set chart type
        charTitle : 'User Visits',                              // set chart title
        chartData : [5, 30, 10, 34, 0],                         //set chart data
        xAxis : ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan']   // set chart X axis
    };
    $scope.pieChartSettings =  {
        type:'pie',                                             // set type
        size : 100,                                             // set pie size
        center: [80, 80],                                       // set pie center point
        data :  [['Online',   27], ['Offline',  45]],           //set pie data
        name: 'Total users',
        dataLabels: false                                      // disable labels
    };

    $scope.highchartsNG = {
        title: {
            text: $scope.splineChartSettings.charTitle
        },
        xAxis: {
            categories: $scope.splineChartSettings.xAxis
        },
        labels: {
            items: [{
                html: 'Total fruit consumption',
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [{
            type: $scope.splineChartSettings.charType,
            name: $scope.splineChartSettings.chartName,
            data: $scope.splineChartSettings.chartData,
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: $scope.splineChartSettings.markerLineColor
                    }
        },
            {
            type: $scope.pieChartSettings.type,
                name: $scope.pieChartSettings.name,
                data: $scope.pieChartSettings.data,
                size: $scope.pieChartSettings.size,
                center: $scope.pieChartSettings.center,
                showInLegend: false,
                dataLabels: {
                    enabled: $scope.pieChartSettings.dataLabels   // disable labels
                }
        }],
        loading: false




        //title: {
        //    text: 'Combination chart'
        //},
        //xAxis: {
        //    categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
        //},
        //labels: {
        //    items: [{
        //        html: 'Total fruit consumption',
        //        style: {
        //            left: '50px',
        //            top: '18px',
        //            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
        //        }
        //    }]
        //},
        //series: [{
        //    type: 'column',
        //    name: 'Jane',
        //    data: [3, 2, 1, 3, 4]
        //}, {
        //    type: 'column',
        //    name: 'John',
        //    data: [2, 3, 5, 7, 6]
        //}, {
        //    type: 'column',
        //    name: 'Joe',
        //    data: [4, 3, 3, 9, 0]
        //}, {
        //    type: 'spline',
        //    name: 'Average',
        //    data: [3, 2.67, 3, 6.33, 3.33],
        //    marker: {
        //        lineWidth: 2,
        //        lineColor: Highcharts.getOptions().colors[3],
        //        fillColor: 'white'
        //    }
        //}, {
        //    type: 'pie',
        //    name: 'Total consumption',
        //    data: [{
        //        name: 'Jane',
        //        y: 13,
        //        color: Highcharts.getOptions().colors[0] // Jane's color
        //    }, {
        //        name: 'John',
        //        y: 23,
        //        color: Highcharts.getOptions().colors[1] // John's color
        //    }, {
        //        name: 'Joe',
        //        y: 19,
        //        color: Highcharts.getOptions().colors[2] // Joe's color
        //    }],
        //    center: [100, 80],
        //    size: 100,
        //    showInLegend: false,
        //    dataLabels: {
        //        enabled: false
        //    }
        //}]
    //});




    }
});

//app.directive('translate', function ($compile, translatorRequest) {
//    return {
//        restrict: 'A', //E = element, A = attribute, C = class, M = comment
//        scope: {
//            data: '='
//        },
//        link: function(scope, element ) {
//            var html ='<h1>{{replacement}}</h1>';
//
//            translatorRequest.afterDataLoaded.then(function(data){
//                var key = element[0].innerHTML;
//                scope.replacement = data[key];
//                element.replaceWith($compile(html)(scope));
//            });
//        }
//    }
//});