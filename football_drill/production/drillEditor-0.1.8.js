/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var b=a.prototype;b.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},b.stopPropagation=function(){this.propagationStopped=!0},b.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},b.remove=function(){this.removed=!0},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable)},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this._listeners=null,this._captureListeners=null}var b=a.prototype;a.initialize=function(a){a.addEventListener=b.addEventListener,a.on=b.on,a.removeEventListener=a.off=b.removeEventListener,a.removeAllEventListeners=b.removeAllEventListeners,a.hasEventListener=b.hasEventListener,a.dispatchEvent=b.dispatchEvent,a._dispatchEvent=b._dispatchEvent,a.willTrigger=b.willTrigger},b.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},b.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},b.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},b.off=b.removeEventListener,b.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},b.dispatchEvent=function(a,b,c){if("string"==typeof a){var d=this._listeners;if(!(b||d&&d[a]))return!0;a=new createjs.Event(a,b,c)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(e){}if(a.bubbles&&this.parent){for(var f=this,g=[f];f.parent;)g.push(f=f.parent);var h,i=g.length;for(h=i-1;h>=0&&!a.propagationStopped;h--)g[h]._dispatchEvent(a,1+(0==h));for(h=1;i>h&&!a.propagationStopped;h++)g[h]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return!a.defaultPrevented},b.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},b.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},b.toString=function(){return"[EventDispatcher]"},b._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;try{a.currentTarget=this}catch(f){}try{a.eventPhase=b}catch(f){}a.removed=!1,e=e.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=e[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}},createjs.EventDispatcher=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Ticker cannot be instantiated."}a.RAF_SYNCHED="synched",a.RAF="raf",a.TIMEOUT="timeout",a.useRAF=!1,a.timingMode=null,a.maxDelta=0,a.paused=!1,a.removeEventListener=null,a.removeAllEventListeners=null,a.dispatchEvent=null,a.hasEventListener=null,a._listeners=null,createjs.EventDispatcher.initialize(a),a._addEventListener=a.addEventListener,a.addEventListener=function(){return!a._inited&&a.init(),a._addEventListener.apply(a,arguments)},a._inited=!1,a._startTime=0,a._pausedTime=0,a._ticks=0,a._pausedTicks=0,a._interval=50,a._lastTime=0,a._times=null,a._tickTimes=null,a._timerId=null,a._raf=!0,a.setInterval=function(b){a._interval=b,a._inited&&a._setupTick()},a.getInterval=function(){return a._interval},a.setFPS=function(b){a.setInterval(1e3/b)},a.getFPS=function(){return 1e3/a._interval};try{Object.defineProperties(a,{interval:{get:a.getInterval,set:a.setInterval},framerate:{get:a.getFPS,set:a.setFPS}})}catch(b){console.log(b)}a.init=function(){a._inited||(a._inited=!0,a._times=[],a._tickTimes=[],a._startTime=a._getTime(),a._times.push(a._lastTime=0),a.interval=a._interval)},a.reset=function(){if(a._raf){var b=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;b&&b(a._timerId)}else clearTimeout(a._timerId);a.removeAllEventListeners("tick"),a._timerId=a._times=a._tickTimes=null,a._startTime=a._lastTime=a._ticks=0,a._inited=!1},a.getMeasuredTickTime=function(b){var c=0,d=a._tickTimes;if(!d||d.length<1)return-1;b=Math.min(d.length,b||0|a.getFPS());for(var e=0;b>e;e++)c+=d[e];return c/b},a.getMeasuredFPS=function(b){var c=a._times;return!c||c.length<2?-1:(b=Math.min(c.length-1,b||0|a.getFPS()),1e3/((c[0]-c[b])/b))},a.setPaused=function(b){a.paused=b},a.getPaused=function(){return a.paused},a.getTime=function(b){return a._startTime?a._getTime()-(b?a._pausedTime:0):-1},a.getEventTime=function(b){return a._startTime?(a._lastTime||a._startTime)-(b?a._pausedTime:0):-1},a.getTicks=function(b){return a._ticks-(b?a._pausedTicks:0)},a._handleSynch=function(){a._timerId=null,a._setupTick(),a._getTime()-a._lastTime>=.97*(a._interval-1)&&a._tick()},a._handleRAF=function(){a._timerId=null,a._setupTick(),a._tick()},a._handleTimeout=function(){a._timerId=null,a._setupTick(),a._tick()},a._setupTick=function(){if(null==a._timerId){var b=a.timingMode||a.useRAF&&a.RAF_SYNCHED;if(b==a.RAF_SYNCHED||b==a.RAF){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(c)return a._timerId=c(b==a.RAF?a._handleRAF:a._handleSynch),void(a._raf=!0)}a._raf=!1,a._timerId=setTimeout(a._handleTimeout,a._interval)}},a._tick=function(){var b=a.paused,c=a._getTime(),d=c-a._lastTime;if(a._lastTime=c,a._ticks++,b&&(a._pausedTicks++,a._pausedTime+=d),a.hasEventListener("tick")){var e=new createjs.Event("tick"),f=a.maxDelta;e.delta=f&&d>f?f:d,e.paused=b,e.time=c,e.runTime=c-a._pausedTime,a.dispatchEvent(e)}for(a._tickTimes.unshift(a._getTime()-c);a._tickTimes.length>100;)a._tickTimes.pop();for(a._times.unshift(c);a._times.length>100;)a._times.pop()};var c=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);a._getTime=function(){return(c&&c.call(performance)||(new Date).getTime())-a._startTime},createjs.Ticker=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"UID cannot be instantiated"}a._nextID=0,a.get=function(){return a._nextID++},createjs.UID=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j,k){this.Event_constructor(a,b,c),this.stageX=d,this.stageY=e,this.rawX=null==i?d:i,this.rawY=null==j?e:j,this.nativeEvent=f,this.pointerID=g,this.primary=!!h,this.relatedTarget=k}var b=createjs.extend(a,createjs.Event);b._get_localX=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x},b._get_localY=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y},b._get_isTouch=function(){return-1!==this.pointerID};try{Object.defineProperties(b,{localX:{get:b._get_localX},localY:{get:b._get_localY},isTouch:{get:b._get_isTouch}})}catch(c){}b.clone=function(){return new a(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)},b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"},createjs.MouseEvent=createjs.promote(a,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f){this.setValues(a,b,c,d,e,f)}var b=a.prototype;a.DEG_TO_RAD=Math.PI/180,a.identity=null,b.setValues=function(a,b,c,d,e,f){return this.a=null==a?1:a,this.b=b||0,this.c=c||0,this.d=null==d?1:d,this.tx=e||0,this.ty=f||0,this},b.append=function(a,b,c,d,e,f){var g=this.a,h=this.b,i=this.c,j=this.d;return(1!=a||0!=b||0!=c||1!=d)&&(this.a=g*a+i*b,this.b=h*a+j*b,this.c=g*c+i*d,this.d=h*c+j*d),this.tx=g*e+i*f+this.tx,this.ty=h*e+j*f+this.ty,this},b.prepend=function(a,b,c,d,e,f){var g=this.a,h=this.c,i=this.tx;return this.a=a*g+c*this.b,this.b=b*g+d*this.b,this.c=a*h+c*this.d,this.d=b*h+d*this.d,this.tx=a*i+c*this.ty+e,this.ty=b*i+d*this.ty+f,this},b.appendMatrix=function(a){return this.append(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.prependMatrix=function(a){return this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.appendTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c),this.append(l*d,m*d,-m*e,l*e,0,0)):this.append(l*d,m*d,-m*e,l*e,b,c),(i||j)&&(this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d),this},b.prependTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return(i||j)&&(this.tx-=i,this.ty-=j),g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.prepend(l*d,m*d,-m*e,l*e,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c)):this.prepend(l*d,m*d,-m*e,l*e,b,c),this},b.rotate=function(b){b*=a.DEG_TO_RAD;var c=Math.cos(b),d=Math.sin(b),e=this.a,f=this.b;return this.a=e*c+this.c*d,this.b=f*c+this.d*d,this.c=-e*d+this.c*c,this.d=-f*d+this.d*c,this},b.skew=function(b,c){return b*=a.DEG_TO_RAD,c*=a.DEG_TO_RAD,this.append(Math.cos(c),Math.sin(c),-Math.sin(b),Math.cos(b),0,0),this},b.scale=function(a,b){return this.a*=a,this.b*=a,this.c*=b,this.d*=b,this},b.translate=function(a,b){return this.tx+=this.a*a+this.c*b,this.ty+=this.b*a+this.d*b,this},b.identity=function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},b.invert=function(){var a=this.a,b=this.b,c=this.c,d=this.d,e=this.tx,f=a*d-b*c;return this.a=d/f,this.b=-b/f,this.c=-c/f,this.d=a/f,this.tx=(c*this.ty-d*e)/f,this.ty=-(a*this.ty-b*e)/f,this},b.isIdentity=function(){return 0===this.tx&&0===this.ty&&1===this.a&&0===this.b&&0===this.c&&1===this.d},b.equals=function(a){return this.tx===a.tx&&this.ty===a.ty&&this.a===a.a&&this.b===a.b&&this.c===a.c&&this.d===a.d},b.transformPoint=function(a,b,c){return c=c||{},c.x=a*this.a+b*this.c+this.tx,c.y=a*this.b+b*this.d+this.ty,c},b.decompose=function(b){null==b&&(b={}),b.x=this.tx,b.y=this.ty,b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var c=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a),e=Math.abs(1-c/d);return 1e-5>e?(b.rotation=d/a.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=c/a.DEG_TO_RAD,b.skewY=d/a.DEG_TO_RAD),b},b.copy=function(a){return this.setValues(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.clone=function(){return new a(this.a,this.b,this.c,this.d,this.tx,this.ty)},b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},a.identity=new a,createjs.Matrix2D=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e){this.setValues(a,b,c,d,e)}var b=a.prototype;b.setValues=function(a,b,c,d,e){return this.visible=null==a?!0:!!a,this.alpha=null==b?1:b,this.shadow=c,this.compositeOperation=c,this.matrix=e||this.matrix&&this.matrix.identity()||new createjs.Matrix2D,this},b.append=function(a,b,c,d,e){return this.alpha*=b,this.shadow=c||this.shadow,this.compositeOperation=d||this.compositeOperation,this.visible=this.visible&&a,e&&this.matrix.appendMatrix(e),this},b.prepend=function(a,b,c,d,e){return this.alpha*=b,this.shadow=this.shadow||c,this.compositeOperation=this.compositeOperation||d,this.visible=this.visible&&a,e&&this.matrix.prependMatrix(e),this},b.identity=function(){return this.visible=!0,this.alpha=1,this.shadow=this.compositeOperation=null,this.matrix.identity(),this},b.clone=function(){return new a(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())},createjs.DisplayProps=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.setValues(a,b)}var b=a.prototype;b.setValues=function(a,b){return this.x=a||0,this.y=b||0,this},b.copy=function(a){return this.x=a.x,this.y=a.y,this},b.clone=function(){return new a(this.x,this.y)},b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"},createjs.Point=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setValues(a,b,c,d)}var b=a.prototype;b.setValues=function(a,b,c,d){return this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this},b.extend=function(a,b,c,d){return c=c||0,d=d||0,a+c>this.x+this.width&&(this.width=a+c-this.x),b+d>this.y+this.height&&(this.height=b+d-this.y),a<this.x&&(this.width+=this.x-a,this.x=a),b<this.y&&(this.height+=this.y-b,this.y=b),this},b.pad=function(a,b,c,d){return this.x-=b,this.y-=a,this.width+=b+d,this.height+=a+c,this},b.copy=function(a){return this.setValues(a.x,a.y,a.width,a.height)},b.contains=function(a,b,c,d){return c=c||0,d=d||0,a>=this.x&&a+c<=this.x+this.width&&b>=this.y&&b+d<=this.y+this.height},b.union=function(a){return this.clone().extend(a.x,a.y,a.width,a.height)},b.intersection=function(b){var c=b.x,d=b.y,e=c+b.width,f=d+b.height;return this.x>c&&(c=this.x),this.y>d&&(d=this.y),this.x+this.width<e&&(e=this.x+this.width),this.y+this.height<f&&(f=this.y+this.height),c>=e||d>=f?null:new a(c,d,e-c,f-d)},b.intersects=function(a){return a.x<=this.x+this.width&&this.x<=a.x+a.width&&a.y<=this.y+this.height&&this.y<=a.y+a.height},b.isEmpty=function(){return this.width<=0||this.height<=0},b.clone=function(){return new a(this.x,this.y,this.width,this.height)},b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"},createjs.Rectangle=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g){a.addEventListener&&(this.target=a,this.overLabel=null==c?"over":c,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=e,this._isPressed=!1,this._isOver=!1,this._enabled=!1,a.mouseChildren=!1,this.enabled=!0,this.handleEvent({}),f&&(g&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(g)),a.hitArea=f))}var b=a.prototype;b.setEnabled=function(a){if(a!=this._enabled){var b=this.target;this._enabled=a,a?(b.cursor="pointer",b.addEventListener("rollover",this),b.addEventListener("rollout",this),b.addEventListener("mousedown",this),b.addEventListener("pressup",this),b._reset&&(b.__reset=b._reset,b._reset=this._reset)):(b.cursor=null,b.removeEventListener("rollover",this),b.removeEventListener("rollout",this),b.removeEventListener("mousedown",this),b.removeEventListener("pressup",this),b.__reset&&(b._reset=b.__reset,delete b.__reset))}},b.getEnabled=function(){return this._enabled};try{Object.defineProperties(b,{enabled:{get:b.getEnabled,set:b.setEnabled}})}catch(c){}b.toString=function(){return"[ButtonHelper]"},b.handleEvent=function(a){var b,c=this.target,d=a.type;"mousedown"==d?(this._isPressed=!0,b=this.downLabel):"pressup"==d?(this._isPressed=!1,b=this._isOver?this.overLabel:this.outLabel):"rollover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel),this.play?c.gotoAndPlay&&c.gotoAndPlay(b):c.gotoAndStop&&c.gotoAndStop(b)},b._reset=function(){var a=this.paused;this.__reset(),this.paused=a},createjs.ButtonHelper=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.color=a||"black",this.offsetX=b||0,this.offsetY=c||0,this.blur=d||0}var b=a.prototype;a.identity=new a("transparent",0,0,0),b.toString=function(){return"[Shadow]"},b.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},createjs.Shadow=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.complete=!0,this.framerate=0,this._animations=null,this._frames=null,this._images=null,this._data=null,this._loadCount=0,this._frameHeight=0,this._frameWidth=0,this._numFrames=0,this._regX=0,this._regY=0,this._spacing=0,this._margin=0,this._parseData(a)}var b=createjs.extend(a,createjs.EventDispatcher);b.getAnimations=function(){return this._animations.slice()};try{Object.defineProperties(b,{animations:{get:b.getAnimations}})}catch(c){}b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames||0;var b=this._data[a];return null==b?0:b.frames.length},b.getAnimation=function(a){return this._data[a]},b.getFrame=function(a){var b;return this._frames&&(b=this._frames[a])?b:null},b.getFrameBounds=function(a,b){var c=this.getFrame(a);return c?(b||new createjs.Rectangle).setValues(-c.regX,-c.regY,c.rect.width,c.rect.height):null},b.toString=function(){return"[SpriteSheet]"},b.clone=function(){throw"SpriteSheet cannot be cloned."},b._parseData=function(a){var b,c,d,e;if(null!=a){if(this.framerate=a.framerate||0,a.images&&(c=a.images.length)>0)for(e=this._images=[],b=0;c>b;b++){var f=a.images[b];if("string"==typeof f){var g=f;f=document.createElement("img"),f.src=g}e.push(f),f.getContext||f.naturalWidth||(this._loadCount++,this.complete=!1,function(a){f.onload=function(){a._handleImageLoad()}}(this))}if(null==a.frames);else if(a.frames instanceof Array)for(this._frames=[],e=a.frames,b=0,c=e.length;c>b;b++){var h=e[b];this._frames.push({image:this._images[h[4]?h[4]:0],rect:new createjs.Rectangle(h[0],h[1],h[2],h[3]),regX:h[5]||0,regY:h[6]||0})}else d=a.frames,this._frameWidth=d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._spacing=d.spacing||0,this._margin=d.margin||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(this._animations=[],null!=(d=a.animations)){this._data={};var i;for(i in d){var j={name:i},k=d[i];if("number"==typeof k)e=j.frames=[k];else if(k instanceof Array)if(1==k.length)j.frames=[k[0]];else for(j.speed=k[3],j.next=k[2],e=j.frames=[],b=k[0];b<=k[1];b++)e.push(b);else{j.speed=k.speed,j.next=k.next;var l=k.frames;e=j.frames="number"==typeof l?[l]:l.slice(0)}(j.next===!0||void 0===j.next)&&(j.next=i),(j.next===!1||e.length<2&&j.next==i)&&(j.next=null),j.speed||(j.speed=1),this._animations.push(i),this._data[i]=j}}}},b._handleImageLoad=function(){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))},b._calculateFrames=function(){if(!this._frames&&0!=this._frameWidth){this._frames=[];var a=this._numFrames||1e5,b=0,c=this._frameWidth,d=this._frameHeight,e=this._spacing,f=this._margin;a:for(var g=0,h=this._images;g<h.length;g++)for(var i=h[g],j=i.width,k=i.height,l=f;k-f-d>=l;){for(var m=f;j-f-c>=m;){if(b>=a)break a;b++,this._frames.push({image:i,rect:new createjs.Rectangle(m,l,c,d),regX:this._regX,regY:this._regY}),m+=c+e}l+=d+e}this._numFrames=b}},createjs.SpriteSheet=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.command=null,this._stroke=null,this._strokeStyle=null,this._oldStrokeStyle=null,this._strokeDash=null,this._oldStrokeDash=null,this._strokeIgnoreScale=!1,this._fill=null,this._instructions=[],this._commitIndex=0,this._activeInstructions=[],this._dirty=!1,this._storeIndex=0,this.clear()}var b=a.prototype,c=a;a.getRGB=function(a,b,c,d){return null!=a&&null==c&&(d=b,c=255&a,b=a>>8&255,a=a>>16&255),null==d?"rgb("+a+","+b+","+c+")":"rgba("+a+","+b+","+c+","+d+")"},a.getHSL=function(a,b,c,d){return null==d?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+d+")"},a.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},a.STROKE_CAPS_MAP=["butt","round","square"],a.STROKE_JOINTS_MAP=["miter","round","bevel"];var d=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");d.getContext&&(a._ctx=d.getContext("2d"),d.width=d.height=1),b.getInstructions=function(){return this._updateInstructions(),this._instructions};try{Object.defineProperties(b,{instructions:{get:b.getInstructions}})}catch(e){}b.isEmpty=function(){return!(this._instructions.length||this._activeInstructions.length)},b.draw=function(a,b){this._updateInstructions();for(var c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)c[d].exec(a,b)},b.drawAsPath=function(a){this._updateInstructions();for(var b,c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)(b=c[d]).path!==!1&&b.exec(a)},b.moveTo=function(a,b){return this.append(new c.MoveTo(a,b),!0)},b.lineTo=function(a,b){return this.append(new c.LineTo(a,b))},b.arcTo=function(a,b,d,e,f){return this.append(new c.ArcTo(a,b,d,e,f))},b.arc=function(a,b,d,e,f,g){return this.append(new c.Arc(a,b,d,e,f,g))},b.quadraticCurveTo=function(a,b,d,e){return this.append(new c.QuadraticCurveTo(a,b,d,e))},b.bezierCurveTo=function(a,b,d,e,f,g){return this.append(new c.BezierCurveTo(a,b,d,e,f,g))},b.rect=function(a,b,d,e){return this.append(new c.Rect(a,b,d,e))},b.closePath=function(){return this._activeInstructions.length?this.append(new c.ClosePath):this},b.clear=function(){return this._instructions.length=this._activeInstructions.length=this._commitIndex=0,this._strokeStyle=this._oldStrokeStyle=this._stroke=this._fill=this._strokeDash=this._oldStrokeDash=null,this._dirty=this._strokeIgnoreScale=!1,this},b.beginFill=function(a){return this._setFill(a?new c.Fill(a):null)},b.beginLinearGradientFill=function(a,b,d,e,f,g){return this._setFill((new c.Fill).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientFill=function(a,b,d,e,f,g,h,i){return this._setFill((new c.Fill).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapFill=function(a,b,d){return this._setFill(new c.Fill(null,d).bitmap(a,b))},b.endFill=function(){return this.beginFill()},b.setStrokeStyle=function(a,b,d,e,f){return this._updateInstructions(!0),this._strokeStyle=this.command=new c.StrokeStyle(a,b,d,e,f),this._stroke&&(this._stroke.ignoreScale=f),this._strokeIgnoreScale=f,this},b.setStrokeDash=function(a,b){return this._updateInstructions(!0),this._strokeDash=this.command=new c.StrokeDash(a,b),this},b.beginStroke=function(a){return this._setStroke(a?new c.Stroke(a):null)},b.beginLinearGradientStroke=function(a,b,d,e,f,g){return this._setStroke((new c.Stroke).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientStroke=function(a,b,d,e,f,g,h,i){return this._setStroke((new c.Stroke).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapStroke=function(a,b){return this._setStroke((new c.Stroke).bitmap(a,b))},b.endStroke=function(){return this.beginStroke()},b.curveTo=b.quadraticCurveTo,b.drawRect=b.rect,b.drawRoundRect=function(a,b,c,d,e){return this.drawRoundRectComplex(a,b,c,d,e,e,e,e)},b.drawRoundRectComplex=function(a,b,d,e,f,g,h,i){return this.append(new c.RoundRect(a,b,d,e,f,g,h,i))},b.drawCircle=function(a,b,d){return this.append(new c.Circle(a,b,d))},b.drawEllipse=function(a,b,d,e){return this.append(new c.Ellipse(a,b,d,e))},b.drawPolyStar=function(a,b,d,e,f,g){return this.append(new c.PolyStar(a,b,d,e,f,g))},b.append=function(a,b){return this._activeInstructions.push(a),this.command=a,b||(this._dirty=!0),this},b.decodePath=function(b){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],d=[2,2,4,6,0],e=0,f=b.length,g=[],h=0,i=0,j=a.BASE_64;f>e;){var k=b.charAt(e),l=j[k],m=l>>3,n=c[m];if(!n||3&l)throw"bad path data (@"+e+"): "+k;var o=d[m];m||(h=i=0),g.length=0,e++;for(var p=(l>>2&1)+2,q=0;o>q;q++){var r=j[b.charAt(e)],s=r>>5?-1:1;r=(31&r)<<6|j[b.charAt(e+1)],3==p&&(r=r<<6|j[b.charAt(e+2)]),r=s*r/10,q%2?h=r+=h:i=r+=i,g[q]=r,e+=p}n.apply(this,g)}return this},b.store=function(){return this._updateInstructions(!0),this._storeIndex=this._instructions.length,this},b.unstore=function(){return this._storeIndex=0,this},b.clone=function(){var b=new a;return b.command=this.command,b._stroke=this._stroke,b._strokeStyle=this._strokeStyle,b._strokeDash=this._strokeDash,b._strokeIgnoreScale=this._strokeIgnoreScale,b._fill=this._fill,b._instructions=this._instructions.slice(),b._commitIndex=this._commitIndex,b._activeInstructions=this._activeInstructions.slice(),b._dirty=this._dirty,b._storeIndex=this._storeIndex,b},b.toString=function(){return"[Graphics]"},b.mt=b.moveTo,b.lt=b.lineTo,b.at=b.arcTo,b.bt=b.bezierCurveTo,b.qt=b.quadraticCurveTo,b.a=b.arc,b.r=b.rect,b.cp=b.closePath,b.c=b.clear,b.f=b.beginFill,b.lf=b.beginLinearGradientFill,b.rf=b.beginRadialGradientFill,b.bf=b.beginBitmapFill,b.ef=b.endFill,b.ss=b.setStrokeStyle,b.sd=b.setStrokeDash,b.s=b.beginStroke,b.ls=b.beginLinearGradientStroke,b.rs=b.beginRadialGradientStroke,b.bs=b.beginBitmapStroke,b.es=b.endStroke,b.dr=b.drawRect,b.rr=b.drawRoundRect,b.rc=b.drawRoundRectComplex,b.dc=b.drawCircle,b.de=b.drawEllipse,b.dp=b.drawPolyStar,b.p=b.decodePath,b._updateInstructions=function(b){var c=this._instructions,d=this._activeInstructions,e=this._commitIndex;if(this._dirty&&d.length){c.length=e,c.push(a.beginCmd);var f=d.length,g=c.length;c.length=g+f;for(var h=0;f>h;h++)c[h+g]=d[h];this._fill&&c.push(this._fill),this._stroke&&(this._strokeDash!==this._oldStrokeDash&&(this._oldStrokeDash=this._strokeDash,c.push(this._strokeDash)),this._strokeStyle!==this._oldStrokeStyle&&(this._oldStrokeStyle=this._strokeStyle,c.push(this._strokeStyle)),c.push(this._stroke)),this._dirty=!1}b&&(d.length=0,this._commitIndex=c.length)},b._setFill=function(a){return this._updateInstructions(!0),this.command=this._fill=a,this},b._setStroke=function(a){return this._updateInstructions(!0),(this.command=this._stroke=a)&&(a.ignoreScale=this._strokeIgnoreScale),this},(c.LineTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.lineTo(this.x,this.y)},(c.MoveTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.moveTo(this.x,this.y)},(c.ArcTo=function(a,b,c,d,e){this.x1=a,this.y1=b,this.x2=c,this.y2=d,this.radius=e}).prototype.exec=function(a){a.arcTo(this.x1,this.y1,this.x2,this.y2,this.radius)},(c.Arc=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.startAngle=d,this.endAngle=e,this.anticlockwise=!!f}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.anticlockwise)},(c.QuadraticCurveTo=function(a,b,c,d){this.cpx=a,this.cpy=b,this.x=c,this.y=d}).prototype.exec=function(a){a.quadraticCurveTo(this.cpx,this.cpy,this.x,this.y)},(c.BezierCurveTo=function(a,b,c,d,e,f){this.cp1x=a,this.cp1y=b,this.cp2x=c,this.cp2y=d,this.x=e,this.y=f}).prototype.exec=function(a){a.bezierCurveTo(this.cp1x,this.cp1y,this.cp2x,this.cp2y,this.x,this.y)},(c.Rect=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){a.rect(this.x,this.y,this.w,this.h)},(c.ClosePath=function(){}).prototype.exec=function(a){a.closePath()},(c.BeginPath=function(){}).prototype.exec=function(a){a.beginPath()},b=(c.Fill=function(a,b){this.style=a,this.matrix=b}).prototype,b.exec=function(a){if(this.style){a.fillStyle=this.style;var b=this.matrix;b&&(a.save(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty)),a.fill(),b&&a.restore()}},b.linearGradient=function(b,c,d,e,f,g){for(var h=this.style=a._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return h.props={colors:b,ratios:c,x0:d,y0:e,x1:f,y1:g,type:"linear"},this},b.radialGradient=function(b,c,d,e,f,g,h,i){for(var j=this.style=a._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return j.props={colors:b,ratios:c,x0:d,y0:e,r0:f,x1:g,y1:h,r1:i,type:"radial"},this},b.bitmap=function(b,c){if(b.naturalWidth||b.getContext||b.readyState>=2){var d=this.style=a._ctx.createPattern(b,c||"");d.props={image:b,repetition:c,type:"bitmap"}}return this},b.path=!1,b=(c.Stroke=function(a,b){this.style=a,this.ignoreScale=b}).prototype,b.exec=function(a){this.style&&(a.strokeStyle=this.style,this.ignoreScale&&(a.save(),a.setTransform(1,0,0,1,0,0)),a.stroke(),this.ignoreScale&&a.restore())},b.linearGradient=c.Fill.prototype.linearGradient,b.radialGradient=c.Fill.prototype.radialGradient,b.bitmap=c.Fill.prototype.bitmap,b.path=!1,b=(c.StrokeStyle=function(a,b,c,d){this.width=a,this.caps=b,this.joints=c,this.miterLimit=d}).prototype,b.exec=function(b){b.lineWidth=null==this.width?"1":this.width,b.lineCap=null==this.caps?"butt":isNaN(this.caps)?this.caps:a.STROKE_CAPS_MAP[this.caps],b.lineJoin=null==this.joints?"miter":isNaN(this.joints)?this.joints:a.STROKE_JOINTS_MAP[this.joints],b.miterLimit=null==this.miterLimit?"10":this.miterLimit},b.path=!1,(c.StrokeDash=function(a,b){this.segments=a,this.offset=b||0}).prototype.exec=function(a){a.setLineDash&&(a.setLineDash(this.segments||c.StrokeDash.EMPTY_SEGMENTS),a.lineDashOffset=this.offset||0)},c.StrokeDash.EMPTY_SEGMENTS=[],(c.RoundRect=function(a,b,c,d,e,f,g,h){this.x=a,this.y=b,this.w=c,this.h=d,this.radiusTL=e,this.radiusTR=f,this.radiusBR=g,this.radiusBL=h}).prototype.exec=function(a){var b=(j>i?i:j)/2,c=0,d=0,e=0,f=0,g=this.x,h=this.y,i=this.w,j=this.h,k=this.radiusTL,l=this.radiusTR,m=this.radiusBR,n=this.radiusBL;0>k&&(k*=c=-1),k>b&&(k=b),0>l&&(l*=d=-1),l>b&&(l=b),0>m&&(m*=e=-1),m>b&&(m=b),0>n&&(n*=f=-1),n>b&&(n=b),a.moveTo(g+i-l,h),a.arcTo(g+i+l*d,h-l*d,g+i,h+l,l),a.lineTo(g+i,h+j-m),a.arcTo(g+i+m*e,h+j+m*e,g+i-m,h+j,m),a.lineTo(g+n,h+j),a.arcTo(g-n*f,h+j+n*f,g,h+j-n,n),a.lineTo(g,h+k),a.arcTo(g-k*c,h-k*c,g+k,h,k),a.closePath()},(c.Circle=function(a,b,c){this.x=a,this.y=b,this.radius=c}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,0,2*Math.PI)},(c.Ellipse=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.w,e=this.h,f=.5522848,g=d/2*f,h=e/2*f,i=b+d,j=c+e,k=b+d/2,l=c+e/2;a.moveTo(b,l),a.bezierCurveTo(b,l-h,k-g,c,k,c),a.bezierCurveTo(k+g,c,i,l-h,i,l),a.bezierCurveTo(i,l+h,k+g,j,k,j),a.bezierCurveTo(k-g,j,b,l+h,b,l)},(c.PolyStar=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.sides=d,this.pointSize=e,this.angle=f}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.radius,e=(this.angle||0)/180*Math.PI,f=this.sides,g=1-(this.pointSize||0),h=Math.PI/f;a.moveTo(b+Math.cos(e)*d,c+Math.sin(e)*d);for(var i=0;f>i;i++)e+=h,1!=g&&a.lineTo(b+Math.cos(e)*d*g,c+Math.sin(e)*d*g),e+=h,a.lineTo(b+Math.cos(e)*d,c+Math.sin(e)*d);a.closePath()},a.beginCmd=new c.BeginPath,createjs.Graphics=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.EventDispatcher_constructor(),this.alpha=1,this.cacheCanvas=null,this.cacheID=0,this.id=createjs.UID.get(),this.mouseEnabled=!0,this.tickEnabled=!0,this.name=null,this.parent=null,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.shadow=null,this.visible=!0,this.x=0,this.y=0,this.transformMatrix=null,this.compositeOperation=null,this.snapToPixel=!0,this.filters=null,this.mask=null,this.hitArea=null,this.cursor=null,this._cacheOffsetX=0,this._cacheOffsetY=0,this._filterOffsetX=0,this._filterOffsetY=0,this._cacheScale=1,this._cacheDataURLID=0,this._cacheDataURL=null,this._props=new createjs.DisplayProps,this._rectangle=new createjs.Rectangle,this._bounds=null
}var b=createjs.extend(a,createjs.EventDispatcher);a._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],a.suppressCrossDomainErrors=!1,a._snapToPixelEnabled=!1;var c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._hitTestCanvas=c,a._hitTestContext=c.getContext("2d"),c.width=c.height=1),a._nextCacheID=1,b.getStage=function(){for(var a=this,b=createjs.Stage;a.parent;)a=a.parent;return a instanceof b?a:null};try{Object.defineProperties(b,{stage:{get:b.getStage}})}catch(d){}b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.draw=function(a,b){var c=this.cacheCanvas;if(b||!c)return!1;var d=this._cacheScale;return a.drawImage(c,this._cacheOffsetX+this._filterOffsetX,this._cacheOffsetY+this._filterOffsetY,c.width/d,c.height/d),!0},b.updateContext=function(b){var c=this,d=c.mask,e=c._props.matrix;d&&d.graphics&&!d.graphics.isEmpty()&&(d.getMatrix(e),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty),d.graphics.drawAsPath(b),b.clip(),e.invert(),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty)),this.getMatrix(e);var f=e.tx,g=e.ty;a._snapToPixelEnabled&&c.snapToPixel&&(f=f+(0>f?-.5:.5)|0,g=g+(0>g?-.5:.5)|0),b.transform(e.a,e.b,e.c,e.d,f,g),b.globalAlpha*=c.alpha,c.compositeOperation&&(b.globalCompositeOperation=c.compositeOperation),c.shadow&&this._applyShadow(b,c.shadow)},b.cache=function(a,b,c,d,e){e=e||1,this.cacheCanvas||(this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),this._cacheWidth=c,this._cacheHeight=d,this._cacheOffsetX=a,this._cacheOffsetY=b,this._cacheScale=e,this.updateCache()},b.updateCache=function(b){var c=this.cacheCanvas;if(!c)throw"cache() must be called before updateCache()";var d=this._cacheScale,e=this._cacheOffsetX*d,f=this._cacheOffsetY*d,g=this._cacheWidth,h=this._cacheHeight,i=c.getContext("2d"),j=this._getFilterBounds();e+=this._filterOffsetX=j.x,f+=this._filterOffsetY=j.y,g=Math.ceil(g*d)+j.width,h=Math.ceil(h*d)+j.height,g!=c.width||h!=c.height?(c.width=g,c.height=h):b||i.clearRect(0,0,g+1,h+1),i.save(),i.globalCompositeOperation=b,i.setTransform(d,0,0,d,-e,-f),this.draw(i,!0),this._applyFilters(),i.restore(),this.cacheID=a._nextCacheID++},b.uncache=function(){this._cacheDataURL=this.cacheCanvas=null,this.cacheID=this._cacheOffsetX=this._cacheOffsetY=this._filterOffsetX=this._filterOffsetY=0,this._cacheScale=1},b.getCacheDataURL=function(){return this.cacheCanvas?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURL=this.cacheCanvas.toDataURL()),this._cacheDataURL):null},b.localToGlobal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).transformPoint(a,b,c||new createjs.Point)},b.globalToLocal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(a,b,c||new createjs.Point)},b.localToLocal=function(a,b,c,d){return d=this.localToGlobal(a,b,d),c.globalToLocal(d.x,d.y,d)},b.setTransform=function(a,b,c,d,e,f,g,h,i){return this.x=a||0,this.y=b||0,this.scaleX=null==c?1:c,this.scaleY=null==d?1:d,this.rotation=e||0,this.skewX=f||0,this.skewY=g||0,this.regX=h||0,this.regY=i||0,this},b.getMatrix=function(a){var b=this,c=a&&a.identity()||new createjs.Matrix2D;return b.transformMatrix?c.copy(b.transformMatrix):c.appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY)},b.getConcatenatedMatrix=function(a){for(var b=this,c=this.getMatrix(a);b=b.parent;)c.prependMatrix(b.getMatrix(b._props.matrix));return c},b.getConcatenatedDisplayProps=function(a){a=a?a.identity():new createjs.DisplayProps;var b=this,c=b.getMatrix(a.matrix);do a.prepend(b.visible,b.alpha,b.shadow,b.compositeOperation),b!=this&&c.prependMatrix(b.getMatrix(b._props.matrix));while(b=b.parent);return a},b.hitTest=function(b,c){var d=a._hitTestContext;d.setTransform(1,0,0,1,-b,-c),this.draw(d);var e=this._testHit(d);return d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,2,2),e},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.getBounds=function(){if(this._bounds)return this._rectangle.copy(this._bounds);var a=this.cacheCanvas;if(a){var b=this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX,this._cacheOffsetY,a.width/b,a.height/b)}return null},b.getTransformedBounds=function(){return this._getBounds()},b.setBounds=function(a,b,c,d){null==a&&(this._bounds=a),this._bounds=(this._bounds||new createjs.Rectangle).setValues(a,b,c,d)},b.clone=function(){return this._cloneProps(new a)},b.toString=function(){return"[DisplayObject (name="+this.name+")]"},b._cloneProps=function(a){return a.alpha=this.alpha,a.mouseEnabled=this.mouseEnabled,a.tickEnabled=this.tickEnabled,a.name=this.name,a.regX=this.regX,a.regY=this.regY,a.rotation=this.rotation,a.scaleX=this.scaleX,a.scaleY=this.scaleY,a.shadow=this.shadow,a.skewX=this.skewX,a.skewY=this.skewY,a.visible=this.visible,a.x=this.x,a.y=this.y,a.compositeOperation=this.compositeOperation,a.snapToPixel=this.snapToPixel,a.filters=null==this.filters?null:this.filters.slice(0),a.mask=this.mask,a.hitArea=this.hitArea,a.cursor=this.cursor,a._bounds=this._bounds,a},b._applyShadow=function(a,b){b=b||Shadow.identity,a.shadowColor=b.color,a.shadowOffsetX=b.offsetX,a.shadowOffsetY=b.offsetY,a.shadowBlur=b.blur},b._tick=function(a){var b=this._listeners;b&&b.tick&&(a.target=null,a.propagationStopped=a.immediatePropagationStopped=!1,this.dispatchEvent(a))},b._testHit=function(b){try{var c=b.getImageData(0,0,1,1).data[3]>1}catch(d){if(!a.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."}return c},b._applyFilters=function(){if(this.filters&&0!=this.filters.length&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;a>e;e++)this.filters[e].applyFilter(b,0,0,c,d)},b._getFilterBounds=function(){var a,b=this.filters,c=this._rectangle.setValues(0,0,0,0);if(!b||!(a=b.length))return c;for(var d=0;a>d;d++){var e=this.filters[d];e.getBounds&&e.getBounds(c)}return c},b._getBounds=function(a,b){return this._transformBounds(this.getBounds(),a,b)},b._transformBounds=function(a,b,c){if(!a)return a;var d=a.x,e=a.y,f=a.width,g=a.height,h=this._props.matrix;h=c?h.identity():this.getMatrix(h),(d||e)&&h.appendTransform(0,0,1,1,0,0,0,-d,-e),b&&h.prependMatrix(b);var i=f*h.a,j=f*h.b,k=g*h.c,l=g*h.d,m=h.tx,n=h.ty,o=m,p=m,q=n,r=n;return(d=i+m)<o?o=d:d>p&&(p=d),(d=i+k+m)<o?o=d:d>p&&(p=d),(d=k+m)<o?o=d:d>p&&(p=d),(e=j+n)<q?q=e:e>r&&(r=e),(e=j+l+n)<q?q=e:e>r&&(r=e),(e=l+n)<q?q=e:e>r&&(r=e),a.setValues(o,q,p-o,r-q)},b._hasMouseEventListener=function(){for(var b=a._MOUSE_EVENTS,c=0,d=b.length;d>c;c++)if(this.hasEventListener(b[c]))return!0;return!!this.cursor},createjs.DisplayObject=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.DisplayObject_constructor(),this.children=[],this.mouseChildren=!0,this.tickChildren=!0}var b=createjs.extend(a,createjs.DisplayObject);b.getNumChildren=function(){return this.children.length};try{Object.defineProperties(b,{numChildren:{get:b.getNumChildren}})}catch(c){}b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(),d=0,e=c.length;e>d;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0},b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addChild(arguments[c]);return arguments[b-1]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.push(a),a.dispatchEvent("added"),a},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a.dispatchEvent("added"),a},b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(createjs.indexOf(this.children,a))},b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;b>d;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;b>d;d++)e=e&&this.removeChildAt(c[d]);return e}if(0>a||a>this.children.length-1)return!1;var f=this.children[a];return f&&(f.parent=null),this.children.splice(a,1),f.dispatchEvent("removed"),!0},b.removeAllChildren=function(){for(var a=this.children;a.length;)this.removeChildAt(0)},b.getChildAt=function(a){return this.children[a]},b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},b.sortChildren=function(a){this.children.sort(a)},b.getChildIndex=function(a){return createjs.indexOf(this.children,a)},b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)},b.swapChildren=function(a,b){for(var c,d,e=this.children,f=0,g=e.length;g>f&&(e[f]==a&&(c=f),e[f]==b&&(d=f),null==c||null==d);f++);f!=g&&(e[c]=b,e[d]=a)},b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;d>e&&c[e]!=a;e++);e!=d&&e!=b&&(c.splice(e,1),c.splice(b,0,a))}},b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1},b.hitTest=function(a,b){return null!=this.getObjectUnderPoint(a,b)},b.getObjectsUnderPoint=function(a,b,c){var d=[],e=this.localToGlobal(a,b);return this._getObjectsUnderPoint(e.x,e.y,d,c>0,1==c),d},b.getObjectUnderPoint=function(a,b,c){var d=this.localToGlobal(a,b);return this._getObjectsUnderPoint(d.x,d.y,null,c>0,1==c)},b.getBounds=function(){return this._getBounds(null,!0)},b.getTransformedBounds=function(){return this._getBounds()},b.clone=function(b){var c=this._cloneProps(new a);return b&&this._cloneChildren(c),c},b.toString=function(){return"[Container (name="+this.name+")]"},b._tick=function(a){if(this.tickChildren)for(var b=this.children.length-1;b>=0;b--){var c=this.children[b];c.tickEnabled&&c._tick&&c._tick(a)}this.DisplayObject__tick(a)},b._cloneChildren=function(a){a.children.length&&a.removeAllChildren();for(var b=a.children,c=0,d=this.children.length;d>c;c++){var e=this.children[c].clone(!0);e.parent=a,b.push(e)}},b._getObjectsUnderPoint=function(b,c,d,e,f,g){if(g=g||0,!g&&!this._testMask(this,b,c))return null;var h,i=createjs.DisplayObject._hitTestContext;f=f||e&&this._hasMouseEventListener();for(var j=this.children,k=j.length,l=k-1;l>=0;l--){var m=j[l],n=m.hitArea;if(m.visible&&(n||m.isVisible())&&(!e||m.mouseEnabled)&&(n||this._testMask(m,b,c)))if(!n&&m instanceof a){var o=m._getObjectsUnderPoint(b,c,d,e,f,g+1);if(!d&&o)return e&&!this.mouseChildren?this:o}else{if(e&&!f&&!m._hasMouseEventListener())continue;var p=m.getConcatenatedDisplayProps(m._props);if(h=p.matrix,n&&(h.appendMatrix(n.getMatrix(n._props.matrix)),p.alpha=n.alpha),i.globalAlpha=p.alpha,i.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-c),(n||m).draw(i),!this._testHit(i))continue;if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,2,2),!d)return e&&!this.mouseChildren?this:m;d.push(m)}}return null},b._testMask=function(a,b,c){var d=a.mask;if(!d||!d.graphics||d.graphics.isEmpty())return!0;var e=this._props.matrix,f=a.parent;e=f?f.getConcatenatedMatrix(e):e.identity(),e=d.getMatrix(d._props.matrix).prependMatrix(e);var g=createjs.DisplayObject._hitTestContext;return g.setTransform(e.a,e.b,e.c,e.d,e.tx-b,e.ty-c),d.graphics.drawAsPath(g),g.fillStyle="#000",g.fill(),this._testHit(g)?(g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,2,2),!0):!1},b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();if(c)return this._transformBounds(c,a,b);var d=this._props.matrix;d=b?d.identity():this.getMatrix(d),a&&d.prependMatrix(a);for(var e=this.children.length,f=null,g=0;e>g;g++){var h=this.children[g];h.visible&&(c=h._getBounds(d))&&(f?f.extend(c.x,c.y,c.width,c.height):f=c.clone())}return f},createjs.Container=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Container_constructor(),this.autoClear=!0,this.canvas="string"==typeof a?document.getElementById(a):a,this.mouseX=0,this.mouseY=0,this.drawRect=null,this.snapToPixelEnabled=!1,this.mouseInBounds=!1,this.tickOnUpdate=!0,this.mouseMoveOutside=!1,this.preventSelection=!0,this._pointerData={},this._pointerCount=0,this._primaryPointerID=null,this._mouseOverIntervalID=null,this._nextStage=null,this._prevStage=null,this.enableDOMEvents(!0)}var b=createjs.extend(a,createjs.Container);b._get_nextStage=function(){return this._nextStage},b._set_nextStage=function(a){this._nextStage&&(this._nextStage._prevStage=null),a&&(a._prevStage=this),this._nextStage=a};try{Object.defineProperties(b,{nextStage:{get:b._get_nextStage,set:b._set_nextStage}})}catch(c){}b.update=function(a){if(this.canvas&&(this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart",!1,!0)!==!1)){createjs.DisplayObject._snapToPixelEnabled=this.snapToPixelEnabled;var b=this.drawRect,c=this.canvas.getContext("2d");c.setTransform(1,0,0,1,0,0),this.autoClear&&(b?c.clearRect(b.x,b.y,b.width,b.height):c.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)),c.save(),this.drawRect&&(c.beginPath(),c.rect(b.x,b.y,b.width,b.height),c.clip()),this.updateContext(c),this.draw(c,!1),c.restore(),this.dispatchEvent("drawend")}},b.tick=function(a){if(this.tickEnabled&&this.dispatchEvent("tickstart",!1,!0)!==!1){var b=new createjs.Event("tick");if(a)for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);this._tick(b),this.dispatchEvent("tickend")}},b.handleEvent=function(a){"tick"==a.type&&this.update(a)},b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}},b.toDataURL=function(a,b){var c,d=this.canvas.getContext("2d"),e=this.canvas.width,f=this.canvas.height;if(a){c=d.getImageData(0,0,e,f);var g=d.globalCompositeOperation;d.globalCompositeOperation="destination-over",d.fillStyle=a,d.fillRect(0,0,e,f)}var h=this.canvas.toDataURL(b||"image/png");return a&&(d.putImageData(c,0,0),d.globalCompositeOperation=g),h},b.enableMouseOver=function(a){if(this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0==a&&this._testMouseOver(!0)),null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1e3/Math.min(50,a))},b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c,d=this._eventListeners;if(!a&&d){for(b in d)c=d[b],c.t.removeEventListener(b,c.f,!1);this._eventListeners=null}else if(a&&!d&&this.canvas){var e=window.addEventListener?window:document,f=this;d=this._eventListeners={},d.mouseup={t:e,f:function(a){f._handleMouseUp(a)}},d.mousemove={t:e,f:function(a){f._handleMouseMove(a)}},d.dblclick={t:this.canvas,f:function(a){f._handleDoubleClick(a)}},d.mousedown={t:this.canvas,f:function(a){f._handleMouseDown(a)}};for(b in d)c=d[b],c.t.addEventListener(b,c.f,!1)}},b.clone=function(){throw"Stage cannot be cloned."},b.toString=function(){return"[Stage (name="+this.name+")]"},b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),f=window.getComputedStyle?getComputedStyle(a,null):a.currentStyle,g=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth),h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),i=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),j=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+g,right:b.right+d-i,top:b.top+e+h,bottom:b.bottom+e-j}},b._getPointerData=function(a){var b=this._pointerData[a];return b||(b=this._pointerData[a]={x:0,y:0}),b},b._handleMouseMove=function(a){a||(a=window.event),this._handlePointerMove(-1,a,a.pageX,a.pageY)},b._handlePointerMove=function(a,b,c,d,e){if((!this._prevStage||void 0!==e)&&this.canvas){var f=this._nextStage,g=this._getPointerData(a),h=g.inBounds;this._updatePointerPosition(a,b,c,d),(h||g.inBounds||this.mouseMoveOutside)&&(-1===a&&g.inBounds==!h&&this._dispatchMouseEvent(this,h?"mouseleave":"mouseenter",!1,a,g,b),this._dispatchMouseEvent(this,"stagemousemove",!1,a,g,b),this._dispatchMouseEvent(g.target,"pressmove",!0,a,g,b)),f&&f._handlePointerMove(a,b,c,d,null)}},b._updatePointerPosition=function(a,b,c,d){var e=this._getElementRect(this.canvas);c-=e.left,d-=e.top;var f=this.canvas.width,g=this.canvas.height;c/=(e.right-e.left)/f,d/=(e.bottom-e.top)/g;var h=this._getPointerData(a);(h.inBounds=c>=0&&d>=0&&f-1>=c&&g-1>=d)?(h.x=c,h.y=d):this.mouseMoveOutside&&(h.x=0>c?0:c>f-1?f-1:c,h.y=0>d?0:d>g-1?g-1:d),h.posEvtObj=b,h.rawX=c,h.rawY=d,(a===this._primaryPointerID||-1===a)&&(this.mouseX=h.x,this.mouseY=h.y,this.mouseInBounds=h.inBounds)},b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)},b._handlePointerUp=function(a,b,c,d){var e=this._nextStage,f=this._getPointerData(a);if(!this._prevStage||void 0!==d){var g=null,h=f.target;d||!h&&!e||(g=this._getObjectsUnderPoint(f.x,f.y,null,!0)),f.down&&(this._dispatchMouseEvent(this,"stagemouseup",!1,a,f,b,g),f.down=!1),g==h&&this._dispatchMouseEvent(h,"click",!0,a,f,b),this._dispatchMouseEvent(h,"pressup",!0,a,f,b),c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):f.target=null,e&&e._handlePointerUp(a,b,c,d||g&&this)}},b._handleMouseDown=function(a){this._handlePointerDown(-1,a,a.pageX,a.pageY)},b._handlePointerDown=function(a,b,c,d,e){this.preventSelection&&b.preventDefault(),(null==this._primaryPointerID||-1===a)&&(this._primaryPointerID=a),null!=d&&this._updatePointerPosition(a,b,c,d);var f=null,g=this._nextStage,h=this._getPointerData(a);e||(f=h.target=this._getObjectsUnderPoint(h.x,h.y,null,!0)),h.inBounds&&(this._dispatchMouseEvent(this,"stagemousedown",!1,a,h,b,f),h.down=!0),this._dispatchMouseEvent(f,"mousedown",!0,a,h,b),g&&g._handlePointerDown(a,b,c,d,e||f&&this)},b._testMouseOver=function(a,b,c){if(!this._prevStage||void 0!==b){var d=this._nextStage;if(!this._mouseOverIntervalID)return void(d&&d._testMouseOver(a,b,c));var e=this._getPointerData(-1);if(e&&(a||this.mouseX!=this._mouseOverX||this.mouseY!=this._mouseOverY||!this.mouseInBounds)){var f,g,h,i=e.posEvtObj,j=c||i&&i.target==this.canvas,k=null,l=-1,m="";!b&&(a||this.mouseInBounds&&j)&&(k=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var n=this._mouseOverTarget||[],o=n[n.length-1],p=this._mouseOverTarget=[];for(f=k;f;)p.unshift(f),m||(m=f.cursor),f=f.parent;for(this.canvas.style.cursor=m,!b&&c&&(c.canvas.style.cursor=m),g=0,h=p.length;h>g&&p[g]==n[g];g++)l=g;for(o!=k&&this._dispatchMouseEvent(o,"mouseout",!0,-1,e,i,k),g=n.length-1;g>l;g--)this._dispatchMouseEvent(n[g],"rollout",!1,-1,e,i,k);for(g=p.length-1;g>l;g--)this._dispatchMouseEvent(p[g],"rollover",!1,-1,e,i,o);o!=k&&this._dispatchMouseEvent(k,"mouseover",!0,-1,e,i,o),d&&d._testMouseOver(a,b||k&&this,c||j&&this)}}},b._handleDoubleClick=function(a,b){var c=null,d=this._nextStage,e=this._getPointerData(-1);b||(c=this._getObjectsUnderPoint(e.x,e.y,null,!0),this._dispatchMouseEvent(c,"dblclick",!0,-1,e,a)),d&&d._handleDoubleClick(a,b||c&&this)},b._dispatchMouseEvent=function(a,b,c,d,e,f,g){if(a&&(c||a.hasEventListener(b))){var h=new createjs.MouseEvent(b,c,!1,e.x,e.y,f,d,d===this._primaryPointerID||-1===d,e.rawX,e.rawY,g);a.dispatchEvent(h)}},createjs.Stage=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){function a(a){this.DisplayObject_constructor(),"string"==typeof a?(this.image=document.createElement("img"),this.image.src=a):this.image=a,this.sourceRect=null}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.image,b=this.cacheCanvas||a&&(a.naturalWidth||a.getContext||a.readyState>=2);return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&b)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b)||!this.image)return!0;var c=this.image,d=this.sourceRect;if(d){var e=d.x,f=d.y,g=e+d.width,h=f+d.height,i=0,j=0,k=c.width,l=c.height;0>e&&(i-=e,e=0),g>k&&(g=k),0>f&&(j-=f,f=0),h>l&&(h=l),a.drawImage(c,e,f,g-e,h-f,i,j,g-e,h-f)}else a.drawImage(c,0,0);return!0},b.getBounds=function(){var a=this.DisplayObject_getBounds();if(a)return a;var b=this.image,c=this.sourceRect||b,d=b&&(b.naturalWidth||b.getContext||b.readyState>=2);return d?this._rectangle.setValues(0,0,c.width,c.height):null},b.clone=function(){var b=new a(this.image);return this.sourceRect&&(b.sourceRect=this.sourceRect.clone()),this._cloneProps(b),b},b.toString=function(){return"[Bitmap (name="+this.name+")]"},createjs.Bitmap=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.DisplayObject_constructor(),this.currentFrame=0,this.currentAnimation=null,this.paused=!0,this.spriteSheet=a,this.currentAnimationFrame=0,this.framerate=0,this._animation=null,this._currentFrame=null,this._skipAdvance=!1,null!=b&&this.gotoAndPlay(b)}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(0|this._currentFrame);if(!c)return!1;var d=c.rect;return d.width&&d.height&&a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height),!0},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._skipAdvance=!0,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.advance=function(a){var b=this.framerate||this.spriteSheet.framerate,c=b&&null!=a?a/(1e3/b):1;this._normalizeFrame(c)},b.getBounds=function(){return this.DisplayObject_getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)},b.clone=function(){return this._cloneProps(new a(this.spriteSheet))},b.toString=function(){return"[Sprite (name="+this.name+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.currentFrame=this.currentFrame,a.currentAnimation=this.currentAnimation,a.paused=this.paused,a.currentAnimationFrame=this.currentAnimationFrame,a.framerate=this.framerate,a._animation=this._animation,a._currentFrame=this._currentFrame,a._skipAdvance=this._skipAdvance,a},b._tick=function(a){this.paused||(this._skipAdvance||this.advance(a&&a.delta),this._skipAdvance=!1),this.DisplayObject__tick(a)},b._normalizeFrame=function(a){a=a||0;var b,c=this._animation,d=this.paused,e=this._currentFrame;if(c){var f=c.speed||1,g=this.currentAnimationFrame;if(b=c.frames.length,g+a*f>=b){var h=c.next;if(this._dispatchAnimationEnd(c,e,d,h,b-1))return;if(h)return this._goto(h,a-(b-g)/f);this.paused=!0,g=c.frames.length-1}else g+=a*f;this.currentAnimationFrame=g,this._currentFrame=c.frames[0|g]}else if(e=this._currentFrame+=a,b=this.spriteSheet.getNumFrames(),e>=b&&b>0&&!this._dispatchAnimationEnd(c,e,d,b-1)&&(this._currentFrame-=b)>=b)return this._normalizeFrame();e=0|this._currentFrame,this.currentFrame!=e&&(this.currentFrame=e,this.dispatchEvent("change"))},b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;if(this.hasEventListener("animationend")){var g=new createjs.Event("animationend");g.name=f,g.next=d,this.dispatchEvent(g)}var h=this._animation!=a||this._currentFrame!=b;return h||c||!this.paused||(this.currentAnimationFrame=e,h=!0),h},b._goto=function(a,b){if(this.currentAnimationFrame=0,isNaN(a)){var c=this.spriteSheet.getAnimation(a);c&&(this._animation=c,this.currentAnimation=a,this._normalizeFrame(b))}else this.currentAnimation=this._animation=null,this._currentFrame=a,this._normalizeFrame()},createjs.Sprite=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),this.graphics=a?a:new createjs.Graphics}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this.graphics.draw(a,this),!0)},b.clone=function(b){var c=b&&this.graphics?this.graphics.clone():this.graphics;return this._cloneProps(new a(c))},b.toString=function(){return"[Shape (name="+this.name+")]"},createjs.Shape=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.DisplayObject_constructor(),this.text=a,this.font=b,this.color=c,this.textAlign="left",this.textBaseline="top",this.maxWidth=null,this.outline=0,this.lineHeight=0,this.lineWidth=null}var b=createjs.extend(a,createjs.DisplayObject),c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._workingContext=c.getContext("2d"),c.width=c.height=1),a.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},a.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.color||"#000";return this.outline?(a.strokeStyle=c,a.lineWidth=1*this.outline):a.fillStyle=c,this._drawText(this._prepContext(a)),!0},b.getMeasuredWidth=function(){return this._getMeasuredWidth(this.text)},b.getMeasuredLineHeight=function(){return 1.2*this._getMeasuredWidth("M")},b.getMeasuredHeight=function(){return this._drawText(null,{}).height},b.getBounds=function(){var b=this.DisplayObject_getBounds();if(b)return b;if(null==this.text||""===this.text)return null;var c=this._drawText(null,{}),d=this.maxWidth&&this.maxWidth<c.width?this.maxWidth:c.width,e=d*a.H_OFFSETS[this.textAlign||"left"],f=this.lineHeight||this.getMeasuredLineHeight(),g=f*a.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.setValues(e,g,d,c.height)},b.getMetrics=function(){var b={lines:[]};return b.lineHeight=this.lineHeight||this.getMeasuredLineHeight(),b.vOffset=b.lineHeight*a.V_OFFSETS[this.textBaseline||"top"],this._drawText(null,b,b.lines)},b.clone=function(){return this._cloneProps(new a(this.text,this.font,this.color))},b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.textAlign=this.textAlign,a.textBaseline=this.textBaseline,a.maxWidth=this.maxWidth,a.outline=this.outline,a.lineHeight=this.lineHeight,a.lineWidth=this.lineWidth,a},b._prepContext=function(a){return a.font=this.font||"10px sans-serif",a.textAlign=this.textAlign||"left",a.textBaseline=this.textBaseline||"top",a},b._drawText=function(b,c,d){var e=!!b;e||(b=a._workingContext,b.save(),this._prepContext(b));for(var f=this.lineHeight||this.getMeasuredLineHeight(),g=0,h=0,i=String(this.text).split(/(?:\r\n|\r|\n)/),j=0,k=i.length;k>j;j++){var l=i[j],m=null;if(null!=this.lineWidth&&(m=b.measureText(l).width)>this.lineWidth){var n=l.split(/(\s)/);l=n[0],m=b.measureText(l).width;for(var o=1,p=n.length;p>o;o+=2){var q=b.measureText(n[o]+n[o+1]).width;m+q>this.lineWidth?(e&&this._drawTextLine(b,l,h*f),d&&d.push(l),m>g&&(g=m),l=n[o+1],m=b.measureText(l).width,h++):(l+=n[o]+n[o+1],m+=q)}}e&&this._drawTextLine(b,l,h*f),d&&d.push(l),c&&null==m&&(m=b.measureText(l).width),m>g&&(g=m),h++}return c&&(c.width=g,c.height=h*f),e||b.restore(),c},b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)},b._getMeasuredWidth=function(b){var c=a._workingContext;c.save();var d=this._prepContext(c).measureText(b).width;return c.restore(),d},createjs.Text=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.Container_constructor(),this.text=a||"",this.spriteSheet=b,this.lineHeight=0,this.letterSpacing=0,this.spaceWidth=0,this._oldProps={text:0,spriteSheet:0,lineHeight:0,letterSpacing:0,spaceWidth:0}}var b=createjs.extend(a,createjs.Container);a.maxPoolSize=100,a._spritePool=[],b.draw=function(a,b){this.DisplayObject_draw(a,b)||(this._updateText(),this.Container_draw(a,b))},b.getBounds=function(){return this._updateText(),this.Container_getBounds()},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!==this.scaleX&&0!==this.scaleY&&a)},b.clone=function(){return this._cloneProps(new a(this.text,this.spriteSheet))},b.addChild=b.addChildAt=b.removeChild=b.removeChildAt=b.removeAllChildren=function(){},b._cloneProps=function(a){return this.Container__cloneProps(a),a.lineHeight=this.lineHeight,a.letterSpacing=this.letterSpacing,a.spaceWidth=this.spaceWidth,a},b._getFrameIndex=function(a,b){var c,d=b.getAnimation(a);return d||(a!=(c=a.toUpperCase())||a!=(c=a.toLowerCase())||(c=null),c&&(d=b.getAnimation(c))),d&&d.frames[0]},b._getFrame=function(a,b){var c=this._getFrameIndex(a,b);return null==c?c:b.getFrame(c)},b._getLineHeight=function(a){var b=this._getFrame("1",a)||this._getFrame("T",a)||this._getFrame("L",a)||a.getFrame(0);return b?b.rect.height:1},b._getSpaceWidth=function(a){var b=this._getFrame("1",a)||this._getFrame("l",a)||this._getFrame("e",a)||this._getFrame("a",a)||a.getFrame(0);return b?b.rect.width:1},b._updateText=function(){var b,c=0,d=0,e=this._oldProps,f=!1,g=this.spaceWidth,h=this.lineHeight,i=this.spriteSheet,j=a._spritePool,k=this.children,l=0,m=k.length;for(var n in e)e[n]!=this[n]&&(e[n]=this[n],f=!0);if(f){var o=!!this._getFrame(" ",i);o||g||(g=this._getSpaceWidth(i)),h||(h=this._getLineHeight(i));for(var p=0,q=this.text.length;q>p;p++){var r=this.text.charAt(p);if(" "!=r||o)if("\n"!=r&&"\r"!=r){var s=this._getFrameIndex(r,i);null!=s&&(m>l?b=k[l]:(k.push(b=j.length?j.pop():new createjs.Sprite),b.parent=this,m++),b.spriteSheet=i,b.gotoAndStop(s),b.x=c,b.y=d,l++,c+=b.getBounds().width+this.letterSpacing)}else"\r"==r&&"\n"==this.text.charAt(p+1)&&p++,c=0,d+=h;else c+=g}for(;m>l;)j.push(b=k.pop()),b.parent=null,m--;j.length>a.maxPoolSize&&(j.length=a.maxPoolSize)}},createjs.BitmapText=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"SpriteSheetUtils cannot be instantiated"}var b=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");b.getContext&&(a._workingCanvas=b,a._workingContext=b.getContext("2d"),b.width=b.height=1),a.addFlippedFrames=function(b,c,d,e){if(c||d||e){var f=0;c&&a._flip(b,++f,!0,!1),d&&a._flip(b,++f,!1,!0),e&&a._flip(b,++f,!0,!0)}},a.extractFrame=function(b,c){isNaN(c)&&(c=b.getAnimation(c).frames[0]);var d=b.getFrame(c);if(!d)return null;var e=d.rect,f=a._workingCanvas;f.width=e.width,f.height=e.height,a._workingContext.drawImage(d.image,e.x,e.y,e.width,e.height,0,0,e.width,e.height);var g=document.createElement("img");return g.src=f.toDataURL("image/png"),g},a.mergeAlpha=function(a,b,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),c.width=Math.max(b.width,a.width),c.height=Math.max(b.height,a.height);var d=c.getContext("2d");return d.save(),d.drawImage(a,0,0),d.globalCompositeOperation="destination-in",d.drawImage(b,0,0),d.restore(),c},a._flip=function(b,c,d,e){for(var f=b._images,g=a._workingCanvas,h=a._workingContext,i=f.length/c,j=0;i>j;j++){var k=f[j];k.__tmp=j,h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,g.width+1,g.height+1),g.width=k.width,g.height=k.height,h.setTransform(d?-1:1,0,0,e?-1:1,d?k.width:0,e?k.height:0),h.drawImage(k,0,0);
var l=document.createElement("img");l.src=g.toDataURL("image/png"),l.width=k.width,l.height=k.height,f.push(l)}var m=b._frames,n=m.length/c;for(j=0;n>j;j++){k=m[j];var o=k.rect.clone();l=f[k.image.__tmp+i*c];var p={image:l,rect:o,regX:k.regX,regY:k.regY};d&&(o.x=l.width-o.x-o.width,p.regX=o.width-k.regX),e&&(o.y=l.height-o.y-o.height,p.regY=o.height-k.regY),m.push(p)}var q="_"+(d?"h":"")+(e?"v":""),r=b._animations,s=b._data,t=r.length/c;for(j=0;t>j;j++){var u=r[j];k=s[u];var v={name:u+q,speed:k.speed,next:k.next,frames:[]};k.next&&(v.next+=q),m=k.frames;for(var w=0,x=m.length;x>w;w++)v.frames.push(m[w]+n*c);s[v.name]=v,r.push(v.name)}},createjs.SpriteSheetUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.EventDispatcher_constructor(),this.maxWidth=2048,this.maxHeight=2048,this.spriteSheet=null,this.scale=1,this.padding=1,this.timeSlice=.3,this.progress=-1,this._frames=[],this._animations={},this._data=null,this._nextFrameIndex=0,this._index=0,this._timerID=null,this._scale=1}var b=createjs.extend(a,createjs.EventDispatcher);a.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",a.ERR_RUNNING="a build is already running",b.addFrame=function(b,c,d,e,f){if(this._data)throw a.ERR_RUNNING;var g=c||b.bounds||b.nominalBounds;return!g&&b.getBounds&&(g=b.getBounds()),g?(d=d||1,this._frames.push({source:b,sourceRect:g,scale:d,funct:e,data:f,index:this._frames.length,height:g.height*d})-1):null},b.addAnimation=function(b,c,d,e){if(this._data)throw a.ERR_RUNNING;this._animations[b]={frames:c,next:d,frequency:e}},b.addMovieClip=function(b,c,d,e,f,g){if(this._data)throw a.ERR_RUNNING;var h=b.frameBounds,i=c||b.bounds||b.nominalBounds;if(!i&&b.getBounds&&(i=b.getBounds()),i||h){var j,k,l=this._frames.length,m=b.timeline.duration;for(j=0;m>j;j++){var n=h&&h[j]?h[j]:i;this.addFrame(b,n,d,this._setupMovieClipFrame,{i:j,f:e,d:f})}var o=b.timeline._labels,p=[];for(var q in o)p.push({index:o[q],label:q});if(p.length)for(p.sort(function(a,b){return a.index-b.index}),j=0,k=p.length;k>j;j++){for(var r=p[j].label,s=l+p[j].index,t=l+(j==k-1?m:p[j+1].index),u=[],v=s;t>v;v++)u.push(v);(!g||(r=g(r,b,s,t)))&&this.addAnimation(r,u,!0)}}},b.build=function(){if(this._data)throw a.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet},b.buildAsync=function(b){if(this._data)throw a.ERR_RUNNING;this.timeSlice=b,this._startBuild();var c=this;this._timerID=setTimeout(function(){c._run()},50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))},b.stopAsync=function(){clearTimeout(this._timerID),this._data=null},b.clone=function(){throw"SpriteSheetBuilder cannot be cloned."},b.toString=function(){return"[SpriteSheetBuilder]"},b._startBuild=function(){var b=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;var c=[];this._data={images:[],frames:c,animations:this._animations};var d=this._frames.slice();if(d.sort(function(a,b){return a.height<=b.height?-1:1}),d[d.length-1].height+2*b>this.maxHeight)throw a.ERR_DIMENSIONS;for(var e=0,f=0,g=0;d.length;){var h=this._fillRow(d,e,g,c,b);if(h.w>f&&(f=h.w),e+=h.h,!h.h||!d.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");i.width=this._getSize(f,this.maxWidth),i.height=this._getSize(e,this.maxHeight),this._data.images[g]=i,h.h||(f=e=0,g++)}}},b._setupMovieClipFrame=function(a,b){var c=a.actionsEnabled;a.actionsEnabled=!1,a.gotoAndStop(b.i),a.actionsEnabled=c,b.f&&b.f(a,b.d,b.i)},b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))},b._fillRow=function(b,c,d,e,f){var g=this.maxWidth,h=this.maxHeight;c+=f;for(var i=h-c,j=f,k=0,l=b.length-1;l>=0;l--){var m=b[l],n=this._scale*m.scale,o=m.sourceRect,p=m.source,q=Math.floor(n*o.x-f),r=Math.floor(n*o.y-f),s=Math.ceil(n*o.height+2*f),t=Math.ceil(n*o.width+2*f);if(t>g)throw a.ERR_DIMENSIONS;s>i||j+t>g||(m.img=d,m.rect=new createjs.Rectangle(j,c,t,s),k=k||s,b.splice(l,1),e[m.index]=[j,c,t,s,d,Math.round(-q+n*p.regX-f),Math.round(-r+n*p.regY-f)],j+=t)}return{w:j,h:k}},b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")},b._run=function(){for(var a=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}var e=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct(a.source,a.data),f.save(),f.beginPath(),f.rect(c.x,c.y,c.width,c.height),f.clip(),f.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b)),f.scale(b,b),a.source.draw(f),f.restore(),++this._index<this._frames.length},createjs.SpriteSheetBuilder=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),"string"==typeof a&&(a=document.getElementById(a)),this.mouseEnabled=!1;var b=a.style;b.position="absolute",b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%",this.htmlElement=a,this._oldProps=null}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){return null!=this.htmlElement},b.draw=function(){return!0},b.cache=function(){},b.uncache=function(){},b.updateCache=function(){},b.hitTest=function(){},b.localToGlobal=function(){},b.globalToLocal=function(){},b.localToLocal=function(){},b.clone=function(){throw"DOMElement cannot be cloned."},b.toString=function(){return"[DOMElement (name="+this.name+")]"},b._tick=function(a){var b=this.getStage();b&&b.on("drawend",this._handleDrawEnd,this,!0),this.DisplayObject__tick(a)},b._handleDrawEnd=function(){var a=this.htmlElement;if(a){var b=a.style,c=this.getConcatenatedDisplayProps(this._props),d=c.matrix,e=c.visible?"visible":"hidden";if(e!=b.visibility&&(b.visibility=e),c.visible){var f=this._oldProps,g=f&&f.matrix,h=1e4;if(!g||!g.equals(d)){var i="matrix("+(d.a*h|0)/h+","+(d.b*h|0)/h+","+(d.c*h|0)/h+","+(d.d*h|0)/h+","+(d.tx+.5|0);b.transform=b.WebkitTransform=b.OTransform=b.msTransform=i+","+(d.ty+.5|0)+")",b.MozTransform=i+"px,"+(d.ty+.5|0)+"px)",f||(f=this._oldProps=new createjs.DisplayProps(!0,0/0)),f.matrix.copy(d)}f.alpha!=c.alpha&&(b.opacity=""+(c.alpha*h|0)/h,f.alpha=c.alpha)}}},createjs.DOMElement=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){}var b=a.prototype;b.getBounds=function(a){return a},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}return this._applyFilter(i)?(f.putImageData(i,g,h),!0):!1},b.toString=function(){return"[Filter]"},b.clone=function(){return new a},b._applyFilter=function(){return!0},createjs.Filter=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){(isNaN(a)||0>a)&&(a=0),(isNaN(b)||0>b)&&(b=0),(isNaN(c)||1>c)&&(c=1),this.blurX=0|a,this.blurY=0|b,this.quality=0|c}var b=createjs.extend(a,createjs.Filter);a.MUL_TABLE=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],a.SHG_TABLE=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],b.getBounds=function(a){var b=0|this.blurX,c=0|this.blurY;if(0>=b&&0>=c)return a;var d=Math.pow(this.quality,.2);return(a||new createjs.Rectangle).pad(b*d+1,c*d+1,b*d+1,c*d+1)},b.clone=function(){return new a(this.blurX,this.blurY,this.quality)},b.toString=function(){return"[BlurFilter]"},b._applyFilter=function(b){var c=this.blurX>>1;if(isNaN(c)||0>c)return!1;var d=this.blurY>>1;if(isNaN(d)||0>d)return!1;if(0==c&&0==d)return!1;var e=this.quality;(isNaN(e)||1>e)&&(e=1),e|=0,e>3&&(e=3),1>e&&(e=1);var f=b.data,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=c+c+1|0,w=d+d+1|0,x=0|b.width,y=0|b.height,z=x-1|0,A=y-1|0,B=c+1|0,C=d+1|0,D={r:0,b:0,g:0,a:0},E=D;for(i=1;v>i;i++)E=E.n={r:0,b:0,g:0,a:0};E.n=D;var F={r:0,b:0,g:0,a:0},G=F;for(i=1;w>i;i++)G=G.n={r:0,b:0,g:0,a:0};G.n=F;for(var H=null,I=0|a.MUL_TABLE[c],J=0|a.SHG_TABLE[c],K=0|a.MUL_TABLE[d],L=0|a.SHG_TABLE[d];e-->0;){m=l=0;var M=I,N=J;for(h=y;--h>-1;){for(n=B*(r=f[0|l]),o=B*(s=f[l+1|0]),p=B*(t=f[l+2|0]),q=B*(u=f[l+3|0]),E=D,i=B;--i>-1;)E.r=r,E.g=s,E.b=t,E.a=u,E=E.n;for(i=1;B>i;i++)j=l+((i>z?z:i)<<2)|0,n+=E.r=f[j],o+=E.g=f[j+1],p+=E.b=f[j+2],q+=E.a=f[j+3],E=E.n;for(H=D,g=0;x>g;g++)f[l++]=n*M>>>N,f[l++]=o*M>>>N,f[l++]=p*M>>>N,f[l++]=q*M>>>N,j=m+((j=g+c+1)<z?j:z)<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n;m+=x}for(M=K,N=L,g=0;x>g;g++){for(l=g<<2|0,n=C*(r=f[l])|0,o=C*(s=f[l+1|0])|0,p=C*(t=f[l+2|0])|0,q=C*(u=f[l+3|0])|0,G=F,i=0;C>i;i++)G.r=r,G.g=s,G.b=t,G.a=u,G=G.n;for(k=x,i=1;d>=i;i++)l=k+g<<2,n+=G.r=f[l],o+=G.g=f[l+1],p+=G.b=f[l+2],q+=G.a=f[l+3],G=G.n,A>i&&(k+=x);if(l=g,H=F,e>0)for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(f[j]=n*M>>>N,f[j+1]=o*M>>>N,f[j+2]=p*M>>>N):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x;else for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(u=255/u,f[j]=(n*M>>>N)*u,f[j+1]=(o*M>>>N)*u,f[j+2]=(p*M>>>N)*u):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x}}return!0},createjs.BlurFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.alphaMap=a,this._alphaMap=null,this._mapData=null}var b=createjs.extend(a,createjs.Filter);b.clone=function(){var b=new a(this.alphaMap);return b._alphaMap=this._alphaMap,b._mapData=this._mapData,b},b.toString=function(){return"[AlphaMapFilter]"},b._applyFilter=function(a){if(!this.alphaMap)return!0;if(!this._prepAlphaMap())return!1;for(var b=a.data,c=this._mapData,d=0,e=b.length;e>d;d+=4)b[d+3]=c[d]||0;return!0},b._prepAlphaMap=function(){if(!this.alphaMap)return!1;if(this.alphaMap==this._alphaMap&&this._mapData)return!0;this._mapData=null;var a,b=this._alphaMap=this.alphaMap,c=b;b instanceof HTMLCanvasElement?a=c.getContext("2d"):(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),c.width=b.width,c.height=b.height,a=c.getContext("2d"),a.drawImage(b,0,0));try{var d=a.getImageData(0,0,b.width,b.height)}catch(e){return!1}return this._mapData=d.data,!0},createjs.AlphaMapFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.mask=a}var b=createjs.extend(a,createjs.Filter);b.applyFilter=function(a,b,c,d,e,f,g,h){return this.mask?(f=f||a,null==g&&(g=b),null==h&&(h=c),f.save(),a!=f?!1:(f.globalCompositeOperation="destination-in",f.drawImage(this.mask,g,h),f.restore(),!0)):!0},b.clone=function(){return new a(this.mask)},b.toString=function(){return"[AlphaMaskFilter]"},createjs.AlphaMaskFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h){this.redMultiplier=null!=a?a:1,this.greenMultiplier=null!=b?b:1,this.blueMultiplier=null!=c?c:1,this.alphaMultiplier=null!=d?d:1,this.redOffset=e||0,this.greenOffset=f||0,this.blueOffset=g||0,this.alphaOffset=h||0}var b=createjs.extend(a,createjs.Filter);b.toString=function(){return"[ColorFilter]"},b.clone=function(){return new a(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)},b._applyFilter=function(a){for(var b=a.data,c=b.length,d=0;c>d;d+=4)b[d]=b[d]*this.redMultiplier+this.redOffset,b[d+1]=b[d+1]*this.greenMultiplier+this.greenOffset,b[d+2]=b[d+2]*this.blueMultiplier+this.blueOffset,b[d+3]=b[d+3]*this.alphaMultiplier+this.alphaOffset;return!0},createjs.ColorFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setColor(a,b,c,d)}var b=a.prototype;a.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],a.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],a.LENGTH=a.IDENTITY_MATRIX.length,b.setColor=function(a,b,c,d){return this.reset().adjustColor(a,b,c,d)},b.reset=function(){return this.copy(a.IDENTITY_MATRIX)},b.adjustColor=function(a,b,c,d){return this.adjustHue(d),this.adjustContrast(b),this.adjustBrightness(a),this.adjustSaturation(c)},b.adjustBrightness=function(a){return 0==a||isNaN(a)?this:(a=this._cleanValue(a,255),this._multiplyMatrix([1,0,0,0,a,0,1,0,0,a,0,0,1,0,a,0,0,0,1,0,0,0,0,0,1]),this)},b.adjustContrast=function(b){if(0==b||isNaN(b))return this;b=this._cleanValue(b,100);var c;return 0>b?c=127+b/100*127:(c=b%1,c=0==c?a.DELTA_INDEX[b]:a.DELTA_INDEX[b<<0]*(1-c)+a.DELTA_INDEX[(b<<0)+1]*c,c=127*c+127),this._multiplyMatrix([c/127,0,0,0,.5*(127-c),0,c/127,0,0,.5*(127-c),0,0,c/127,0,.5*(127-c),0,0,0,1,0,0,0,0,0,1]),this},b.adjustSaturation=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,100);var b=1+(a>0?3*a/100:a/100),c=.3086,d=.6094,e=.082;return this._multiplyMatrix([c*(1-b)+b,d*(1-b),e*(1-b),0,0,c*(1-b),d*(1-b)+b,e*(1-b),0,0,c*(1-b),d*(1-b),e*(1-b)+b,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.adjustHue=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,180)/180*Math.PI;var b=Math.cos(a),c=Math.sin(a),d=.213,e=.715,f=.072;return this._multiplyMatrix([d+b*(1-d)+c*-d,e+b*-e+c*-e,f+b*-f+c*(1-f),0,0,d+b*-d+.143*c,e+b*(1-e)+.14*c,f+b*-f+c*-.283,0,0,d+b*-d+c*-(1-d),e+b*-e+c*e,f+b*(1-f)+c*f,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.concat=function(b){return b=this._fixMatrix(b),b.length!=a.LENGTH?this:(this._multiplyMatrix(b),this)},b.clone=function(){return(new a).copy(this)},b.toArray=function(){for(var b=[],c=0,d=a.LENGTH;d>c;c++)b[c]=this[c];return b},b.copy=function(b){for(var c=a.LENGTH,d=0;c>d;d++)this[d]=b[d];return this},b.toString=function(){return"[ColorMatrix]"},b._multiplyMatrix=function(a){var b,c,d,e=[];for(b=0;5>b;b++){for(c=0;5>c;c++)e[c]=this[c+5*b];for(c=0;5>c;c++){var f=0;for(d=0;5>d;d++)f+=a[c+5*d]*e[d];this[c+5*b]=f}}},b._cleanValue=function(a,b){return Math.min(b,Math.max(-b,a))},b._fixMatrix=function(b){return b instanceof a&&(b=b.toArray()),b.length<a.LENGTH?b=b.slice(0,b.length).concat(a.IDENTITY_MATRIX.slice(b.length,a.LENGTH)):b.length>a.LENGTH&&(b=b.slice(0,a.LENGTH)),b},createjs.ColorMatrix=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.matrix=a}var b=createjs.extend(a,createjs.Filter);b.toString=function(){return"[ColorMatrixFilter]"},b.clone=function(){return new a(this.matrix)},b._applyFilter=function(a){for(var b,c,d,e,f=a.data,g=f.length,h=this.matrix,i=h[0],j=h[1],k=h[2],l=h[3],m=h[4],n=h[5],o=h[6],p=h[7],q=h[8],r=h[9],s=h[10],t=h[11],u=h[12],v=h[13],w=h[14],x=h[15],y=h[16],z=h[17],A=h[18],B=h[19],C=0;g>C;C+=4)b=f[C],c=f[C+1],d=f[C+2],e=f[C+3],f[C]=b*i+c*j+d*k+e*l+m,f[C+1]=b*n+c*o+d*p+e*q+r,f[C+2]=b*s+c*t+d*u+e*v+w,f[C+3]=b*x+c*y+d*z+e*A+B;return!0},createjs.ColorMatrixFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Touch cannot be instantiated"}a.isSupported=function(){return!!("ontouchstart"in window||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>0)},a.enable=function(b,c,d){return b&&b.canvas&&a.isSupported()?b.__touch?!0:(b.__touch={pointers:{},multitouch:!c,preventDefault:!d,count:0},"ontouchstart"in window?a._IOS_enable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_enable(b),!0):!1},a.disable=function(b){b&&("ontouchstart"in window?a._IOS_disable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_disable(b),delete b.__touch)},a._IOS_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IOS_handleEvent(b,c)};c.addEventListener("touchstart",d,!1),c.addEventListener("touchmove",d,!1),c.addEventListener("touchend",d,!1),c.addEventListener("touchcancel",d,!1)},a._IOS_disable=function(a){var b=a.canvas;if(b){var c=a.__touch.f;b.removeEventListener("touchstart",c,!1),b.removeEventListener("touchmove",c,!1),b.removeEventListener("touchend",c,!1),b.removeEventListener("touchcancel",c,!1)}},a._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,e=0,f=c.length;f>e;e++){var g=c[e],h=g.identifier;g.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,g.pageX,g.pageY):"touchmove"==d?this._handleMove(a,h,b,g.pageX,g.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}},a._IE_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IE_handleEvent(b,c)};void 0===window.navigator.pointerEnabled?(c.addEventListener("MSPointerDown",d,!1),window.addEventListener("MSPointerMove",d,!1),window.addEventListener("MSPointerUp",d,!1),window.addEventListener("MSPointerCancel",d,!1),b.__touch.preventDefault&&(c.style.msTouchAction="none")):(c.addEventListener("pointerdown",d,!1),window.addEventListener("pointermove",d,!1),window.addEventListener("pointerup",d,!1),window.addEventListener("pointercancel",d,!1),b.__touch.preventDefault&&(c.style.touchAction="none")),b.__touch.activeIDs={}},a._IE_disable=function(a){var b=a.__touch.f;void 0===window.navigator.pointerEnabled?(window.removeEventListener("MSPointerMove",b,!1),window.removeEventListener("MSPointerUp",b,!1),window.removeEventListener("MSPointerCancel",b,!1),a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)):(window.removeEventListener("pointermove",b,!1),window.removeEventListener("pointerup",b,!1),window.removeEventListener("pointercancel",b,!1),a.canvas&&a.canvas.removeEventListener("pointerdown",b,!1))},a._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,d=b.pointerId,e=a.__touch.activeIDs;if("MSPointerDown"==c||"pointerdown"==c){if(b.srcElement!=a.canvas)return;e[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY)}else e[d]&&("MSPointerMove"==c||"pointermove"==c?this._handleMove(a,d,b,b.pageX,b.pageY):("MSPointerUp"==c||"MSPointerCancel"==c||"pointerup"==c||"pointercancel"==c)&&(delete e[d],this._handleEnd(a,d,b)))}},a._handleStart=function(a,b,c,d,e){var f=a.__touch;if(f.multitouch||!f.count){var g=f.pointers;g[b]||(g[b]=!0,f.count++,a._handlePointerDown(b,c,d,e))}},a._handleMove=function(a,b,c,d,e){a.__touch.pointers[b]&&a._handlePointerMove(b,c,d,e)},a._handleEnd=function(a,b,c){var d=a.__touch,e=d.pointers;e[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete e[b])},createjs.Touch=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.EaselJS=createjs.EaselJS||{};a.version="0.8.1",a.buildDate="Thu, 21 May 2015 16:17:39 GMT"}();/*!
* @license PreloadJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},function(){"use strict";var a=createjs.PreloadJS=createjs.PreloadJS||{};a.version="0.6.1",a.buildDate="Thu, 21 May 2015 16:17:37 GMT"}(),this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";function BrowserDetect(){throw"BrowserDetect cannot be instantiated"}var a=BrowserDetect.agent=window.navigator.userAgent;BrowserDetect.isWindowPhone=a.indexOf("IEMobile")>-1||a.indexOf("Windows Phone")>-1,BrowserDetect.isFirefox=a.indexOf("Firefox")>-1,BrowserDetect.isOpera=null!=window.opera,BrowserDetect.isChrome=a.indexOf("Chrome")>-1,BrowserDetect.isIOS=(a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1)&&!BrowserDetect.isWindowPhone,BrowserDetect.isAndroid=a.indexOf("Android")>-1&&!BrowserDetect.isWindowPhone,BrowserDetect.isBlackberry=a.indexOf("Blackberry")>-1,createjs.BrowserDetect=BrowserDetect}(),this.createjs=this.createjs||{},function(){"use strict";function Event(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var a=Event.prototype;a.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},a.stopPropagation=function(){this.propagationStopped=!0},a.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},a.remove=function(){this.removed=!0},a.clone=function(){return new Event(this.type,this.bubbles,this.cancelable)},a.set=function(a){for(var b in a)this[b]=a[b];return this},a.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=Event}(),this.createjs=this.createjs||{},function(){"use strict";function ErrorEvent(a,b,c){this.Event_constructor("error"),this.title=a,this.message=b,this.data=c}var a=createjs.extend(ErrorEvent,createjs.Event);a.clone=function(){return new createjs.ErrorEvent(this.title,this.message,this.data)},createjs.ErrorEvent=createjs.promote(ErrorEvent,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function EventDispatcher(){this._listeners=null,this._captureListeners=null}var a=EventDispatcher.prototype;EventDispatcher.initialize=function(b){b.addEventListener=a.addEventListener,b.on=a.on,b.removeEventListener=b.off=a.removeEventListener,b.removeAllEventListeners=a.removeAllEventListeners,b.hasEventListener=a.hasEventListener,b.dispatchEvent=a.dispatchEvent,b._dispatchEvent=a._dispatchEvent,b.willTrigger=a.willTrigger},a.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},a.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},a.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},a.off=a.removeEventListener,a.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},a.dispatchEvent=function(a){if("string"==typeof a){var b=this._listeners;if(!b||!b[a])return!1;a=new createjs.Event(a)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(c){}if(a.bubbles&&this.parent){for(var d=this,e=[d];d.parent;)e.push(d=d.parent);var f,g=e.length;for(f=g-1;f>=0&&!a.propagationStopped;f--)e[f]._dispatchEvent(a,1+(0==f));for(f=1;g>f&&!a.propagationStopped;f++)e[f]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return a.defaultPrevented},a.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},a.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},a.toString=function(){return"[EventDispatcher]"},a._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;try{a.currentTarget=this}catch(f){}try{a.eventPhase=b}catch(f){}a.removed=!1,e=e.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=e[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}},createjs.EventDispatcher=EventDispatcher}(),this.createjs=this.createjs||{},function(){"use strict";function ProgressEvent(a,b){this.Event_constructor("progress"),this.loaded=a,this.total=null==b?1:b,this.progress=0==b?0:this.loaded/this.total}var a=createjs.extend(ProgressEvent,createjs.Event);a.clone=function(){return new createjs.ProgressEvent(this.loaded,this.total)},createjs.ProgressEvent=createjs.promote(ProgressEvent,"Event")}(window),function(){function a(b,d){function f(a){if(f[a]!==q)return f[a];var b;if("bug-string-char-index"==a)b="a"!="a"[0];else if("json"==a)b=f("json-stringify")&&f("json-parse");else{var c,e='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==a){var i=d.stringify,k="function"==typeof i&&t;if(k){(c=function(){return 1}).toJSON=c;try{k="0"===i(0)&&"0"===i(new g)&&'""'==i(new h)&&i(s)===q&&i(q)===q&&i()===q&&"1"===i(c)&&"[1]"==i([c])&&"[null]"==i([q])&&"null"==i(null)&&"[null,null,null]"==i([q,s,null])&&i({a:[c,!0,!1,null,"\x00\b\n\f\r	"]})==e&&"1"===i(null,c)&&"[\n 1,\n 2\n]"==i([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==i(new j(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==i(new j(864e13))&&'"-000001-01-01T00:00:00.000Z"'==i(new j(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==i(new j(-1))}catch(l){k=!1}}b=k}if("json-parse"==a){var m=d.parse;if("function"==typeof m)try{if(0===m("0")&&!m(!1)){c=m(e);var n=5==c.a.length&&1===c.a[0];if(n){try{n=!m('"	"')}catch(l){}if(n)try{n=1!==m("01")}catch(l){}if(n)try{n=1!==m("1.")}catch(l){}}}}catch(l){n=!1}b=n}}return f[a]=!!b}b||(b=e.Object()),d||(d=e.Object());var g=b.Number||e.Number,h=b.String||e.String,i=b.Object||e.Object,j=b.Date||e.Date,k=b.SyntaxError||e.SyntaxError,l=b.TypeError||e.TypeError,m=b.Math||e.Math,n=b.JSON||e.JSON;"object"==typeof n&&n&&(d.stringify=n.stringify,d.parse=n.parse);var o,p,q,r=i.prototype,s=r.toString,t=new j(-0xc782b5b800cec);try{t=-109252==t.getUTCFullYear()&&0===t.getUTCMonth()&&1===t.getUTCDate()&&10==t.getUTCHours()&&37==t.getUTCMinutes()&&6==t.getUTCSeconds()&&708==t.getUTCMilliseconds()}catch(u){}if(!f("json")){var v="[object Function]",w="[object Date]",x="[object Number]",y="[object String]",z="[object Array]",A="[object Boolean]",B=f("bug-string-char-index");if(!t)var C=m.floor,D=[0,31,59,90,120,151,181,212,243,273,304,334],E=function(a,b){return D[b]+365*(a-1970)+C((a-1969+(b=+(b>1)))/4)-C((a-1901+b)/100)+C((a-1601+b)/400)};if((o=r.hasOwnProperty)||(o=function(a){var b,c={};return(c.__proto__=null,c.__proto__={toString:1},c).toString!=s?o=function(a){var b=this.__proto__,c=a in(this.__proto__=null,this);return this.__proto__=b,c}:(b=c.constructor,o=function(a){var c=(this.constructor||b).prototype;return a in this&&!(a in c&&this[a]===c[a])}),c=null,o.call(this,a)}),p=function(a,b){var d,e,f,g=0;(d=function(){this.valueOf=0}).prototype.valueOf=0,e=new d;for(f in e)o.call(e,f)&&g++;return d=e=null,g?p=2==g?function(a,b){var c,d={},e=s.call(a)==v;for(c in a)e&&"prototype"==c||o.call(d,c)||!(d[c]=1)||!o.call(a,c)||b(c)}:function(a,b){var c,d,e=s.call(a)==v;for(c in a)e&&"prototype"==c||!o.call(a,c)||(d="constructor"===c)||b(c);(d||o.call(a,c="constructor"))&&b(c)}:(e=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],p=function(a,b){var d,f,g=s.call(a)==v,h=!g&&"function"!=typeof a.constructor&&c[typeof a.hasOwnProperty]&&a.hasOwnProperty||o;for(d in a)g&&"prototype"==d||!h.call(a,d)||b(d);for(f=e.length;d=e[--f];h.call(a,d)&&b(d));}),p(a,b)},!f("json-stringify")){var F={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},G="000000",H=function(a,b){return(G+(b||0)).slice(-a)},I="\\u00",J=function(a){for(var b='"',c=0,d=a.length,e=!B||d>10,f=e&&(B?a.split(""):a);d>c;c++){var g=a.charCodeAt(c);switch(g){case 8:case 9:case 10:case 12:case 13:case 34:case 92:b+=F[g];break;default:if(32>g){b+=I+H(2,g.toString(16));break}b+=e?f[c]:a.charAt(c)}}return b+'"'},K=function(a,b,c,d,e,f,g){var h,i,j,k,m,n,r,t,u,v,B,D,F,G,I,L;try{h=b[a]}catch(M){}if("object"==typeof h&&h)if(i=s.call(h),i!=w||o.call(h,"toJSON"))"function"==typeof h.toJSON&&(i!=x&&i!=y&&i!=z||o.call(h,"toJSON"))&&(h=h.toJSON(a));else if(h>-1/0&&1/0>h){if(E){for(m=C(h/864e5),j=C(m/365.2425)+1970-1;E(j+1,0)<=m;j++);for(k=C((m-E(j,0))/30.42);E(j,k+1)<=m;k++);m=1+m-E(j,k),n=(h%864e5+864e5)%864e5,r=C(n/36e5)%24,t=C(n/6e4)%60,u=C(n/1e3)%60,v=n%1e3}else j=h.getUTCFullYear(),k=h.getUTCMonth(),m=h.getUTCDate(),r=h.getUTCHours(),t=h.getUTCMinutes(),u=h.getUTCSeconds(),v=h.getUTCMilliseconds();h=(0>=j||j>=1e4?(0>j?"-":"+")+H(6,0>j?-j:j):H(4,j))+"-"+H(2,k+1)+"-"+H(2,m)+"T"+H(2,r)+":"+H(2,t)+":"+H(2,u)+"."+H(3,v)+"Z"}else h=null;if(c&&(h=c.call(b,a,h)),null===h)return"null";if(i=s.call(h),i==A)return""+h;if(i==x)return h>-1/0&&1/0>h?""+h:"null";if(i==y)return J(""+h);if("object"==typeof h){for(G=g.length;G--;)if(g[G]===h)throw l();if(g.push(h),B=[],I=f,f+=e,i==z){for(F=0,G=h.length;G>F;F++)D=K(F,h,c,d,e,f,g),B.push(D===q?"null":D);L=B.length?e?"[\n"+f+B.join(",\n"+f)+"\n"+I+"]":"["+B.join(",")+"]":"[]"}else p(d||h,function(a){var b=K(a,h,c,d,e,f,g);b!==q&&B.push(J(a)+":"+(e?" ":"")+b)}),L=B.length?e?"{\n"+f+B.join(",\n"+f)+"\n"+I+"}":"{"+B.join(",")+"}":"{}";return g.pop(),L}};d.stringify=function(a,b,d){var e,f,g,h;if(c[typeof b]&&b)if((h=s.call(b))==v)f=b;else if(h==z){g={};for(var i,j=0,k=b.length;k>j;i=b[j++],h=s.call(i),(h==y||h==x)&&(g[i]=1));}if(d)if((h=s.call(d))==x){if((d-=d%1)>0)for(e="",d>10&&(d=10);e.length<d;e+=" ");}else h==y&&(e=d.length<=10?d:d.slice(0,10));return K("",(i={},i[""]=a,i),f,g,e,"",[])}}if(!f("json-parse")){var L,M,N=h.fromCharCode,O={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},P=function(){throw L=M=null,k()},Q=function(){for(var a,b,c,d,e,f=M,g=f.length;g>L;)switch(e=f.charCodeAt(L)){case 9:case 10:case 13:case 32:L++;break;case 123:case 125:case 91:case 93:case 58:case 44:return a=B?f.charAt(L):f[L],L++,a;case 34:for(a="@",L++;g>L;)if(e=f.charCodeAt(L),32>e)P();else if(92==e)switch(e=f.charCodeAt(++L)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:a+=O[e],L++;break;case 117:for(b=++L,c=L+4;c>L;L++)e=f.charCodeAt(L),e>=48&&57>=e||e>=97&&102>=e||e>=65&&70>=e||P();a+=N("0x"+f.slice(b,L));break;default:P()}else{if(34==e)break;for(e=f.charCodeAt(L),b=L;e>=32&&92!=e&&34!=e;)e=f.charCodeAt(++L);a+=f.slice(b,L)}if(34==f.charCodeAt(L))return L++,a;P();default:if(b=L,45==e&&(d=!0,e=f.charCodeAt(++L)),e>=48&&57>=e){for(48==e&&(e=f.charCodeAt(L+1),e>=48&&57>=e)&&P(),d=!1;g>L&&(e=f.charCodeAt(L),e>=48&&57>=e);L++);if(46==f.charCodeAt(L)){for(c=++L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}if(e=f.charCodeAt(L),101==e||69==e){for(e=f.charCodeAt(++L),(43==e||45==e)&&L++,c=L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}return+f.slice(b,L)}if(d&&P(),"true"==f.slice(L,L+4))return L+=4,!0;if("false"==f.slice(L,L+5))return L+=5,!1;if("null"==f.slice(L,L+4))return L+=4,null;P()}return"$"},R=function(a){var b,c;if("$"==a&&P(),"string"==typeof a){if("@"==(B?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];a=Q(),"]"!=a;c||(c=!0))c&&(","==a?(a=Q(),"]"==a&&P()):P()),","==a&&P(),b.push(R(a));return b}if("{"==a){for(b={};a=Q(),"}"!=a;c||(c=!0))c&&(","==a?(a=Q(),"}"==a&&P()):P()),(","==a||"string"!=typeof a||"@"!=(B?a.charAt(0):a[0])||":"!=Q())&&P(),b[a.slice(1)]=R(Q());return b}P()}return a},S=function(a,b,c){var d=T(a,b,c);d===q?delete a[b]:a[b]=d},T=function(a,b,c){var d,e=a[b];if("object"==typeof e&&e)if(s.call(e)==z)for(d=e.length;d--;)S(e,d,c);else p(e,function(a){S(e,a,c)});return c.call(a,b,e)};d.parse=function(a,b){var c,d;return L=0,M=""+a,c=R(Q()),"$"!=Q()&&P(),L=M=null,b&&s.call(b)==v?T((d={},d[""]=c,d),"",b):c}}}return d.runInContext=a,d}var b="function"==typeof define&&define.amd,c={"function":!0,object:!0},d=c[typeof exports]&&exports&&!exports.nodeType&&exports,e=c[typeof window]&&window||this,f=d&&c[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;if(!f||f.global!==f&&f.window!==f&&f.self!==f||(e=f),d&&!b)a(e,d);else{var g=e.JSON,h=e.JSON3,i=!1,j=a(e,e.JSON3={noConflict:function(){return i||(i=!0,e.JSON=g,e.JSON3=h,g=h=null),j}});e.JSON={parse:j.parse,stringify:j.stringify}}b&&define(function(){return j})}.call(this),function(){var a={};a.appendToHead=function(b){a.getHead().appendChild(b)},a.getHead=function(){return document.head||document.getElementsByTagName("head")[0]},a.getBody=function(){return document.body||document.getElementsByTagName("body")[0]},createjs.DomUtils=a}(),function(){var a={};a.parseXML=function(a,b){var c=null;try{if(window.DOMParser){var d=new DOMParser;c=d.parseFromString(a,b)}}catch(e){}if(!c)try{c=new ActiveXObject("Microsoft.XMLDOM"),c.async=!1,c.loadXML(a)}catch(e){c=null}return c},a.parseJSON=function(a){if(null==a)return null;try{return JSON.parse(a)}catch(b){throw b}},createjs.DataUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function LoadItem(){this.src=null,this.type=null,this.id=null,this.maintainOrder=!1,this.callback=null,this.data=null,this.method=createjs.LoadItem.GET,this.values=null,this.headers=null,this.withCredentials=!1,this.mimeType=null,this.crossOrigin=null,this.loadTimeout=b.LOAD_TIMEOUT_DEFAULT}var a=LoadItem.prototype={},b=LoadItem;b.LOAD_TIMEOUT_DEFAULT=8e3,b.create=function(a){if("string"==typeof a){var c=new LoadItem;return c.src=a,c}if(a instanceof b)return a;if(a instanceof Object&&a.src)return null==a.loadTimeout&&(a.loadTimeout=b.LOAD_TIMEOUT_DEFAULT),a;throw new Error("Type not recognized.")},a.set=function(a){for(var b in a)this[b]=a[b];return this},createjs.LoadItem=b}(),function(){var a={};a.ABSOLUTE_PATT=/^(?:\w+:)?\/{2}/i,a.RELATIVE_PATT=/^[./]*?\//i,a.EXTENSION_PATT=/\/?[^/]+\.(\w{1,5})$/i,a.parseURI=function(b){var c={absolute:!1,relative:!1};if(null==b)return c;var d=b.indexOf("?");d>-1&&(b=b.substr(0,d));var e;return a.ABSOLUTE_PATT.test(b)?c.absolute=!0:a.RELATIVE_PATT.test(b)&&(c.relative=!0),(e=b.match(a.EXTENSION_PATT))&&(c.extension=e[1].toLowerCase()),c},a.formatQueryString=function(a,b){if(null==a)throw new Error("You must specify data.");var c=[];for(var d in a)c.push(d+"="+escape(a[d]));return b&&(c=c.concat(b)),c.join("&")},a.buildPath=function(a,b){if(null==b)return a;var c=[],d=a.indexOf("?");if(-1!=d){var e=a.slice(d+1);c=c.concat(e.split("&"))}return-1!=d?a.slice(0,d)+"?"+this._formatQueryString(b,c):a+"?"+this._formatQueryString(b,c)},a.isCrossDomain=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;var d=""!=b.hostname&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);return d},a.isLocal=function(a){var b=document.createElement("a");return b.href=a.src,""==b.hostname&&"file:"==b.protocol},a.isBinary=function(a){switch(a){case createjs.AbstractLoader.IMAGE:case createjs.AbstractLoader.BINARY:return!0;default:return!1}},a.isImageTag=function(a){return a instanceof HTMLImageElement},a.isAudioTag=function(a){return window.HTMLAudioElement?a instanceof HTMLAudioElement:!1},a.isVideoTag=function(a){return window.HTMLVideoElement?a instanceof HTMLVideoElement:!1},a.isText=function(a){switch(a){case createjs.AbstractLoader.TEXT:case createjs.AbstractLoader.JSON:case createjs.AbstractLoader.MANIFEST:case createjs.AbstractLoader.XML:case createjs.AbstractLoader.CSS:case createjs.AbstractLoader.SVG:case createjs.AbstractLoader.JAVASCRIPT:case createjs.AbstractLoader.SPRITESHEET:return!0;default:return!1}},a.getTypeByExtension=function(a){if(null==a)return createjs.AbstractLoader.TEXT;switch(a.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.AbstractLoader.IMAGE;case"ogg":case"mp3":case"webm":return createjs.AbstractLoader.SOUND;case"mp4":case"webm":case"ts":return createjs.AbstractLoader.VIDEO;case"json":return createjs.AbstractLoader.JSON;case"xml":return createjs.AbstractLoader.XML;case"css":return createjs.AbstractLoader.CSS;case"js":return createjs.AbstractLoader.JAVASCRIPT;case"svg":return createjs.AbstractLoader.SVG;default:return createjs.AbstractLoader.TEXT}},createjs.RequestUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function AbstractLoader(a,b,c){this.EventDispatcher_constructor(),this.loaded=!1,this.canceled=!1,this.progress=0,this.type=c,this.resultFormatter=null,this._item=a?createjs.LoadItem.create(a):null,this._preferXHR=b,this._result=null,this._rawResult=null,this._loadedItems=null,this._tagSrcAttribute=null,this._tag=null}var a=createjs.extend(AbstractLoader,createjs.EventDispatcher),b=AbstractLoader;b.POST="POST",b.GET="GET",b.BINARY="binary",b.CSS="css",b.IMAGE="image",b.JAVASCRIPT="javascript",b.JSON="json",b.JSONP="jsonp",b.MANIFEST="manifest",b.SOUND="sound",b.VIDEO="video",b.SPRITESHEET="spritesheet",b.SVG="svg",b.TEXT="text",b.XML="xml",a.getItem=function(){return this._item},a.getResult=function(a){return a?this._rawResult:this._result},a.getTag=function(){return this._tag},a.setTag=function(a){this._tag=a},a.load=function(){this._createRequest(),this._request.on("complete",this,this),this._request.on("progress",this,this),this._request.on("loadStart",this,this),this._request.on("abort",this,this),this._request.on("timeout",this,this),this._request.on("error",this,this);var a=new createjs.Event("initialize");a.loader=this._request,this.dispatchEvent(a),this._request.load()},a.cancel=function(){this.canceled=!0,this.destroy()},a.destroy=function(){this._request&&(this._request.removeAllEventListeners(),this._request.destroy()),this._request=null,this._item=null,this._rawResult=null,this._result=null,this._loadItems=null,this.removeAllEventListeners()},a.getLoadedItems=function(){return this._loadedItems},a._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.TagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},a._createTag=function(){return null},a._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},a._sendProgress=function(a){if(!this._isCanceled()){var b=null;"number"==typeof a?(this.progress=a,b=new createjs.ProgressEvent(this.progress)):(b=a,this.progress=a.loaded/a.total,b.progress=this.progress,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0)),this.hasEventListener("progress")&&this.dispatchEvent(b)}},a._sendComplete=function(){if(!this._isCanceled()){this.loaded=!0;var a=new createjs.Event("complete");a.rawResult=this._rawResult,null!=this._result&&(a.result=this._result),this.dispatchEvent(a)}},a._sendError=function(a){!this._isCanceled()&&this.hasEventListener("error")&&(null==a&&(a=new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),this.dispatchEvent(a))},a._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1},a.resultFormatter=null,a.handleEvent=function(a){switch(a.type){case"complete":this._rawResult=a.target._response;var b=this.resultFormatter&&this.resultFormatter(this),c=this;b instanceof Function?b(function(a){c._result=a,c._sendComplete()}):(this._result=b||this._rawResult,this._sendComplete());break;case"progress":this._sendProgress(a);break;case"error":this._sendError(a);break;case"loadstart":this._sendLoadStart();break;case"abort":case"timeout":this._isCanceled()||this.dispatchEvent(a.type)}},a.buildPath=function(a,b){return createjs.RequestUtils.buildPath(a,b)},a.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=createjs.promote(AbstractLoader,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function AbstractMediaLoader(a,b,c){this.AbstractLoader_constructor(a,b,c),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src"}var a=createjs.extend(AbstractMediaLoader,createjs.AbstractLoader);a.load=function(){this._tag||(this._tag=this._createTag(this._item.src)),this._tag.preload="auto",this._tag.load(),this.AbstractLoader_load()},a._createTag=function(){},a._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.MediaTagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},a._formatResult=function(a){return this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._preferXHR&&(a.getTag().src=a.getResult(!0)),a.getTag()},createjs.AbstractMediaLoader=createjs.promote(AbstractMediaLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractRequest=function(a){this._item=a},a=createjs.extend(AbstractRequest,createjs.EventDispatcher);a.load=function(){},a.destroy=function(){},a.cancel=function(){},createjs.AbstractRequest=createjs.promote(AbstractRequest,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function TagRequest(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this),this._addedToDOM=!1,this._startTagVisibility=null}var a=createjs.extend(TagRequest,createjs.AbstractRequest);a.load=function(){this._tag.onload=createjs.proxy(this._handleTagComplete,this),this._tag.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this),this._tag.onerror=createjs.proxy(this._handleError,this);var a=new createjs.Event("initialize");a.loader=this._tag,this.dispatchEvent(a),this._hideTag(),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag[this._tagSrcAttribute]=this._item.src,null==this._tag.parentNode&&(window.document.body.appendChild(this._tag),this._addedToDOM=!0)},a.destroy=function(){this._clean(),this._tag=null,this.AbstractRequest_destroy()},a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},a._handleError=function(){this._clean(),this.dispatchEvent("error")},a._handleTagComplete=function(){this._rawResult=this._tag,this._result=this.resultFormatter&&this.resultFormatter(this)||this._rawResult,this._clean(),this._showTag(),this.dispatchEvent("complete")},a._handleTimeout=function(){this._clean(),this.dispatchEvent(new createjs.Event("timeout"))},a._clean=function(){this._tag.onload=null,this._tag.onreadystatechange=null,this._tag.onerror=null,this._addedToDOM&&null!=this._tag.parentNode&&this._tag.parentNode.removeChild(this._tag),clearTimeout(this._loadTimeout)},a._hideTag=function(){this._startTagVisibility=this._tag.style.visibility,this._tag.style.visibility="hidden"},a._showTag=function(){this._tag.style.visibility=this._startTagVisibility},a._handleStalled=function(){},createjs.TagRequest=createjs.promote(TagRequest,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function MediaTagRequest(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this)}var a=createjs.extend(MediaTagRequest,createjs.TagRequest);a.load=function(){var a=createjs.proxy(this._handleStalled,this);this._stalledCallback=a;var b=createjs.proxy(this._handleProgress,this);this._handleProgress=b,this._tag.addEventListener("stalled",a),this._tag.addEventListener("progress",b),this._tag.addEventListener&&this._tag.addEventListener("canplaythrough",this._loadedHandler,!1),this.TagRequest_load()},a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},a._handleStalled=function(){},a._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},a._clean=function(){this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.removeEventListener("stalled",this._stalledCallback),this._tag.removeEventListener("progress",this._progressCallback),this.TagRequest__clean()},createjs.MediaTagRequest=createjs.promote(MediaTagRequest,"TagRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function XHRRequest(a){this.AbstractRequest_constructor(a),this._request=null,this._loadTimeout=null,this._xhrLevel=1,this._response=null,this._rawResponse=null,this._canceled=!1,this._handleLoadStartProxy=createjs.proxy(this._handleLoadStart,this),this._handleProgressProxy=createjs.proxy(this._handleProgress,this),this._handleAbortProxy=createjs.proxy(this._handleAbort,this),this._handleErrorProxy=createjs.proxy(this._handleError,this),this._handleTimeoutProxy=createjs.proxy(this._handleTimeout,this),this._handleLoadProxy=createjs.proxy(this._handleLoad,this),this._handleReadyStateChangeProxy=createjs.proxy(this._handleReadyStateChange,this),!this._createXHR(a)}var a=createjs.extend(XHRRequest,createjs.AbstractRequest);XHRRequest.ACTIVEX_VERSIONS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],a.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response},a.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},a.load=function(){if(null==this._request)return void this._handleError();null!=this._request.addEventListener?(this._request.addEventListener("loadstart",this._handleLoadStartProxy,!1),this._request.addEventListener("progress",this._handleProgressProxy,!1),this._request.addEventListener("abort",this._handleAbortProxy,!1),this._request.addEventListener("error",this._handleErrorProxy,!1),this._request.addEventListener("timeout",this._handleTimeoutProxy,!1),this._request.addEventListener("load",this._handleLoadProxy,!1),this._request.addEventListener("readystatechange",this._handleReadyStateChangeProxy,!1)):(this._request.onloadstart=this._handleLoadStartProxy,this._request.onprogress=this._handleProgressProxy,this._request.onabort=this._handleAbortProxy,this._request.onerror=this._handleErrorProxy,this._request.ontimeout=this._handleTimeoutProxy,this._request.onload=this._handleLoadProxy,this._request.onreadystatechange=this._handleReadyStateChangeProxy),1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout));try{this._item.values&&this._item.method!=createjs.AbstractLoader.GET?this._item.method==createjs.AbstractLoader.POST&&this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)):this._request.send()}catch(a){this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,a))}},a.setResponseType=function(a){"blob"===a&&(a=window.URL?"blob":"arraybuffer",this._responseType=a),this._request.responseType=a},a.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},a.getResponseHeader=function(a){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(a):null},a._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},a._handleLoadStart=function(){clearTimeout(this._loadTimeout),this.dispatchEvent("loadstart")},a._handleAbort=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,a))},a._handleError=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent(a.message))},a._handleReadyStateChange=function(){4==this._request.readyState&&this._handleLoad()},a._handleLoad=function(){if(!this.loaded){this.loaded=!0;var a=this._checkError();if(a)return void this._handleError(a);if(this._response=this._getResponse(),"arraybuffer"===this._responseType)try{this._response=new Blob([this._response])}catch(b){if(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,"TypeError"===b.name&&window.BlobBuilder){var c=new BlobBuilder;c.append(this._response),this._response=c.getBlob()}}this._clean(),this.dispatchEvent(new createjs.Event("complete"))}},a._handleTimeout=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,a))},a._checkError=function(){var a=parseInt(this._request.status);switch(a){case 404:case 0:return new Error(a)}return null},a._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(a){}return null},a._createXHR=function(a){var b=createjs.RequestUtils.isCrossDomain(a),c={},d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest,b&&void 0===d.withCredentials&&window.XDomainRequest&&(d=new XDomainRequest);else{for(var e=0,f=s.ACTIVEX_VERSIONS.length;f>e;e++){var g=s.ACTIVEX_VERSIONS[e];try{d=new ActiveXObject(g);break}catch(h){}}if(null==d)return!1}null==a.mimeType&&createjs.RequestUtils.isText(a.type)&&(a.mimeType="text/plain; charset=utf-8"),a.mimeType&&d.overrideMimeType&&d.overrideMimeType(a.mimeType),this._xhrLevel="string"==typeof d.responseType?2:1;var i=null;if(i=a.method==createjs.AbstractLoader.GET?createjs.RequestUtils.buildPath(a.src,a.values):a.src,d.open(a.method||createjs.AbstractLoader.GET,i,!0),b&&d instanceof XMLHttpRequest&&1==this._xhrLevel&&(c.Origin=location.origin),a.values&&a.method==createjs.AbstractLoader.POST&&(c["Content-Type"]="application/x-www-form-urlencoded"),b||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest"),a.headers)for(var j in a.headers)c[j]=a.headers[j];for(j in c)d.setRequestHeader(j,c[j]);return d instanceof XMLHttpRequest&&void 0!==a.withCredentials&&(d.withCredentials=a.withCredentials),this._request=d,!0},a._clean=function(){clearTimeout(this._loadTimeout),null!=this._request.removeEventListener?(this._request.removeEventListener("loadstart",this._handleLoadStartProxy),this._request.removeEventListener("progress",this._handleProgressProxy),this._request.removeEventListener("abort",this._handleAbortProxy),this._request.removeEventListener("error",this._handleErrorProxy),this._request.removeEventListener("timeout",this._handleTimeoutProxy),this._request.removeEventListener("load",this._handleLoadProxy),this._request.removeEventListener("readystatechange",this._handleReadyStateChangeProxy)):(this._request.onloadstart=null,this._request.onprogress=null,this._request.onabort=null,this._request.onerror=null,this._request.ontimeout=null,this._request.onload=null,this._request.onreadystatechange=null)},a.toString=function(){return"[PreloadJS XHRRequest]"},createjs.XHRRequest=createjs.promote(XHRRequest,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function LoadQueue(a,b,c){this.AbstractLoader_constructor(),this._plugins=[],this._typeCallbacks={},this._extensionCallbacks={},this.next=null,this.maintainScriptOrder=!0,this.stopOnError=!1,this._maxConnections=1,this._availableLoaders=[createjs.ImageLoader,createjs.JavaScriptLoader,createjs.CSSLoader,createjs.JSONLoader,createjs.JSONPLoader,createjs.SoundLoader,createjs.ManifestLoader,createjs.SpriteSheetLoader,createjs.XMLLoader,createjs.SVGLoader,createjs.BinaryLoader,createjs.VideoLoader,createjs.TextLoader],this._defaultLoaderLength=this._availableLoaders.length,this.init(a,b,c)
}var a=createjs.extend(LoadQueue,createjs.AbstractLoader),b=LoadQueue;a.init=function(a,b,c){this.useXHR=!0,this.preferXHR=!0,this._preferXHR=!0,this.setPreferXHR(a),this._paused=!1,this._basePath=b,this._crossOrigin=c,this._loadStartWasDispatched=!1,this._currentlyLoadingScript=null,this._currentLoads=[],this._loadQueue=[],this._loadQueueBackup=[],this._loadItemsById={},this._loadItemsBySrc={},this._loadedResults={},this._loadedRawResults={},this._numItems=0,this._numItemsLoaded=0,this._scriptOrder=[],this._loadedScripts=[],this._lastProgress=0/0},b.loadTimeout=8e3,b.LOAD_TIMEOUT=0,b.BINARY=createjs.AbstractLoader.BINARY,b.CSS=createjs.AbstractLoader.CSS,b.IMAGE=createjs.AbstractLoader.IMAGE,b.JAVASCRIPT=createjs.AbstractLoader.JAVASCRIPT,b.JSON=createjs.AbstractLoader.JSON,b.JSONP=createjs.AbstractLoader.JSONP,b.MANIFEST=createjs.AbstractLoader.MANIFEST,b.SOUND=createjs.AbstractLoader.SOUND,b.VIDEO=createjs.AbstractLoader.VIDEO,b.SVG=createjs.AbstractLoader.SVG,b.TEXT=createjs.AbstractLoader.TEXT,b.XML=createjs.AbstractLoader.XML,b.POST=createjs.AbstractLoader.POST,b.GET=createjs.AbstractLoader.GET,a.registerLoader=function(a){if(!a||!a.canLoadItem)throw new Error("loader is of an incorrect type.");if(-1!=this._availableLoaders.indexOf(a))throw new Error("loader already exists.");this._availableLoaders.unshift(a)},a.unregisterLoader=function(a){var b=this._availableLoaders.indexOf(a);-1!=b&&b<this._defaultLoaderLength-1&&this._availableLoaders.splice(b,1)},a.setUseXHR=function(a){return this.setPreferXHR(a)},a.setPreferXHR=function(a){return this.preferXHR=0!=a&&null!=window.XMLHttpRequest,this.preferXHR},a.removeAll=function(){this.remove()},a.remove=function(a){var b=null;if(!a||a instanceof Array){if(a)b=a;else if(arguments.length>0)return}else b=[a];var c=!1;if(b){for(;b.length;){var d=b.pop(),e=this.getResult(d);for(f=this._loadQueue.length-1;f>=0;f--)if(g=this._loadQueue[f].getItem(),g.id==d||g.src==d){this._loadQueue.splice(f,1)[0].cancel();break}for(f=this._loadQueueBackup.length-1;f>=0;f--)if(g=this._loadQueueBackup[f].getItem(),g.id==d||g.src==d){this._loadQueueBackup.splice(f,1)[0].cancel();break}if(e)this._disposeItem(this.getItem(d));else for(var f=this._currentLoads.length-1;f>=0;f--){var g=this._currentLoads[f].getItem();if(g.id==d||g.src==d){this._currentLoads.splice(f,1)[0].cancel(),c=!0;break}}}c&&this._loadNext()}else{this.close();for(var h in this._loadItemsById)this._disposeItem(this._loadItemsById[h]);this.init(this.preferXHR,this._basePath)}},a.reset=function(){this.close();for(var a in this._loadItemsById)this._disposeItem(this._loadItemsById[a]);for(var b=[],c=0,d=this._loadQueueBackup.length;d>c;c++)b.push(this._loadQueueBackup[c].getItem());this.loadManifest(b,!1)},a.installPlugin=function(a){if(null!=a&&null!=a.getPreloadHandlers){this._plugins.push(a);var b=a.getPreloadHandlers();if(b.scope=a,null!=b.types)for(var c=0,d=b.types.length;d>c;c++)this._typeCallbacks[b.types[c]]=b;if(null!=b.extensions)for(c=0,d=b.extensions.length;d>c;c++)this._extensionCallbacks[b.extensions[c]]=b}},a.setMaxConnections=function(a){this._maxConnections=a,!this._paused&&this._loadQueue.length>0&&this._loadNext()},a.loadFile=function(a,b,c){if(null==a){var d=new createjs.ErrorEvent("PRELOAD_NO_FILE");return void this._sendError(d)}this._addItem(a,null,c),this.setPaused(b!==!1?!1:!0)},a.loadManifest=function(a,c,d){var e=null,f=null;if(a instanceof Array){if(0==a.length){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");return void this._sendError(g)}e=a}else if("string"==typeof a)e=[{src:a,type:b.MANIFEST}];else{if("object"!=typeof a){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");return void this._sendError(g)}if(void 0!==a.src){if(null==a.type)a.type=b.MANIFEST;else if(a.type!=b.MANIFEST){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");this._sendError(g)}e=[a]}else void 0!==a.manifest&&(e=a.manifest,f=a.path)}for(var h=0,i=e.length;i>h;h++)this._addItem(e[h],f,d);this.setPaused(c!==!1?!1:!0)},a.load=function(){this.setPaused(!1)},a.getItem=function(a){return this._loadItemsById[a]||this._loadItemsBySrc[a]},a.getResult=function(a,b){var c=this._loadItemsById[a]||this._loadItemsBySrc[a];if(null==c)return null;var d=c.id;return b&&this._loadedRawResults[d]?this._loadedRawResults[d]:this._loadedResults[d]},a.getItems=function(a){var b=[];for(var c in this._loadItemsById){var d=this._loadItemsById[c],e=this.getResult(c);(a!==!0||null!=e)&&b.push({item:d,result:e,rawResult:this.getResult(c,!0)})}return b},a.setPaused=function(a){this._paused=a,this._paused||this._loadNext()},a.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0,this._loadedScripts.length=0,this.loadStartWasDispatched=!1,this._itemCount=0,this._lastProgress=0/0},a._addItem=function(a,b,c){var d=this._createLoadItem(a,b,c);if(null!=d){var e=this._createLoader(d);null!=e&&("plugins"in e&&(e.plugins=this._plugins),d._loader=e,this._loadQueue.push(e),this._loadQueueBackup.push(e),this._numItems++,this._updateProgress(),(this.maintainScriptOrder&&d.type==createjs.LoadQueue.JAVASCRIPT||d.maintainOrder===!0)&&(this._scriptOrder.push(d),this._loadedScripts.push(null)))}},a._createLoadItem=function(a,b,c){var d=createjs.LoadItem.create(a);if(null==d)return null;var e="",f=c||this._basePath;if(d.src instanceof Object){if(!d.type)return null;if(b){e=b;var g=createjs.RequestUtils.parseURI(b);null==f||g.absolute||g.relative||(e=f+e)}else null!=f&&(e=f)}else{var h=createjs.RequestUtils.parseURI(d.src);h.extension&&(d.ext=h.extension),null==d.type&&(d.type=createjs.RequestUtils.getTypeByExtension(d.ext));var i=d.src;if(!h.absolute&&!h.relative)if(b){e=b;var g=createjs.RequestUtils.parseURI(b);i=b+i,null==f||g.absolute||g.relative||(e=f+e)}else null!=f&&(e=f);d.src=e+d.src}d.path=e,(void 0===d.id||null===d.id||""===d.id)&&(d.id=i);var j=this._typeCallbacks[d.type]||this._extensionCallbacks[d.ext];if(j){var k=j.callback.call(j.scope,d,this);if(k===!1)return null;k===!0||null!=k&&(d._loader=k),h=createjs.RequestUtils.parseURI(d.src),null!=h.extension&&(d.ext=h.extension)}return this._loadItemsById[d.id]=d,this._loadItemsBySrc[d.src]=d,null==d.crossOrigin&&(d.crossOrigin=this._crossOrigin),d},a._createLoader=function(a){if(null!=a._loader)return a._loader;for(var b=this.preferXHR,c=0;c<this._availableLoaders.length;c++){var d=this._availableLoaders[c];if(d&&d.canLoadItem(a))return new d(a,b)}return null},a._loadNext=function(){if(!this._paused){this._loadStartWasDispatched||(this._sendLoadStart(),this._loadStartWasDispatched=!0),this._numItems==this._numItemsLoaded?(this.loaded=!0,this._sendComplete(),this.next&&this.next.load&&this.next.load()):this.loaded=!1;for(var a=0;a<this._loadQueue.length&&!(this._currentLoads.length>=this._maxConnections);a++){var b=this._loadQueue[a];this._canStartLoad(b)&&(this._loadQueue.splice(a,1),a--,this._loadItem(b))}}},a._loadItem=function(a){a.on("fileload",this._handleFileLoad,this),a.on("progress",this._handleProgress,this),a.on("complete",this._handleFileComplete,this),a.on("error",this._handleError,this),a.on("fileerror",this._handleFileError,this),this._currentLoads.push(a),this._sendFileStart(a.getItem()),a.load()},a._handleFileLoad=function(a){a.target=null,this.dispatchEvent(a)},a._handleFileError=function(a){var b=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,a.item);this._sendError(b)},a._handleError=function(a){var b=a.target;this._numItemsLoaded++,this._finishOrderedItem(b,!0),this._updateProgress();var c=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,b.getItem());this._sendError(c),this.stopOnError?this.setPaused(!0):(this._removeLoadItem(b),this._cleanLoadItem(b),this._loadNext())},a._handleFileComplete=function(a){var b=a.target,c=b.getItem(),d=b.getResult();this._loadedResults[c.id]=d;var e=b.getResult(!0);null!=e&&e!==d&&(this._loadedRawResults[c.id]=e),this._saveLoadedItems(b),this._removeLoadItem(b),this._finishOrderedItem(b)||this._processFinishedLoad(c,b),this._cleanLoadItem(b)},a._saveLoadedItems=function(a){var b=a.getLoadedItems();if(null!==b)for(var c=0;c<b.length;c++){var d=b[c].item;this._loadItemsBySrc[d.src]=d,this._loadItemsById[d.id]=d,this._loadedResults[d.id]=b[c].result,this._loadedRawResults[d.id]=b[c].rawResult}},a._finishOrderedItem=function(a,b){var c=a.getItem();if(this.maintainScriptOrder&&c.type==createjs.LoadQueue.JAVASCRIPT||c.maintainOrder){a instanceof createjs.JavaScriptLoader&&(this._currentlyLoadingScript=!1);var d=createjs.indexOf(this._scriptOrder,c);return-1==d?!1:(this._loadedScripts[d]=b===!0?!0:c,this._checkScriptLoadOrder(),!0)}return!1},a._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,b=0;a>b;b++){var c=this._loadedScripts[b];if(null===c)break;if(c!==!0){var d=this._loadedResults[c.id];c.type==createjs.LoadQueue.JAVASCRIPT&&createjs.DomUtils.appendToHead(d);var e=c._loader;this._processFinishedLoad(c,e),this._loadedScripts[b]=!0}}},a._processFinishedLoad=function(a,b){this._numItemsLoaded++,this.maintainScriptOrder||a.type!=createjs.LoadQueue.JAVASCRIPT||createjs.DomUtils.appendToHead(a.result),this._updateProgress(),this._sendFileComplete(a,b),this._loadNext()},a._canStartLoad=function(a){if(!this.maintainScriptOrder||a.preferXHR)return!0;var b=a.getItem();if(b.type!=createjs.LoadQueue.JAVASCRIPT)return!0;if(this._currentlyLoadingScript)return!1;for(var c=this._scriptOrder.indexOf(b),d=0;c>d;){var e=this._loadedScripts[d];if(null==e)return!1;d++}return this._currentlyLoadingScript=!0,!0},a._removeLoadItem=function(a){for(var b=this._currentLoads.length,c=0;b>c;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}},a._cleanLoadItem=function(a){var b=a.getItem();b&&delete b._loader},a._handleProgress=function(a){var b=a.target;this._sendFileProgress(b.getItem(),b.progress),this._updateProgress()},a._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,b=this._numItems-this._numItemsLoaded;if(b>0){for(var c=0,d=0,e=this._currentLoads.length;e>d;d++)c+=this._currentLoads[d].progress;a+=c/b*(b/this._numItems)}this._lastProgress!=a&&(this._sendProgress(a),this._lastProgress=a)},a._disposeItem=function(a){delete this._loadedResults[a.id],delete this._loadedRawResults[a.id],delete this._loadItemsById[a.id],delete this._loadItemsBySrc[a.src]},a._sendFileProgress=function(a,b){if(!this._isCanceled()&&!this._paused&&this.hasEventListener("fileprogress")){var c=new createjs.Event("fileprogress");c.progress=b,c.loaded=b,c.total=1,c.item=a,this.dispatchEvent(c)}},a._sendFileComplete=function(a,b){if(!this._isCanceled()&&!this._paused){var c=new createjs.Event("fileload");c.loader=b,c.item=a,c.result=this._loadedResults[a.id],c.rawResult=this._loadedRawResults[a.id],a.completeHandler&&a.completeHandler(c),this.hasEventListener("fileload")&&this.dispatchEvent(c)}},a._sendFileStart=function(a){var b=new createjs.Event("filestart");b.item=a,this.hasEventListener("filestart")&&this.dispatchEvent(b)},a.toString=function(){return"[PreloadJS LoadQueue]"},createjs.LoadQueue=createjs.promote(LoadQueue,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function TextLoader(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.TEXT)}var a=(createjs.extend(TextLoader,createjs.AbstractLoader),TextLoader);a.canLoadItem=function(a){return a.type==createjs.AbstractLoader.TEXT},createjs.TextLoader=createjs.promote(TextLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function BinaryLoader(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.BINARY),this.on("initialize",this._updateXHR,this)}var a=createjs.extend(BinaryLoader,createjs.AbstractLoader),b=BinaryLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.BINARY},a._updateXHR=function(a){a.loader.setResponseType("arraybuffer")},createjs.BinaryLoader=createjs.promote(BinaryLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function CSSLoader(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.CSS),this.resultFormatter=this._formatResult,this._tagSrcAttribute="href",this._tag=document.createElement(b?"style":"link"),this._tag.rel="stylesheet",this._tag.type="text/css"}var a=createjs.extend(CSSLoader,createjs.AbstractLoader),b=CSSLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.CSS},a._formatResult=function(a){if(this._preferXHR){var b=a.getTag();if(b.styleSheet)b.styleSheet.cssText=a.getResult(!0);else{var c=document.createTextNode(a.getResult(!0));b.appendChild(c)}}else b=this._tag;return createjs.DomUtils.appendToHead(b),b},createjs.CSSLoader=createjs.promote(CSSLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function ImageLoader(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.IMAGE),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",createjs.RequestUtils.isImageTag(a)?this._tag=a:createjs.RequestUtils.isImageTag(a.src)?this._tag=a.src:createjs.RequestUtils.isImageTag(a.tag)&&(this._tag=a.tag),null!=this._tag?this._preferXHR=!1:this._tag=document.createElement("img"),this.on("initialize",this._updateXHR,this)}var a=createjs.extend(ImageLoader,createjs.AbstractLoader),b=ImageLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.IMAGE},a.load=function(){if(""!=this._tag.src&&this._tag.complete)return void this._sendComplete();var a=this._item.crossOrigin;1==a&&(a="Anonymous"),null==a||createjs.RequestUtils.isLocal(this._item.src)||(this._tag.crossOrigin=a),this.AbstractLoader_load()},a._updateXHR=function(a){a.loader.mimeType="text/plain; charset=x-user-defined-binary",a.loader.setResponseType&&a.loader.setResponseType("blob")},a._formatResult=function(a){var b=this;return function(c){var d=b._tag,e=window.URL||window.webkitURL;if(b._preferXHR)if(e){var f=e.createObjectURL(a.getResult(!0));d.src=f,d.onload=function(){e.revokeObjectURL(b.src)}}else d.src=a.getItem().src;else;d.complete?c(d):d.onload=function(){c(this)}}},createjs.ImageLoader=createjs.promote(ImageLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function JavaScriptLoader(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.JAVASCRIPT),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.setTag(document.createElement("script"))}var a=createjs.extend(JavaScriptLoader,createjs.AbstractLoader),b=JavaScriptLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.JAVASCRIPT},a._formatResult=function(a){var b=a.getTag();return this._preferXHR&&(b.text=a.getResult(!0)),b},createjs.JavaScriptLoader=createjs.promote(JavaScriptLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function JSONLoader(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.JSON),this.resultFormatter=this._formatResult}var a=createjs.extend(JSONLoader,createjs.AbstractLoader),b=JSONLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.JSON&&!a._loadAsJSONP},a._formatResult=function(a){var b=null;try{b=createjs.DataUtils.parseJSON(a.getResult(!0))}catch(c){var d=new createjs.ErrorEvent("JSON_FORMAT",null,c);return this._sendError(d),c}return b},createjs.JSONLoader=createjs.promote(JSONLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function JSONPLoader(a){this.AbstractLoader_constructor(a,!1,createjs.AbstractLoader.JSONP),this.setTag(document.createElement("script")),this.getTag().type="text/javascript"}var a=createjs.extend(JSONPLoader,createjs.AbstractLoader),b=JSONPLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.JSONP||a._loadAsJSONP},a.cancel=function(){this.AbstractLoader_cancel(),this._dispose()},a.load=function(){if(null==this._item.callback)throw new Error("callback is required for loading JSONP requests.");if(null!=window[this._item.callback])throw new Error("JSONP callback '"+this._item.callback+"' already exists on window. You need to specify a different callback or re-name the current one.");window[this._item.callback]=createjs.proxy(this._handleLoad,this),window.document.body.appendChild(this._tag),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag.src=this._item.src},a._handleLoad=function(a){this._result=this._rawResult=a,this._sendComplete(),this._dispose()},a._handleTimeout=function(){this._dispose(),this.dispatchEvent(new createjs.ErrorEvent("timeout"))},a._dispose=function(){window.document.body.removeChild(this._tag),delete window[this._item.callback],clearTimeout(this._loadTimeout)},createjs.JSONPLoader=createjs.promote(JSONPLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function ManifestLoader(a){this.AbstractLoader_constructor(a,null,createjs.AbstractLoader.MANIFEST),this.plugins=null,this._manifestQueue=null}var a=createjs.extend(ManifestLoader,createjs.AbstractLoader),b=ManifestLoader;b.MANIFEST_PROGRESS=.25,b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.MANIFEST},a.load=function(){this.AbstractLoader_load()},a._createRequest=function(){var a=this._item.callback;this._request=null!=a?new createjs.JSONPLoader(this._item):new createjs.JSONLoader(this._item)},a.handleEvent=function(a){switch(a.type){case"complete":return this._rawResult=a.target.getResult(!0),this._result=a.target.getResult(),this._sendProgress(b.MANIFEST_PROGRESS),void this._loadManifest(this._result);case"progress":return a.loaded*=b.MANIFEST_PROGRESS,this.progress=a.loaded/a.total,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0),void this._sendProgress(a)}this.AbstractLoader_handleEvent(a)},a.destroy=function(){this.AbstractLoader_destroy(),this._manifestQueue.close()},a._loadManifest=function(a){if(a&&a.manifest){var b=this._manifestQueue=new createjs.LoadQueue;b.on("fileload",this._handleManifestFileLoad,this),b.on("progress",this._handleManifestProgress,this),b.on("complete",this._handleManifestComplete,this,!0),b.on("error",this._handleManifestError,this,!0);for(var c=0,d=this.plugins.length;d>c;c++)b.installPlugin(this.plugins[c]);b.loadManifest(a)}else this._sendComplete()},a._handleManifestFileLoad=function(a){a.target=null,this.dispatchEvent(a)},a._handleManifestComplete=function(){this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},a._handleManifestProgress=function(a){this.progress=a.progress*(1-b.MANIFEST_PROGRESS)+b.MANIFEST_PROGRESS,this._sendProgress(this.progress)},a._handleManifestError=function(a){var b=new createjs.Event("fileerror");b.item=a.data,this.dispatchEvent(b)},createjs.ManifestLoader=createjs.promote(ManifestLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function SoundLoader(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.AbstractLoader.SOUND),createjs.RequestUtils.isAudioTag(a)?this._tag=a:createjs.RequestUtils.isAudioTag(a.src)?this._tag=a:createjs.RequestUtils.isAudioTag(a.tag)&&(this._tag=createjs.RequestUtils.isAudioTag(a)?a:a.src),null!=this._tag&&(this._preferXHR=!1)}var a=createjs.extend(SoundLoader,createjs.AbstractMediaLoader),b=SoundLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SOUND},a._createTag=function(a){var b=document.createElement("audio");return b.autoplay=!1,b.preload="none",b.src=a,b},createjs.SoundLoader=createjs.promote(SoundLoader,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function VideoLoader(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.AbstractLoader.VIDEO),createjs.RequestUtils.isVideoTag(a)||createjs.RequestUtils.isVideoTag(a.src)?(this.setTag(createjs.RequestUtils.isVideoTag(a)?a:a.src),this._preferXHR=!1):this.setTag(this._createTag())}var a=createjs.extend(VideoLoader,createjs.AbstractMediaLoader),b=VideoLoader;a._createTag=function(){return document.createElement("video")},b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.VIDEO},createjs.VideoLoader=createjs.promote(VideoLoader,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function SpriteSheetLoader(a){this.AbstractLoader_constructor(a,null,createjs.AbstractLoader.SPRITESHEET),this._manifestQueue=null}var a=createjs.extend(SpriteSheetLoader,createjs.AbstractLoader),b=SpriteSheetLoader;b.SPRITESHEET_PROGRESS=.25,b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SPRITESHEET},a.destroy=function(){this.AbstractLoader_destroy,this._manifestQueue.close()},a._createRequest=function(){var a=this._item.callback;this._request=null!=a&&a instanceof Function?new createjs.JSONPLoader(this._item):new createjs.JSONLoader(this._item)},a.handleEvent=function(a){switch(a.type){case"complete":return this._rawResult=a.target.getResult(!0),this._result=a.target.getResult(),this._sendProgress(b.SPRITESHEET_PROGRESS),void this._loadManifest(this._result);case"progress":return a.loaded*=b.SPRITESHEET_PROGRESS,this.progress=a.loaded/a.total,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0),void this._sendProgress(a)}this.AbstractLoader_handleEvent(a)},a._loadManifest=function(a){if(a&&a.images){var b=this._manifestQueue=new createjs.LoadQueue;b.on("complete",this._handleManifestComplete,this,!0),b.on("fileload",this._handleManifestFileLoad,this),b.on("progress",this._handleManifestProgress,this),b.on("error",this._handleManifestError,this,!0),b.loadManifest(a.images)}},a._handleManifestFileLoad=function(a){var b=a.result;if(null!=b){var c=this.getResult().images,d=c.indexOf(a.item.src);c[d]=b}},a._handleManifestComplete=function(){this._result=new createjs.SpriteSheet(this._result),this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},a._handleManifestProgress=function(a){this.progress=a.progress*(1-b.SPRITESHEET_PROGRESS)+b.SPRITESHEET_PROGRESS,this._sendProgress(this.progress)},a._handleManifestError=function(a){var b=new createjs.Event("fileerror");b.item=a.data,this.dispatchEvent(b)},createjs.SpriteSheetLoader=createjs.promote(SpriteSheetLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function SVGLoader(a,b){this.AbstractLoader_constructor(a,b,createjs.AbstractLoader.SVG),this.resultFormatter=this._formatResult,this._tagSrcAttribute="data",b?this.setTag(document.createElement("svg")):(this.setTag(document.createElement("object")),this.getTag().type="image/svg+xml")}var a=createjs.extend(SVGLoader,createjs.AbstractLoader),b=SVGLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SVG},a._formatResult=function(a){var b=createjs.DataUtils.parseXML(a.getResult(!0),"text/xml"),c=a.getTag();return!this._preferXHR&&document.body.contains(c)&&document.body.removeChild(c),null!=b.documentElement?(c.appendChild(b.documentElement),c.style.visibility="visible",c):b},createjs.SVGLoader=createjs.promote(SVGLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function XMLLoader(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.XML),this.resultFormatter=this._formatResult}var a=createjs.extend(XMLLoader,createjs.AbstractLoader),b=XMLLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.XML},a._formatResult=function(a){return createjs.DataUtils.parseXML(a.getResult(!0),"text/xml")},createjs.XMLLoader=createjs.promote(XMLLoader,"AbstractLoader")}();//##############################################################################
//
//##############################################################################

