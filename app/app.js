import _components from './components/angular-highlight-searchtext/highlighter';
import _app_component from './app.component';

/*let config = function($httpProvider,$locationProvider){
 "ngInject";
 $locationProvider.html5Mode(true).hashPrefix('!');
 $httpProvider.interceptors.push('httpInterceptor');
 }

 config.$inject = ['$httpProvider','$locationProvider'];*/

angular.module('app', [
         'ui.bootstrap',
        _components.name
    ])
    .component('app', _app_component)
    .config(function () {
        /*you can put app configuration values here*/
    });
