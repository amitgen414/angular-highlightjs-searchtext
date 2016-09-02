import hljsSearchTextComponent from './highlighter.component';
import hljsSearchConfigService from './highlighter.service';


let NetworkGraphModule = angular.module('hljsSearch', [
])

.directive('hljsSearch', hljsSearchTextComponent)
.service('configHljs', hljsSearchConfigService);

export default NetworkGraphModule;