/**
 * App entry point class
 */

this.drillEditor = this.drillEditor || {};

(function (){
    "use strict";


    /******************************************* constructor ********************************************/

    function DrillEditorApplication(){

        this.Container_constructor();

        //init model
        this.applicationModel = drillEditor.ApplicationModel.getInstance();


        //dispatcher
        this.eventDispatcher = drillEditor.Dispatcher.getInstance();

        //init presentation controller
        this.presentationController = drillEditor.PresentationController.getInstance();

        //add callback to proxy
        drillEditor.DrillEditorProxy.getDrillDataCallback = getDrillDataCallback;


        //subscribe to dispatcher events
        //window.eventDispatcher.on(ApplicationEvent.SHOW_EDITOR, showEditorHandler, this);
        this.eventDispatcher.on(drillEditor.ApplicationEvent.NEW_DRILL_BUTTON_CLICK, newDrillButtonClickHandler, this);
        this.eventDispatcher.on(drillEditor.ApplicationEvent.SHOW_SCREEN, showScreenHandler, this);
        this.eventDispatcher.on(drillEditor.ApplicationEvent.MAIN_MENU_LOAD_DRILL_CLICK, mainMenuLoadDrillClick, this);
        this.eventDispatcher.on(drillEditor.ApplicationEvent.LOAD_DRILL_BUTTON_CLICK, loadDrillFormLoadButtonClick, this);


        //create and init easeljs stage
        window.stage = new createjs.Stage("appCanvas");

        //proxy touch events(if running on touch device) into mouse events
        createjs.Touch.enable(window.stage);
        window.stage.mouseMoveOutside = true;

        //var supported = createjs.Touch.isSupported();
        //console.log('Touch supported = ',supported);

        //stage will call update() on every tick ie each 1/30 sec
        createjs.Ticker.on("tick", this.onTickHandler);

        window.stage.addChild(this);

        this.loadExternalAssets();

    }

    var p = createjs.extend(DrillEditorApplication, createjs.Container);


    /********************************** event handlers and callbacks *************************************/

    function getDrillDataCallback() {
        var presentationDTO = drillEditor.PresentationController.getInstance().getPresentationDTO();
        return presentationDTO;
    }

    function showScreenHandler(event){
        var screenId = event.payload.screenId;
        var params = event.payload.initParams;
        this.showAppScreen(screenId, params);
    }

    function newDrillButtonClickHandler(event){
       this.presentationController.createEmptyPresentation();
       this.showAppScreen(drillEditor.AppScreen.EDITOR);
    }

    function loadDrillFormLoadButtonClick(event) {
        var drillId = event.payload.drillId;
        //show progress bar form
        this.currentScreen.showForm(drillEditor.ProgressBarForm,{headerText:"Loading you drill..."});

        drillEditor.DrillEditorProxy.getDrillDataById(drillId, getDrillDataSuccess, getDrillDataFailure, this);


        function getDrillDataSuccess(drillDTO){
            this.presentationController.loadPresentation(drillDTO);
            this.showAppScreen(drillEditor.AppScreen.EDITOR);//  scope.currentScreen.removeForm();
        }

        function getDrillDataFailure(){
            this.currentScreen.removeForm();
            //TODO - show error message panel
        }
    }

    function mainMenuLoadDrillClick(event){
        this.currentScreen.showForm(drillEditor.ProgressBarForm,{headerText:"Loading your saved drills..."});
        drillEditor.DrillEditorProxy.getSavedDrills(getSavedDrillsSuccess, getSavedDrillsFailure, this);

        function getSavedDrillsSuccess(drills){
            console.log("Successfully loaded drills");
            drillEditor.ApplicationModel.getInstance().savedDrills = drills;
            this.currentScreen.removeForm();
            this.currentScreen.showForm(drillEditor.LoadDrillView,{
                positiveCallback: null,
                negativeCallback: null,
                callbackScope: this
            });
        }

        function getSavedDrillsFailure(errorMessage){
            console.log("Failed to load drills",errorMessage);
            this.currentScreen.removeForm();
            this.currentScreen.showForm(drillEditor.ErrorDialogForm,{
                errorMessage: errorMessage,
                positiveCallback: null,
                negativeCallback: null,
                callbackScope: this
            });
        }
    }

    p.onTickHandler = function(){
        if(window.stage){
            window.stage.update();
            // console.log("stage update!");
        }
    };

    p.onAssetLoadComplete = function(evt){
        this.applicationModel.assetsLoaded = true;
        console.log('Application assets loaded!');

        if(drillEditor.DrillEditorProxy.drillStartupData){
            this.applicationModel.appMode = drillEditor.ApplicationModel.EDIT_DRILL_APP_MODE;
            drillEditor.PresentationController.getInstance().loadPresentation(drillEditor.DrillEditorProxy.drillStartupData);
            this.showAppScreen(drillEditor.AppScreen.EDITOR);
        } else {
            this.applicationModel.appMode = drillEditor.ApplicationModel.NEW_DRILL_APP_MODE;
            this.showAppScreen(drillEditor.AppScreen.MAIN_MENU);
        }

    };

    p.onAssetLoadFailure = function(evt){
        this.applicationModel.assetsLoaded = false;
        console.log('Failed to load application assets!');
    };
    /**************************************** public function ******************************************/

    p.showAppScreen = function(screenID, initParams){
        //get screen init params if available
        var screenClass;

        // 1. remove prev screen and dispose it
        if(this.currentScreen && this.currentScreen.stage){
            this.currentScreen.destroy();
            this.removeChild(this.currentScreen);
        }

        // 2. define class for the new screen
        switch(screenID){
            case drillEditor.AppScreen.MAIN_MENU:
                screenClass = drillEditor.MainMenuScreen;
                break;

            case drillEditor.AppScreen.EDITOR:
                screenClass = drillEditor.Editor;
                break;
        }

        // 3. instantiate new screen and add it to display list
        if(!screenClass){
            console.error("Error: cant create a new app screen as screenClass in undefined!");
            return;
        }


        this.currentScreen = initParams ? new screenClass(initParams) : new screenClass();
        this.addChild(this.currentScreen);
    };

    p.loadExternalAssets = function(){
        //load all external files required by app
        var manifest = [
            {id:"main-menu-background", src:"img/background_2_800_600.jpg", type:createjs.AbstractLoader.IMAGE},
            {id:"rotation-icon", src:"img/rotating22.png", type:createjs.AbstractLoader.IMAGE},
            {id:"soccer-ball-icon", src:"img/soccer-ball-icon-32.png", type:createjs.AbstractLoader.IMAGE},
            {id:"ball-supply-icon", src:"img/ball-supply-icon-26.png", type:createjs.AbstractLoader.IMAGE},
            {id:"goal-component-icon", src:"img/goal_65_47.png", type:createjs.AbstractLoader.IMAGE}
        ];

        DrillEditorApplication.loadQueue = new createjs.LoadQueue(false, null, true);
        DrillEditorApplication.loadQueue.on("complete", this.onAssetLoadComplete, this);
        DrillEditorApplication.loadQueue.on("error", this.onAssetLoadFailure, this);
        DrillEditorApplication.loadQueue.loadManifest(manifest);
    };


    /**************************************** public static properties ************************************************/
    DrillEditorApplication.loadQueue = null;

    /********************************************** static methods ****************************************************/

    drillEditor.DrillEditorApplication = createjs.promote(DrillEditorApplication, "Container");

}());
//##############################################################################
// ApplicationEvent
//##############################################################################

