(function () {
    'use strict';

    angular
        .module('config.mixpanel', [])
        .config(['$mixpanelProvider', function ($mixpanelProvider) {
            $mixpanelProvider.apiKey('b8f896cee72e575ae7edd1a7e19f70b4');
        }]);
})();
