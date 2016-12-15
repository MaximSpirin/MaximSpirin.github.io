function loadjsfile(filename, callback) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");

    if (script.readyState) //IE
    {
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    }
    else //Others
    {
        script.onload = function () {
            callback();
        };
    }
    script.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(script);
}

function getIsBodyResponse() {
    return true;
    var ua = window.navigator.userAgent; // for production

    if (typeof  bowser === "undefined") {
        return false;
    }

    var bowserObj = bowser._detect(ua);
    var isBodyResponse = false;
    var isIos = (bowserObj.ios == undefined ? 'false' : bowserObj.ios);
    if (isIos != 'false' && isIos != false) {
        var iosVersion = bowserObj.osversion;
        if (iosVersion != null && bowser.compareVersions([iosVersion, '10.1.1']) < 0) {
            isBodyResponse = true;
        }
    }
    return isBodyResponse;
}

function getMobileParams() {
    var ua = window.navigator.userAgent; // for production

    if (typeof  bowser === "undefined") {
        return "";
    }

    var bowserObj = bowser._detect(ua);
    var appBundle = '';
    var appStoreUrl = '';
    var appName = '';
    if ((bowserObj.mobile != null) || (bowserObj.tablet != null)) {
        if (bowserObj.android) {
            if (bowserObj.chrome) {
                appBundle = 'com.android.chrome';
                appStoreUrl = 'https://play.google.com/store/apps/details?id=com.android.chrome';
                appName = 'Chrome';
            }
            else if (bowserObj.firefox) {
                appBundle = 'org.mozilla.firefox';
                appStoreUrl = 'https://play.google.com/store/apps/details?id=org.mozilla.firefox';
                appName = 'Firefox';
            }
            else if (bowserObj.opera) {
                appBundle = 'com.opera.browser';
                appStoreUrl = 'https://play.google.com/store/apps/details?id=com.opera.browser';
                appName = 'Opera';
            }
        }
        else if (bowserObj.ios) {
            if (bowserObj.safari) {
                appBundle = 'com.apple.mobilesafari';
                appStoreUrl = '';
                appName = 'MobileSafari';
            }
            else if (bowserObj.chrome) {
                appBundle = 'com.google.chrome.ios';
                appStoreUrl = 'https://itunes.apple.com/us/app/chrome-web-browser-by-google/id535886823?mt=8';
                appName = 'chrome-web-browser-by-google';
            }
            else if (bowserObj.firefox) {
                appBundle = 'org.mozilla.ios.firefox';
                appStoreUrl = 'https://itunes.apple.com/us/app/firefox-web-browser/id989804926?mt=8';
                appName = 'firefox-web-browser';
            }
            else if (bowserObj.opera) {
                appBundle = 'com.opera.OperaMini';
                appStoreUrl = 'https://itunes.apple.com/us/app/opera-mini-web-browser/id363729560?mt=8';
                appName = 'opera-mini-web-browser';
            }
        }
    }
    var mobileParams = 'app_bundle=' + appBundle + "&app_storeurl=" + encodeURIComponent(appStoreUrl) + "&app_name=" + encodeURIComponent(appName);
    var is_body = getIsBodyResponse();
    if (is_body)
        mobileParams += '&body_response=' + is_body;
    return mobileParams;
}