/**
 * ApplicationEvent
 */

this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    ApplicationEvent.SHOW_SCREEN = "show_screen";
    ApplicationEvent.HIDE_CURRENT_FORM = "hide_current_form";
    ApplicationEvent.ELEMENT_SELECTED = "element_selected";
    ApplicationEvent.ELEMENT_DESELECTED = "element_deselected";
    ApplicationEvent.ELEMENT_POSITION_CHANGED = "element_position_changed";
    ApplicationEvent.ELEMENT_MOVE = "element_move";
    ApplicationEvent.ELEMENT_RESIZE = "element_resize";
    ApplicationEvent.ELEMENT_ROTATION_CHANGED = "element_rotation_changed";
    ApplicationEvent.GRAPHIC_PROPERTY_CHANGED = "item_model_property_changed";
    ApplicationEvent.NEW_DRILL_BUTTON_CLICK = "new_drill_button_click_event";
    ApplicationEvent.LOAD_DRILL_BUTTON_CLICK = "load_drill_button_click_event";
    ApplicationEvent.PITCH_VIEW_CREATED = "pitch_view_created";
    ApplicationEvent.MAIN_MENU_LOAD_DRILL_CLICK = "main_menu_load_drill_click";


    //Each instance of this event will have an associated payload object
    ApplicationEvent.prototype.payload = null;


    // constructor
    function ApplicationEvent(type, payload, bubbles, cancelable){
        this.Event_constructor(type, bubbles, cancelable);

        if(payload == null || payload == undefined){
            payload = {};
        }
        this.payload = payload;

    }

    var p = createjs.extend(ApplicationEvent, createjs.Event);

    drillEditor.ApplicationEvent = createjs.promote(ApplicationEvent, "Event");

}());
//##############################################################################
// PresentationViewEvent
//##############################################################################

