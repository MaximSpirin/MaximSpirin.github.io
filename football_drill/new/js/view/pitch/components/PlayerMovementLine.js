//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.PlayerMovementLine
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /**************************************************** public variables ********************************************/
    PlayerMovementLine.prototype.demoShape = null;
    PlayerMovementLine.prototype.lineContainer = null;
    PlayerMovementLine.prototype.lineContainerMask = null;
    //PlayerMovementLine.prototype.direction = null;

    //static variables
    PlayerMovementLine.INTERVAL = 3;
    PlayerMovementLine.STD_HEIGHT = 16;

    /**************************************************** constructor *************************************************/
    function PlayerMovementLine() {
        this.BaseComponentRenderer_constructor();
        initialize.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(PlayerMovementLine, drillEditor.BaseComponentRenderer);

    /************************************************ private functions ***********************************************/
    function initialize() {

        this.demoShape = new createjs.Shape();
        this.container.addChild(this.demoShape);

        this.lineContainer = new createjs.Container();
        this.container.addChild(this.lineContainer);

        this.lineContainerMask = new createjs.Shape();
        this.lineContainer.mask = this.lineContainerMask;

    }

    /************************************************* overridden methods *********************************************/

    p.getBounds = function(){
        var result = new createjs.Rectangle(this._data.position.x, this._data.position.y, this._data.width, this._data.height);
        return result;
    };

    p.initialize = function(){
        this.container = new createjs.Container();
        this.addChild(this.container);

        //TEMPORARY
        this.contentRegPoint = "endPoint";

        this.mouseDownHandler = this.container.on("mousedown", function(evt){
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:this}));
            //TODO calculate offsets

            var pitchCordinates = this.container.localToLocal(evt.localX, evt.localY, this.parent);
            var startPointOffsetX = pitchCordinates.x - this.rendererData.startPoint.x;
            var startPointOffsetY = pitchCordinates.y - this.rendererData.startPoint.y;
            var endPointOffsetX = pitchCordinates.x - this.rendererData.endPoint.x;
            var endPointOffsetY = pitchCordinates.y - this.rendererData.endPoint.y;

            this.offset = {
                x: this.container.x - evt.stageX,
                y: this.container.y - evt.stageY,
                startPointOffsetX: startPointOffsetX,
                startPointOffsetY: startPointOffsetY,
                endPointOffsetX : endPointOffsetX,
                endPointOffsetY : endPointOffsetY
            };

        }, this);

        //move by dragging container
        this.pressMoveHandler = this.container.on("pressmove", function(evt){
            var pitchCoordinates = this.container.localToLocal(evt.localX, evt.localY, this.parent);

            this.container.x = evt.stageX + this.offset.x;
            this.container.y = evt.stageY + this.offset.y;
            this._data.position.setValues(this.container.x, this.container.y);
            this.rendererData.startPoint.x = pitchCoordinates.x - this.offset.startPointOffsetX;
            this.rendererData.startPoint.y = pitchCoordinates.y - this.offset.startPointOffsetY;
            this.rendererData.endPoint.x = pitchCoordinates.x - this.offset.endPointOffsetX;
            this.rendererData.endPoint.y = pitchCoordinates.y - this.offset.endPointOffsetY;

            this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_MOVE));
        }, this);

    };

    p.destroy = function(){
        this.BaseComponentRenderer_destroy();
        this.off("mousedown", this.mouseDownHandler);
        this.off("pressmove", this.pressMoveHandler);
    };

    p.render = function(){

        if(this.lineContainer.numChildren == 0){
            //draw a triangle and a long line

            var arrowShape = new createjs.Shape();
            arrowShape.graphics.beginFill("#FFFFFF").moveTo(6, 0).lineTo(6,14).lineTo(0,7).lineTo(6,0);
            arrowShape.graphics.drawRect(5,7-3/2,1280,3);

            this.lineContainer.addChild(arrowShape);

            this.lineContainer.setBounds(0, 0, 1006 , PlayerMovementLine.STD_HEIGHT);
        }

        if(this.rendererData.arrowDirection == drillEditor.ArrowDirection.LEFT){
            this.lineContainer.scaleX = 1;
            this.lineContainer.x = 0;
        } else if(this.rendererData.arrowDirection == drillEditor.ArrowDirection.RIGHT){
            this.lineContainer.scaleX = -1;
            this.lineContainer.x = this.rendererData.lineWidth;
        }

        this.demoShape.graphics.clear();
        this.demoShape.graphics.beginFill("rgba(0,255,0,0.01)");
        this.demoShape.graphics.drawRect(0, 0, this.rendererData.lineWidth, PlayerMovementLine.STD_HEIGHT);

        this.lineContainerMask.graphics.clear();
        this.lineContainerMask.graphics.beginFill("#000000").drawRect(0,0,this.rendererData.lineWidth, PlayerMovementLine.STD_HEIGHT);

        var containerPosition = this.contentRegPoint == "endPoint" ? this.rendererData.endPoint : this.rendererData.startPoint;
        this.container.x = containerPosition.x;
        this.container.y = containerPosition.y;
        this.container.regY = PlayerMovementLine.STD_HEIGHT / 2;
        this.container.regX = this.contentRegPoint == "endPoint" ? this.rendererData.lineWidth : 0;


        this.container.rotation = this.rendererData.angle;
        //console.log("Container rotation = ",this.container.rotation);
        this.container.setBounds(0, 0, this.rendererData.lineWidth, PlayerMovementLine.STD_HEIGHT);
    };



    p.getContentBounds = function(){
        var containerBounds = this.container.getBounds();
        var result = new createjs.Rectangle(0, 0, this.container._bounds.width, this.container._bounds.height);
        return result;
    };

    p.getPointsInStageCS = function(){
        var result = {startPoint:this.localToGlobal(this.rendererData.startPoint.x, this.rendererData.startPoint.y),
            endPoint: this.localToGlobal(this.rendererData.endPoint.x, this.rendererData.endPoint.y)};
        return result;
    };

    p.getMinimalSize = function(){
        return new createjs.Point(drillEditor.DribblingLineSegment.STD_WIDTH, PlayerMovementLine.STD_HEIGHT);
    };

    p.graphicPropertyChangeHandler = function(event){
        var propertyName = event.payload.name;

        switch (propertyName){
            case "startPoint":
                this.contentRegPoint = "endPoint";
                this.render();
                break;
            case "endPoint":
                this.contentRegPoint = "startPoint";
                this.render();
                break;
            case "arrowDirection":
                this.render();
                break;

        }
    };

    p.isInteractiveLine = true;
    /******************************************** event handlers *******************************************/

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.PlayerMovementLine = createjs.promote(PlayerMovementLine,"BaseComponentRenderer");
}());
