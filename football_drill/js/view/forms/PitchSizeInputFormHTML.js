/**
 * Class PitchSizeInputFormHTML
 * Created by maxim_000 on 9/16/2015.
 */
(function (window) {
    //public variables
    //PitchSizeInputFormHTML.prototype.publicVar = "value";

    //static variable
    //PitchSizeInputFormHTML.staticVar = "value";

    //constructor
    function PitchSizeInputFormHTML() {
        var formElement = this.getFormHTMLElement();
        this.DOMElement_constructor(formElement);
    }

    var p = createjs.extend(PitchSizeInputFormHTML, createjs.DOMElement);

    p.getFormHTMLElement = function(){

        var formHTMLElement = jQuery.parseHTML("<div id='pitchSizeInputFormHTML' style='position:absolute;leftp:0px;top:0px;width: 800px;height: 600px;background: #ffffff;'> <div style='position: absolute; padding-top: 10px; padding-left: 10px '> <button id='pitchInputFormBackButton' type='button' class='btn btn-default'> <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>Back </button> </div><div class='outer'> <div class='middle'> <div class='inner'> <div class='container' style='width: inherit; height: 290px; background: #cccccc'> <h2 style='text-align: center'>Enter pitch size</h2> <form role='form'> <div class='form-group'> <label>Width:</label> <input class='form-control' id='pitch_width_input' placeholder='Enter width in meters'> </div><div class='form-group'> <label>Height:</label> <input type='height' id='pitch_height_input' class='form-control' placeholder='Enter height in meters'> </div><div class='checkbox'> <label> <input type='checkbox'>Use default size - 105 by 68 metres </label> </div><button type='button' class='btn btn-primary btn-block'>Apply and proceed</button> </form> </div></div></div></div></div>");
        $("#appContainer").append(formHTMLElement);

        $("#pitchInputFormBackButton").click(function(){
            Dispatcher.getInstance().dispatchEvent(new ApplicationEvent(ApplicationEvent.NAVIGATE_BACK));
           // console.log("Back to main menu......");
        });

        return formHTMLElement[0];
    };


    p.destroy = function(){
        $("#pitchInputFormBackButton").unbind();
        $("#pitchSizeInputFormHTML").remove();
    };
    // public functions
    //PitchSizeInputFormHTML.prototype.publicFunction = function (param1) { };

    //private functions
    //function privateFunction(param) { }

    //public static method
    //PitchSizeInputFormHTML.staticFunctionName = function(param1){ //method body };

    window.PitchSizeInputFormHTML = createjs.promote(PitchSizeInputFormHTML,"DOMElement");

}(window));