/**
 * drillEditor.PresentationViewEvent
 */

this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    PresentationViewEvent.CREATE_RECTANGLE_CLICK = "create_rectangle_click";
    PresentationViewEvent.CREATE_SQUARE_CLICK = "create_square_click";
    PresentationViewEvent.CREATE_ATTACKER_CLICK = "create_attacker_click";
    PresentationViewEvent.CREATE_DEFENDER_CLICK = "create_defender_click";
    PresentationViewEvent.CREATE_EXTRA_TEAM_CLICK = "create_extra_team_click";
    PresentationViewEvent.CREATE_NEUTRAL_PLAYER_CLICK = "create_target_click";
    PresentationViewEvent.CREATE_CONE_CLICK = "create_cone_click";
    PresentationViewEvent.CREATE_DRIBBLING_CLICK = "create_dribbling_click";
    PresentationViewEvent.CREATE_PLAYER_PATH_CLICK = "create_player_path_click";
    PresentationViewEvent.CREATE_BALL_PATH_CLICK = "create_ball_path_click";
    PresentationViewEvent.CREATE_BALL_CLICK = "create_ball_click";
    PresentationViewEvent.CREATE_BALLS_SUPPLY_CLICK = "create_balls_supply_click";
    PresentationViewEvent.CREATE_ARC_CLICK = "create_arc_click";
    PresentationViewEvent.CREATE_GOAL_CLICK = "create_goal_click";
    PresentationViewEvent.COPY_ELEMENT_BUTTON_CLICK = "copy_element_button_click";
    PresentationViewEvent.PASTE_ELEMENT_BUTTON_CLICK = "paste_element_button_click";
    PresentationViewEvent.ELEMENT_COPIED_TO_CLIPBOARD = "element_copied_to_clipboard";
    PresentationViewEvent.DELETE_ELEMENT = "delete_element";
    PresentationViewEvent.SWAP_DIRECTIONS_BUTTON_CLICK = "swap_directions_button_click";
    PresentationViewEvent.BACK_BUTTON_CLICK = "back_button_click";


    //Each instance of this event will have an associated payload object
    PresentationViewEvent.prototype.payload = null;


    // constructor
    function PresentationViewEvent(type, payload, bubbles, cancelable){
        this.Event_constructor(type, bubbles, cancelable);

        if(payload == null || payload == undefined){
            payload = {};
        }
        this.payload = payload;

    }

    var p = createjs.extend(PresentationViewEvent, createjs.Event);

    drillEditor.PresentationViewEvent = createjs.promote(PresentationViewEvent, "Event");

}());
//##############################################################################
//
//##############################################################################

/**
 * StringUtils
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    /**
     * Returns string representation of a number in a 2 digits format
     * @param	value
     * @return
     */
    StringUtils.convert22DigitsFormat = function(value){
        if (value < 10) {
            return "0" + value.toString();
        }
        return value.toString();
    };

    //constructor
    function StringUtils(){

    }

    /**
     * Turns milliseconds into a formatted string
     * @param milliseconds
     * @param format
     * @param omitZeroHrs
     * @returns {string}
     */
    StringUtils.formatTime = function(milliseconds, format, omitZeroHrs){
        //console.warn("drillEditor.StringUtils.formatTime:",milliseconds);
        var result = "",
            delimiter = ":",
            timeFormat = format ? format : "hh:mm:ss",
            hrs,
            min,
            sec;
        hrs = Math.floor(milliseconds/3600000);
        min = Math.floor((milliseconds - hrs*3600000)/60000);
        sec = Math.floor((milliseconds - hrs*3600000 - min*60000)/1000);

        if(!omitZeroHrs){
            result += String(hrs) + delimiter;
        }

        if(format=="hh:mm"){
            result += StringUtils.convert22DigitsFormat(min);
        } else { // use default hh:mm:ss format
            result += StringUtils.convert22DigitsFormat(min) + delimiter + StringUtils.convert22DigitsFormat(sec);
        }

        return result;
    };

    drillEditor.StringUtils = StringUtils;

}());//##############################################################################
// DrawingUtils
//##############################################################################

