import template from './highlighter.html';
import link from './highlighter.link';

let highlighterComponent = function () {
  return {
    restrict: 'E',
    scope: {
      code:'=',
      language:'=',
      searchtext:'=',
      linenumber:'='

    },
    link: link,
    template: template
  };
}

export default highlighterComponent;
