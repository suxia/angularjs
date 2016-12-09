'use strict';

/* App Module */

var app = angular.module('flapperNews', ['ui.router']);

app.controller('MainCtrl', ['$scope','posts', function($scope,posts) {
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if (!$scope.title || $scope.title === '') return;
        $scope.posts.push({
          title: $scope.title,
          link: $scope.link,
          upvotes: 0,
          comments: [
            {author: 'Joe', body: 'Cool post!', upvotes: 0},
            {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
          ]
        });
        $scope.link = $scope.title = '';
    }

    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
    }
}]);

app.controller('PostsCtrl', ['$scope','$stateParams','posts',function($scope, $stateParams, posts){
        const id = $stateParams.id;
        console.log(posts.posts[id])
        $scope.post = posts.posts[id];
}]);


app.service('posts',[function(){
    return {
        posts:  [
          {title: 'post 1', upvotes: 5},
          {title: 'post 2', upvotes: 2},
          {title: 'post 3', upvotes: 15},
          {title: 'post 4', upvotes: 9},
          {title: 'post 5', upvotes: 4}
        ]
    };
}]);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
      })
     .state('posts', {
       url: '/posts/{id}',
       templateUrl: '/post.html',
       controller: 'PostsCtrl'
     });

      $urlRouterProvider.otherwise('home');
}]);
