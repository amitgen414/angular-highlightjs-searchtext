angular-highlightjs-search
========================

An angular JS directive for highlighting the code with line numbers and searching a required keyword.

##Demo
https://amitgen414.github.io/angular-highlightjs-searchtext

## Requirements

* highlightjs v9.6.0
* AngularJS v1.0.1+


## Getting started
You will need to include `angular JS` , `Highlight JS` and one of the `highlight js theme(which is available with hljs package)` as depenedencies in your project
to make the directive work.

```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<link rel="stylesheet" href="/path/to/styles/xcode.css">
<script src="/path/to/highlight.pack.js"></script>
```

Include `angular-highlightjs-searchtext` module and stylesheet  with above included scripts in your page.
Please download or clone the repo to get the `angular-highlightjs-searchtext.min.js` and  `angular-highlightjs-searchtext.min.css` from build folder of repo and add it in your script and style folder
respectively
```html
<script src="./path/to/script/angular-highlightjs-searchtext.min.js"></script>
<link rel="stylesheet" href="/path/to/styles/angular-highlightjs-searchtext.min.css">
```

Add `angular-highlightjs-searchtext` to your app.
```js
angular.module('myApp', ['hljsSearch']);
```

## Install with npm

```sh
$ npm install angular-highlightjs-searchtext
```

## Options

Option              | Type   |Description
--------------------| -------| ----------------------------------------
code                | string | provide the code with \t and \n characters included for formatting.
language            | string | language of the code provided.
searchtext          | string | text to be searched in the code snippet.
linenumber          | boolean| whether line number is to be shown or not.

## Directive usage
`angular-highlightjs-searchtext` is an element directive.
you will just have to add the directive in you html view and pass the required parameters through scope.
it supports two way data binding. Hence as soon a any of the parameter value changed, it will get reflected immediately.

```js

    angular.module('myApp').controller('myAppController',['$scope', function($scope){
        $scope.code = 'code to be passed to directive for highlighting';
        $scope.language='language of the code';
        $scope.searchtext = 'text to be searched within the code';
        $scope.isLineNumber = true;
    
    }]);
 
```

```html
<!--angular-highlightjs-searchtext setup -->
 <hljs-search code="code" language="language" searchtext="searchtext"  linenumber="isLineNumber"></hljs-search>
</div>
```

## Customization
If you want to customize the app according to your needs, here is what should be done.
  1. Clone the respository in your local workspace.
  2. Install `Ruby` and `Compass` in your system as it is required for compiling your sass files.
  3. Install the npm dependencies.
  ```sh
    $ npm install
  ```
  4. Install bower dependencies.
  ```sh
    $ bower install
  ```
  5. Start the with the dev environment. 
  it will build the project and launch it in the browser with real time code change update.
  
  ```sh
    $ npm run serve 
  ```
  6. After you are done with your changes , you can run build command
  
  ```sh
    $ npm run build 
  ```
  
  you will have the script as well as a demo website ready.
  
  
  
  
