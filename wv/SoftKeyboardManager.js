/**
 * SoftKeyboardManager defines some custom behavior that will be executed
 */
(function (window) {
    //public variables
    SoftKeyboardManager.prototype.publicVar = "value";

    //static variable
    SoftKeyboardManager.version = "1.0.0";

    //constructor
    function SoftKeyboardManager(){

        console.log("SoftKeyboard instantiated!");

        document.body.onkeydown = function(event){
            console.log("Key down: " + event.keyCode);

            //if user pressed on ENTER -> hide keyboard
            if(event.keyCode == 13){
                event.preventDefault();
                event.stopImmediatePropagation();
                jQuery(":focus").blur();
            }
        };

        document.body.onkeyup = function(event){
            console.log("Key up detected");
        };


        jQuery("input").focus(function(){

            jQuery('#secret_white').css('display','inherit');

           setTimeout(function(){
               console.log("scrolling page to bottom");

               window.scroll(0, findPos(document.getElementById("tp_user_fields_email")));

           },1000);
        });

    }

    //Finds y value of given object
    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }


    // public functions
    SoftKeyboardManager.prototype.publicFunction = function (param1) {

    };

    //private functions
    function privateFunction(param) {

    }

    //public static method
    SoftKeyboardManager.staticFunctionName = function(param1){
        //method body
    };

    window.SoftKeyboardManager = SoftKeyboardManager;

}(window));