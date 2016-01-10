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
           setTimeout(function(){
               console.log("scrolling page to bottom");
               jQuery('#secret_white').css('display','inherit');
               jQuery("html, body").animate({ scrollTop: $(document).height() - 400 }, 100);

               //scroll to a particular element
               //jQuery("html, body").animate({ scrollTop: $("#tp_user_fields_email").scrollTop() }, 500);

               /*var container = jQuery('#secret_container'),
                   scrollTo = jQuery('#secret_white');

               container.scrollTop(
                   scrollTo.offset().top - container.offset().top + container.scrollTop()
               );*/
           },1000);
        });

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