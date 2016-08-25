(function () {
    'use strict';

    angular
        .module('service.uploader', [])
        .factory('uploader', ['$http', 'model', 'Upload', function ($http, model, Upload) {

            return {
                uploadFile: uploadFile
            };

            function uploadFile(file, userid, type) {
                var bucket = (type === 'image') ? 'giblib-assets' : 'giblib-videos';
                var folder = (type === 'image') ? 'avatars/' : '';
                return model.get('/aws/s3/signature/' + bucket).then(function (res) {
                    return Upload.upload({
                        url: 'https://' + bucket + '.s3.amazonaws.com/',
                        data: {
                            key: folder + userid + '/' + new Date().valueOf().toString() + file.name,
                            AWSAccessKeyId: res.data.accesskey,
                            policy: res.data.policy,
                            signature: res.data.signature,
                            "Content-Type": file.type !== '' ? file.type : 'application/octet-stream',
                            filename: file.name,
                            file: file
                        }
                    }).then(function (response) {
                        return response;
                    }, function (response) {
                        if (response.status > 0)
                            file.error = response.data;
                            return file;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
                        return file;
                    });
                });
            }
        }]);
})();