/**
 * Class drillEditor.DrawingUtils
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    //constructor
    function DrawingUtils() {

    }

    DrawingUtils.drawStrictSizeRectangle = function(graphics, rectX, rectY ,resultedWidth, resultedHeight, lineSize, lineColor, lineAlpha, fillColor, fillAlpha){
        var rectStartX  = rectX + lineSize / 2;
        var rectStartY = rectY + lineSize / 2;
        var rectWidth = resultedWidth - lineSize;
        var rectHeight = resultedHeight - lineSize;
        var cornerRadius = 25;

        //trace("rectX=", rectStartX, "w=", rectWidth);

        graphics.clear();

        if (lineSize)
        {
            graphics.setStrokeStyle(lineSize);
            graphics.beginStroke(lineColor);
        }

        if (fillAlpha)
        {
            //graphics.beginFill(fillColor, fillAlpha);
            graphics.beginFill(fillColor);
        }

        if (lineSize || fillAlpha)
        {
            //graphics.drawRoundRectComplex(rectStartX, rectStartY, rectWidth, rectHeight, cornerRadius, cornerRadius, cornerRadius, cornerRadius);
            graphics.drawRect(rectStartX, rectStartY, rectWidth, rectHeight);

        }
        graphics.endFill();
    };

    drillEditor.DrawingUtils = DrawingUtils;

}());//##############################################################################
// Clipboard
//##############################################################################

/**
 * Class Clipboard
 * Created by maxim_000 on 10/2/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    //static variable
    Clipboard.instance = null;

    //constructor
    function Clipboard() {
       if(Clipboard.instance){
           throw new Error("Only one instance of Clipboard is allowed!");
       }
    }

    //public static method
    Clipboard.getInstance = function(){
         if(!Clipboard.instance){
             Clipboard.instance = new Clipboard();
         }
        return Clipboard.instance;
    };

    Clipboard.data = null;


    drillEditor.Clipboard = Clipboard;

}());//##############################################################################
// MathUtils
//##############################################################################

/**
 * Class drillEditor.MathUtils
 * Created by maxim_000 on 10/6/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/


    /******************* static variables *******************/


    /********************** constructor *********************/
    function MathUtils() {
        //invoke constructor of superclass
        //this.SuperClass_constructor();
    }

    //extend this class from a superclass
    //var p = createjs.extend(MathUtils,SuperClass);

    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/
    MathUtils.getAngleBetween2Points = function(point1, point2){
        var angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
        return angle;
    };

    MathUtils.getDistanceBetween2Points = function(point1, point2){
        var distance = Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y),2))
        return distance;
    };

    MathUtils.compareNumeric = function(a,b){
        if(a>b){
            return 1;
        }

        if(a<b){
            return -1;
        }

        return 0;
    };


    drillEditor.MathUtils = MathUtils;

}());//##############################################################################
// DTOUtils
//##############################################################################

/**
 * Class DTOUtils
 * Created by maxim_000 on 10/14/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/


    /******************* static variables *******************/

    /********************** constructor *********************/
    function DTOUtils() {
        //invoke constructor of superclass
        //this.SuperClass_constructor();
    }

    //extend this class from a superclass
    //var p = createjs.extend(DTOUtils,SuperClass);

    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/

    DTOUtils.presentationDTOToVO = function(presentationDTO){
        var presentation = new drillEditor.Presentation(presentationDTO.id);
        presentation.pitchWidth = presentationDTO.pitchWidth;
        presentation.pitchHeight = presentationDTO.pitchHeight;
        presentation.elements = [];

        for(var i=0; i<presentationDTO.elements.length; i++){
            var elementDTO = presentationDTO.elements[i];
            var elementVO = DTOUtils.elementDTOToVO(elementDTO);
            presentation.elements.push(elementVO);
        }

        return presentation;
    };

    DTOUtils.elementDTOToVO = function(elementDTO){
        var elementVO;
        var elementPosition = new createjs.Point(elementDTO.position.x, elementDTO.position.y);

        switch (elementDTO.type){
            case drillEditor.GraphicElementType.RECTANGLE:
                elementVO = new drillEditor.RectVO(elementDTO.id, elementPosition, elementDTO.width, elementDTO.height);
                break;

            case drillEditor.GraphicElementType.SQUARE:
                elementVO = new drillEditor.SquareVO(elementDTO.id, elementPosition, elementDTO.width, elementDTO.height);
                break;

            case drillEditor.GraphicElementType.ATTACKER:
                elementVO = new drillEditor.AttackerVO(elementDTO.id, elementPosition, elementDTO.width/2);
                elementVO.fillColor = elementDTO.fillColor;
                break;

            case drillEditor.GraphicElementType.DEFENDER:
                elementVO = new drillEditor.DefenderVO(elementDTO.id, elementPosition, elementDTO.width/2);
                elementVO.fillColor = elementDTO.fillColor;
                break;

            case drillEditor.GraphicElementType.EXTRA_TEAM:
                elementVO = new drillEditor.ExtraTeamVO(elementDTO.id, elementPosition, elementDTO.width/2);
                elementVO.fillColor = elementDTO.fillColor;
                break;

            case drillEditor.GraphicElementType.NEUTRAL_PLAYER:
                elementVO = new drillEditor.NeutralVO(elementDTO.id, elementPosition, elementDTO.width/2);
                elementVO.fillColor = elementDTO.fillColor;
                break;

            case drillEditor.GraphicElementType.CONE:
                elementVO = new drillEditor.ConeVO(elementDTO.id, elementPosition, elementDTO.width, elementDTO.height);
                elementVO.fillColor = elementDTO.fillColor;
                break;

            case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                elementVO = new drillEditor.ArchedArrowVO(elementDTO.id, elementPosition,
                    elementDTO.width, elementDTO.height,
                    elementDTO.arrowDirection, elementDTO.rotation);
                break;

            case drillEditor.GraphicElementType.GOAL:
                    elementVO = new drillEditor.GoalVO(elementDTO.id, elementPosition, elementDTO.width, elementDTO.height, elementDTO.rotation);
                break;

            case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
                var startPointCloned = new createjs.Point(elementDTO.startPoint.x, elementDTO.startPoint.y);
                var endPointCloned = new createjs.Point(elementDTO.endPoint.x, elementDTO.endPoint.y);
                elementVO = new drillEditor.DribblingLineVO(elementDTO.id, startPointCloned, endPointCloned, elementDTO.arrowDirection);
                break;

            case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
                var startPointCloned = new createjs.Point(elementDTO.startPoint.x, elementDTO.startPoint.y);
                var endPointCloned = new createjs.Point(elementDTO.endPoint.x, elementDTO.endPoint.y);
                elementVO = new drillEditor.PlayerMovementVO(elementDTO.id, startPointCloned, endPointCloned, elementDTO.arrowDirection);
                break;

            case drillEditor.GraphicElementType.BALL_MOVEMENT:
                var startPointCloned = new createjs.Point(elementDTO.startPoint.x, elementDTO.startPoint.y);
                var endPointCloned = new createjs.Point(elementDTO.endPoint.x, elementDTO.endPoint.y);
                elementVO = new drillEditor.BallMovementVO(elementDTO.id, startPointCloned, endPointCloned, elementDTO.arrowDirection);
                break;

            case drillEditor.GraphicElementType.BALL:
                elementVO = new drillEditor.BallVO(elementDTO.id, elementPosition);
                break;

            case drillEditor.GraphicElementType.BALLS_SUPPLY:
                elementVO = new drillEditor.BallSupplyVO(elementDTO.id, elementPosition);
                break;
        }

        if(elementVO){
            elementVO.id = elementDTO.id;
            elementVO.position = new createjs.Point(elementVO.position.x, elementVO.position.y)
        }

        return elementVO;
    };


    DTOUtils.presentationToDTO = function(presentation){
        var presentationDTO = {};
        presentationDTO.drillId = presentation.id;
        presentationDTO.pitchWidth = presentation.pitchWidth;
        presentationDTO.pitchHeight = presentation.pitchHeight;
        presentationDTO.playersCount = 0;
        presentationDTO.equipmentRequired = {cones:0, balls:0, ballSupply:0};
        presentationDTO.activitiesRequired = {playerDribbling:0, playerMovement:0,  ballMovement:0 };
        presentationDTO.elements = [];

        for(var i=0; i<presentation.elements.length; i++){
            var elementVO = presentation.elements[i];
            var elementDTO = DTOUtils.elementVOToDTO(elementVO);
            presentationDTO.elements.push(elementDTO);

            if(elementVO.isPlayer==true){
                presentationDTO.playersCount +=1 ;
            }else if(elementVO.isEquipment==true){
                switch (elementVO.type){
                    case drillEditor.GraphicElementType.CONE:
                            presentationDTO.equipmentRequired.cones +=1;
                        break;

                    case drillEditor.GraphicElementType.BALL:
                            presentationDTO.equipmentRequired.balls +=1;
                        break;

                    case drillEditor.GraphicElementType.BALLS_SUPPLY:
                            presentationDTO.equipmentRequired.ballSupply +=1;
                        break
                }
            }else if(elementVO.isActivity==true){
                switch(elementVO.type){
                    case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
                    case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                            presentationDTO.activitiesRequired.playerMovement +=1;
                        break;

                    case drillEditor.GraphicElementType.BALL_MOVEMENT:
                            presentationDTO.activitiesRequired.ballMovement +=1;
                        break;
                    case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
                            presentationDTO.activitiesRequired.playerDribbling +=1;
                        break;
                }
            }
        }

        return presentationDTO;
    };
    
    DTOUtils.elementVOToDTO = function(elementVO){
        var result = {};

        result.id = elementVO.id;
        result.type = elementVO.type;

        result.position = {x: elementVO.position.x, y:elementVO.position.y};


        switch (elementVO.type){
            case drillEditor.GraphicElementType.ATTACKER:
            case drillEditor.GraphicElementType.DEFENDER:
            case drillEditor.GraphicElementType.EXTRA_TEAM:
            case drillEditor.GraphicElementType.NEUTRAL_PLAYER:
            case drillEditor.GraphicElementType.CONE:
                    result.width = elementVO.width;
                    result.height = elementVO.height;
                    result.fillColor = elementVO.fillColor;
                break;

            case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                    result.width = elementVO.width;
                    result.height = elementVO.height;
                    result.arrowDirection =  elementVO.arrowDirection;
                    result.rotation = elementVO.rotation;
                break;

            case drillEditor.GraphicElementType.GOAL:
                result.width = elementVO.width;
                result.height = elementVO.height;
                result.rotation = elementVO.rotation;
                break;

            case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
            case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
            case drillEditor.GraphicElementType.BALL_MOVEMENT:
                result.startPoint = {x:elementVO.startPoint.x, y:elementVO.startPoint.y};
                result.endPoint = {x:elementVO.endPoint.x, y:elementVO.endPoint.y};
                result.arrowDirection = elementVO.arrowDirection;


        }

        return result;
    };



    drillEditor.DTOUtils = DTOUtils;

}());//##############################################################################
// CanvasUtils
//##############################################################################

/**
 * Class CanvasUtils
 * Created by maxim_000 on 10/16/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/


    /******************* static variables *******************/


    /********************** constructor *********************/
    function CanvasUtils() {

    }


    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/


    CanvasUtils.getCanvasSegmentData = function(sourceCanvas, sx, sy, width, height){
        var newCanvas = document.createElement("canvas");
        newCanvas.id = "temp_canvas";
        newCanvas.width = width;
        newCanvas.height = height;
        newCanvas.getContext("2d").drawImage(sourceCanvas, sx, sy, width, height, 0, 0, width, height);
        var imageData = newCanvas.toDataURL("image/png");

        $(newCanvas).remove();
        newCanvas = null;

        return imageData;
    };

    drillEditor.CanvasUtils = CanvasUtils;

}());//##############################################################################
//
//##############################################################################

/**
 * AppScreen
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables

    AppScreen.prototype.form = null;  //reference to the form that is currently on the screen

    //static variable
    AppScreen.MAIN_MENU = "main_menu";
    AppScreen.EDITOR = "editor";


    //constructor
    function AppScreen(){
        // call constructor of the superclass
        this.Container_constructor();

        this.onHideFormListener = drillEditor.Dispatcher.getInstance().on(drillEditor.ApplicationEvent.HIDE_CURRENT_FORM, hideCurrentFormHandler, this);


    }

    var p = createjs.extend(AppScreen, createjs.Container);

    // public functions
    /**
     * Destroys this instance of AppScreen.
     * All interactivity & other processes should be disabled here
     */
    p.destroy = function () {
        drillEditor.Dispatcher.getInstance().off(drillEditor.ApplicationEvent.HIDE_CURRENT_FORM, this.onHideFormListener);
        this.onHideFormListener=null;
        removeCurrentForm(this);

    };

    AppScreen.prototype.showForm = function (formClass, initParams){
        showForm(this, formClass, initParams);
    };

    AppScreen.prototype.removeForm = function(){
        removeCurrentForm(this);
    };


    //private functions

    function hideCurrentFormHandler(applicationEvent){
        removeCurrentForm(this);
    }

    function removeCurrentForm(thisScope) {
        if(thisScope.form){
            thisScope.form.destroy();
            if(thisScope.contains(thisScope.form)){
                thisScope.removeChild(thisScope.form);
            }
        }
        thisScope.form = null;
    }

    function showForm(scope, formClass, initParams){
        //1. remove an exitsting form if present
        removeCurrentForm(scope);
        //2.create instance of form object
        scope.form = new formClass(initParams);
        //3. add new form to the top of DL
        scope.addChild(scope.form);
    }


    drillEditor.AppScreen = createjs.promote(AppScreen, "Container");

}());//##############################################################################
//
//##############################################################################

/**
 * MainMenuScreen
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    MainMenuScreen.prototype.backgroundImage = null;
    MainMenuScreen.prototype.loadQueue = null;
    MainMenuScreen.prototype.topText = null;
    MainMenuScreen.prototype.mainMenuText = null;
    MainMenuScreen.prototype.copyrighAndVersionText = null;
    MainMenuScreen.prototype.newDrillButton = null;
    MainMenuScreen.prototype.loadDrillButton = null;

    //constructor
    function MainMenuScreen(){
        // call constructor of the superclass
        this.AppScreen_constructor();

        this.constructScreenUI();
    }

    //create inheritance
    var p = createjs.extend(MainMenuScreen, drillEditor.AppScreen);

    p.constructScreenUI = function(){

        //display background
        this.backgroundImage = new createjs.Bitmap(drillEditor.DrillEditorApplication.loadQueue.getResult("main-menu-background"));
        this.addChild(this.backgroundImage);

        //create header text
        this.topText = new createjs.Text("A place for app or corporate logo","35px Arial","#FFFFFF");
        this.topText.x = drillEditor.ApplicationModel.APP_WIDTH/2 - this.topText.getBounds().width/2;
        this.topText.y = 10;
        this.addChild(this.topText);

        this.mainMenuText = new createjs.Text("Main menu","30px Arial","#FFFFFF");
        this.mainMenuText.x = drillEditor.ApplicationModel.APP_WIDTH/2 - this.mainMenuText.getBounds().width/2;
        this.mainMenuText.y = 260 - 50;
        this.addChild(this.mainMenuText);

        this.copyrighAndVersionText = new createjs.Text("Copyright information. Version " + drillEditor.ApplicationModel.VERSION,"14px Arial","#FFFFFF");
        this.copyrighAndVersionText.x = drillEditor.ApplicationModel.APP_WIDTH - this.copyrighAndVersionText.getBounds().width - 10;
        this.copyrighAndVersionText.y = drillEditor.ApplicationModel.APP_HEIGHT - 30;
        this.addChild(this.copyrighAndVersionText);

        //display menu buttons
        this.newDrillButton = new drillEditor.SimpleTextButton("New drill","25px Arial", "#000000", "#FFFFFF","#999999","#0000FF", 150, 45);
        this.newDrillButton.x = drillEditor.ApplicationModel.APP_WIDTH/2 - 150/2;
        this.newDrillButton.y = 260;
        this.newDrillButton.addEventListener("click", newDrillClickHandler);
        this.addChild(this.newDrillButton);

        this.loadDrillButton = new drillEditor.SimpleTextButton("Load drill","25px Arial", "#000000", "#FFFFFF","#999999","#0000FF", 150, 45);
        this.loadDrillButton.x = drillEditor.ApplicationModel.APP_WIDTH/2 - 150/2;
        this.loadDrillButton.y = this.newDrillButton.y + 60;
        this.loadDrillClickHandler = this.loadDrillButton.on("click", loadDrillClickHandler, this);
        this.addChild(this.loadDrillButton);

    };

    /**************************************** event handlers **********************************************/

    function newDrillClickHandler(evt){
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.NEW_DRILL_BUTTON_CLICK));
    }

    function loadDrillClickHandler(){
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.MAIN_MENU_LOAD_DRILL_CLICK));

    }


    /**************************** Overridden methods **************************/
    /**
     * Destroys this instance of MainMenuScreen.
     * All interactivity & other processes should be disabled here
     */
    p.destroy = function(){
        this.AppScreen_destroy();

        //unsubscribe listeners
        this.newDrillButton.removeAllEventListeners();
        this.newDrillButton.destroy();

        this.loadDrillButton.removeAllEventListeners();
        this.loadDrillButton.off("click", this.loadDrillClickHandler);
        this.loadDrillButton.destroy();

        console.log("MainMenuScreen.destroy()");
    };


    drillEditor.MainMenuScreen = createjs.promote(MainMenuScreen, "AppScreen");

}());//##############################################################################
//
//##############################################################################

/**
 * Class Editor
 * Created by maxim_000 on 9/14/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    Editor.prototype.backgroundShape = null;
    Editor.prototype.exitButton = null;
    Editor.prototype.presentation = null;
    Editor.prototype.toolBarBounds = null;
    Editor.prototype.componentsPalleteBounds = null;
    Editor.prototype.pitchBounds = null;
    Editor.prototype.pitchOutline = null;
    Editor.prototype.pitch = null;
    Editor.prototype.toolsPanel = null;
    Editor.prototype.componentsPallete = null;
    Editor.prototype.presentationController = null;
    Editor.prototype.pitchDisplayWidth = 0;
    Editor.prototype.pitchDisplayHeight = 0;


    Editor.UI_CONTROLS_MARGIN = 10;

    //constructor
    function Editor() {
        // call constructor of the superclass
        this.AppScreen_constructor();

        //initialize code
        this.initialize();

    }

    //create inheritance
    var p = createjs.extend(Editor, drillEditor.AppScreen);


    p.initialize = function(){
        this.presentationController = drillEditor.PresentationController.getInstance();

        //create bg
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.beginLinearGradientFill(["#1E5799", "#7db9e8"],[0,1],0,0,0,drillEditor.ApplicationModel.APP_HEIGHT).drawRect(0, 0, drillEditor.ApplicationModel.APP_WIDTH, drillEditor.ApplicationModel.APP_HEIGHT);
        this.addChild(this.backgroundShape);

        if(!this.presentationController.componentsPallete){
          //calculate toolbar bounds
          this.presentationController.componentsPalleteBounds = new createjs.Rectangle(drillEditor.ApplicationModel.APP_WIDTH - drillEditor.ComponentsPallete.PANEL_STD_WIDTH - Editor.UI_CONTROLS_MARGIN,
              Editor.UI_CONTROLS_MARGIN,
              drillEditor.ComponentsPallete.PANEL_STD_WIDTH,
              drillEditor.ApplicationModel.APP_HEIGHT - Editor.UI_CONTROLS_MARGIN*2);
          this.presentationController.componentsPallete = new drillEditor.ComponentsPallete(this.presentationController.componentsPalleteBounds.width, this.presentationController.componentsPalleteBounds.height);
          this.presentationController.componentsPallete.x = this.presentationController.componentsPalleteBounds.x;
          this.presentationController.componentsPallete.y = this.presentationController.componentsPalleteBounds.y;
          console.warn("components pallete created");
        }
        this.componentsPallete = this.presentationController.componentsPallete;
        this.addChild(this.componentsPallete);

        if(!this.presentationController.toolsPanel){
              this.presentationController.toolBarBounds = new createjs.Rectangle(Editor.UI_CONTROLS_MARGIN,
              Editor.UI_CONTROLS_MARGIN,
              drillEditor.ApplicationModel.APP_WIDTH - 3*Editor.UI_CONTROLS_MARGIN - drillEditor.ComponentsPallete.PANEL_STD_WIDTH,
              drillEditor.ToolsPanel.PANEL_STD_HEIGHT);

              this.presentationController.toolsPanel = new drillEditor.ToolsPanel(this.presentationController.toolBarBounds.width, this.presentationController.toolBarBounds.height);
              this.presentationController.toolsPanel.x = this.presentationController.toolBarBounds.x;
              this.presentationController.toolsPanel.y = this.presentationController.toolBarBounds.y;
              console.warn("tools panel created");
        }
        this.toolsPanel = this.presentationController.toolsPanel;
        this.addChild(this.toolsPanel);

        //calculate size of pitch viewport area
        this.pitchViewportBounds = new createjs.Rectangle(Editor.UI_CONTROLS_MARGIN,
            this.presentationController.toolBarBounds.y + this.presentationController.toolBarBounds.height + Editor.UI_CONTROLS_MARGIN,
            drillEditor.ApplicationModel.APP_WIDTH - 3*Editor.UI_CONTROLS_MARGIN - drillEditor.ComponentsPallete.PANEL_STD_WIDTH,
            drillEditor.ApplicationModel.APP_HEIGHT - 3*Editor.UI_CONTROLS_MARGIN - drillEditor.ToolsPanel.PANEL_STD_HEIGHT);

        this.pitch = new drillEditor.Pitch();
        this.addChild(this.pitch);

        drillEditor.PresentationController.getInstance().setView(this.pitch);

        //draw pitch outline
        this.pitchOutline = new createjs.Shape();
        this.pitchOutline.graphics.clear();
        this.pitchOutline.graphics.setStrokeStyle(1);
        this.pitchOutline.graphics.beginStroke("#FFFFFF").drawRect(0, 0, this.pitchViewportBounds.width, this.pitchViewportBounds.height);
        this.pitchOutline.x = this.pitchViewportBounds.x;
        this.pitchOutline.y = this.pitchViewportBounds.y;
        this.pitchOutline.visible = false;
        this.addChild(this.pitchOutline);



        if(!this.presentationController.presentation.pitchWidth || !this.presentationController.presentation.pitchHeight){
            this.showForm(drillEditor.PitchSizeInputFormHTML,{
                positiveCallback:this.sizeInputPositiveCallback,
                negativeCallback:this.sizeInputNegativeCallback,
                callbackScope: this
            });
        } else {
            //visualize presentation data
            this.createPitchView();
        }

    };

    //called when user hits proceed button on size input form
    p.sizeInputPositiveCallback = function(w,h){
        this.removeForm();
        this.presentationController.presentation.pitchWidth =  w;
        this.presentationController.presentation.pitchHeight = h;
        this.createPitchView();
    };

    p.sizeInputNegativeCallback = function(){
        //this.removeForm();
        //drillEditor.drillEditorApplication.showAppScreen(drillEditor.AppScreen.MAIN_MENU);
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.SHOW_SCREEN,{screenId:drillEditor.AppScreen.MAIN_MENU}));
    };

    p.createPitchView = function(){

        var ratio = this.presentationController.presentation.pitchWidth / this.presentationController.presentation.pitchHeight;

        if(this.presentationController.presentation.pitchWidth > this.presentationController.presentation.pitchHeight){
            this.pitchDisplayWidth = this.pitchViewportBounds.width;
            this.pitchDisplayHeight =  this.pitchDisplayWidth / ratio;
        } else {
            this.pitchDisplayHeight = this.pitchViewportBounds.height;
            this.pitchDisplayWidth = ratio * this.pitchDisplayHeight;
        }

        if(this.pitchDisplayHeight > this.pitchViewportBounds.height){
            var prevH = this.pitchDisplayHeight;
            this.pitchDisplayHeight = this.pitchViewportBounds.height;
            this.pitchDisplayWidth = this.pitchDisplayHeight * (this.pitchDisplayWidth/prevH);
        } else if(this.pitchDisplayWidth > this.pitchViewportBounds.width){
            var prevW = this.pitchDisplayWidth;
            this.pitchDisplayWidth = this.pitchViewportBounds.width;
            this.pitchDisplayHeight = this.pitchDisplayWidth/(prevW/this.pitchDisplayHeight)
        }

        drillEditor.ApplicationModel.getInstance().mpp = this.presentationController.presentation.pitchWidth/this.pitchDisplayWidth;

        this.pitch.setSize(this.pitchDisplayWidth, this.pitchDisplayHeight);

        this.pitch.x = this.pitchViewportBounds.x + this.pitchViewportBounds.width/2 - this.pitchDisplayWidth/2;
        this.pitch.y = this.pitchViewportBounds.y + this.pitchViewportBounds.height/2 - this.pitchDisplayHeight/2;

        console.warn("pitch size ratio = " + Number(this.pitchDisplayWidth/this.pitchDisplayHeight).toFixed(4));

        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.PITCH_VIEW_CREATED));


    };

    p.destroy = function(){
        this.AppScreen_destroy();

        //remove components pallete and tools panel from screen
        if(this.contains(this.componentsPallete)){
          this.removeChild(this.componentsPallete);
          console.log("components pallete removed from screen");
        }

        if(this.contains(this.toolsPanel)){
          this.removeChild(this.toolsPanel);
          console.log("tools panel removed from screen");
        }

        //TODO: destroy drillEditor.Pitch instance

        console.log("Editor destroyed");
    };



    drillEditor.Editor = createjs.promote(Editor, "AppScreen");

}());
//##############################################################################
//
//##############################################################################

this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    SimpleTextButton.DEFAULT_FONT = "20px Arial";
    SimpleTextButton.DEFAULT_TEXT_COLOR = "#000000";
    SimpleTextButton.prototype.buttonWidth = null;
    SimpleTextButton.prototype.buttonHeight = null;
    SimpleTextButton.prototype.background = null;
    SimpleTextButton.prototype.text = null;

    /**
     * Creates a simple text button
     * @param label
     * @param labelFont
     * @param labelColor
     * @param upColor
     * @param downColor
     * @param overColor
     * @param buttonWidth
     * @param buttonHeight
     * @constructor
     */
    function SimpleTextButton(label, labelFont, labelColor, upColor, downColor, overColor, buttonWidth, buttonHeight) {
        this.Container_constructor();
        this.label = label;
        this.labelFont = labelFont ? labelFont : SimpleTextButton.DEFAULT_FONT;
        this.labelColor = labelColor ? labelColor : SimpleTextButton.DEFAULT_TEXT_COLOR;
        this.upColor = upColor;
        this.downColor = downColor;
        this.overColor = overColor;
        this.buttonWidth = buttonWidth ? buttonWidth : null;
        this.buttonHeight = buttonHeight ? buttonHeight : null;
        this.applicationModel = drillEditor.ApplicationModel.getInstance();
        this.setup();
    }
    var p = createjs.extend(SimpleTextButton, createjs.Container);

    p.setup = function() {
        this.text = new createjs.Text(this.label, this.labelFont, this.labelColor);
        this.text.textBaseline = "top";
        this.text.textAlign = "center";

        if(this.buttonWidth == null || this.buttonWidth == undefined){
            this.buttonWidth = this.text.getMeasuredWidth() + 30;
        }


        this.buttonHeight = this.buttonHeight ? this.buttonHeight : this.text.getMeasuredHeight() + 20;

        this.text.x = this.buttonWidth/2;
        this.text.y = 10;

        this.background = new createjs.Shape();
        this.background.graphics.beginFill(this.upColor).drawRoundRect(0, 0, this.buttonWidth, this.buttonHeight, 10);

        this.addChild(this.background, this.text);

        this.on("mousedown", this.handleMouseDown);
        this.on("pressup", this.handlePressUp);

        this.on("click", this.handleClick);


        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random()*10;
        this.count = 0;
        this.setBounds(0,0,this.buttonWidth, this.buttonHeight);
    } ;

    p.handleMouseDown = function(event){
        this.setState("down");
        //this.stage.addEventListener("stagemouseup", this.stageMouseUpHandler);
        /*this.background.graphics.clear();
        this.background.graphics.beginFill(this.downColor).drawRoundRect(0,0,this.buttonWidth,this.buttonHeight,10);*/
    };



    p.handlePressUp = function(event){
        this.setState("up");
        /*this.background.graphics.clear();
        this.background.graphics.beginFill(this.upColor).drawRoundRect(0,0,this.buttonWidth,this.buttonHeight,10);*/
    };

    p.handleClick = function (event) {
       // this.setState("up");
       // alert("You clicked on a button: "+this.label);
        /*this.background.graphics.clear();
        this.background.graphics.beginFill(this.upColor).drawRoundRect(0,0,this.buttonWidth, this.buttonHeight,10);*/
    } ;



    p.handleRollOver = function(event) {
        //TODO: redraw rect with over color
        //this.alpha = event.type == "rollover" ? 0.6 : 1;

        /*this.background.graphics.clear();
        this.background.graphics.beginFill(this.overColor).drawRoundRect(0,0,this.buttonWidth, this.buttonHeight,10);*/
    };

    p.handleRollOut = function(event){
        /*this.background.graphics.clear();
        this.background.graphics.beginFill(this.upColor).drawRoundRect(0,0,this.buttonWidth, this.buttonHeight,10);*/
    };

    SimpleTextButton.prototype.setState = function(newState){
        //console.log("button went to state:" + newState);
        var bgColor;
          switch (newState){
              case "down":
                    bgColor = this.downColor;
                  break;

              case "up":
                  bgColor = this.upColor;
                  break;
          }

        if(bgColor){
            this.background.graphics.clear();
            this.background.graphics.beginFill(bgColor).drawRoundRect(0,0,this.buttonWidth,this.buttonHeight,10);
        }
    };

    SimpleTextButton.prototype.destroy = function(){
        this.removeAllEventListeners();
    };

    SimpleTextButton.prototype.clickHandler = function(evt){

    };

    drillEditor.SimpleTextButton = createjs.promote(SimpleTextButton, "Container");
}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.Form
 * Created by maxim_000 on 9/15/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    Form.prototype.initParams;
    Form.prototype.positiveCallback;
    Form.prototype.negativeCallback;

    //static variable
    //Form.staticVar = "value";

    //constructor
    function Form(initParams) {
        //call superclass constructor
        this.Container_constructor();
        this.initParams = initParams ? initParams : {};
        this.positiveCallback = this.initParams.positiveCallback;
        this.negativeCallback = this.initParams.negativeCallback;

        //console.log("Form constructor");
        this.constructForm();
    }

    var p = createjs.extend(Form, createjs.Container);

    p.destroy = function(){
        //console.log("Form destroy");
        this.initParams = null;
        this.positiveCallback = null;
        this.negativeCallback = null;
      //to be overridden by successors
    };

    p.constructForm = function () {
        //console.log("Form constructForm");
        //to be overridden by successors
    };


    drillEditor.Form = createjs.promote(Form, "Container");

}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.LoadDrillView
 * Created by maxim_000 on 10/17/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    LoadDrillView.prototype.formHTMLElement = null;
    LoadDrillView.prototype.formDOMElement = null;
    LoadDrillView.prototype.selectedPresentationData = null;
    LoadDrillView.prototype.backButton = null;
    LoadDrillView.prototype.loadButton = null;

    /******************* static variables *******************/
    //LoadDrillView.staticVar = "value";

    /********************** constructor *********************/
    function LoadDrillView(initParams) {
        //invoke constructor of superclass
        this.Form_constructor(initParams);


    }

    //extend this class from a superclass
    var p = createjs.extend(LoadDrillView, drillEditor.Form);

    /********************* overridden methods *********************/
    p.constructForm = function(){
        this.Form_constructForm();
        this.formHTMLElement = jQuery.parseHTML("<div id='loadDrillView' class='drill-editor-app-form'> <div class='form-back-button'> <button id='loadDrillViewBackButton' type='button' class='btn btn-default'> <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>Back </button> </div> <div class='outer'> <div class='middle'> <div class='panel panel-default load-pitch-panel'> <h3 class='load-drill-form-h3'>Load drill</h3> <div class='load-pitch-container'> <div class='list-group load-pitch-list media'> </div> </div> <div class='load-pitch-form-load-btn-container'> <a class='btn disabled btn-default load-pitch-form-load-btn' href='#' role='button'>Load</a> </div> </div> </div> </div> </div>")[0];
        $("#appContainer").append(this.formHTMLElement);

        //add back button listener
        this.backButton = $("#loadDrillViewBackButton");
        this.backButton.click(this, function(evt){
            var thisScope = evt.data;

            if(thisScope.negativeCallback){
                thisScope.negativeCallback.call(thisScope.initParams.callbackScope);
            }

            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.HIDE_CURRENT_FORM));
        });

        //add load button listener
        this.loadButton = $(".load-pitch-form-load-btn");
        this.loadButton.click(this, function(evt){
            var thisScope = evt.data;

            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.HIDE_CURRENT_FORM));
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.LOAD_DRILL_BUTTON_CLICK,
                {drillId:thisScope.selectedPresentationData.drillId}));

        });

        //populate list of drills
        //for(var i=0;i<drillEditor.DrillEditorProxy.drillsCollection.length;i++){
        for(var i=0;i<drillEditor.ApplicationModel.getInstance().savedDrills.length;i++){
            //var drillShortInfo = drillEditor.DrillEditorProxy.drillsCollection[i];
            var drillShortInfo = drillEditor.ApplicationModel.getInstance().savedDrills[i];
            $(".load-pitch-list").append("<a href='#' class='list-group-item'> <div class='media-left'> <img class='media-object load-pitch-form-thumb-image' src=''> </div> <div class='media-body'> <h4 class='list-group-item-heading drill-name-label'></h4> <p class='list-group-item-text load-drill-view-size-label'></p> <p class='list-group-item-text load-drill-view-last-edit-label'></p> </div> </a>");

            var lastAddedItem = $($(".load-pitch-list .list-group-item:last")[0]);
            lastAddedItem.find(".drill-name-label").text(drillShortInfo.displayName);
            lastAddedItem.find(".load-drill-view-size-label").text("drillEditor.Pitch size: " + drillShortInfo.pitchWidth + " x " + drillShortInfo.pitchHeight + " meters");
            lastAddedItem.find(".load-drill-view-last-edit-label").text("Last modified: " + drillShortInfo.lastModified);
            lastAddedItem.find(".load-pitch-form-thumb-image").attr("src", drillShortInfo.thumbURL);


            lastAddedItem.click({thisScope:this, presentationData: drillShortInfo}, function(evt){
                var thisScope = evt.data.thisScope;
                $(this).addClass('active').siblings().removeClass('active');
                thisScope.setSelectedPresentationData(evt.data.presentationData);
            })
        }

        //create html content
        this.formDOMElement = new createjs.DOMElement(this.formHTMLElement);
    };

    p.setSelectedPresentationData = function(value){
        this.selectedPresentationData = value;
        if(this.selectedPresentationData){
            this.loadButton.removeClass('disabled');
        }
    };


    p.destroy = function(){
        this.Form_destroy();

        // unsubscribe listeners
        this.backButton.off();
        this.loadButton.off();

        $(".load-pitch-list .list-group-item").off();

        // remove DOMElement object from DL
        $("#loadDrillView").remove();

        this.removeChild(this.formDOMElement);
        this.formDOMElement = null;

    };

    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/

    drillEditor.LoadDrillView = createjs.promote(LoadDrillView,"Form");

}());//##############################################################################
//
//##############################################################################

/**
 * Class PitchSizeInputFormHTML
 * Created by maxim_000 on 9/16/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    PitchSizeInputFormHTML.prototype.formHTMLElement;
    PitchSizeInputFormHTML.prototype.formDOMElement;

    //constructor
    function PitchSizeInputFormHTML(initParams) {
        this.Form_constructor(initParams);

    }

    var p = createjs.extend(PitchSizeInputFormHTML, drillEditor.Form);

    p.constructForm = function(){
        this.Form_constructForm();

        this.formHTMLElement = jQuery.parseHTML("<div id='pitchSizeInputFormHTML' style='position:absolute;left:0px;top:0px;width: 800px;height: 600px;background: #ffffff;'> <div style='position: absolute; padding-top: 10px; padding-left: 10px '> <button id='pitchInputFormBackButton' type='button' class='btn btn-default'> <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>Back </button> </div><div class='outer'> <div class='middle'> <div class='inner'> <div class='container' style='width: inherit; height: 290px; background: #cccccc'> <h2 style='text-align: center'>Enter pitch size</h2> <form role='form'> <div class='form-group'> <label>Width:</label> <input class='form-control' id='pitch_width_input' placeholder='Enter width in meters'> </div><div class='form-group'> <label>Height:</label> <input type='height' id='pitch_height_input' class='form-control' placeholder='Enter height in meters'> </div><div class='checkbox'> <label> <input id='pitchInputFormUseDefaultCb' type='checkbox'>Use default size - 105 by 68 metres </label> </div><button id='pitchInputFormProceedButton' type='button' class='btn btn-primary btn-block'>Apply and proceed</button> </form> </div></div></div></div></div>")[0];
        $("#appContainer").append(this.formHTMLElement);

        $("#pitchInputFormBackButton").click(this,function(evt){
            var thisScope = evt.data;

            if(thisScope.negativeCallback){
                thisScope.negativeCallback.call(thisScope.initParams.callbackScope);
            }

            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.HIDE_CURRENT_FORM));

        });

        $("#pitchInputFormUseDefaultCb").change(function(){
            var checked =  this.checked;
            if(checked){
                $("#pitch_width_input").val(drillEditor.ApplicationModel.DEFAULT_PITCH_WIDTH_METERS);
                $("#pitch_height_input").val(drillEditor.ApplicationModel.DEFAULT_PITCH_HEIGHT_METERS);
            }
        });

        $("#pitchInputFormProceedButton").click(this, function(evt){
            var pitchW = Number($("#pitch_width_input").val());
            var pitchH = Number($("#pitch_height_input").val());
            var thisScope = evt.data;
            if(thisScope.initParams.positiveCallback){
                thisScope.initParams.positiveCallback.call(thisScope.initParams.callbackScope, pitchW, pitchH);
            }
            //drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(ApplicationEvent.HIDE_CURRENT_FORM));
        });

        this.formDOMElement = new createjs.DOMElement(this.formHTMLElement);

    };



    p.destroy = function(){
        this.Form_destroy();

        $("#pitchInputFormBackButton").unbind();
        $("#pitchInputFormUseDefaultCb").unbind();

        //remove this form from DOM and screen
        $("#pitchSizeInputFormHTML").remove();

        //remove DOMElement object from DL
        this.removeChild(this.formDOMElement);
        this.formDOMElement = null;
    };


    //window.drillEditor.PitchSizeInputFormHTML = createjs.extend(PitchSizeInputFormHTML,"DOMElement");
    drillEditor.PitchSizeInputFormHTML = createjs.promote(PitchSizeInputFormHTML,"Form");

}());//##############################################################################
//
//##############################################################################

/**
 * Created by maxim_000 on 10/13/2015.
 */
