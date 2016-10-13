angular.module("eliteApp", ["ionic", "angular-cache"])

.run(function($ionicPlatform, $ionicConfig, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

      CacheFactory('leagueDataCache', { storageMode: 'localStorage', maxAge: 5000, deleteOnExpire: 'aggressive' });
      CacheFactory('leaguesCache', { storageMode: 'localStorage', maxAge: 5000, deleteOnExpire: 'aggressive' });
      CacheFactory('myTeamsCache', { storageMode: 'localStorage' });
      CacheFactory('staticCache', { storageMode: 'localStorage' });
  });
})

.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, CacheFactoryProvider) {

    $ionicConfigProvider.views.maxCache(0);

    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    $ionicConfigProvider.tabs.position('bottom');
    
    $stateProvider
        
        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: 'app/home/home.html'
        })
        
        .state('home.leagues', {
            url: "/leagues",
            views: {
              "tab-leagues": {
                templateUrl: 'app/home/leagues.html'
              }
            }
        })
        
        .state('home.myteams', {
            url: "/myteams",
            views: {
              "tab-myteams": {
                templateUrl: 'app/home/myteams.html'
              }
            }
        })

        .state('app', {
          abstract: true,
          url: "/app",
          templateUrl: "app/layout/menu-layout.html"
        })
        
        .state('app.teams', {
            url: "/teams",
            views: {
              "mainContent": {
                templateUrl: 'app/teams/teams.html'
              }
            }
        })
        
        .state('app.team-details', {
            url: "/teams/:id",
            views: {
              "mainContent": {
                templateUrl: 'app/teams/team-detail.html'
              }
            }
        })
        
        .state('app.game', {
            url: "/game/:id",
            views: {
              "mainContent": {
                templateUrl: 'app/game/game.html'
              }
            }
        })
        
        .state('app.standings', {
            url: "/standings",
            views: {
              "mainContent": {
                templateUrl: 'app/standings/standings.html'
              }
            }
        })
        
        .state('app.locations', {
            url: "/locations",
            views: {
              "mainContent": {
                templateUrl: 'app/locations/locations.html'
              }
            }
        })
        
        .state('app.rules', {
            url: "/rules",
            views: {
              "mainContent": {
                templateUrl: 'app/rules/rules.html'
              }
            }
        });
        
        // if none of the above tates are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/teams');
        
});