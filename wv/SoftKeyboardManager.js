/**
 * Soft keyboard manager
 */
(function (window) {
    //public variables
    SoftKeyboardManager.prototype.publicVar = "value";

    //static variable
    SoftKeyboardManager.staticVar = "value";

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