/**
 * Class DrillNameInputForm
 * Created by maxim_000 on 9/16/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    ProgressBarForm.prototype.formHTMLElement;
    ProgressBarForm.prototype.formDOMElement;

    //constructor
    function ProgressBarForm(initParams) {
        this.Form_constructor(initParams);
    }

    var p = createjs.extend(ProgressBarForm, drillEditor.Form);

    p.constructForm = function(){
        this.Form_constructForm();

        var headerText = this.initParams ? this.initParams.headerText : " ";

        this.formHTMLElement = jQuery.parseHTML("<div id='progressBarForm' class='progress-bar-form'> <div class='outer'> <div class='middle'> <div class='panel panel-default progress-bar-panel'> <h3 class='progress-bar-form-h3'></h3> <div class='progress' style='margin-left: 10px; margin-right: 10px'> <div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'> </div> </div> </div> </div> </div></div>")[0];
        $("#appContainer").append(this.formHTMLElement);
        $("#progressBarForm .progress-bar-form-h3").text(headerText);
        this.formDOMElement = new createjs.DOMElement(this.formHTMLElement);

    };



    p.destroy = function(){
        this.Form_destroy();



        //remove this form from DOM and screen
        $("#progressBarForm").remove();

        //remove DOMElement object from DL
        this.removeChild(this.formDOMElement);
        this.formDOMElement = null;
    };


    drillEditor.ProgressBarForm = createjs.promote(ProgressBarForm,"Form");

}());//##############################################################################
//
//##############################################################################

/**
 * Class ErrorDialogForm
 * Created by maxim_000 on 10/25/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    ErrorDialogForm.prototype.formHTMLElement = null;
    ErrorDialogForm.prototype.formDOMElement = null;
    ErrorDialogForm.prototype.okButton = null;

    /******************* static variables *******************/
    //ErrorDialogForm.staticVar = "value";

    /********************** constructor *********************/
    function ErrorDialogForm(initParams) {
        //invoke constructor of superclass
        this.Form_constructor(initParams);
    }

    //extend this class from a superclass
    var p = createjs.extend(ErrorDialogForm, drillEditor.Form);

    /******************* overridden methods *****************/

    p.constructForm = function(){
        this.Form_constructForm();
        this.formHTMLElement = jQuery.parseHTML("<div id='error-dialog-form' class='dialog-form'> <div class='outer'> <div class='middle'> <div class='panel panel-danger dialog-panel'> <div id='error-dialog-header' class='panel-heading'>Error</div> <div class='panel-body' style='text-align: center'> <p id='error-dialog-label'></p> <button id='error-dialog-button' type='button' class='btn btn-default'> OK </button> </div> </div> </div> </div></div>");
        $("#appContainer").append(this.formHTMLElement);
        $("#error-dialog-label").text(this.initParams.errorMessage);

        //create createjs.DOMElement
        this.formDOMElement = new createjs.DOMElement(this.formHTMLElement);
    };

    p.destroy = function(){
        this.Form_destroy();
        // remove DOMElement object from DL
        $("#errorDialogForm").remove();

        this.removeChild(this.formDOMElement);
        this.formDOMElement = null;
    };


    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.ErrorDialogForm = createjs.promote(ErrorDialogForm,"Form");

}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.ToolsPanel
 * Created by maxim_000 on 9/17/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    ToolsPanel.prototype.background = null;
    ToolsPanel.prototype.componentWidth = null;
    ToolsPanel.prototype.componentHeight = null;
    ToolsPanel.prototype.backButton = null;
    ToolsPanel.prototype.saveButton = null;
    ToolsPanel.prototype.dynamicButtons = null;
    ToolsPanel.prototype.dynamicButtonsInitX = null;

    //static variable
    ToolsPanel.PANEL_STD_HEIGHT = 50;
    ToolsPanel.BUTTON_INTERVAL = 10;


    //constructor
    function ToolsPanel(width, height) {
        this.Container_constructor();
        this.componentWidth = width;
        this.componentHeight = height;

        this.applicationModel = drillEditor.ApplicationModel.getInstance();
        this.initialize();
    }

    var p = createjs.extend(ToolsPanel, createjs.Container);

    p.initialize = function(){
        this.background = new createjs.Shape();
        this.background.graphics.beginFill("#dddddd").drawRect(0, 0, this.componentWidth, this.componentHeight);
        this.addChild(this.background);

        //init dynamic buttons array
        this.dynamicButtons = [];

        if(this.applicationModel.appMode == drillEditor.ApplicationModel.NEW_DRILL_APP_MODE){
            this.backButton = new drillEditor.SimpleTextButton("Back", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 50, 36);
            this.backButton.setBounds(0, 0, 50, 20);
            this.backButton.x = ToolsPanel.BUTTON_INTERVAL;
            this.backButton.y = 5;
            this.backButton.on("click",backClickListener,this);
            this.addChild(this.backButton);
            this.dynamicButtonsInitX = this.backButton.x + this.backButton.getBounds().width + ToolsPanel.BUTTON_INTERVAL;
        } else{
            this.dynamicButtonsInitX = ToolsPanel.BUTTON_INTERVAL;
        }



        this.swapDirectionsButton = new drillEditor.SimpleTextButton("Swap directions","16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 140, 36);
        this.swapDirectionsButton.setBounds(0,0,140,20);
        this.swapDirectionsButton.y = 5;
        this.swapDirectionsButton.on("click", swapDirectionsButtonClickHandler, this);

        this.copyButton = new drillEditor.SimpleTextButton("Copy","16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 60, 36);
        this.copyButton.setBounds(0,0,60,20);
        this.copyButton.y = 5;
        this.copyButton.on("click", copyButtonClickListener, this);

        this.deleteButton = new drillEditor.SimpleTextButton("Delete","16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 60, 36);
        this.deleteButton.setBounds(0,0,60,20);
        this.deleteButton.y = 5;
        this.deleteButton.on("click", deleteButtonClickListener, this);

        this.pasteButton = new drillEditor.SimpleTextButton("Paste","16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 60, 36);
        this.pasteButton.setBounds(0,0,60,20);
        this.pasteButton.y = 5;
        this.pasteButton.on("click", pasteButtonClickListener, this);

        drillEditor.Dispatcher.getInstance().on(drillEditor.ApplicationEvent.ELEMENT_SELECTED, elementSelectedHandler, this);
        drillEditor.Dispatcher.getInstance().on(drillEditor.PresentationViewEvent.ELEMENT_COPIED_TO_CLIPBOARD, elementCopiedToClipboardHandler, this);
    };


    p.updateDynamicButtons = function(selectedElementData){
        // remove existing buttons
        this.dynamicButtons.forEach(function(elem,index,sourceArray){
            if(elem.stage){
                this.removeChild(elem);
            }
        },this);
        //reset buttons array
        this.dynamicButtons = [];

        if(selectedElementData){

            switch(selectedElementData.type){
                case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
                case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
                case drillEditor.GraphicElementType.BALL_MOVEMENT:
                    this.dynamicButtons.push(this.swapDirectionsButton);
                    break;

            }

            this.dynamicButtons.push(this.copyButton);
            this.dynamicButtons.push(this.deleteButton);
        }

        if(drillEditor.Clipboard.data){
            this.dynamicButtons.push(this.pasteButton);
        }

        if(this.dynamicButtons.length>0){
            //reverse dyn buttons
            this.dynamicButtons.reverse();
            //add dyn buttonds to screen
            //var initX = this.backButton.x + this.backButton.getBounds().width + ToolsPanel.BUTTON_INTERVAL;
            var initX = this.dynamicButtonsInitX;
            this.dynamicButtons.forEach(function(elem, index, sourceArray){
                elem.x = initX;
                this.addChild(elem);
                initX += elem.getBounds().width + ToolsPanel.BUTTON_INTERVAL;
            },this);
        }

    };

    /********************************* event listeners **********************************/

    function backClickListener(){
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.BACK_BUTTON_CLICK));

        /*var presDTO = drillEditor.PresentationController.getInstance().getPresentationDTO();
        console.log(presDTO);*/
    }

    function copyButtonClickListener(event){
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.COPY_ELEMENT_BUTTON_CLICK));
    }

    function pasteButtonClickListener(event){
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.PASTE_ELEMENT_BUTTON_CLICK));
    }

    function elementCopiedToClipboardHandler(event){
        this.updateDynamicButtons(event.payload.data);
    }

    function elementSelectedHandler(evt){
        this.updateDynamicButtons(evt.payload.data && evt.payload.data.rendererData ? evt.payload.data.rendererData: null);
    }

    function deleteButtonClickListener(evt){
       drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.DELETE_ELEMENT));
    }

    function swapDirectionsButtonClickHandler(event){
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.SWAP_DIRECTIONS_BUTTON_CLICK));
    }

    drillEditor.ToolsPanel = createjs.promote(ToolsPanel,"Container");

}());
//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.TransformTool
 * Created by maxim_000 on 9/23/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    TransformTool.prototype.target;
    TransformTool.prototype.outline;
    TransformTool.prototype.scaleControl;
    TransformTool.prototype.rotationControl;
    TransformTool.prototype.rotationTool;
    TransformTool.prototype.scalePropotionally;
    TransformTool.prototype.lineDragControl1;
    TransformTool.prototype.lineDragControl2;

    //static variable
    TransformTool.OUTLINE_STROKE_SIZE = 2;
    TransformTool.OUTLINE_STROKE_COLOR = "#FF0000";
    //TransformTool.SCALE_CONTROL_SIZE = 20;
    TransformTool.SCALE_CONTROL_SIZE = 16;
    TransformTool.LINE_CONTROL_SIZE = 18;

    //constructor
    function TransformTool() {
        //invoke constructor of superclass
        this.Container_constructor();
        this.initialize();
    }

    //extend this class from a superclass
    var p = createjs.extend(TransformTool,createjs.Container);


    p.initialize = function(){
        this.outline = new createjs.Shape();
        this.addChild(this.outline);

        //this.rotationControl = new createjs.Shape();
        var rotationIcon = new createjs.Bitmap(drillEditor.DrillEditorApplication.loadQueue.getResult("rotation-icon"));
        rotationIcon.x = -16;
        rotationIcon.y = -16;

        this.rotationControl = new createjs.Container();
        this.rotationControl.addChild(rotationIcon);
        this.rotationControl.setBounds(-16,-16,32,32);
        this.rotationControl.cursor = "pointer";
        this.rotationControl.snapToPixel = true;

        this.rotationTool = new drillEditor.RotationTool(0,0, this.rotationControl,0);
        this.rotationTool.visible = false;
        this.rotationTool.on("change",rotationChangeHandler, this);
        this.addChild(this.rotationTool);


        this.scaleControl = new createjs.Shape();
        this.scaleControl.graphics.beginFill("rgba(255,0,0,0.5)");
        this.scaleControl.graphics.drawRect(0, 0, TransformTool.SCALE_CONTROL_SIZE, TransformTool.SCALE_CONTROL_SIZE);
        this.scaleControl.on("mousedown", function (evt){
            this.scaleControlOffsetX = evt.localX;
            this.scaleControlOffsetY = evt.localY;
        }, this);

        this.scaleControl.pressMoveHandler = this.scaleControl.on("pressmove", function(evt){
            this.scaleControl.visible = true;

            var targetBounds = this.target.getContentBounds();

            var pointOnTool = this.globalToLocal(evt.stageX, evt.stageY);
            var minAllowedSize = this.target.getMinimalSize();
            var newW = pointOnTool.x - this.scaleControlOffsetX + TransformTool.SCALE_CONTROL_SIZE/2 - targetBounds.x;
            var newH = pointOnTool.y - targetBounds.y - this.scaleControlOffsetY + TransformTool.SCALE_CONTROL_SIZE / 2;

            //w=h if its a square
            if(this.scalePropotionally){
                newW = Math.min(newW, newH);
                newH = newW;
            }

            //prevent going under min size
            if(newW < minAllowedSize.x){
                newW =  minAllowedSize.x;
            }

            if(newH < minAllowedSize.y){
                newH = minAllowedSize.y;
            }

            this.target.rendererData.resize(newW, newH);
            this.redraw();
            //console.log("Stage point=",evt.stageX, evt.stageY,"Tool point=",pointOnTool.x, pointOnTool.y);
        },this);

        this.scaleControl.visible = false;
        this.addChild(this.scaleControl);

        this.lineDragControl1 = new createjs.Shape();
        this.lineDragControl1.graphics.beginFill("rgba(255,0,0,0.5)").drawCircle(0, 0, TransformTool.LINE_CONTROL_SIZE/2, TransformTool.LINE_CONTROL_SIZE/2);
        this.lineDragControl1.visible = false;

        this.lineDragControl1.on("mousedown", function(evt){
            this.lineDragOffsetX = evt.localX;
            this.lineDragOffsetY = evt.localY;
        }, this);

        this.lineDragControl1.on("pressmove", function(evt){
            var startPointOffsetX = TransformTool.LINE_CONTROL_SIZE - this.lineDragOffsetX;
            var startPointOffsetY = TransformTool.LINE_CONTROL_SIZE / 2 - this.lineDragOffsetY;
            var pointOnTool = this.globalToLocal(evt.stageX, evt.stageY);
            var newStartPoint = new createjs.Point(pointOnTool.x - this.lineDragOffsetX, pointOnTool.y - this.lineDragOffsetY);
            this.target.rendererData.setStartPoint(newStartPoint);
            this.redraw();

        }, this);

        this.addChild(this.lineDragControl1);

        this.lineDragControl2 = new createjs.Shape();
        this.lineDragControl2.graphics.beginFill("rgba(255,0,0,0.5)").drawCircle(0, 0, TransformTool.LINE_CONTROL_SIZE/2, TransformTool.LINE_CONTROL_SIZE/2);
        this.lineDragControl2.visible = false;
        this.addChild(this.lineDragControl2);

        this.lineDragControl2.on("mousedown", function (evt) {
            this.lineDragOffsetX = evt.localX;
            this.lineDragOffsetY = evt.localY;
        }, this);

        this.lineDragControl2.on("pressmove", function(evt){
            var pointOnTool = this.globalToLocal(evt.stageX, evt.stageY);
            var newEndPoint = new createjs.Point(pointOnTool.x - this.lineDragOffsetX, pointOnTool.y - this.lineDragOffsetY);
            this.target.rendererData.setEndPoint(newEndPoint);
            this.redraw();
        }, this);


        drillEditor.Dispatcher.getInstance().on(drillEditor.ApplicationEvent.ELEMENT_SELECTED, elementSelectedHandler, this);

    };

    p.setTarget = function(newTarget){
        if(this.target == newTarget) {
            return;
        }

        if(this.target){
            this.removeTarget();
        }

        this.target = newTarget;

        if(this.target){

            switch (this.target.rendererData.type){

                case drillEditor.GraphicElementType.RECTANGLE:
                    this.scaleControl.visible = true;
                    break;

                case drillEditor.GraphicElementType.SQUARE:
                    this.scaleControl.visible = true;
                    this.scalePropotionally = true;
                    break;

                case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                case drillEditor.GraphicElementType.GOAL:
                    this.rotationTool.visible = true;

                    break;

                case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
                case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
                case drillEditor.GraphicElementType.BALL_MOVEMENT:
                    this.lineDragControl1.visible = true;
                    this.lineDragControl2.visible = true;
                    break;

                default:
                    //this.rotationTool.visible = true;
                    break;
            }

            this.elementMoveHandler = this.target.on(drillEditor.ApplicationEvent.ELEMENT_MOVE, this.redraw, this);
            this.elementRotateHandler = this.target.rendererData.on(drillEditor.ApplicationEvent.ELEMENT_ROTATION_CHANGED, elementRotationChangedHandler, this);
            this.redraw();
        }
    };

    p.removeTarget = function(){
        this.target.off(drillEditor.ApplicationEvent.ELEMENT_MOVE, this.elementMoveHandler);
        //clear controls
        this.outline.graphics.clear();
        this.scaleControl.visible = false;
        this.scalePropotionally = false;
        this.rotationTool.visible = false;
        this.lineDragControl1.visible = false;
        this.lineDragControl2.visible = false;
    };

    p.redraw = function(){

        var localBounds = this.target.getContentBounds();
        var targetData = this.target.rendererData;

        drillEditor.DrawingUtils.drawStrictSizeRectangle(this.outline.graphics,
            -TransformTool.OUTLINE_STROKE_SIZE,
            -TransformTool.OUTLINE_STROKE_SIZE,
            TransformTool.OUTLINE_STROKE_SIZE*2 + localBounds.width,
            TransformTool.OUTLINE_STROKE_SIZE*2 + localBounds.height,
            TransformTool.OUTLINE_STROKE_SIZE,
            TransformTool.OUTLINE_STROKE_COLOR);


        if(this.target.isInteractiveLine){
            var outlinePosition = this.target.contentRegPoint == "endPoint" ? this.target.rendererData.endPoint : this.target.rendererData.startPoint;
            this.outline.x = outlinePosition.x;
            this.outline.y = outlinePosition.y;
            this.outline.regY = localBounds.height/2;
            this.outline.regX = this.target.contentRegPoint == "endPoint" ? this.target.rendererData.lineWidth : 0;
            this.outline.rotation = this.target.rendererData.angle;
        } else {
            this.outline.x = localBounds.x + localBounds.width/2;
            this.outline.y = localBounds.y + localBounds.height/2;
            this.outline.regX = localBounds.width/2;
            this.outline.regY = localBounds.height/2;
            this.outline.rotation = this.target.rendererData.rotation;

        }

        if(this.scaleControl.visible){
            this.scaleControl.x = localBounds.x + localBounds.width + TransformTool.OUTLINE_STROKE_SIZE - 20/2 - 1;
            this.scaleControl.y = localBounds.y + localBounds.height + TransformTool.OUTLINE_STROKE_SIZE - 20/2 - 1;
        }

        if(this.lineDragControl1.visible){
            var extremePoints = this.target.getPointsInStageCS();
            var startPointLocal = this.globalToLocal(extremePoints.startPoint.x, extremePoints.startPoint.y);
            var endPointLocal = this.globalToLocal(extremePoints.endPoint.x, extremePoints.endPoint.y);

            this.lineDragControl1.x = startPointLocal.x;
            this.lineDragControl1.y = startPointLocal.y;

            this.lineDragControl2.x = endPointLocal.x;
            this.lineDragControl2.y = endPointLocal.y;
        }

        if(this.rotationTool.visible){
            this.rotationTool.x = this.target.x;
            this.rotationTool.y = this.target.y;
            this.rotationTool.setRadius(localBounds.width/2 + 10, localBounds.width/2 + 10);
            //read target's rotation and pass it to the rotationTool
            var itemRotation = this.target.rendererData.rotation;
            this.rotationTool.updatePositionFromDegree(itemRotation);
        }
    };

    /*************************************************** event handlers **********************************************/
    function rotationChangeHandler(event){
        this.target.container.rotation = this.rotationTool.angle;
        this.target.rendererData.setRotation(this.rotationTool.angle, true);

       // console.log("rotating component to: " + this.rotationTool.angle);
    }

    function elementRotationChangedHandler(event){
        this.outline.rotation = this.target.rendererData.rotation;
    }

    function elementSelectedHandler(event){
       this.setTarget(event.payload.data);
    }


    drillEditor.TransformTool = createjs.promote(TransformTool,"Container");

}());//##############################################################################
//
//##############################################################################

/**
 * ClassRotationTool
 * Created by maxim_000 on 9/30/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
   RotationTool.prototype.radiusX;
   RotationTool.prototype.radiusY;
   RotationTool.prototype.handler;
   RotationTool.prototype.direction;
   RotationTool.prototype.mouseAngle;
   RotationTool.prototype.handlerWidth;
   RotationTool.prototype.angle = 0;
   RotationTool.prototype.controlLine;

    //static variable
    //drillEditor.RotationTool.staticVar = "value";

    //constructor
    function RotationTool(radiusX, radiusY, handler, startAngle) {
        //invoke constructor of superclass
        this.Container_constructor();

        // draw red control line from the center of the handler to the outline of the selected item
        this.controlLine = new createjs.Shape();
        this.controlLine.graphics.setStrokeStyle(2);
        this.controlLine.graphics.beginStroke("#FF0000");
        this.controlLine.graphics.moveTo(-26,0);
        this.controlLine.graphics.lineTo(0,0);

        //add handler
        this.handler = handler;
        this.handlerWidth = this.handler.getBounds().width;
        this.addChild(this.handler);
        this.handler.addChildAt(this.controlLine, 0);

        this.setHandlerListeners();
        this.angle = startAngle;

        if(radiusX && radiusY){
            this.setRadius(radiusX, radiusY);
            this.updatePositionFromDegree(this.angle);
        }

    }

    //extend this class from a superclass
    var p = createjs.extend(RotationTool, createjs.Container);

    p.setRadius = function(radiusX, radiusY){
        this.radiusX = radiusX;
        this.radiusY = radiusY;

        var handlerPos = this.getSectorPoint(this.angle, this.radiusX + this.handlerWidth/2, this.radiusY+ this.handlerWidth/2);
        this.handler.x = handlerPos.x;
        this.handler.y = handlerPos.y;



        //this.updatePosition();
    };

    p.updatePosition = function(){

        var localMousePosition = this.globalToLocal(window.stage.mouseX, window.stage.mouseY);
        var mouseX = localMousePosition.x;
        var mouseY = localMousePosition.y;

        var prevMouseAngle = this.mouseAngle;
        this.mouseAngle = (Math.atan2(mouseY, mouseX)/ Math.PI) * 180;
        this.updatePositionFromDegree(this.mouseAngle);
        this.dispatchEvent(new Event("change"));

    };

    p.updatePositionFromDegree = function(value){

        this.angle = value;
        var handlerPosition = this.getSectorPoint(this.angle,
                                                this.radiusX + this.handlerWidth/2,
                                                this.radiusY + this.handlerWidth/2);
        this.handler.x = handlerPosition.x;
        this.handler.y = handlerPosition.y;
        this.handler.rotation = this.angle;
    };

    p.getSectorPoint = function(degree, radiusX, radiusY){
        var x = radiusX * Math.cos(degree * Math.PI / 180);
        var y = radiusY * Math.sin(degree * Math.PI / 180);
        var result = new createjs.Point(x,y);
        return result;
    };



    p.setHandlerListeners = function(){
        /*this.handler.on("mousedown",function(evt){

        },this);*/

        /*this.handler.on("pressup", function(evt){

        });*/

        this.handler.on("pressmove", function(evt){
            this.updatePosition();
        },this);
    };

    // public functions
    //drillEditor.RotationTool.prototype.publicFunction = function (param1) { };

    //private functions
    //function privateFunction(param) { }

    //public static method
    //drillEditor.RotationTool.staticFunctionName = function(param1){ //method body };

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.RotationTool = createjs.promote(RotationTool,"Container");


}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.ComponentsPallete
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";


    //static variable
    ComponentsPallete.BACKGROUND_COLOR = "#dddddd";
    ComponentsPallete.PANEL_STD_WIDTH = 115;

    //constructor
    function ComponentsPallete(width, height) {
        this.panelWidth = width;
        this.panelHeight = height;

        this.Container_constructor();

        this.initialize();
    }

    //extend this class from a superclass
    var p = createjs.extend(ComponentsPallete,createjs.Container);

    p.initialize = function(){
        this.dispatcher = drillEditor.Dispatcher.getInstance();

        this.background = new createjs.Shape();
        this.background.graphics.beginFill(ComponentsPallete.BACKGROUND_COLOR).drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.addChild(this.background);


        this.rectButton = new drillEditor.SimpleTextButton("Rectangle", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.rectButton.x = 5;
        this.rectButton.y = 5;
        this.rectButton.on("click", rectButtonClickHandler, this);
        this.addChild(this.rectButton);

        this.boxButton = new drillEditor.SimpleTextButton("Square", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.boxButton.x = 5;
        this.boxButton.y = this.rectButton.y + this.rectButton.getBounds().height + 5;
        this.boxButton.on("click", boxButtonClickHandler, this);
        this.addChild(this.boxButton);

        this.attackerButton = new drillEditor.SimpleTextButton("Attacker", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.attackerButton.x = 5;
        this.attackerButton.y = this.boxButton.y + this.boxButton.getBounds().height + 5;
        this.attackerButton.on("click", attackerButtonClickHandler, this);
        this.addChild(this.attackerButton);

        this.defenderButton = new drillEditor.SimpleTextButton("Defender", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.defenderButton.x = 5;
        this.defenderButton.y = this.attackerButton.y + this.attackerButton.getBounds().height + 5;
        this.defenderButton.on("click", defenderButtonClickHandler, this);
        this.addChild(this.defenderButton);

        this.extraTeamButton = new drillEditor.SimpleTextButton("Extra", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.extraTeamButton.x = 5;
        this.extraTeamButton.y = this.defenderButton.y + this.defenderButton.getBounds().height + 5;
        this.extraTeamButton.on("click", extraTeamButtonClickHandler, this);
        this.addChild(this.extraTeamButton);

        this.neutralPlayerButton = new drillEditor.SimpleTextButton("Neutral", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.neutralPlayerButton.x = 5;
        this.neutralPlayerButton.y = this.extraTeamButton.y + this.extraTeamButton.getBounds().height + 5;
        this.neutralPlayerButton.on("click", neutralButtonClickHandler, this);
        this.addChild(this.neutralPlayerButton);

        this.coneButton = new drillEditor.SimpleTextButton("Cone", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.coneButton.x = 5;
        this.coneButton.y = this.neutralPlayerButton.y + this.neutralPlayerButton.getBounds().height + 5;
        this.coneButton.on("click", coneButtonClickHandler, this);
        this.addChild(this.coneButton);
        
        this.arcButton = new drillEditor.SimpleTextButton("Arcuate mvm", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.arcButton.x = 5;
        this.arcButton.y = this.coneButton.y + this.coneButton.getBounds().height + 5;
        this.arcButton.on("click", arcButtonClickHandler,this);
        this.addChild(this.arcButton);

        this.dribblingButton = new drillEditor.SimpleTextButton("Dribbling", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.dribblingButton.x = 5;
        this.dribblingButton.y = this.arcButton.y + this.arcButton.getBounds().height + 5;
        this.dribblingButton.on("click", dribblingButtonClickHandler,this);
        this.addChild(this.dribblingButton);

        this.playerMvmButton = new drillEditor.SimpleTextButton("Player path", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.playerMvmButton.x = 5;
        this.playerMvmButton.y = this.dribblingButton.y + this.playerMvmButton.getBounds().height + 5;
        this.playerMvmButton.on("click", playerMovementButtonClick, this);
        this.addChild(this.playerMvmButton);

        this.ballMvmButton = new drillEditor.SimpleTextButton("Ball path", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.ballMvmButton.x = 5;
        this.ballMvmButton.y = this.playerMvmButton.y + this.ballMvmButton.getBounds().height + 5;
        this.ballMvmButton.on("click", ballMovementButtonClick, this);
        this.addChild(this.ballMvmButton);

        this.ballButton = new drillEditor.SimpleTextButton("Ball", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.ballButton.x = 5;
        this.ballButton.y = this.ballMvmButton.y + this.ballButton.getBounds().height + 5;
        this.ballButton.on("click", ballButtonClick, this);
        this.addChild(this.ballButton);

        this.ballSupplyButton = new drillEditor.SimpleTextButton("Ball supply", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.ballSupplyButton.x = 5;
        this.ballSupplyButton.y = this.ballButton.y + this.ballSupplyButton.getBounds().height + 5;
        this.ballSupplyButton.on("click", ballSupplyButtonClick, this);
        this.addChild(this.ballSupplyButton);

        this.goalButton = new drillEditor.SimpleTextButton("Goal", "16px Arial", "#000000", "#FFFFFF", "#999999", "#0000FF", 105, 36);
        this.goalButton.x = 5;
        this.goalButton.y = this.ballSupplyButton.y + this.ballSupplyButton.getBounds().height + 5;
        this.goalButton.on("click", goalButtonClick, this);
        this.addChild(this.goalButton);

    };


    function goalButtonClick(event){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_GOAL_CLICK));
    }

    function rectButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_RECTANGLE_CLICK));
    }

    function boxButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_SQUARE_CLICK));
    }

    function attackerButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_ATTACKER_CLICK));
    }

    function defenderButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_DEFENDER_CLICK));
    }

    function extraTeamButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_EXTRA_TEAM_CLICK));
    }

    function neutralButtonClickHandler(evt) {
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_NEUTRAL_PLAYER_CLICK));
    }

    function coneButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_CONE_CLICK));
    }
    
    function arcButtonClickHandler(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_ARC_CLICK));
    }

    function dribblingButtonClickHandler(evt){
       this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_DRIBBLING_CLICK));
    }

    function playerMovementButtonClick(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_PLAYER_PATH_CLICK));
    }

    function ballMovementButtonClick(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_BALL_PATH_CLICK));
    }

    function ballButtonClick(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_BALL_CLICK));
    }

    function ballSupplyButtonClick(evt){
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.CREATE_BALLS_SUPPLY_CLICK));
    }

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.ComponentsPallete = createjs.promote(ComponentsPallete,"Container");


}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor
 * Created by maxim_000 on 9/19/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //************************************** public variables ***********************************//
    Pitch.prototype.componentWidth = null;
    Pitch.prototype.componentHeight = null;
    Pitch.prototype.backgroundShape = null;
    Pitch.prototype.backgroundShapeMask = null;
    Pitch.prototype.backgroundOutline = null;
    Pitch.prototype.update = false;
    Pitch.prototype.dispatcher = null;
    Pitch.prototype.elementsLayer = null;
    Pitch.prototype.elements = null;
    Pitch.prototype.transformTool = null;
    Pitch.prototype.selectedElement = null;
    Pitch.prototype.transformToolMask = null;

    //************************************** static variables ************************************//


    //constructor
    function Pitch(initWidth, initHeight) {
        //invoke constructor of superclass
        this.Container_constructor();

        var sizeIsValid = checkSizeValidity(initWidth, initHeight);
        if(sizeIsValid){
            this.componentWidth = initWidth;
            this.componentHeight = initHeight;
            if(this.componentWidth != undefined && this.componentHeight != undefined){
                this.update = true;
            }
        }

        initialize.call(this);
        render.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(Pitch, createjs.Container);


    //************************************** public functions ****************************************//
    p.setSize = function(newW, newH){
        var sizeIsValid = checkSizeValidity(newW, newH);
        if(sizeIsValid && (newW!=this.componentWidth || newH!=this.componentHeight)){
            this.componentWidth = newW;
            this.componentHeight = newH;
            this.update = true;

        }
        render.call(this);
    };

    //************************************** private functions ***************************************//

    function checkSizeValidity(newW, newH){
        var result = (newW!=undefined && newW!=null && newW>0) && (newH!=undefined && newH!=null && newH>0);
        return result;
    }

    function initialize(){
        this.elements = [];

        //pitch shape
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.on("mousedown",canvasMouseDownHandler,this);
        this.addChild(this.backgroundShape);

        this.backgroundOutline = new createjs.Shape();
        this.addChild(this.backgroundOutline);

        //pitch mask
        this.backgroundShapeMask = new createjs.Shape();

        //container for all elements
        this.elementsLayer = new createjs.Container();
        this.elementsLayer.mask = this.backgroundShapeMask;
        this.addChild(this.elementsLayer);

        this.transformToolMask = new createjs.Shape();

        this.transformTool = new drillEditor.TransformTool();
        this.transformTool.mask = this.transformToolMask;
        this.addChild(this.transformTool);


        this.dispatcher = drillEditor.Dispatcher.getInstance();


    }

    function render() {
        if(!this.update){
            return;
        }
        //redraw bg shape
        this.backgroundShape.graphics.clear();
        this.backgroundShape.graphics.beginFill("#99CA3B");
        this.backgroundShape.graphics.drawRect(0, 0, this.componentWidth, this.componentHeight);

        this.backgroundOutline.graphics.clear();
        this.backgroundOutline.graphics.setStrokeStyle(2);
        this.backgroundOutline.graphics.beginStroke("#FFFFFF");
        this.backgroundOutline.graphics.drawRect(0, 0, this.componentWidth, this.componentHeight);

        //redraw mask shape
        this.backgroundShapeMask.graphics.clear();
        this.backgroundShapeMask.graphics.beginFill("#FF0000");
        this.backgroundShapeMask.graphics.drawRect(0, 0, this.componentWidth, this.componentHeight);

        this.transformToolMask.graphics.clear();
        this.transformToolMask.graphics.beginFill("#FFFFFF");
        this.transformToolMask.graphics.drawRect(0, 0, this.componentWidth, this.componentHeight);
    }


    /************************************* public functions *******************************************/




    /************************************** event handlers *******************************************/

    function canvasMouseDownHandler(evt){
        //this.transformTool.setTarget(null);
        drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:null}));
    }


    /************************************ static methods ********************************************/


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.Pitch = createjs.promote(Pitch,"Container");

}());
//##############################################################################
//
//##############################################################################

/**
 * Class BaseSpriteRenderer
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    BaseComponentRenderer.prototype._data = null;
    BaseComponentRenderer.prototype.needRender = null;
    BaseComponentRenderer.prototype.positionChanged = null;
    BaseComponentRenderer.prototype._x = null;
    BaseComponentRenderer.prototype._y = null;
    BaseComponentRenderer.rendererData = null;
    BaseComponentRenderer.container = null;
    BaseComponentRenderer.dispatcher = null;


    //static variable
    //BaseComponentRenderer.staticVar = "value";

    //constructor
    function BaseComponentRenderer() {
        //invoke constructor of superclass
        this.Container_constructor();
        this.initialize();
    }

    //extend this class from a superclass
    var p = createjs.extend(BaseComponentRenderer,createjs.Container);

    // protected functions
    p.f = function () {
        //to be overridden
    };

    p.initialize = function(){

        this.dispatcher = drillEditor.Dispatcher.getInstance();

        this.container = new createjs.Container();
        this.addChild(this.container);

        this.BaseComponentRenderer_mouseDownHandler = this.on("mousedown", function(evt){
            //console.log("mousedown");
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:this}));
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        },this);

        this.BaseComponentRenderer_pressMoveHandler = this.on("pressmove", function(evt){
            //console.log("pressmove");
            this.x = evt.stageX + this.offset.x;
            this.y = evt.stageY + this.offset.y;

            this._data.position.setValues(this.x, this.y);

            this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_MOVE));
        });


    };

    p.render = function(){
        // TO BE OVERRIDDEN AND EXTENDED BY SUCCESSORS
    };

    /*
    Returns minimal size of this component in pixels
     */
    p.getMinimalSize = function(){
        //to be overridden
    };

    p.getBounds = function(){
        var result = new createjs.Rectangle(this._data.position.x, this._data.position.y, this._data.width, this._data.height);
        return result;
    };

    /**
     * Destroys all interactivity in this instance.
     * To be overridden and extended by successors.
     */
    p.destroy = function(){
        this.off("mousedown", this.BaseComponentRenderer_mouseDownHandler);
        this.off("pressmove", this.BaseComponentRenderer_pressMoveHandler);

        this.removeData();
    };

    p.setRendererData = function(value){
        if(this._data == value){
            return;
        }

        if(this._data){
            this.removeData();
        }

        this._data = value;
        this.rendererData = value;

        if(this._data){
            this.addData();
            this.invalidateGraphic();
            this.onPositionChanged();
        }

    };

    p.getRendererData = function(){
        return this._data;
    };

    p.invalidateGraphic = function(){
        this.needRender = true;
        this.render();
    };

    p.onPositionChanged = function(event){

    };

    p.removeData = function(){
        if(this._data){
            this._data.off(drillEditor.ApplicationEvent.ELEMENT_RESIZE, this.BaseComponentRenderer_elementResizeHandler);
            this._data.off(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED, this.graphicPropertyChangeHandler);
        }
    };

    p.addData = function(){
        //add listeners to the updated rendererData
        this.BaseComponentRenderer_elementResizeHandler = this._data.on(drillEditor.ApplicationEvent.ELEMENT_RESIZE, this.render, this);
        this.BaseComponentRenderer_graphicPropertyChanged = this._data.on(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED, this.graphicPropertyChangeHandler, this);
    };

    p.graphicPropertyChangeHandler = function(evt){
        //TO BE OVERRIDDEN AND EXTENDED BY SUCCESSORS
    };

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BaseComponentRenderer = createjs.promote(BaseComponentRenderer,"Container");

}());//##############################################################################
//
//##############################################################################

