// ==UserScript==
// @name            youkuantiads.uc.js
// @namespace       YoukuAntiADs@harv.c
// @description     视频网站去黑屏
// @include         chrome://browser/content/browser.xul
// @author          harv.c
// @homepage        http://haoutil.tk
// @version         1.3.9
// ==/UserScript==
(function() {
    // YoukuAntiADs, request observer
    function YoukuAntiADs() {};
    YoukuAntiADs.prototype = {
        SITES: {
            'youku': {
                'player': 'https://haoutil.googlecode.com/svn/trunk/player/youku.swf',
                're': /http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/(loader|q?player[^\.]*)\.swf/i
            },
            'ku6': {
                'player': 'https://haoutil.googlecode.com/svn/trunk/player/ku6.swf',
                're': /http:\/\/player\.ku6cdn\.com\/.*\/\d+\/player\.swf/i
            },
            'iqiyi': {
                'player0': 'https://haoutil.googlecode.com/svn/trunk/player/iqiyi.swf',
                'player1': 'https://haoutil.googlecode.com/svn/trunk/player/iqiyi5.swf',
                're': /http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i
            },
            'tudou': {
                'player': 'https://haoutil.googlecode.com/svn/trunk/player/tudou.swf',
                're': /http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i
            }
        },
        os: Cc['@mozilla.org/observer-service;1']
                .getService(Ci.nsIObserverService),
        // getPlayer, get modified player
        getPlayer: function(site, callback) {
            NetUtil.asyncFetch(site['player'], function(inputStream, status) {
                var binaryOutputStream = Cc['@mozilla.org/binaryoutputstream;1']
                                            .createInstance(Ci['nsIBinaryOutputStream']);
                var storageStream = Cc['@mozilla.org/storagestream;1']
                                        .createInstance(Ci['nsIStorageStream']);
                var count = inputStream.available();
                var data = NetUtil.readInputStreamToString(inputStream, count);

                storageStream.init(512, count, null);
                binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
                binaryOutputStream.writeBytes(data, count);

                site['storageStream'] = storageStream;
                site['count'] = count;

                if(typeof callback == 'function') {
                    callback();
                }
            });
        },
        getWindowForRequest: function(request){
            if(request instanceof Ci.nsIRequest){
                try{
                    if(request.notificationCallbacks){
                        return request.notificationCallbacks
                                    .getInterface(Ci.nsILoadContext)
                                    .associatedWindow;
                    }
                } catch(e) {}
                try{
                    if(request.loadGroup && request.loadGroup.notificationCallbacks){
                        return request.loadGroup.notificationCallbacks
                                    .getInterface(Ci.nsILoadContext)
                                    .associatedWindow;
                    }
                } catch(e) {}
            }
            return null;
        },
        observe: function(aSubject, aTopic, aData) {
            if(aTopic != 'http-on-examine-response') return;

            var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
            for(var i in this.SITES) {
                var site = this.SITES[i];
                if(site['re'].test(http.URI.spec)) {
                    if(i == 'iqiyi') {
                        var wnd = this.getWindowForRequest(aSubject);
                        if(wnd) {
                            if(!/iqiyi\.com/.test(wnd.top.location.host) || wnd.top.document.querySelector('span[data-flashplayerparam-flashurl]')) {
                                if(site['player'] != site['player1']) {
                                    site['player'] = site['player1'];
                                    site['storageStream'] = site['storageStream1'] ? site['storageStream1'] : null;
                                    site['count'] = site['count1'] ? site['count1'] : null;
                                }
                            } else if(site['player'] != site['player0']) {
                                site['player'] = site['player0'];
                                site['storageStream'] = site['storageStream0'] ? site['storageStream0'] : null;
                                site['count'] = site['count0'] ? site['count0'] : null;
                            }
                        }
                    }

                    if(!site['storageStream'] || !site['count']) {
                        http.suspend();
                        this.getPlayer(site, function() {
                            if(i == 'iqiyi') {
                                if(site['player0'] == site['player']) {
                                    site['storageStream0'] = site['storageStream'];
                                    site['count0'] = site['count'];
                                } else if(site['player1'] == site['player']) {
                                    site['storageStream1'] = site['storageStream'];
                                    site['count1'] = site['count'];
                                }
                            }
                            http.resume();
                        });
                    }

                    var newListener = new TrackingListener();
                    aSubject.QueryInterface(Ci.nsITraceableChannel);
                    newListener.originalListener = aSubject.setNewListener(newListener);
                    newListener.site = site;

                    break;
                }
            }
        },
        register: function() {
            this.os.addObserver(this, 'http-on-examine-response', false);
        },
        unregister: function() {
            this.os.removeObserver(this, 'http-on-examine-response', false);
        }
    };

    // TrackingListener, redirect youku player to modified player
    function TrackingListener() {
        this.originalListener = null;
        this.site = null;
    }
    TrackingListener.prototype = {
        onStartRequest: function(request, context) {
            this.originalListener.onStartRequest(request, context);
        },
        onStopRequest: function(request, context) {
            this.originalListener.onStopRequest(request, context, Cr.NS_OK);
        },
        onDataAvailable: function(request, context) {
            this.originalListener.onDataAvailable(request, context, this.site['storageStream'].newInputStream(0), 0, this.site['count']);
        }
    };

    // register observer
    var y = new YoukuAntiADs();
    var isLoaded = false;
    if(location == 'chrome://browser/content/browser.xul') {
        isLoaded = true;
        y.register();
    }

    // unregister observer
    window.addEventListener('unload', function() {
        if(location == 'chrome://browser/content/browser.xul' && isLoaded) {
            y.unregister();
        }
    });
})();
