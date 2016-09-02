import _template from './app.html';
import _controller from './app.controller';
let appComponent = {
    restrict: 'E',
    bindings: {},
    controller:_controller,
    template:_template,
    controllerAs: 'vm'
};

export default appComponent;