function get_embed_vast(partnerId,
                        hostUrl,
                        uiConfId,
                        prefferHTML5,
                        prefferFlash,
                        mediaType,
                        mediaId,
                        hasPlaylist,
                        isMute,
                        isAutoplay,
                        isAutocontunue,
                        width,
                        height,
                        cacheState,
                        external_size,
                        vastUrl,
                        adaptvInputValue,
                        adaptvFullUrl,
                        vpaidUrl) {
    var template = '';
    var default_entity = "{ENTITY_ID}";
    var default_player_style = '"width: {WIDTH}px; height: {HEIGHT}px;"';
    var default_preroll_url = (vpaidUrl.trim().length > 0) ? '"{VPAID_URL}"' : '"{VAST_URL}"{VAST_URL_APPENDED}';
    var default_dummy_style = '""';
    if (vastUrl.toLowerCase() == 'none')
        default_preroll_url = '""';
    else
        default_preroll_url = '"{VAST_URL}"{VAST_URL_APPENDED}';
    default_player_style = '"position:absolute;top:0px;left: 0px;right: 0px;bottom: 0px;"';
    if (external_size) {
        default_dummy_style = '"height: 100%;"';
    }
    else {
        if (hasPlaylist) {
            default_dummy_style = '"margin-top: calc(56.25% + 143px)"';
        }
        else
            default_dummy_style = '"margin-top: 56.25%"';
    }

    template += '<script>\n';
    template += 'function jsCallbackReady(playerId) {\n';
    template += '   // console.log("kWidget player ready: " + playerId);\n';
    template += '    var kdp = document.getElementById( playerId );\n';
    if (!isMute) {
        template += '	kdp.kBind( "mediaReady", function(){\n';
        template += '    	kdp.sendNotification("changeVolume", 0.5);\n';
        template += '	})\n';
    }
    template += '}\n';
    template += '</script>\n';

    if (external_size) {
        template += '<div style="width: 100%;height:100%;display: inline-block;position: relative;">\n';
    }
    else {
        template += '<div style="width: 100%;display: inline-block;position: relative;">\n';
    }
    template += '<div id="dummy_{CACHE_STATE}" class="_epiphany_player_overwrite" style=' + default_dummy_style + '></div>\n';
    template += '<div id="epiphany_player_{CACHE_STATE}" style=' + default_player_style + '></div>\n';
    template += '</div>\n';

    template += '<script>\n';
    template += 'function startKPlayer() {';
    template += '	loadjsfile("{HOST_URL}/p/{PARTNER_ID}/sp/{PARTNER_ID}00/embedIframeJs/uiconf_id/{UICONF_ID}/partner_id/{PARTNER_ID}", function(){loadKwidget()});\n';
    template += '}';
    template += '</script>\n';

    template += '<script>\n';
    template += 'function loadAd(adUrl)\n {';
    template += '  var xhr = new XMLHttpRequest();\n';
    template += '  xhr.open("GET", adUrl);\n';
    template += '  xhr.onload = function() {\n';
    template += '      if (xhr.status === 200) {\n';
    template += '          injectPlayer(decodeURIComponent(xhr.responseText));\n';
    template += '      }\n';
    template += '      else {\n';
    template += '          injectPlayer("");\n';
    template += '      }\n';
    template += '  };\n';
    template += '  xhr.send();\n';
    template += '}\n';

    template += 'function loadKwidget(){\n';
    var vastUrlAppened = '';
    if (adaptvInputValue && (vastUrl.length > 0 || vpaidUrl.length > 0)) {
        if (!/\?/ig.test(vastUrl) && (vastUrl.length > 0)) {
            vastUrl += '?';
        }
        if (!/\?/ig.test(vpaidUrl) && (vpaidUrl.length > 0)) {
            vpaidUrl += '?';
        }
        vastUrlAppened += ' + "&cb=" + adCacheBreaker + "&pageUrl=" + adPageUrl + "&description={mediaProxy.entry.description}&duration={mediaProxy.entry.duration}&id={mediaProxy.entry.id}&title={mediaProxy.entry.name}&url={mediaProxy.entry.dataUrl}&keywords={mediaProxy.entry.tags}&width={video.player.width}&height={video.player.height}&" + adMobileTags';
        template += 'window.adCacheBreaker = (Math.random() * 10).toString().replace(/\\./g, "").substring(0, 10);\n';
        template += 'window.adMobileTags = "' + getMobileParams() + '" ;\n';
        if (adaptvFullUrl) {
            template += 'window.adPageUrl = encodeURI(window.location.href);\n';
        } else {
            template += 'var urlArray = window.location.host.split(".");\n';
            template += 'window.adPageUrl = encodeURI(urlArray.slice(urlArray.length - 2).join("."));\n';
        }
    }
    if (getIsBodyResponse())
    //if (true)
    {
        template += 'loadAd(' + default_preroll_url + ');\n';
    }
    else {
        template += 'injectPlayer(' + default_preroll_url + ');\n';
    }
    template += '}\n';
    template += 'function injectPlayer(adUrl){\n';
    template += 'mw.setConfig("Kaltura.EnableEmbedUiConfJs", true);\n';
    template += 'kWidget.embed({\n';
    template += '  "targetId": "epiphany_player_{CACHE_STATE}",\n';
    template += '  "wid": "_{PARTNER_ID}",\n';
    template += '  "uiconf_id": {UICONF_ID},\n';
    if (!hasPlaylist) {
        template += '  "entry_id": "' + default_entity + '",\n';
    }
    template += '  "flashvars": {\n';
    template += '    "streamerType": "auto",\n';
    template += '    "autoMute": {AUTOMUTE},\n';
    if (!hasPlaylist) {
        template += '    "autoPlay": {AUTOPLAY},\n';
    }
    if (hasPlaylist) {
        template += '    "playlistAPI": {\n';
        template += '        "kpl0Id": "{ENTITY_ID}",\n';
        template += '        "autoContinue": {AUTOCONTINUE},\n';
        template += '        "autoPlay": {AUTOPLAY}\n';
        template += '    },\n';
    }
    //    template += '    "debugMode": true,\n';
    //    template += '    "jsTraces": true,\n';
    //    template += '    "kdpReady": "onKdpReady",\n';
    //    template += '    "kdpEmpty": "onKdpReady",\n';
    //   template += '   "LeadWithHLSOnJs": false,\n';
    //   template += '   "hlsjs":{\n';
    //   template += '       "plugin": true\n';
    //   template += '   },\n';

    /*        template += '    "userAgentPlayerRules":{\n';
     template += '      "loadingPolicy":"onDemand",\n';
     template += '      "disableForceMobileHTML5": "true",\n';
     template += '      "r1RegMatch": "/Chrome\/(1[5-9]|[1-9][0-9]+)/",\n';
     template += '      "r1LeadWithHTML5":"true",\n';
     template += '      "r2Match": "Firefox/3.6",\n';
     template += '      "r2ForceFlash":"true",\n';
     template += '      "r3Match":"iPhone",\n';
     template += '      "r3LeadWithHTML5":"true",\n';
     template += '      "r4RegMatch":"/Firefox\/([4-9]|[0-9][0-9])/",\n';
     template += '      "r4LeadWithHTML5":"true",\n';
     template += '      "r5RegMatch":"/Safari\/([?]|[?][?])/",\n';
     template += '      "r5LeadWithHTML5":"true",\n';
     template += '    },\n';*/
    template += '    "vast": {\n';
    template += '      "plugin" : true,\n';
    template += '      "width" : "0%",\n';
    template += '      "height" : "0%",\n';
    template += '      "includeInLayout" : false,\n';
    template += '      "relativeTo" : "PlayerHolder",\n';
    template += '      "position" : "before",\n';
    template += '      "prerollUrl": adUrl,\n';
    template += '      "numPreroll" : "1",\n';
    template += '      "storeSession" : false,\n';
    template += '      "preSequence" : "1",\n';
    template += '      "enableCORS": true,\n';
    template += '      "htmlCompanions" : "testCompanion:300:250;testLongCompanion:728:90;",\n';
    template += '      "timeout" : "4",\n';
    template += '    },\n';
    template += '  },\n';
    template += '  "cache_st": {CACHE_STATE},\n';
    template += '  "params": {\n';
    template += '    "wmode": "opaque"\n';
    template += '  },\n';
    template += '  "adsOnReplay": true\n';
    template += '});\n';
    template += '}\n';
    template += 'startKPlayer();\n';
    template += '</script>';

    return template
        .replace(/\{PARTNER_ID\}/ig, partnerId)
        .replace(/\{UICONF_ID\}/ig, uiConfId)
        .replace(/\{ENTITY_ID\}/ig, mediaId)
        .replace(/\{WIDTH\}/ig, width)
        .replace(/\{HEIGHT\}/ig, height)
        .replace(/\{CACHE_STATE\}/ig, cacheState)
        .replace(/\{VAST_URL\}/ig, vastUrl)
        .replace(/\{VPAID_URL\}/ig, vpaidUrl)
        .replace(/\{HOST_URL\}/ig, hostUrl)
        .replace(/\{AUTOPLAY\}/ig, isAutoplay)
        .replace(/\{AUTOMUTE\}/ig, isMute)
        .replace(/\{AUTOCONTINUE\}/ig, isAutocontunue)
        .replace(/\{VAST_URL_APPENDED\}/ig, vastUrlAppened);
}


function injectEPScript(extObj, obj, target_div) {

    if (extObj.tagName.toLowerCase() == "script") {
        var epsTag2 = document.createElement('script');
        epsTag2.type = 'text/javascript';
        epsTag2.text = extObj.text;
        if (obj.parentNode == null) {
            document.getElementsByTagName("head")[0].appendChild(epsTag2);
        }
        else
            obj.parentNode.insertBefore(epsTag2, obj);
    }
    else if (extObj.tagName.toLowerCase() == "div") {
        var epsTag2 = document.createElement('div');
        epsTag2.style.cssText = extObj.style.cssText;
        epsTag2.innerHTML = extObj.innerHTML;
        if (obj.parentNode == null || (target_div.length > 0)) {
            document.getElementById(target_div).appendChild(epsTag2);
        }
        else
            obj.parentNode.insertBefore(epsTag2, obj);
    }
}
