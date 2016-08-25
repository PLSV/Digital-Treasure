(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name directive.directive:avatarcard
     * @scope
     *
     * @description
     * Component to display and change user's avatar
     *
     * @param {object}  user  the user's details
     * @param {boolean} isEditable  conditional allows user to edit form
     * @param {boolean}  isActive   Avatar container is currently in an editable state
     * @param {boolean}  isUploading   Avatar upload to S3 is currently in progress
     * @param {object} file  the image file the user has selected for upload
     *
     */

    angular
        .module('directive.avatarcard', [])
        .directive('avatarCard', avatarCard);

    avatarCard.$inject = [];

    function avatarCard() {
        return {
            scope: {
                user: '=',
                isEditable: '=',
                isActive: '=',
                isUploading: '=',
                file: '=',
                action: '&'
            },
            templateUrl: 'templates/avatarcard.html'
        };
    }
})();