/**
 * Class RectComponent
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /**************************************************** public variables *********************************************/
    RectComponent.prototype.outlineShape;

    //static variables
    RectComponent.MIN_WIDTH = 75;
    RectComponent.MIN_HEIGH = 50;

    /**************************************************** constructor **************************************************/
    function RectComponent() {
        this.BaseComponentRenderer_constructor();
    }

    //extend this class from a superclass
    var p = createjs.extend(RectComponent, drillEditor.BaseComponentRenderer);

    /************************************************* overridden methods ***********************************************/

    p.initialize = function(){
        this.BaseComponentRenderer_initialize();
        this.outlineShape = new createjs.Shape();
        this.addChild(this.outlineShape);

        this.widthRuler = new drillEditor.SizeHint();
        this.widthRuler.y = -14 - 3;
        this.addChild(this.widthRuler);

        this.heightRuler = new drillEditor.SizeHint();
        this.heightRuler.x = -14 - 3;
        this.heightRuler.rotation = -90;
        this.addChild(this.heightRuler);

        console.log("RectComponent.initialize()");
    };

    p.getContentBounds = function(){
        var contentPosInParentCS = this.localToLocal(0, 0, this.parent);
        var result = new createjs.Rectangle(contentPosInParentCS.x, contentPosInParentCS.y, this.rendererData.width, this.rendererData.height);
        return result;
    };

    p.render = function(){
        var renderData = this.getRendererData();
        var w = renderData.getWidth();
        var h = renderData.getHeight();
        drillEditor.DrawingUtils.drawStrictSizeRectangle(this.outlineShape.graphics, 0, 0, renderData.getWidth(), renderData.getHeight(), 4, "#ffffff");

        this.widthRuler.update(w, 14, Math.round(w * drillEditor.ApplicationModel.getInstance().mpp) + " m");
        this.heightRuler.update(h, 14, Math.round(h * drillEditor.ApplicationModel.getInstance().mpp) + " m");
        this.heightRuler.y = h;
    };



    p.getMinimalSize = function(){
        return new createjs.Point(RectComponent.MIN_WIDTH, RectComponent.MIN_HEIGH);
    };

    //Make aliases for all superclass methods: SuperClass_methodName
        drillEditor.RectComponent = createjs.promote(RectComponent,"BaseComponentRenderer");
}());
//##############################################################################
//
//##############################################################################

/**
 * Class SquareComponent
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /**************************************************** public variables ********************************************/
    //static variables
    SquareComponent.MIN_WIDTH = 75;
    SquareComponent.MIN_HEIGHT = 75;

    /**************************************************** constructor *************************************************/

    function SquareComponent() {
        this.BaseComponentRenderer_constructor();
    }

    //extend this class from a superclass
    var p = createjs.extend(SquareComponent,drillEditor.RectComponent);

    /************************************************* overridden methods *********************************************/

    p.initialize = function(){
      this.RectComponent_initialize();
      console.log("SquareComponent.initialize()");
    };

    p.getMinimalSize = function(){
        return new createjs.Point(SquareComponent.MIN_WIDTH, SquareComponent.MIN_HEIGHT);
    };

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.SquareComponent = createjs.promote(SquareComponent,"RectComponent");

}());//##############################################################################
//
//##############################################################################

/**
 * Class SizeHint
 * Created by maxim_000 on 9/23/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    SizeHint.prototype.componentWidth;
    SizeHint.prototype.componentHeight;
    SizeHint.prototype.strokeShape;
    SizeHint.prototype.text;
    SizeHint.prototype.label;

    //static variable
    SizeHint.TEXT_COLOR = "#FFFFFF";
    SizeHint.STROKE_COLOR = "#FFFFFF";

    //constructor
    function SizeHint(width, height, text) {
        //invoke constructor of superclass
        this.Container_constructor();
        this.componentWidth = width;
        this.componentHeight = height;
        this.text = text ? text : "";
        this.initialize();
    }

    //extend this class from a superclass
    var p = createjs.extend(SizeHint, createjs.Container);

    p.initialize = function(){
        this.strokeShape = new createjs.Shape();
        this.addChild(this.strokeShape);

        this.label = new createjs.Text(this.text, "12px Arial", SizeHint.TEXT_COLOR);
        this.addChild(this.label);

        this.strokeMask = new createjs.Shape();
        //this.strokeShape.mask = this.strokeMask;

        if(this.componentWidth && this.componentHeight){
            this.render();
        }
    };

    // public functions
    p.update = function (width, height, text) {
        this.componentWidth = width;
        this.componentHeight = height;
        this.text = text ? text : "";
        this.label.text = this.text;
        if(this.componentWidth && this.componentHeight){
            this.render();
        }
    };

    p.render = function(){

        var arrowW = 5;
        var arrowH = 8;
        var lineWidth = this.componentWidth - 2*arrowW;

        this.strokeShape.graphics.clear();
        this.strokeShape.graphics.beginFill("rgba(0,255,0,0.01)");
        this.strokeShape.graphics.drawRect(0,0,this.componentWidth, this.componentHeight);
        
        this.strokeShape.graphics.beginFill(SizeHint.STROKE_COLOR);
        this.strokeShape.graphics.moveTo(0, this.componentHeight/2);
        this.strokeShape.graphics.lineTo(arrowW, this.componentHeight/2 - arrowH/2);
        this.strokeShape.graphics.lineTo(arrowW, this.componentHeight/2 + arrowH/2);
        this.strokeShape.graphics.lineTo(0, this.componentHeight/2);

        this.strokeShape.graphics.beginStroke(SizeHint.STROKE_COLOR);
        this.strokeShape.graphics.setStrokeStyle(1.25);
        this.strokeShape.graphics.setStrokeDash([5,2],0);
        this.strokeShape.graphics.moveTo(arrowW, this.componentHeight/2);
        this.strokeShape.graphics.lineTo(arrowW + lineWidth,this.componentHeight/2);
        this.strokeShape.graphics.endStroke();

        this.strokeShape.graphics.moveTo(arrowW + lineWidth,this.componentHeight/2 - arrowH/2);
        this.strokeShape.graphics.lineTo(this.componentWidth, this.componentHeight/2);
        this.strokeShape.graphics.lineTo(this.componentWidth - arrowW, this.componentHeight/2 + arrowH/2);
        this.strokeShape.graphics.lineTo(this.componentWidth - arrowW, this.componentHeight/2 - arrowH/2);

        var textBounds = this.label.getBounds();
        if(this.text && this.text.length>0){
            this.label.x = this.componentWidth/2 - textBounds.width / 2;
            this.label.y = this.componentHeight/2 - textBounds.height / 2;
            this.strokeMask.graphics.clear();
            this.strokeMask.graphics.beginFill("#000000");
            this.strokeMask.graphics.drawRect(0,0,this.label.x - 4,this.componentHeight);
            this.strokeMask.graphics.drawRect(this.label.x + textBounds.width + 4, 0,
                                                this.componentWidth - (this.label.x + textBounds.width + 4), this.componentHeight);
            this.strokeShape.mask = this.strokeMask;
        }else{
            this.strokeShape.mask=null;
        }

    };



    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.SizeHint = createjs.promote(SizeHint,"Container");


}());//##############################################################################
//
//##############################################################################

/**
 * Class ArchedArrow
 * Created by maxim_000 on 9/27/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /************************************************* public variables ***********************************************/
    ArchedArrow.prototype.arcShape = null;
    ArchedArrow.prototype.arrowShape = null;
    ArchedArrow.prototype.container = null;
    ArchedArrow.prototype.opaqueBackground = null;
    ArchedArrow.prototype.arrowAnchorPoint = null;

    /************************************************* static variables ***********************************************/
    ArchedArrow.STD_WIDTH = 60;
    ArchedArrow.STD_HEIGHT = 24;
    ArchedArrow.STROKE_SIZE = 3;
    ArchedArrow.STROKE_COLOR = "#ffffff";

    /************************************************** constructor ***************************************************/
    function ArchedArrow() {
        //invoke constructor of superclass
        this.BaseComponentRenderer_constructor();
    }

    //extend this class from a superclass
    var p = createjs.extend(ArchedArrow, drillEditor.BaseComponentRenderer);

    /*********************************************** overridden methods ***********************************************/
    p.initialize = function(){
        this.BaseComponentRenderer_initialize();

        this.container = new createjs.Container();
        this.addChild(this.container);

        this.opaqueBackground = new createjs.Shape();
        this.opaqueBackground.graphics.beginFill("rgba(255,0,0,0.01)");
        this.opaqueBackground.graphics.drawRect( - ArchedArrow.STD_WIDTH/2, -ArchedArrow.STD_HEIGHT/2,ArchedArrow.STD_WIDTH, ArchedArrow.STD_HEIGHT);
        this.container.addChild(this.opaqueBackground);

        this.arcShape = new createjs.Shape();
        this.container.addChild(this.arcShape);

        this.startPoint = new createjs.Point( ArchedArrow.STD_WIDTH/2, ArchedArrow.STD_HEIGHT/2);
        this.endPoint = new createjs.Point( - ArchedArrow.STD_WIDTH/2, ArchedArrow.STD_HEIGHT/2);
        this.cp1 = new createjs.Point(this.startPoint.x - 10, -ArchedArrow.STD_HEIGHT/2-6);
        this.cp2 = new createjs.Point(this.endPoint.x + 10, -ArchedArrow.STD_HEIGHT/2-6);

        this.arcShape.graphics.setStrokeStyle(ArchedArrow.STROKE_SIZE);
        this.arcShape.graphics.beginStroke(ArchedArrow.STROKE_COLOR);
        this.arcShape.graphics.moveTo(this.startPoint.x, this.startPoint.y);
        this.arcShape.graphics.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.endPoint.x, this.endPoint.y);

        this.arrowShape = new createjs.Shape();
        this.arrowShape.graphics.beginFill("#ffffff").moveTo(-6,7).lineTo(1,0).lineTo(-6, -7);
        this.container.addChild(this.arrowShape);

        this.setBounds(-ArchedArrow.STD_WIDTH / 2,-ArchedArrow.STD_HEIGHT / 2, ArchedArrow.STD_WIDTH, ArchedArrow.STD_HEIGHT);

    };

    p.render = function(){
        var renderData = this.getRendererData();
        var w = renderData.getWidth();
        var h = renderData.getHeight();

        this.x = renderData.getPosition().x;
        this.y = renderData.getPosition().y;

        this.container.rotation = this.getRendererData().rotation;

        this.updateArrowPositionAndRotation();
    };


    p.getContentBounds = function(){
        var contentPosInParentCS = this.localToLocal(- ArchedArrow.STD_WIDTH/2, - ArchedArrow.STD_HEIGHT/2, this.parent);
        var result = new createjs.Rectangle(contentPosInParentCS.x, contentPosInParentCS.y, this.rendererData.width, this.rendererData.height);
        return result;
    };


    /*p.addData = function(){
        this.BaseComponentRenderer_addData();
        this.rendererData.on(ApplicationEvent.GRAPHIC_PROPERTY_CHANGED, graphicPropertyChangeHandler, this);
    };*/

    p.graphicPropertyChangeHandler = function(evt){
        var propertyName = evt.payload.name;

        switch (propertyName){
            case "arrowDirection":
                this.updateArrowPositionAndRotation();
                break;

        }
    };

    /************************************************* public methods *************************************************/
    p.updateArrowPositionAndRotation = function(){

        this.arrowAnchorPoint = this.rendererData.arrowDirection=="left" ? this.endPoint : this.startPoint;
        var radian = Math.atan2((this.arrowAnchorPoint.y - this.cp2.y),(this.arrowAnchorPoint.x - this.cp2.x));
        var degree = (radian/ Math.PI * 180) + (this.rendererData.arrowDirection=="left" ? 8 : 27);
        this.arrowShape.x = this.arrowAnchorPoint.x;
        this.arrowShape.y = this.arrowAnchorPoint.y;
        this.arrowShape.rotation = degree;
    };

    /************************************************** event handlers ************************************************/
    /*function graphicPropertyChangeHandler(evt){
        var propertyName = evt.payload.name;

        switch (propertyName){
            case "arrowDirection":
                   this.updateArrowPositionAndRotation();
                break;

        }

    }*/

    /************************************************** static methods ************************************************/

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.ArchedArrow = createjs.promote(ArchedArrow,"BaseComponentRenderer");

}());//##############################################################################
//
//##############################################################################

/**
 * Class PrimitiveShapeRenderer
 * Created by maxim_000 on 10/1/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    PrimitiveShapeRenderer.prototype.minimalSize;
    PrimitiveShapeRenderer.prototype.textField = null;


    //static variable
    PrimitiveShapeRenderer.CIRCLE_COMPONENT_MIN_RADIUS = 20;

    //constructor
    function PrimitiveShapeRenderer() {
        //invoke constructor of superclass
        this.BaseComponentRenderer_constructor();
        this.mouseChildren = false;
    }

    //extend this class from a superclass
    var p = createjs.extend(PrimitiveShapeRenderer,drillEditor.BaseComponentRenderer);

    p.initialize = function(){
        this.BaseComponentRenderer_initialize();
        this.outlineShape = new createjs.Shape();
        this.container.addChild(this.outlineShape);

        //if(this.rendererData.type!=GraphicElementType.NEUTRAL_PLAYER && this.rendererData.type!=GraphicElementType.CONE){
            this.textField = new createjs.Text("","16px Arial","#ffffff");
            this.container.addChild(this.textField);
       // }
    };

    p.render = function(){

        switch (this.rendererData.type){
            case drillEditor.GraphicElementType.ATTACKER:
            case drillEditor.GraphicElementType.DEFENDER:
            case drillEditor.GraphicElementType.EXTRA_TEAM:
            case drillEditor.GraphicElementType.NEUTRAL_PLAYER:
                this.outlineShape.graphics.clear();
                this.outlineShape.graphics.beginFill(this.rendererData.fillColor);
                this.outlineShape.graphics.drawCircle(0,0,this.rendererData.getWidth()/2);
                this.minimalSize = new createjs.Point(PrimitiveShapeRenderer.CIRCLE_COMPONENT_MIN_RADIUS*2,PrimitiveShapeRenderer.CIRCLE_COMPONENT_MIN_RADIUS*2);

                if(this.rendererData.type == drillEditor.GraphicElementType.NEUTRAL_PLAYER){
                    var letterT = new createjs.Shape();
                    letterT.graphics.clear();
                    letterT.graphics.beginFill("#ffffff");
                    letterT.graphics.drawRect(0,0,16,2);
                    letterT.graphics.drawRect(8-1,2,2,20);
                    letterT.x =  - 16 / 2;
                    letterT.y = - 22 / 2;
                    this.container.addChild(letterT);
                }

                break;

            case drillEditor.GraphicElementType.CONE:
                //to be implemented
                this.outlineShape.graphics.beginFill(this.rendererData.fillColor);
                this.outlineShape.graphics.moveTo(0, -this.rendererData.height/2);
                this.outlineShape.graphics.lineTo(this.rendererData.width/2, this.rendererData.height/2);
                this.outlineShape.graphics.lineTo(-this.rendererData.width/2, this.rendererData.height/2);
                this.outlineShape.graphics.lineTo(0, -this.rendererData.height/2);
                break;
        }

        this.outlineShape.setBounds(-this.rendererData.getWidth()/2,
            - this.rendererData.getHeight()/2,
            this.rendererData.getWidth(),
            this.rendererData.getHeight());
    };

    p.getContentBounds = function(){
        var contentPosInParentCS = this.localToLocal(this.outlineShape._bounds.x, this.outlineShape._bounds.y, this.parent);
        var result = new createjs.Rectangle(contentPosInParentCS.x, contentPosInParentCS.y, this.outlineShape._bounds.width, this.outlineShape._bounds.height);
        return result;
    };

    p.getMinimalSize = function(){
        return this.minimalSize;
    };

    p.graphicPropertyChangeHandler = function(evt){
        switch(evt.payload.name){
            case "playerNumber":
                    this.textField.text = this.rendererData.playerNumber;
                    var tfBounds = this.textField.getBounds();
                    this.textField.x = -tfBounds.width / 2;
                    this.textField.y = -tfBounds.height / 2;
                break;
        }
    };


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.PrimitiveShapeRenderer = createjs.promote(PrimitiveShapeRenderer,"BaseComponentRenderer");


}());//##############################################################################
//
//##############################################################################

/**
 * Class DribblingLineSegment
 * Created by maxim_000 on 10/5/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    DribblingLineSegment.prototype.color = null;
    DribblingLineSegment.prototype.direction = null;
    DribblingLineSegment.prototype.curveShape = null;
    DribblingLineSegment.prototype.arrowShape = null;
    DribblingLineSegment.prototype.opaqueShape = null;

    //static variable
    DribblingLineSegment.STD_WIDTH = 47;
    DribblingLineSegment.STD_HEIGHT = 16;
    DribblingLineSegment.CURVE_Y = 5;

    //constructor
    function DribblingLineSegment(color, direction) {
        //invoke constructor of superclass
        this.Container_constructor();

        this.color = color;
        this.direction = direction;

        this.initialize();
    }

    //extend this class from a superclass
    var p = createjs.extend(DribblingLineSegment, createjs.Container);

    p.initialize = function(){

        this.opaqueShape = new createjs.Shape();
        this.opaqueShape.graphics.beginFill("rgba(255,255,255,1)").drawRect(0,0,DribblingLineSegment.STD_WIDTH,DribblingLineSegment.STD_HEIGHT);
        this.opaqueShape.alpha=0.01;
        this.addChild(this.opaqueShape);

        this.curveShape = new createjs.Shape();
        this.curveShape.graphics.setStrokeStyle(3);
        this.curveShape.graphics.beginStroke(this.color);
        this.curveShape.graphics.moveTo(3, f(3));

        for(var i=3; i<DribblingLineSegment.STD_WIDTH; i++){
            this.curveShape.graphics.lineTo(i, f(i));
        }
        this.curveShape.y = DribblingLineSegment.CURVE_Y;
        this.addChild(this.curveShape);

        this.arrowShape = new createjs.Shape();
        this.arrowShape.graphics.beginFill(this.color).moveTo(6, 0).lineTo(6,14).lineTo(0,7).lineTo(6,0);
        this.addChild(this.arrowShape);

        var blurFilter = new createjs.BlurFilter(1, 1, 3);
        this.curveShape.filters = [blurFilter];

        var bounds = blurFilter.getBounds();
        this.curveShape.cache(-2+bounds.x, -2+bounds.y, 4+DribblingLineSegment.STD_WIDTH, 4+DribblingLineSegment.STD_HEIGHT);

        this.setBounds(0, 0, DribblingLineSegment.STD_WIDTH, DribblingLineSegment.STD_HEIGHT);

    };

    /************************************ private functions ************************************/
    function f(x) {
        return -4*Math.sin((x*8)*3.14/180) + DribblingLineSegment.CURVE_Y;
    }

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.DribblingLineSegment = createjs.promote(DribblingLineSegment,"Container");


}());//##############################################################################
//
//##############################################################################

/**
 * Class DribblingLine
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /**************************************************** public variables ********************************************/
    DribblingLine.prototype.demoShape = null;
    DribblingLine.prototype.lineContainer = null;
    DribblingLine.prototype.lineContainerMask = null;

    //static variables
    DribblingLine.INTERVAL = 3;

    /**************************************************** constructor *************************************************/
    function DribblingLine() {
        this.BaseComponentRenderer_constructor();
        initialize.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(DribblingLine, drillEditor.BaseComponentRenderer);

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



           // console.log("Offset x=",this.offset.x,"y=",this.offset.y);
        }, this);

        //move by dragging container
        this.pressMoveHandler = this.container.on("pressmove", function(evt){
            var pitchCoordinates = this.container.localToLocal(evt.localX, evt.localY, this.parent);

            this.container.x = evt.stageX + this.offset.x;
            this.container.y = evt.stageY + this.offset.y;
            //this._data.position.setValues(this.container.x, this.container.y);
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
            //insert 30 arrows
            var numSegments = 30;
            var initX = 0;
            for(var i=0; i<numSegments; i++){
                var segment = new drillEditor.DribblingLineSegment("#FFFFFF");
                segment.x = initX;
                this.lineContainer.addChild(segment);
                initX += drillEditor.DribblingLineSegment.STD_WIDTH + DribblingLine.INTERVAL;
            }
            this.lineContainer.setBounds(0, 0, numSegments*(drillEditor.DribblingLineSegment.STD_WIDTH) + (numSegments-1)*DribblingLine.INTERVAL, drillEditor.DribblingLineSegment.STD_HEIGHT);
        }

        //if(this.rendererData.direction == "rtl"){
        if(this.rendererData.arrowDirection == drillEditor.ArrowDirection.LEFT){
            this.lineContainer.scaleX = 1;
            this.lineContainer.x = 0;
        } else if(this.rendererData.arrowDirection == drillEditor.ArrowDirection.RIGHT){
            this.lineContainer.scaleX = -1;
            this.lineContainer.x = this.rendererData.lineWidth;
        }

        this.demoShape.graphics.clear();
        this.demoShape.graphics.beginFill("rgba(0,255,0,0.01)");
        this.demoShape.graphics.drawRect(0, 0, this.rendererData.lineWidth, drillEditor.DribblingLineSegment.STD_HEIGHT);

        this.lineContainerMask.graphics.clear();
        this.lineContainerMask.graphics.beginFill("#000000").drawRect(0,0,this.rendererData.lineWidth, drillEditor.DribblingLineSegment.STD_HEIGHT);

        var containerPosition = this.contentRegPoint == "endPoint" ? this.rendererData.endPoint : this.rendererData.startPoint;
        this.container.x = containerPosition.x;
        this.container.y = containerPosition.y;
        this.container.regY = drillEditor.DribblingLineSegment.STD_HEIGHT / 2;
        this.container.regX = this.contentRegPoint == "endPoint" ? this.rendererData.lineWidth : 0;


        this.container.rotation = this.rendererData.angle;
        //console.log("Container rotation = ",this.container.rotation);
        this.container.setBounds(0, 0, this.rendererData.lineWidth, drillEditor.DribblingLineSegment.STD_HEIGHT);
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
        return new createjs.Point(drillEditor.DribblingLineSegment.STD_WIDTH, drillEditor.DribblingLineSegment.STD_HEIGHT);
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
            /*case "direction":
                this.render();
                break;*/
            case "arrowDirection":
                this.render();
                break;


        }
    };

    p.isInteractiveLine = true;
    /******************************************** event handlers *******************************************/


        //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.DribblingLine = createjs.promote(DribblingLine,"BaseComponentRenderer");

}());
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
//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.BallMovementLine
 * Created by maxim_000 on 9/18/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /**************************************************** public variables ********************************************/
    BallMovementLine.prototype.demoShape = null;
    BallMovementLine.prototype.lineContainer = null;
    BallMovementLine.prototype.lineContainerMask = null;
    //BallMovementLine.prototype.arrowDirection = null;

    //static variables
    BallMovementLine.INTERVAL = 3;
    BallMovementLine.STD_HEIGHT = 16;

    /**************************************************** constructor *************************************************/
    function BallMovementLine() {
        this.BaseComponentRenderer_constructor();
        initialize.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(BallMovementLine, drillEditor.BaseComponentRenderer);

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

    /*p.addData = function(){
        this.BaseComponentRenderer_addData();
        this.rendererData.on(ApplicationEvent.GRAPHIC_PROPERTY_CHANGED, graphicPropertyChangeHandler, this);
    };*/

    p.getBounds = function(){
        var result = new createjs.Rectangle(this._data.position.x, this._data.position.y, this._data.width, this._data.height);
        return result;
    };

    p.destroy = function(){
        this.BaseComponentRenderer_destroy();
        this.off("mousedown", this.mouseDownHandler);
        this.off("pressmove", this.pressMoveHandler);
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



            // console.log("Offset x=",this.offset.x,"y=",this.offset.y);
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

    p.render = function(){

        if(this.lineContainer.numChildren == 0){
            //draw a triangle and a long line

            var arrowShape = new createjs.Shape();
            arrowShape.graphics.beginFill("#FFFFFF").moveTo(6, 0).lineTo(6,14).lineTo(0,7).lineTo(6,0);

            var lineShape = new createjs.Shape();
            lineShape.graphics.beginStroke("#FFFFFF");
            lineShape.graphics.setStrokeStyle(3);
            lineShape.graphics.setStrokeDash([5,2], 0);
            //lineShape.graphics.drawCircle(0,0,15);
            //lineShape.graphics.endStroke();
           // lineShape.y = 7;
            lineShape.graphics.moveTo(5,7).lineTo(1000,7);

            this.lineContainer.addChild(arrowShape);
            this.lineContainer.addChild(lineShape);

            this.lineContainer.setBounds(0, 0, 1006 , BallMovementLine.STD_HEIGHT);
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
        this.demoShape.graphics.drawRect(0, 0, this.rendererData.lineWidth, BallMovementLine.STD_HEIGHT);

        this.lineContainerMask.graphics.clear();
        this.lineContainerMask.graphics.beginFill("#000000").drawRect(0,0,this.rendererData.lineWidth, BallMovementLine.STD_HEIGHT);

        var containerPosition = this.contentRegPoint == "endPoint" ? this.rendererData.endPoint : this.rendererData.startPoint;
        this.container.x = containerPosition.x;
        this.container.y = containerPosition.y;
        this.container.regY = BallMovementLine.STD_HEIGHT / 2;
        this.container.regX = this.contentRegPoint == "endPoint" ? this.rendererData.lineWidth : 0;


        this.container.rotation = this.rendererData.angle;
        //console.log("Container rotation = ",this.container.rotation);
        this.container.setBounds(0, 0, this.rendererData.lineWidth, BallMovementLine.STD_HEIGHT);
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
        return new createjs.Point(drillEditor.DribblingLineSegment.STD_WIDTH, BallMovementLine.STD_HEIGHT);
    };

    p.isInteractiveLine = true;

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

    /******************************************** event handlers *******************************************/
    /*function graphicPropertyChangeHandler(event){

    }*/

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BallMovementLine = createjs.promote(BallMovementLine,"BaseComponentRenderer");

}());
//##############################################################################
//
//##############################################################################

/**
 * Class BallComponent
 * Created by maxim_000 on 10/9/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    BallComponent.prototype.ballIcon = null;

    /******************* static variables *******************/
    BallComponent.STD_WIDTH = 32;
    BallComponent.STD_HEIGHT = 32;

    /********************** constructor *********************/
    function BallComponent() {
        //invoke constructor of superclass
        this.BaseComponentRenderer_constructor();
    }

    //extend this class from a superclass
    var p = createjs.extend(BallComponent, drillEditor.BaseComponentRenderer);

    /******************** overridden methods ********************/
    p.initialize = function(){
        this.BaseComponentRenderer_initialize();

        this.container = new createjs.Container();
        this.addChild(this.container);

        this.ballIcon = new createjs.Bitmap(drillEditor.DrillEditorApplication.loadQueue.getResult("soccer-ball-icon"));
        this.container.addChild(this.ballIcon);
    };

    p.render = function(){

    };


    p.getContentBounds = function(){
        var contentPositionInParentCS =
            this.localToLocal(0,0, this.parent);
        var result = new createjs.Rectangle(contentPositionInParentCS.x,
        contentPositionInParentCS.y, this.rendererData.width, this.rendererData.height);

        return result;
    };

    /********************** private methods *********************/


    /********************** event handlers **********************/



    /******************** public static method ******************/

    //drillEditor.BallComponent.staticFunctionName = function(param1){ //method body };


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BallComponent = createjs.promote(BallComponent,"BaseComponentRenderer");


}());//##############################################################################
//
//##############################################################################

/**
 * Class BallSupplyComponent
 * Created by maxim_000 on 10/9/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    BallSupplyComponent.prototype.ballIcon = null;

    /******************* static variables *******************/
    BallSupplyComponent.STD_WIDTH = 78;
    BallSupplyComponent.STD_HEIGHT = 26;

    /********************** constructor *********************/
    function BallSupplyComponent() {
        //invoke constructor of superclass
        this.BaseComponentRenderer_constructor();
    }

    //extend this class from a superclass
    var p = createjs.extend(BallSupplyComponent, drillEditor.BaseComponentRenderer);

    /******************** overridden methods ********************/
    p.initialize = function(){
        this.BaseComponentRenderer_initialize();

        this.container = new createjs.Container();
        this.addChild(this.container);

        this.ballIcon = new createjs.Bitmap(drillEditor.DrillEditorApplication.loadQueue.getResult("ball-supply-icon"));
        this.container.addChild(this.ballIcon);
    };

    p.getContentBounds = function(){
        var contentPositionInParentCS =
            this.localToLocal(0,0, this.parent);
        var result = new createjs.Rectangle(contentPositionInParentCS.x,
            contentPositionInParentCS.y, this.rendererData.width, this.rendererData.height);

        return result;
    };

    /********************** private methods *********************/


    /********************** event handlers **********************/



    /******************** public static method ******************/

    //drillEditor.BallSupplyComponent.staticFunctionName = function(param1){ //method body };


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BallSupplyComponent = createjs.promote(BallSupplyComponent,"BaseComponentRenderer");


}());//##############################################################################
//
//##############################################################################

/**
 * Class Goal
 * Created by maxim_000 on 10/28/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    //drillEditor.Goal.prototype.publicVar = "value";

    /******************* static variables *******************/
    Goal.STD_WIDTH = 65;
    Goal.STD_HEIGHT = 47;

    /********************** constructor *********************/
    function Goal() {
        //invoke constructor of superclass
        this.BaseComponentRenderer_constructor();
    }

    //extend this class from a superclass
    var p = createjs.extend(Goal, drillEditor.BaseComponentRenderer);

    /*********************************************** overridden methods ***********************************************/
    p.initialize = function() {
        this.BaseComponentRenderer_initialize();

        this.container = new createjs.Container();
        this.addChild(this.container);

        this.goalIcon = new createjs.Bitmap(drillEditor.DrillEditorApplication.loadQueue.getResult("goal-component-icon"));
        this.goalIcon.x = -Goal.STD_WIDTH / 2;
        this.goalIcon.y = -Goal.STD_HEIGHT / 2;
        this.container.addChild(this.goalIcon);

        this.opaqueBackground = new createjs.Shape();
        this.opaqueBackground.graphics.beginFill("rgba(255,0,0,0.01)");
        this.opaqueBackground.graphics.drawRect( - Goal.STD_WIDTH/2, -Goal.STD_HEIGHT/2,Goal.STD_WIDTH, Goal.STD_HEIGHT);
        this.container.addChild(this.opaqueBackground);

        this.setBounds(-Goal.STD_WIDTH / 2, -Goal.STD_HEIGHT / 2, Goal.STD_WIDTH, Goal.STD_HEIGHT);

    };

    p.render = function(){
        this.container.rotation = this.rendererData.rotation;
    };

    p.getContentBounds = function(){
        var contentPositionInParentCS = this.localToLocal(-Goal.STD_WIDTH/2, -Goal.STD_HEIGHT/2, this.parent);
        var result = new createjs.Rectangle(contentPositionInParentCS.x,
                                                contentPositionInParentCS.y,
                                                this.rendererData.width,
                                                this.rendererData.height);
        return result;
    };

    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.Goal = createjs.promote(Goal, "BaseComponentRenderer");

}());//##############################################################################
//
//##############################################################################

/**
 * Presentation class
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    Presentation.prototype.id = null;
    Presentation.prototype.pitchWidth;
    Presentation.prototype.pitchHeight;
    Presentation.prototype.elements; //array that stores vo of the presentation items

    //static variable
    Presentation.DEFAULT_ID = "0000";

    //constructor
    function Presentation(id) {
        this.id = id;
        this.elements = [];
    }

    // public functions
    Presentation.prototype.setPitchDimensions = function(width, height){
        this.pitchWidth = width;
        this.pitchHeight = height;
    };

    //private functions


    //public static method


    drillEditor.Presentation = Presentation;

}());//##############################################################################
//
//##############################################################################

/**
 * Class GraphicItemVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    //constructor
    function GraphicItemVO(id, type, position) {
        this.EventDispatcher_constructor();

        this.id = (id!=undefined && id!=null) ? id : "" ;
        this.type = (type!=undefined && type!=null) ? type : 0;
        this.position = (position!=undefined && position!=null) ? position : null;
        //this.rotation = 0;
    }

    //extend this class from a superclass
    var p = createjs.extend(GraphicItemVO, createjs.EventDispatcher);

    // public functions
    p.setSelected = function (value) {
        if(this.selected == value){
            return;
        }

        if(value){
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:this}));
        } else {
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_DESELECTED,{data:this}));
        }

        this.selected = value;
    };

    /**
     * Sets x,y position on the screen
     * @param value A createjs.Point instance
     */
    p.setPosition = function(value){
        this.position = value;
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_POSITION_CHANGED));
    };

    p.getPosition = function(){
        return this.position;
    };


    p.setWidth = function(value){
        if(this.width == value){
            return;
        }

        this.width = value;
    };

    p.getWidth = function(){
        return this.width;
    };

    p.setHeight = function(value){
        if(this.height == value){
            return;
        }

        this.height = value;
    };

    p.getHeight = function(){
        return this.height;
    };

    p.resize = function(w, h){
        this.width = w;
        this.height = h;
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_RESIZE));
    };

    p.setRotation = function(value, changedByUser){
        this.rotation = value;
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_ROTATION_CHANGED));
    };

    p.getDTO = function(){

    };

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.GraphicItemVO = createjs.promote(GraphicItemVO,"EventDispatcher");

}());//##############################################################################
//
//##############################################################################

/**
 * Class RectVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";


    //constructor
    /**
     * Model of the rectangle component
     *
     * @class RectVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} [width=0] Item width.
     * @param {Number} [height=0] Item height.
     * @constructor
     **/
    function RectVO(id, position, width, height) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.RECTANGLE, position);
        this.setWidth(width);
        this.setHeight(height);
    }

    //extend this class from a superclass
    var p = createjs.extend(RectVO,drillEditor.GraphicItemVO);


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.RectVO = createjs.promote(RectVO,"GraphicItemVO");


}());//##############################################################################
// GraphicElementType
//##############################################################################

/**
 * Class GraphicElementType
 * Created by maxim_000 on 9/21/2015.
 */

this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    //static variable
    GraphicElementType.RECTANGLE = 1;
    GraphicElementType.SQUARE = 2;
    GraphicElementType.ATTACKER = 3;
    GraphicElementType.DEFENDER = 4;
    GraphicElementType.EXTRA_TEAM = 5;
    GraphicElementType.NEUTRAL_PLAYER = 6;
    GraphicElementType.CONE = 7;
    GraphicElementType.DRIBBLING_PLAYER = 8;
    GraphicElementType.PLAYER_MOVEMENT = 9;
    GraphicElementType.BALL_MOVEMENT = 10;
    GraphicElementType.BALL = 11;
    GraphicElementType.BALLS_SUPPLY = 12;
    GraphicElementType.ARCUATE_MOVEMENT = 13;
    GraphicElementType.GOAL = 14;

    //constructor
    function GraphicElementType() {

    }


    drillEditor.GraphicElementType = GraphicElementType;

}());//##############################################################################
//
//##############################################################################

/**
 * Class SquareVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //constructor
    /**
     * Model of the square component
     *
     * @class drillEditor.SquareVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} [width=0] Item width.
     * @param {Number} [height=0] Item height.
     * @constructor
     **/
    function SquareVO(id, position, width, height) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.SQUARE, position);
        this.setWidth(width);
        this.setHeight(height);
    }

    //extend this class from a superclass
    var p = createjs.extend(SquareVO,drillEditor.GraphicItemVO);


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.SquareVO = createjs.promote(SquareVO,"GraphicItemVO");


}());//##############################################################################
// AttackerVO
//##############################################################################

/**
 * Class drillEditor.AttackerVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    AttackerVO.prototype.radius;
    AttackerVO.prototype.playerNumber;


    //constructor
    /**
     * Model of the rectangle component
     *
     * @class AttackerVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} Circle radius.
     * @constructor
     **/
    function AttackerVO(id, position, radius) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.ATTACKER, position);
        this.setWidth(radius*2);
        this.setHeight(radius*2);
        this.radius = radius;
    }

    //extend this class from a superclass
    var p = createjs.extend(AttackerVO,drillEditor.GraphicItemVO);

    p.setPlayerNumber = function(value){
        this.playerNumber = value;
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"playerNumber"}));
    };

    //flag for serialization
    p.isPlayer = true;

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.AttackerVO = createjs.promote(AttackerVO,"GraphicItemVO");


}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.DefenderVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    DefenderVO.prototype.radius;
    DefenderVO.prototype.playerNumber;

    //static variable
    //drillEditor.DefenderVO.staticVar = "value";

    //constructor
    /**
     * Model of the rectangle component
     *
     * @class DefenderVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} Circle radius.
     * @constructor
     **/
    function DefenderVO(id, position, radius) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.DEFENDER, position);
        this.setWidth(radius*2);
        this.setHeight(radius*2);
        this.radius = radius;
    }

    //extend this class from a superclass
    var p = createjs.extend(DefenderVO,drillEditor.GraphicItemVO);

    p.setPlayerNumber = function(value){
        this.playerNumber = value;
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"playerNumber"}));
    };

    //flag for serialization
    p.isPlayer = true;

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.DefenderVO = createjs.promote(DefenderVO,"GraphicItemVO");

}());//##############################################################################
//
//##############################################################################
/**
 * Class ExtraTeamVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    ExtraTeamVO.prototype.radius;
    ExtraTeamVO.playerNumber;

    //constructor
    /**
     * Model of the rectangle component
     *
     * @class drillEditor.ExtraTeamVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} Circle radius.
     * @constructor
     **/
    function ExtraTeamVO(id, position, radius) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.EXTRA_TEAM, position);
        this.setWidth(radius*2);
        this.setHeight(radius*2);
        this.radius = radius;
    }

    //extend this class from a superclass
    var p = createjs.extend(ExtraTeamVO,drillEditor.GraphicItemVO);

    p.setPlayerNumber = function(value){
        this.playerNumber = value;
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"playerNumber"}));
    };

    //flag for serialization
    p.isPlayer = true;

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.ExtraTeamVO = createjs.promote(ExtraTeamVO,"GraphicItemVO");


}());//##############################################################################
//
//##############################################################################

/**
 * Class NeutralVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    NeutralVO.prototype.radius;

    //constructor
    /**
     * Model of the rectangle component
     *
     * @class drillEditor.NeutralVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} Circle radius.
     * @constructor
     **/
    function NeutralVO(id, position, radius) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.NEUTRAL_PLAYER, position);
        this.setWidth(radius*2);
        this.setHeight(radius*2);
        this.radius = radius;
    }

    //extend this class from a superclass
    var p = createjs.extend(NeutralVO,drillEditor.GraphicItemVO);

    //flag for serialization
    p.isPlayer = true;

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.NeutralVO = createjs.promote(NeutralVO,"GraphicItemVO");


}());//##############################################################################
//
//##############################################################################

