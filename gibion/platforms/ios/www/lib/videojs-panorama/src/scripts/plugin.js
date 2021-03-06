/**
 * Created by yanwsh on 4/3/16.
 */
'use strict';

import util from './lib/Util';

const runOnMobile = (util.mobileAndTabletcheck());

// Default options for the plugin.
const defaults = {
    clickAndDrag: runOnMobile,
    showNotice: true,
    NoticeMessage: "Please use your mouse drag and drop the video.",
    autoHideNotice: 3000,
    //A float value back to center when mouse out the canvas. The higher, the faster.
    returnStepLat: 0.5,
    returnStepLon: 2,
    scrollable: true,
    maxFov: 105,
    minFov: 51,
    initLat: 0,
    initLon: -180,
    backToVerticalCenter: true,
    backToHorizonCenter: true,
};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
    player.addClass('vjs-panorama');
    player.addChild('Canvas', options);
    if(runOnMobile){
        var canvas = player.getChild('Canvas');
        canvas.hide();
        player.on("play", function(){
            canvas.show();
        });
    }
    if(options.showNotice){
        player.addChild('Notice', options);
        player.on("play", function(){
            var notice = player.getChild('Notice');
            
            if(options.autoHideNotice > 0){
                setTimeout(function () {
                    notice.addClass("vjs-video-notice-fadeOut");
                    var transitionEvent = util.whichTransitionEvent();
                    var hide = function () {
                        notice.hide();
                        notice.removeClass("vjs-video-notice-fadeOut");
                        notice.off(transitionEvent, hide);
                    };
                    notice.on(transitionEvent, hide);
                }, options.autoHideNotice);
            }
        });
    }
    
    
};

const plugin = function(settings = {}){
    /**
     * A video.js plugin.
     *
     * In the plugin function, the value of `this` is a video.js `Player`
     * instance. You cannot rely on the player being in a "ready" state here,
     * depending on how the plugin is invoked. This may or may not be important
     * to you; if not, remove the wait for "ready"!
     *
     * @function panorama
     * @param    {Object} [options={}]
     *           An object of options left to the plugin author to define.
     */
    const panorama = function(options) {
        if(settings.mergeOption) options = settings.mergeOption(defaults, options);
        this.ready(() => {
            onPlayerReady(this, options);
        });
    };

// Include the version number.
    panorama.VERSION = '__VERSION__';

    return panorama;
}

export default plugin;