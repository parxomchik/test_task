var app = angular.module('clientPageApp',['ngRoute',"highcharts-ng",'ngMessages','ngResource']);

'use strict';

//  ng-route config
// when we go to "/" load homePage.html with homePageCtrl


app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'homePage.html',
            controller: 'homePageCtrl'
        })
        .when('/index.html#/', {
            templateUrl: 'homePage.html',
            controller: 'homePageCtrl'
        })
        .when('/clientsDetails', {
            templateUrl: 'clientsDetails.html',
            controller: 'clientsDetailsCtrl'
        })
        .when('/clientsDetails/:id', {
            templateUrl: 'clientsDetails.html',
            controller: 'clientsDetailsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.factory('contacts', function($http){
    return {
        getContacts: function() {
            return  $http.get("contacts.json")
                .success(function (data) {
                })
                .error(function (data) {
                    console.log("WRONG");
                    console.log(data);
                });
        }
    };
});
//app.factory('contactsResourse',[$resourse,
//    function($resourse){
//    return $resourse('restUrl.:format', {
//        restUsl: 'contacts',
//        format: 'json'
//    })
//}
//    ]);

app.factory("contactsResourse", function ($resource) {
    return $resource('contacts.json');
        //"/api/booking/:Id",
        //{Id: "@Id" }
        //{
        //    "update": {method: "PUT"},
        //    "reviews": {'method': 'GET', 'params': {'reviews_only': "true"}, isArray: true}
        //
        //}
    //);
});

//  controller for home page
app.controller('homePageCtrl', function($scope,$location,$http,contactsResourse) {
    //    var contactsData = function(data) {
    //    $scope.clients = angular.fromJson(data);
    //    console.log($scope.clients);
    //};
    //contacts.getContacts().success(contactsData);

    $scope.clients = contactsResourse.query();



    $scope.sortType     = 'creationDate';                                       // set the default sort type
        $scope.sortReverse  = false;                                                // set the default sort order

        $scope.clientDetails = function (id) {
            console.log(id);
            $location.path("/clientsDetails/"+id);
        }

    });

// directive include button intro clients table

app.directive('clientButton', function() {
    return {
        restrict: 'E',
        template: '<button type="button" class="btn viewBtn" ng-click="clientDetails(client.id)" >Take</button>'
    };
});

app.controller('clientsDetailsCtrl', function($scope,$location,$http,$routeParams,contacts) {

    var id = $routeParams.id - 1;
    var contactsData = function(data) {
        $scope.userContacts = data[id];

    };
    contacts.getContacts().success(contactsData);
    //$scope.userContacts = contactsResourse.query();
    //console.log($scope.userContacts);

    $scope.userContactsForm = function() {
        alert('our form is amazing');
        //console.log($scope.userContacts);
        //console.log($scope.userContacts.id);
        $http.post('/api/contacts/:'+ $scope.userContacts.id)
            .success(function (data) {
                alert('saved');
            })
            .error(function (data) {
                console.log("WRONG");
                console.log(data);
            });
    };
    $http.get('/api/contacts/:'+id+'/visits')
        .success(function (data) {
            $scope.visit = data;
            //console.log(data)
        })
        .error(function (data) {
            console.log("WRONG");
            //console.log(data);
        });


    $scope.visit = {
        userAgent: 'User Agent',                                // User Agent of the visitor
        creationDate: '16.08.2015',                             // Local date time of the visit, we should keep the local
                                                                //date time with time zone (all our site are on Europe/Paris tz),
    views: {
        online: 156,                                              // (count of page online during the visit)
        offline: 50,                                             // (count of page offline during the visit)
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
