/*!
 * VERSION: 1.1
 * DATE: 2017-06-03
 * Website: http://taxiinteractive.com
 * Support: support@taxiinteractive.com
 * @license Copyright (c) 2017, TaxiInteractive. All rights reserved.
 * */


( function(document, window){

    function OutgoingMessage(){}
    function IncomingMessage(){}

    //outgoing messages
    OutgoingMessage.WRITE_STATS = "writeStats";
    OutgoingMessage.DOWNLOAD_MAP_TILE = "download_map_tile";
    OutgoingMessage.REPORT_USER_ACTIVITY = "report_user_activity";

    //incoming messages
    IncomingMessage.UPDATE_TILE_STATUS = "update_tile_status";

    function TaxiInteractiveUtils(){

    }


    //************************************ stats types *****************************************/
    TaxiInteractiveUtils.STATS_TYPE_LISTING_THUMB_PRESS = "listings_item_thumb";
    TaxiInteractiveUtils.STATS_TYPE_FORM_INPUT = "form_input";


    // static vars and consts
    TaxiInteractiveUtils.liveMode = false;
    TaxiInteractiveUtils.dispatchMessages = false;
    TaxiInteractiveUtils.messageQueue = [];
    TaxiInteractiveUtils.isBroadcasting = false;
    TaxiInteractiveUtils.MESSAGE_BROADCAST_INTERVAL = 200;
    TaxiInteractiveUtils.BROADCAST_COMPLETE_CALLBACK_DELAY = 100;
    TaxiInteractiveUtils.broadcastMultipleMessages = false;
    TaxiInteractiveUtils.broacastIntervalID = null;

    /**
     * Initializes TaxiInteractive utils
     */
    TaxiInteractiveUtils.initialize = function(){
        TaxiInteractiveUtils.params = TaxiInteractiveUtils.getSearchParameters();

        // if pathToAssetsFolder is undefined then template may not display images and other external files
        TaxiInteractiveUtils.pathToAssetsFolder =  TaxiInteractiveUtils.params.pathToAssetsFolder;

        //check whether main app supports multiple messages broadcast
        TaxiInteractiveUtils.broadcastMultipleMessages = (TaxiInteractiveUtils.params.broadcastMultipleMessages=="true");

        //////////////// USE THIS FOR TESTING PURPOSES WHEN TESTING IN STANDARD BROWSER /////////////////
        /*if(TaxiInteractiveUtils.isUndefined(TaxiInteractiveUtils.pathToAssetsFolder)){
            TaxiInteractiveUtils.pathToAssetsFolder = "C:/Users/Maxim/TaxiInteractive";
        }*/
        /////////////////////////////////////////////////////////////////////////////////////////////////


        // if dispatchMessages is false then messages are not delivered to the main app
        //
        TaxiInteractiveUtils.dispatchMessages =  TaxiInteractiveUtils.params.dispatchMessages=="true";//   (TaxiInteractiveUtils.params.dispatchMessages==false)? false : true;
        //
        TaxiInteractiveUtils.liveMode = ( TaxiInteractiveUtils.params.liveMode == "true");

        TaxiInteractiveUtils.unit_id = TaxiInteractiveUtils.isUndefined(TaxiInteractiveUtils.params.unit_id) ? null : TaxiInteractiveUtils.params.unit_id;
        TaxiInteractiveUtils.uuid = TaxiInteractiveUtils.isUndefined(TaxiInteractiveUtils.params.uuid) ? null : TaxiInteractiveUtils.params.uuid;


        //start listening mouse and touch events
        TaxiInteractiveUtils.startListeningUserInput();

        TaxiInteractiveUtils.broacastIntervalID = setInterval(TaxiInteractiveUtils.onBroadcastIntervalTick, TaxiInteractiveUtils.MESSAGE_BROADCAST_INTERVAL);

        console.log("TaxiInteractiveUtils initialized!");
    };

    TaxiInteractiveUtils.onBroadcastIntervalTick = function () {

        if(TaxiInteractiveUtils.messageQueue==null || TaxiInteractiveUtils.messageQueue.length<1){
            return;
        }

        var messageString;
        var completeCallbacks = [];

        //var messageToDispatch = ("data://" + JSON.stringify(messageObject)).replace(/"/g, "'");

        if(TaxiInteractiveUtils.broadcastMultipleMessages){
            var allMessages = [];

            for (var i=0;i<TaxiInteractiveUtils.messageQueue.length;i++){
                var messageObject = TaxiInteractiveUtils.messageQueue[i];
                var stringifiedMessage = JSON.stringify(messageObject).replace(/"/g, "'");
                allMessages.push(stringifiedMessage);

                if(!TaxiInteractiveUtils.isUndefined(messageObject.params.onComplete)){
                    completeCallbacks.push(messageObject.params.onComplete);
                }
            }

            var exportObj = {messages:TaxiInteractiveUtils.messageQueue};

            //messageString = "data://" + JSON.stringify(allMessages).replace(/"/g, "'");
            messageString = "data://" + JSON.stringify(exportObj).replace(/"/g, "'");
            TaxiInteractiveUtils.messageQueue = [];

        } else {

            var singleMessageObject = TaxiInteractiveUtils.messageQueue.shift();
            messageString = ("data://" + JSON.stringify(singleMessageObject)).replace(/"/g, "'");

            if(!TaxiInteractiveUtils.isUndefined(singleMessageObject.params.onComplete)){
                completeCallbacks.push(singleMessageObject.params.onComplete);
            }
        }

        if(TaxiInteractiveUtils.dispatchMessages){
            window.location.href = messageString;
        }else{
            //console.log("Skipped dispatching message as TaxiInteractiveUtils.dispatchMessages is false");
        }

        console.log(TaxiInteractiveUtils.getDebugTimeString() + " Dispatching message:"+"\n" + messageString);

        setTimeout(function () {
            for (var j=0;j<completeCallbacks.length;j++){
                try{
                    completeCallbacks[j]();
                }catch (error){
                    console.error("Failed to invoke onComplete handler for broadcast message");
                }
            }
        }, TaxiInteractiveUtils.BROADCAST_COMPLETE_CALLBACK_DELAY);



    };


    TaxiInteractiveUtils.getDebugTimeString = function () {

        function format2Digit(value) {

            if(value < 10){
                return "0"+value;
            }

            return String(value);
        }
        
        function format3Digits(value) {
            var result = format2Digit(value);
            if(result.length==2){
                result = "0"+result;
            }
            return result;
        }

        var date = new Date();
        var time = format2Digit(date.getHours()) + ":" + format2Digit(date.getMinutes()) + ":" + format2Digit(date.getSeconds()) + ":" + format3Digits(date.getMilliseconds());
        return "[" + time + "]";
    };

    TaxiInteractiveUtils.startListeningUserInput = function(){
        window.onclick = function(context){
            TaxiInteractiveUtils.broadcastMessage(OutgoingMessage.REPORT_USER_ACTIVITY);
        }
    };

    /**
     * Adds message to the queue
     * @param command
     * @param params
     */
    TaxiInteractiveUtils.broadcastMessage = function(command, params){
        var messageObject = {"command":command, "params":  ((TaxiInteractiveUtils.isUndefined(params))||(params==null)) ? {} : params};
        //add message to queue
        TaxiInteractiveUtils.messageQueue.push(messageObject);

    };



    /**
     * Receives incoming messages from main application
     * @param messageString
     */
    TaxiInteractiveUtils.receiveMessage = function(messageString){
        var commandObj = JSON.parse(messageString);

        //alert("Received a message from Main APP:" + messageString);

        //1. handle core sys messages
        switch (commandObj.command){

            default:

            break;

        }

        //2. let the template handle content specific messages
        if(window.receiveMessage){
            window.receiveMessage(messageString);
        }

    };

    /**
     *
     * @returns {{}}
     */
    TaxiInteractiveUtils.getSearchParameters = function(){
        function transformToAssocArray( prmstr ) {
            var params = {};
            var prmarr = prmstr.split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }

        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    };


    TaxiInteractiveUtils.isUndefined = function(param){
        return (typeof param == 'undefined');
    };

    /**
     * Searches and returns the input paramerer specified by name.
     * Returns null if the parameter is missin or its null or if its undefined
     * @param name
     * @returns {*}
     */
    TaxiInteractiveUtils.getInputParameter = function(name){
        var result = TaxiInteractiveUtils.params[name];
        if(TaxiInteractiveUtils.isUndefined(result)){
            result = null;
        }
        return result;
    };

    /**
     * Saves touch stats data for a particular interactive html element
     * @param elementId
     */
    TaxiInteractiveUtils.reportElementInteractivity = function(elementId, onCompleteParameter) {

        //detect whether onCompleteParameter is a function or URL
        var onCompleteIsFunction = typeof onCompleteParameter == "function";
        var onCompleteIsString = typeof onCompleteParameter == "string";
        var onCompleteHandler = null;
        var onCompleteRedirectURL = null;
        var redirectParams = null;

        if(onCompleteIsFunction){
            onCompleteHandler = onCompleteParameter;
        } else if (onCompleteIsString) {
            redirectParams = window.location.search.substr(1);
            onCompleteRedirectURL = (redirectParams.length > 0) ? (onCompleteParameter + "?" + redirectParams) : onCompleteParameter;
            onCompleteHandler = function () {
                window.location = onCompleteRedirectURL;
            }
        }

        //fetch stats type
        var statsType = TaxiInteractiveUtils.getInputParameter("elementTouchStatsType");
        if (TaxiInteractiveUtils.isUndefined(statsType) || statsType == null || statsType == "") {
            statsType = "stats_type_not_set";
        }

        //fetch statsId
        var statsId = TaxiInteractiveUtils.getInputParameter("statsId");
        //if main app doesnt send statsId but sends formId then use it
        if (TaxiInteractiveUtils.isUndefined(statsId)) {
            statsId = TaxiInteractiveUtils.getInputParameter("formId");
        }

        var element_id = ((typeof elementId != "string") || TaxiInteractiveUtils.isUndefined(elementId) || elementId == "" || elementId == null) ? "element_id_not_set_correctly" : elementId;

        TaxiInteractiveUtils.broadcastMessage("writeStats",
            {
                statsId: statsId,
                campaignId: TaxiInteractiveUtils.getInputParameter("campaignId"),
                type: statsType,
                details: element_id,
                onComplete: (!TaxiInteractiveUtils.isUndefined(onCompleteParameter)) ? onCompleteHandler : undefined
            });
    };


    /**
     * Opens a page with the same url params that current page has.
     * Should always be used instead of setting window.location.href manually
     * @param url
     */
    TaxiInteractiveUtils.openLocalPage = function(url){
        var currentPageParams = window.location.search.substr(1);
        var newURL = (currentPageParams.length > 0) ? (url + "?" + currentPageParams) : url;
        window.location.assign(newURL);
    };

    /**
     * Saves form input
     * @param data
     */
    TaxiInteractiveUtils.saveFormInput = function(data){

        TaxiInteractiveUtils.broadcastMessage("writeStats",
            {
                statsId: TaxiInteractiveUtils.getInputParameter("formId"),
                campaignId: TaxiInteractiveUtils.getInputParameter("campaignId"),
                type: "form_input",
                details: data
            });
    };


    window.TaxiInteractiveUtils = TaxiInteractiveUtils;

}(document, window));