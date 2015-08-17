var app = angular.module('clientPageApp',['ngRoute',"highcharts-ng",'ngMessages']);

'use strict';

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
        $scope.sortType     = 'CreationDate';                                       // set the default sort type
        $scope.sortReverse  = false;                                                // set the default sort order
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
        template: '<button type="button" class="btn viewBtn" ng-click="clientDetails(client.id)" >Take</button>'
    };
});

app.controller('clientsDetailsCtrl', function($scope,$location,$http) {

    $scope.phoneNumbers =[
        {
        title: 'Home',                                      // home, business ...
        phoneNumber: ''
    },
        {
            title: 'Mobile',                                // home, business ...
            phoneNumber: ''
        }
    ];
    $scope.userContacts = {
        //id: 1,
        //civilityFlag: '0',
        //lastname: 'Lastname',
        //firstname: 'Firstname',
        //site: 'France',
        //creationDate: '16.08.2015',
        //address : {
        //    title:  'Home',
        //    line1: '1',
        //    line2: '2',
        //    postcode: '07300',
        //    city: 'Paris',
        //    country: 'France'
        //},
        phoneNumbers:$scope.phoneNumbers
        //email: 'test@email.com'
    };
    $scope.userContactsForm = function() {


        alert('our form is amazing');
        console.log($scope.userContacts);
    };


    $scope.visit = {
        userAgent: 'User Agent',                                // User Agent of the visitor
        creationDate: '16.08.2015',                             // Local date time of the visit, we should keep the local
                                                                //date time with time zone (all our site are on Europe/Paris tz),
    views: {
        online: 0,                                              // (count of page online during the visit)
        offline: 0,                                             // (count of page offline during the visit)
        offtarget: 0,                                           // (count of page off target during the visit)
        total: 0                                                // (count of page view during the visit)
    }
};
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
        dataLabels: false                                       // disable labels
    };

    $scope.highchartsNG = {
        title: {
            text: $scope.splineChartSettings.charTitle
        },
        xAxis: {
            categories: $scope.splineChartSettings.xAxis
        },
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