/**
 * Class ConeVO
 * Created by maxim_000 on 9/21/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    //constructor
    /**
     * Model of the rectangle component
     *
     * @class ConeVO
     * @param {Number} [id=0] Unique item id.
     * @param {createjs.Point} [position=null] Item position.
     * @param {Number} [width=0] Item width.
     * @param {Number} [height=0] Item height.
     * @constructor
     **/
    function ConeVO(id, position, width, height) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.CONE, position);
        this.setWidth(width);
        this.setHeight(height);
    }

    //extend this class from a superclass
    var p = createjs.extend(ConeVO,drillEditor.GraphicItemVO);

    // flag for serialization
    p.isEquipment = true;

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.ConeVO = createjs.promote(ConeVO,"GraphicItemVO");


}());//##############################################################################
// ArchedArrowVO
//##############################################################################

/**
 * Class ArchedArrowVO
 * Created by maxim_000 on 9/27/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
    ArchedArrowVO.prototype.arrowDirection;
    ArchedArrowVO.prototype.startPointPosition = null;
    ArchedArrowVO.prototype.endPointPosition = null;

    //static variable
    ArchedArrowVO.STROKE_SIZE = 2;
    ArchedArrowVO.STROKE_COLOR = "#000000";

    //constructor
    function ArchedArrowVO(elemId, elemPosition, elementWidth, elementHeight, arrowDirection, rotation) {
        this.arrowDirection = (arrowDirection == drillEditor.ArrowDirection.RIGHT || arrowDirection == drillEditor.ArrowDirection.LEFT) ? arrowDirection : drillEditor.ArrowDirection.LEFT;
        this.rotation = rotation;
        this.setWidth(elementWidth);
        this.setHeight(elementHeight);
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(elemId, drillEditor.GraphicElementType.ARCUATE_MOVEMENT, elemPosition);
    }

    //extend this class from a superclass
    var p = createjs.extend(ArchedArrowVO, drillEditor.GraphicItemVO);

    // flag for serialization
    p.isActivity = true;

    p.invertArrowDirection = function(){
        if(this.arrowDirection == "left"){
            this.arrowDirection = "right"
        }else{
            this.arrowDirection = "left";
        }
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"arrowDirection"}));
    };



    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.ArchedArrowVO = createjs.promote(ArchedArrowVO, "GraphicItemVO");

}());//##############################################################################
//
//##############################################################################

/**
 * Class DribblingLineVO
 * Created by maxim_000 on 10/5/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    DribblingLineVO.prototype.startPoint = null;
    DribblingLineVO.prototype.endPoint = null;
    DribblingLineVO.prototype.lineWidth = null;
    DribblingLineVO.prototype.angle = null;
    DribblingLineVO.prototype.arrowDirection = null;

    //constructor
    function DribblingLineVO(id, startPoint, endPoint, arrowDirection) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.DRIBBLING_PLAYER, new createjs.Point(0,0));

        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.arrowDirection = (arrowDirection == drillEditor.ArrowDirection.LEFT || arrowDirection == drillEditor.ArrowDirection.RIGHT) ? arrowDirection : drillEditor.ArrowDirection.LEFT;

        updateLineWidth.call(this);
        updateAngle.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(DribblingLineVO, drillEditor.GraphicItemVO);

    // flag for serialization
    p.isActivity = true;

    p.setStartPoint = function(value){
        this.startPoint = value;
        updateLineWidth.call(this);
        updateAngle.call(this);
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"startPoint"}));
        //console.log("start point set to x=", this.startPoint.x);
    };

    p.setEndPoint = function(value){
        this.endPoint = value;
        updateLineWidth.call(this);
        updateAngle.call(this);
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"endPoint"}));
    };

    p.invertArrowDirection = function(){
        if(this.arrowDirection == drillEditor.ArrowDirection.RIGHT){
            this.arrowDirection = drillEditor.ArrowDirection.LEFT
        }else{
            this.arrowDirection = drillEditor.ArrowDirection.RIGHT;
        }

        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"arrowDirection"}));
    };

    /***************************************** private function **************************************/
    function updateLineWidth(){
         this.lineWidth = drillEditor.MathUtils.getDistanceBetween2Points(this.startPoint, this.endPoint);
    }

    function updateAngle() {
        this.angle = drillEditor.MathUtils.getAngleBetween2Points(this.startPoint, this.endPoint);
        this.rotation = this.angle;
    }

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.DribblingLineVO = createjs.promote(DribblingLineVO,"GraphicItemVO");

}());//##############################################################################
//
//##############################################################################
/**
 * Class PlayerMovementVO
 * Created by maxim_000 on 10/9/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    PlayerMovementVO.prototype.startPoint = null;
    PlayerMovementVO.prototype.endPoint = null;
    PlayerMovementVO.prototype.lineWidth = null;
    PlayerMovementVO.prototype.angle = null;
    PlayerMovementVO.prototype.arrowDirection = null;

    /******************* static variables *******************/
    //drillEditor.PlayerMovementVO.staticVar = "value";

    /********************** constructor *********************/
    function PlayerMovementVO(id, startPoint, endPoint, arrowDirection) {
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.PLAYER_MOVEMENT, new createjs.Point(0,0));
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.arrowDirection = (arrowDirection == drillEditor.ArrowDirection.LEFT || arrowDirection == drillEditor.ArrowDirection.RIGHT) ? arrowDirection : drillEditor.ArrowDirection.LEFT;
        updateLineWidth.call(this);
        updateAngle.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(PlayerMovementVO, drillEditor.GraphicItemVO);

    /********************* overridden methods ***************/
    p.setStartPoint = function(value){
        this.startPoint = value;
        updateLineWidth.call(this);
        updateAngle.call(this);
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"startPoint"}));
        //console.log("start point set to x=", this.startPoint.x);
    };

    p.setEndPoint = function(value){
        this.endPoint = value;
        updateLineWidth.call(this);
        updateAngle.call(this);
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"endPoint"}));
    };

    p.invertArrowDirection = function(){
        if(this.arrowDirection == drillEditor.ArrowDirection.RIGHT){
            this.arrowDirection = drillEditor.ArrowDirection.LEFT
        }else{
            this.arrowDirection = drillEditor.ArrowDirection.RIGHT;
        }

        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"arrowDirection"}));
    };

    // flag for serialization
    p.isActivity = true;

    /******************** private methods *******************/
    function updateLineWidth(){
        this.lineWidth = drillEditor.MathUtils.getDistanceBetween2Points(this.startPoint, this.endPoint);
    }

    function updateAngle() {
        this.angle = drillEditor.MathUtils.getAngleBetween2Points(this.startPoint, this.endPoint);
        this.rotation = this.angle;
    }

    /******************** event handlers ********************/


    /******************* public static method ***************/

    //drillEditor.PlayerMovementVO.staticFunctionName = function(param1){ //method body };


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.PlayerMovementVO = createjs.promote(PlayerMovementVO,"GraphicItemVO");

}());//##############################################################################
// BallMovementVO
//##############################################################################
/**
 * Class BallMovementVO
 * Created by maxim_000 on 10/9/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    BallMovementVO.prototype.startPoint = null;
    BallMovementVO.prototype.endPoint = null;
    BallMovementVO.prototype.lineWidth = null;
    BallMovementVO.prototype.angle = null;
    BallMovementVO.prototype.arrowDirection = null;

    /******************* static variables *******************/


    /********************** constructor *********************/
    function BallMovementVO(id, startPoint, endPoint, arrowDirection) {
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.BALL_MOVEMENT, new createjs.Point(0,0));
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.arrowDirection = (arrowDirection == drillEditor.ArrowDirection.LEFT || arrowDirection == drillEditor.ArrowDirection.RIGHT) ? arrowDirection : drillEditor.ArrowDirection.LEFT;
        updateLineWidth.call(this);
        updateAngle.call(this);
    }

    //extend this class from a superclass
    var p = createjs.extend(BallMovementVO, drillEditor.GraphicItemVO);

    // flag for serialization
    p.isActivity = true;

    /********************* overridden methods ***************/
    p.setStartPoint = function(value){
        this.startPoint = value;
        updateLineWidth.call(this);
        updateAngle.call(this);
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"startPoint"}));
        //console.log("start point set to x=", this.startPoint.x);
    };

    p.setEndPoint = function(value){
        this.endPoint = value;
        updateLineWidth.call(this);
        updateAngle.call(this);
        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"endPoint"}));
    };

    p.invertArrowDirection = function(){
        if(this.arrowDirection == drillEditor.ArrowDirection.RIGHT){
            this.arrowDirection = drillEditor.ArrowDirection.LEFT
        }else{
            this.arrowDirection = drillEditor.ArrowDirection.RIGHT;
        }

        this.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.GRAPHIC_PROPERTY_CHANGED,{name:"arrowDirection"}));
    };

    /******************** private methods *******************/
    function updateLineWidth(){
        this.lineWidth = drillEditor.MathUtils.getDistanceBetween2Points(this.startPoint, this.endPoint);
    }

    function updateAngle() {
        this.angle = drillEditor.MathUtils.getAngleBetween2Points(this.startPoint, this.endPoint);
        this.rotation = this.angle;
    }

    /******************** event handlers ********************/


    /******************* public static method ***************/

        //drillEditor.BallMovementVO.staticFunctionName = function(param1){ //method body };


        //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BallMovementVO = createjs.promote(BallMovementVO,"GraphicItemVO");

}());//##############################################################################
//
//##############################################################################

/**
 * Class drillEditor.BallVO
 * Created by maxim_000 on 10/9/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/


    /******************* static variables *******************/
    BallVO.STD_WIDTH = 32;
    BallVO.STD_HEIGHT = 32;

    /********************** constructor *********************/
    function BallVO(id, position) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.BALL, position);
        this.width = BallVO.STD_WIDTH;
        this.height = BallVO.STD_WIDTH;
    }

    //extend this class from a superclass
    var p = createjs.extend(BallVO, drillEditor.GraphicItemVO);

    // flag for serialization
    p.isEquipment = true;

    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/

    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BallVO = createjs.promote(BallVO,"GraphicItemVO");

}());//##############################################################################
//
//##############################################################################

/**
 * Class BallSupplyVO
 * Created by maxim_000 on 10/9/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/
    //BallSupplyVO.prototype.publicVar = "value";

    /******************* static variables *******************/
    BallSupplyVO.STD_WIDTH = 78;
    BallSupplyVO.STD_HEIGHT = 26;

    /********************** constructor *********************/
    function BallSupplyVO(id, position) {
        //invoke constructor of superclass
        this.GraphicItemVO_constructor(id, drillEditor.GraphicElementType.BALLS_SUPPLY, position);
        this.width = BallSupplyVO.STD_WIDTH;
        this.height = BallSupplyVO.STD_HEIGHT;
    }

    //extend this class from a superclass
    var p = createjs.extend(BallSupplyVO, drillEditor.GraphicItemVO);

    // flag for serialization
    p.isEquipment = true;

    /******************** private methods *******************/


    /******************** event handlers ********************/


    /******************* public static method ***************/

        //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.BallSupplyVO = createjs.promote(BallSupplyVO,"GraphicItemVO");

}());//##############################################################################
//
//##############################################################################

/**
 * Class GoalVO
 * Created by maxim_000 on 10/28/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /*********************************************** public variables *************************************************/


    /*********************************************** static variables *************************************************/


    /*********************************************** constructor ******************************************************/
    function GoalVO(elemId, elemPosition, elementWidth, elementHeight, rotation) {
        this.rotation = rotation;
        this.setWidth(elementWidth);
        this.setHeight(elementHeight);

        //invoke constructor of superclass
        this.GraphicItemVO_constructor(elemId, drillEditor.GraphicElementType.GOAL, elemPosition);
    }

    //extend this class from a superclass
    var p = createjs.extend(GoalVO, drillEditor.GraphicItemVO);

    // flag for serialization
    p.isEquipment = true;
    /*********************************************** overridden methods ***********************************************/


    /*********************************************** private methods **************************************************/


    /*********************************************** event handlers ***************************************************/


    /*********************************************** public static method *********************************************/


    //Make aliases for all superclass methods: SuperClass_methodName
    drillEditor.GoalVO = createjs.promote(GoalVO,"GraphicItemVO");

}());//##############################################################################
// ArrowDirection
//##############################################################################

/**
 * Class ArrowDirection
 * Created by maxim_000 on 10/14/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
	"use strict";


    /******************* static variables *******************/
    ArrowDirection.RIGHT = "right";
    ArrowDirection.LEFT = "left";

    /********************** constructor *********************/
    function ArrowDirection() {
        
    }

    drillEditor.ArrowDirection = ArrowDirection;

}());//##############################################################################
// Dispatcher
//##############################################################################


/**
 * Class Dispatcher
 * Created by Maxim Spirin on 9/14/2015.
 */

this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    Dispatcher.instance = null;

    //constructor
    function Dispatcher() {
        if(Dispatcher.instance){
            throw  new Error("Only one instance of Dispatcher is allowed")
        }
    }

    Dispatcher.getInstance = function(){
        if(!Dispatcher.instance){
            Dispatcher.instance = new Dispatcher();
        }
        return Dispatcher.instance;
    };

    //create inheritance from EventDispatcher
    var p = createjs.extend(Dispatcher, createjs.EventDispatcher);


    drillEditor.Dispatcher = createjs.promote(Dispatcher,"EventDispatcher");

}());//##############################################################################
//
//##############################################################################

/**
 * Application model
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    //public variables
   ApplicationModel.prototype.serviceLocator;
   ApplicationModel.prototype.platformInfo;
   ApplicationModel.prototype.assetsLoaded;
   ApplicationModel.prototype.mpp; // meters per pixel
   ApplicationModel.prototype.appMode; // eitherApplicationModel.EDIT_DRILL_APP_MODE orApplicationModel.NEW_DRILL_APP_MODE


    //static variables and constants
   ApplicationModel.VERSION = "0.1.8";
   ApplicationModel.debugVersion = false;
   ApplicationModel.instance = null;
   ApplicationModel.APP_WIDTH = 800;
   ApplicationModel.APP_HEIGHT = 600;
   ApplicationModel.DEFAULT_PITCH_WIDTH_METERS = 105;
   ApplicationModel.DEFAULT_PITCH_HEIGHT_METERS = 68;

   ApplicationModel.EDIT_DRILL_APP_MODE = "edit_drill_app_mode";
   ApplicationModel.NEW_DRILL_APP_MODE = "new_drill_app_mode";

    //static functions
   ApplicationModel.getInstance = function () {
        if(!ApplicationModel.instance){
            ApplicationModel.instance = new ApplicationModel();
        }

        return ApplicationModel.instance;
    };

    //constructor
    function ApplicationModel(){

        if(ApplicationModel.instance){
            throw new Error("Only one instance of ApplicationModel is allowed");
        }

        // initialize properties


    }

    drillEditor.ApplicationModel = ApplicationModel;

}());
//##############################################################################
// PresentationController
//##############################################################################

/**
 * Class PresentationController
 * Created by maxim_000 on 9/21/2015.
 */

this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";

    //public variables
    PresentationController.prototype.presentation = null;
    PresentationController.prototype.presentationView = null;
    PresentationController.prototype.dispatcher = null;
    PresentationController.prototype.selectedElement = null;
    PresentationController.prototype.componentsPallete = null;

    //static variable
    PresentationController.instance = null;

    /******************************************* constructor ****************************************/
    function PresentationController() {

        if(PresentationController.instance){
            throw new Error("Only one instance of PresentationController is allowed!");
        }

        initialize.call(this);
    }

    /**************************************** public methods ****************************************/

    /**
     * Sets presentation view ie drillEditor.Pitch instance
     * @param value
     */
    PresentationController.prototype.setView = function(value){
        this.presentationView = value;


    };
    /**
     * Creates a blank presentation and assigns it to presentation var
     */
    PresentationController.prototype.createEmptyPresentation = function(){
        this.presentation = new drillEditor.Presentation(drillEditor.Presentation.DEFAULT_ID);
    };


    /**
     * Sets current presentation
     * @param value
     */
    PresentationController.prototype.loadPresentation = function (presentationDTO) {
        this.presentation = drillEditor.DTOUtils.presentationDTOToVO(presentationDTO);

        this.selectedElement = null;

    };

    /**
     * Returns DTO of the current presentation.
     */
    PresentationController.prototype.getPresentationDTO = function(){

        if(!this.presentation){
            return null;
        }

        var canvas = document.getElementById('appCanvas');
        var imageDataString = null;
        var imageDataFormatPrefix = "data:image/png;base64,";

        if(this.presentationView){

            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:null}));
            window.stage.update();

            imageDataString = drillEditor.CanvasUtils.getCanvasSegmentData(canvas,
                this.presentationView.x,
                this.presentationView.y,
                this.presentationView.componentWidth,
                this.presentationView.componentHeight);

                //cut "data:image/png;base64," from the data string
                var dataFormatIndex = imageDataString.indexOf(imageDataFormatPrefix);

                if(dataFormatIndex>=0){
                    imageDataString = imageDataString.substr(dataFormatIndex + imageDataFormatPrefix.length);
                }
        }

        var presentationDTO = drillEditor.DTOUtils.presentationToDTO(this.presentation);
        presentationDTO.drillImageData = imageDataString ;
        presentationDTO.drillImageFormat = imageDataString ? imageDataFormatPrefix : null;
        return presentationDTO;
    };

    /*************************************** private functions *************************************/
    function initialize() {
        //init dispatcher
        this.dispatcher = drillEditor.Dispatcher.getInstance();
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_RECTANGLE_CLICK, createRectangleClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_SQUARE_CLICK, createSquareClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_ATTACKER_CLICK, createAttackerClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_DEFENDER_CLICK, createDefenderClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_EXTRA_TEAM_CLICK, createExtraClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_NEUTRAL_PLAYER_CLICK, createNeutralPlayerClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_CONE_CLICK, createConeClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_PLAYER_PATH_CLICK, createPlayerPathClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_BALL_PATH_CLICK, createBallPathClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_BALL_CLICK, createBallClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_BALLS_SUPPLY_CLICK, createBallsSupplyClickHandler , this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_ARC_CLICK, createArcClickHandler, this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_DRIBBLING_CLICK, createDribblingClickHandler, this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.CREATE_GOAL_CLICK, createGoalClickHandler, this);

        this.dispatcher.on(drillEditor.PresentationViewEvent.COPY_ELEMENT_BUTTON_CLICK, copyElementClickHandler, this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.PASTE_ELEMENT_BUTTON_CLICK, pasteElementClickHandler, this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.BACK_BUTTON_CLICK, backButtonClickHandler, this);

        this.dispatcher.on(drillEditor.ApplicationEvent.ELEMENT_SELECTED, elementSelectedHandler, this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.DELETE_ELEMENT, deleteElementHandler, this);
        this.dispatcher.on(drillEditor.PresentationViewEvent.SWAP_DIRECTIONS_BUTTON_CLICK, swapDirectionsClickHandler, this);
        this.dispatcher.on(drillEditor.ApplicationEvent.PITCH_VIEW_CREATED, pitchViewCreatedHandler, this);

    }

    function getElementDefaultPosition(width, height){
        var result = new createjs.Point(this.presentationView.componentWidth/2 - width/2, this.presentationView.componentHeight/2 - height/2);
        return result;
    }

    function addItemByModel(itemModel, addedByUser) {
        var elementRenderer = createElementRenderer(itemModel);
        elementRenderer.x = itemModel.position.x;
        elementRenderer.y = itemModel.position.y;
        if(addedByUser){
            this.presentationView.elementsLayer.addChild(elementRenderer);
            itemModel.depth = this.presentationView.elementsLayer.numChildren - 1;
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:elementRenderer}));
            this.presentation.elements.push(itemModel);
        } else {
            var depth = Math.min(itemModel.depth, this.presentationView.elementsLayer.numChildren);
            this.presentationView.elementsLayer.addChildAt(elementRenderer, depth);
        }

        this.actualizePlayerNumbers();
        //this.elements.push(elementRenderer);

        this.presentationView.elementsLayer.addChild(this.transformTool);
    };

    function createElementRenderer(elementVO){
        switch (elementVO.type){
            case drillEditor.GraphicElementType.RECTANGLE:
                result = new drillEditor.RectComponent();
                break;

            case drillEditor.GraphicElementType.SQUARE:
                result = new drillEditor.SquareComponent();
                break;

            case drillEditor.GraphicElementType.ATTACKER:
            case drillEditor.GraphicElementType.DEFENDER:
            case drillEditor.GraphicElementType.EXTRA_TEAM:
            case drillEditor.GraphicElementType.NEUTRAL_PLAYER:
            case drillEditor.GraphicElementType.CONE:
                result = new drillEditor.PrimitiveShapeRenderer();
                break;

            case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
                result = new drillEditor.DribblingLine();
                break;

            case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
                result = new drillEditor.PlayerMovementLine();
                break;

            case drillEditor.GraphicElementType.BALL_MOVEMENT:
                result = new drillEditor.BallMovementLine();
                break;

            case drillEditor.GraphicElementType.BALL:
                result = new drillEditor.BallComponent();
                break;

            case drillEditor.GraphicElementType.BALLS_SUPPLY:
                result = new drillEditor.BallSupplyComponent();
                break;

            case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                result = new drillEditor.ArchedArrow();
                break;

            case drillEditor.GraphicElementType.GOAL:
                result = new drillEditor.Goal();
                break;
        }

        var result;
        result.setRendererData(elementVO);

        return result;
    }

    PresentationController.prototype.cloneElementData = function (sourceElementData){

        var clonedElementData;
        var newId = createjs.UID.get();
        var clonedWidth =  sourceElementData.width;
        var clonedHeight =  sourceElementData.height;
        var clonedPosition = new createjs.Point(sourceElementData.position.x, sourceElementData.position.y);
        //TODO: optimize this
        clonedPosition.x+=10;
        clonedPosition.y+=10;


        var clonedRotation = sourceElementData.rotation;

        switch (sourceElementData.type){

            case drillEditor.GraphicElementType.RECTANGLE:
                clonedElementData = new drillEditor.RectVO(newId, clonedPosition, clonedWidth, clonedHeight);
                break;

            case drillEditor.GraphicElementType.SQUARE:
                clonedElementData = new drillEditor.SquareVO(newId, clonedPosition, clonedWidth, clonedHeight);
                break;


            case drillEditor.GraphicElementType.ATTACKER:
                clonedElementData = new drillEditor.AttackerVO(newId, clonedPosition, sourceElementData.radius);
                clonedElementData.fillColor = sourceElementData.fillColor;
                break;

            case drillEditor.GraphicElementType.DEFENDER:
                clonedElementData = new drillEditor.DefenderVO(newId, clonedPosition, sourceElementData.radius);
                clonedElementData.fillColor = sourceElementData.fillColor;
                break;

            case drillEditor.GraphicElementType.EXTRA_TEAM:
                clonedElementData = new drillEditor.ExtraTeamVO(newId, clonedPosition, sourceElementData.radius);
                clonedElementData.fillColor = sourceElementData.fillColor;
                break;

            case drillEditor.GraphicElementType.NEUTRAL_PLAYER:
                clonedElementData = new drillEditor.NeutralVO(newId, clonedPosition, sourceElementData.radius);
                clonedElementData.fillColor = sourceElementData.fillColor;
                break;

            case drillEditor.GraphicElementType.CONE:
                clonedElementData = new drillEditor.ConeVO(newId, clonedPosition, clonedWidth, clonedHeight);
                clonedElementData.fillColor = sourceElementData.fillColor;
                break;

            case drillEditor.GraphicElementType.ARCUATE_MOVEMENT:
                clonedElementData = new drillEditor.ArchedArrowVO(newId, clonedPosition,
                    clonedWidth, clonedHeight,
                    sourceElementData.arrowDirection, clonedRotation);
                break;

            case drillEditor.GraphicElementType.GOAL:
                clonedElementData = new drillEditor.GoalVO(newId,clonedPosition,clonedWidth, clonedHeight, clonedRotation);
                break;

            case drillEditor.GraphicElementType.DRIBBLING_PLAYER:
                var startPointCloned = new createjs.Point(sourceElementData.startPoint.x + 16, sourceElementData.startPoint.y + 16);
                var endPointCloned = new createjs.Point(sourceElementData.endPoint.x + 16, sourceElementData.endPoint.y + 16);
                clonedElementData = new drillEditor.DribblingLineVO(newId, startPointCloned, endPointCloned, sourceElementData.arrowDirection);
                break;

            case drillEditor.GraphicElementType.PLAYER_MOVEMENT:
                var startPointCloned = new createjs.Point(sourceElementData.startPoint.x + 16, sourceElementData.startPoint.y + 16);
                var endPointCloned = new createjs.Point(sourceElementData.endPoint.x + 16, sourceElementData.endPoint.y + 16);
                clonedElementData = new drillEditor.PlayerMovementVO(newId, startPointCloned, endPointCloned, sourceElementData.arrowDirection);
                break;

            case drillEditor.GraphicElementType.BALL_MOVEMENT:
                var startPointCloned = new createjs.Point(sourceElementData.startPoint.x + 16, sourceElementData.startPoint.y + 16);
                var endPointCloned = new createjs.Point(sourceElementData.endPoint.x + 16, sourceElementData.endPoint.y + 16);
                clonedElementData = new drillEditor.BallMovementVO(newId, startPointCloned, endPointCloned, sourceElementData.arrowDirection);
                break;

            case drillEditor.GraphicElementType.BALL:
                clonedElementData = new drillEditor.BallVO(newId, clonedPosition);
                break;

            case drillEditor.GraphicElementType.BALLS_SUPPLY:
                clonedElementData = new drillEditor.BallSupplyVO(newId, clonedPosition);
                break;

        }


        return clonedElementData
    };



    PresentationController.prototype.actualizePlayerNumbers = function(){
        this.presentation.elements.sort(drillEditor.MathUtils.compareNumeric);

        var atackersCount = 0;
        var defendersCount = 0;
        var extraCount = 0;

        for(var j=0; j<this.presentation.elements.length; j++){
            var elementVO = this.presentation.elements[j];

            switch(elementVO.type){
                case drillEditor.GraphicElementType.ATTACKER:
                        atackersCount +=1;
                        elementVO.setPlayerNumber(atackersCount);
                    break;
                    case drillEditor.GraphicElementType.DEFENDER:
                        defendersCount +=1;
                        elementVO.setPlayerNumber(defendersCount);
                    break;
                    case drillEditor.GraphicElementType.EXTRA_TEAM:
                        extraCount +=1;
                        elementVO.setPlayerNumber(extraCount);
                    break;
            }

        }


    };

    /*************************************** event handler *****************************************/

    function pitchViewCreatedHandler(event){
        for(var i=0; i<this.presentation.elements.length; i++){
            var elementVO = this.presentation.elements[i];
            addItemByModel.call(this,elementVO,false);
        }
    }

    function swapDirectionsClickHandler(evt){
        if(this.selectedElement){
            this.selectedElement.rendererData.invertArrowDirection();
        }
    }

    function deleteElementHandler(evt){
        if(this.selectedElement){
            // 1. destroy element
            this.selectedElement.destroy();

            // 2. remove it from screen and from elements array
            if(this.selectedElement.stage){
                this.presentationView.elementsLayer.removeChild(this.selectedElement);
                var elementDataIndex = this.presentation.elements.indexOf(this.selectedElement.rendererData);//TODO substitute with drillEditor.Presentation.removeElementById
                this.presentation.elements.splice(elementDataIndex, 1);
            }

            // loop between VOs and update their depths according to the depth of the views
            for(var i=0; i<this.presentationView.elementsLayer.numChildren; i++){
                var childElement = this.presentationView.elementsLayer.getChildAt(i);
                childElement.rendererData.depth = i;


                   /* console.info("element %d typeof %d has index of %d",
                    childElement.rendererData.id, childElement.rendererData.type,
                    childElement.rendererData.depth);*/
            }

            this.actualizePlayerNumbers();

            this.selectedElement = null;

            //3. remove selection
            drillEditor.Dispatcher.getInstance().dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.ELEMENT_SELECTED,{data:null}));
        }
    }

    function elementSelectedHandler(evt){
        this.selectedElement = evt.payload.data;
    }

    function createRectangleClickHandler(event){
        var defaultRectangleWidth = 200;
        var defaultRectangleHeight = 100;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultRectangleWidth, defaultRectangleHeight);
        var elementRendererData = new drillEditor.RectVO(elemId, elemPosition, defaultRectangleWidth, defaultRectangleHeight);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createSquareClickHandler(presentationViewEvent){
        var defaultSquareWidth = 150;
        var defaultSquareHeight = 150;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultSquareWidth, defaultSquareHeight);
        var elementRendererData = new drillEditor.SquareVO(elemId, elemPosition, defaultSquareWidth, defaultSquareHeight);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createAttackerClickHandler(presentationViewEvent) {
        var defaultRadius = drillEditor.PrimitiveShapeRenderer.CIRCLE_COMPONENT_MIN_RADIUS;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultRadius*2, defaultRadius*2);
        var elementRendererData = new drillEditor.AttackerVO(elemId, elemPosition, defaultRadius);
        elementRendererData.fillColor = "#382CBF";
        addItemByModel.call(this, elementRendererData, true);
    }

    function createDefenderClickHandler(presentationViewEvent) {
        var defaultRadius = 20;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultRadius*2, defaultRadius*2);
        var elementRendererData = new drillEditor.DefenderVO(elemId, elemPosition, defaultRadius);
        elementRendererData.fillColor = "#F21818";
        addItemByModel.call(this, elementRendererData, true);
    }

    function createExtraClickHandler(presentationViewEvent) {
        var defaultRadius = 20;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultRadius*2, defaultRadius*2);
        var elementRendererData = new drillEditor.ExtraTeamVO(elemId, elemPosition, defaultRadius);
        elementRendererData.fillColor = "#373060";
        addItemByModel.call(this, elementRendererData, true);
    }

    function createNeutralPlayerClickHandler(presentationViewEvent) {
        var defaultRadius = 20;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultRadius*2, defaultRadius*2);
        var elementRendererData = new drillEditor.NeutralVO(elemId, elemPosition, defaultRadius);
        elementRendererData.fillColor = "#085429";
        addItemByModel.call(this, elementRendererData, true);
    }

    function createConeClickHandler(presentationViewEvent) {
        var defaultTriangleWidth = 30;
        var defaultTriangleHeight = 35;
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, defaultTriangleWidth, defaultTriangleHeight);
        var elementRendererData = new drillEditor.ConeVO(elemId, elemPosition, defaultTriangleWidth, defaultTriangleHeight);
        elementRendererData.fillColor = "#FFEA04";
        addItemByModel.call(this, elementRendererData, true);
    }


    function createPlayerPathClickHandler(presentationViewEvent) {
        var elemId = createjs.UID.get();
        var defaultStripWidth = 150;
        var defaultStripHeight = drillEditor.PlayerMovementLine.STD_HEIGHT;

        var elementPosition = getElementDefaultPosition.call(this, defaultStripWidth, defaultStripHeight);
        elementPosition.y+=drillEditor.PlayerMovementLine.STD_HEIGHT/2;

        var startPoint = new createjs.Point(elementPosition.x, elementPosition.y);
        var endPoint = new createjs.Point(elementPosition.x + defaultStripWidth,  elementPosition.y);

        var elementRendererData = new drillEditor.PlayerMovementVO(elemId, startPoint, endPoint, drillEditor.ArrowDirection.LEFT);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createBallPathClickHandler(presentationViewEvent) {
        var elemId = createjs.UID.get();
        var defaultStripWidth = 150;
        var defaultStripHeight = drillEditor.BallMovementLine.STD_HEIGHT;

        var elementPosition = getElementDefaultPosition.call(this, defaultStripWidth, defaultStripHeight);
        elementPosition.y+=drillEditor.BallMovementLine.STD_HEIGHT/2;

        var startPoint = new createjs.Point(elementPosition.x, elementPosition.y);
        var endPoint = new createjs.Point(elementPosition.x + defaultStripWidth,  elementPosition.y);

        var elementRendererData = new drillEditor.BallMovementVO(elemId, startPoint, endPoint, drillEditor.ArrowDirection.LEFT);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createBallClickHandler(presentationViewEvent) {
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, drillEditor.BallComponent.STD_WIDTH, drillEditor.BallComponent.STD_HEIGHT);
        var elementRendererData = new drillEditor.BallVO(elemId, elemPosition);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createBallsSupplyClickHandler(presentationViewEvent) {
        var elemId = createjs.UID.get();
        var elemPosition = getElementDefaultPosition.call(this, drillEditor.BallSupplyComponent.STD_WIDTH, drillEditor.BallSupplyComponent.STD_HEIGHT);
        var elementRendererData = new drillEditor.BallSupplyVO(elemId, elemPosition);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createArcClickHandler(presentationViewEvent){
        var defaultArrowDirection = drillEditor.ArrowDirection.LEFT;
        var defaultArcRotation = 0;
        var elemId = createjs.UID.get();
        var elementWidth =  drillEditor.ArchedArrow.STD_WIDTH;
        var elementHeight =  drillEditor.ArchedArrow.STD_HEIGHT;
        var elemPosition = getElementDefaultPosition.call(this, drillEditor.ArchedArrow.STD_WIDTH/2, drillEditor.ArchedArrow.STD_HEIGHT/2);
        var elementRendererData = new drillEditor.ArchedArrowVO(elemId, elemPosition, elementWidth, elementHeight, defaultArrowDirection, defaultArcRotation);
        addItemByModel.call(this, elementRendererData, true);

    }

    function createDribblingClickHandler(evt){
        var elemId = createjs.UID.get();
        var defaultStripWidth = drillEditor.DribblingLineSegment.STD_WIDTH*3;
        var defaultStripHeight = drillEditor.DribblingLineSegment.STD_HEIGHT;

        var elementPosition = getElementDefaultPosition.call(this, defaultStripWidth, defaultStripHeight);
        elementPosition.y+=drillEditor.DribblingLineSegment.STD_HEIGHT/2;

        var startPoint = new createjs.Point(elementPosition.x, elementPosition.y);
        var endPoint = new createjs.Point(elementPosition.x + defaultStripWidth,  elementPosition.y);

        var elementRendererData = new drillEditor.DribblingLineVO(elemId, startPoint, endPoint, drillEditor.ArrowDirection.LEFT);
        addItemByModel.call(this, elementRendererData, true);
    }

    function createGoalClickHandler(evt){
        var elemId = createjs.UID.get();
        var defaultRotation = 0;
        var defaultWidth = drillEditor.Goal.STD_WIDTH;
        var defaultHeight = drillEditor.Goal.STD_HEIGHT;
        var elementPosition = getElementDefaultPosition.call(this, defaultWidth, defaultHeight);
        var rendererData = new drillEditor.GoalVO(elemId, elementPosition ,defaultWidth, defaultHeight, defaultRotation);
        addItemByModel.call(this, rendererData, true);
    }

    function copyElementClickHandler(event){
        var clonedSourceData = this.cloneElementData(this.selectedElement.rendererData);
        drillEditor.Clipboard.data = clonedSourceData;
        this.dispatcher.dispatchEvent(new drillEditor.PresentationViewEvent(drillEditor.PresentationViewEvent.ELEMENT_COPIED_TO_CLIPBOARD,{data:clonedSourceData}));
    }

    function pasteElementClickHandler(event){
        if(drillEditor.Clipboard.data){
            var clonedElementData = this.cloneElementData(drillEditor.Clipboard.data);
            addItemByModel.call(this, clonedElementData, true);
        }
    }

    function backButtonClickHandler(event){
        //this.getPresentationDTO();
        this.setView(null);
        this.dispatcher.dispatchEvent(new drillEditor.ApplicationEvent(drillEditor.ApplicationEvent.SHOW_SCREEN,{screenId:drillEditor.AppScreen.MAIN_MENU}));
    }

    /*********************************** public static method *************************************/

    PresentationController.getInstance = function(){

        if(PresentationController.instance == null){
            PresentationController.instance = new PresentationController();
        }

        return PresentationController.instance;
    };

    PresentationController.createEmptyPresentation = function(){
        var id = "000000";
        var presentation = new drillEditor.Presentation(id);

        console.log("Created a new presentation with id= " + id);

        return presentation;
    };

    drillEditor.PresentationController = PresentationController;

}());
//##############################################################################
//
//##############################################################################

/**
 * Class DrillEditorProxy
 * Created by Max on 10/13/2015.
 */
this.drillEditor = this.drillEditor || {};

(function () {
    "use strict";
    /******************* public variables *******************/


    /******************* static variables *******************/

    //callbacks that are set by outer code:
    DrillEditorProxy.drillStartupData = null;   // Should be set by outer code. data of the drill that has to be rendered right after app start. If null then app starts with main menu view
    DrillEditorProxy.getDrillByIdCallback = null;  // Should be set by outer code.
    DrillEditorProxy.getSavedDrillsCallback = null; // Should be set by outer code.

    //callbacks set by editor application
    DrillEditorProxy.getDrillDataCallback = null; // Should be set by drill editor. Editor app function that returns data of the current drill

    /********************** constructor *********************/
    function DrillEditorProxy() {

    }
    /******************* static methods ********************/


    /**
     * Returns data of the current/last active drill created/opened through drill editor.
     * Should be called from outer code
     * @returns {*}
     */
    DrillEditorProxy.getEditedDrillData = function(){
        var result;
        if(DrillEditorProxy.getDrillDataCallback){
            result = DrillEditorProxy.getDrillDataCallback();
        }
        return result;
    };

    /**
     * Retrieves drill data by its id.
     * Should be called from app side
     * @param drillId
     * @param successCallback
     * @param failureCallback
     */
    DrillEditorProxy.getDrillDataById = function(drillId, successCallback, failureCallback, scope){
        if(DrillEditorProxy.getDrillByIdCallback){
            DrillEditorProxy.getDrillByIdCallback(drillId, successCallback, failureCallback, scope);
        }
    };

    /**
     * Retrieves an array of drills previously created by user
     * @param successCallback
     * @param failureCallback
     */
    DrillEditorProxy.getSavedDrills = function(successCallback, failureCallback, scope){
        if(DrillEditorProxy.getSavedDrillsCallback){
            DrillEditorProxy.getSavedDrillsCallback(successCallback, failureCallback, scope);
        }
    };


    drillEditor.DrillEditorProxy = DrillEditorProxy;

}());