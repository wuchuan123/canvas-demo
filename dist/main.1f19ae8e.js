// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "none";
var lineWidth = 20;
ctx.lineCap = "round";
var painting = false;
var last;
autoSetCanvasSize(canvas);
listenToMouse(canvas);
var eraserEnable = false; //橡皮擦画笔切换

eraser.onclick = function () {
  eraserEnable = true;
  eraser.classList.add('active');
  brush.classList.remove('active');
};

brush.onclick = function () {
  eraserEnable = false;
  brush.classList.add('active');
  eraser.classList.remove('active');
};

black.onclick = function () {
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
};

red.onclick = function () {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  black.classList.remove('active');
  red.classList.add('active');
  yellow.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
};

yellow.onclick = function () {
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'yellow';
  black.classList.remove('active');
  red.classList.remove('active');
  yellow.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');
};

green.onclick = function () {
  ctx.fillStyle = 'green';
  ctx.strokeStyle = 'green';
  black.classList.remove('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
  green.classList.add('active');
  blue.classList.remove('active');
};

blue.onclick = function () {
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'blue';
  black.classList.remove('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
  green.classList.remove('active');
  blue.classList.add('active');
};

clear.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

big.onclick = function () {
  lineWidth = 15;
  big.classList.add('active');
  middle.classList.remove('active');
  small.classList.remove('active');
};

middle.onclick = function () {
  lineWidth = 5;
  big.classList.remove('active');
  middle.classList.add('active');
  small.classList.remove('active');
};

small.onclick = function () {
  lineWidth = 2;
  big.classList.remove('active');
  middle.classList.remove('active');
  small.classList.add('active');
};

download.onclick = function () {
  var url = canvas.toDataURL("image/png");
  console.log(url);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'canvas画板.png';
  a.target = '_blank';
  a.click();
};

function listenToMouse(canvas) {
  var usingMouse = false; //鼠标触发时间默认设置false

  var lastPoint = {
    'x': undefined,
    'y': undefined
  }; //鼠标最后点击的点坐标初始化

  if (document.body.ontouchstart !== undefined) {
    //判断设备是否支持touch事件
    canvas.ontouchstart = function (a) {
      //touch开始
      console.log(a);
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      usingMouse = true;

      if (eraserEnable) {
        ctx.clearRect(x - 25, y - 25, 50, 50);
      } else {
        lastPoint = {
          'x': x,
          'y': y
        };
      }
    };

    canvas.ontouchmove = function (a) {
      //touch移动
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;

      if (!usingMouse) {
        return;
      }

      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        var newPoint = {
          'x': x,
          'y': y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.ontouchend = function () {
      //touch结束
      usingMouse = false;
    };
  } else {
    //如果不支持touch事件，则执行鼠标事件
    canvas.onmousedown = function (a) {
      //鼠标按下事件
      var x = a.clientX;
      var y = a.clientY;
      usingMouse = true;

      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }; // drawPoint(x,y,1)
      }
    };

    canvas.onmousemove = function (a) {
      //鼠标移动事件
      var x = a.clientX;
      var y = a.clientY;

      if (!usingMouse) {
        return;
      }

      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }; // drawPoint(x,y,1)

        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.onmouseup = function () {
      //鼠标松开事件
      usingMouse = false;
    };
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x2, y2);
  ctx.stroke();
} // function drawPoint(x,y,radius){
//   ctx.beginPath()
//   ctx.arc(x,y,radius,0,Math.PI*2)
//   ctx.fill()
// }
// function drawLine(x1,y1,x2,y2){
//   ctx.beginPath()
//   ctx.moveTo(x1,y1)
//   ctx.lineWidth = lineWidth
//   ctx.lineTo(x2,y2)
//   ctx.stroke()
//   ctx.closePath() 
// }


function autoSetCanvasSize(canvas) {
  //全屏函数
  resize();

  window.onresize = function () {
    resize();
  };

  function resize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
} // var eraserEnable = false   //橡皮擦画笔切换
//   eraser.onclick=function (){ 
//     eraserEnable = true
//     eraser.classList.add('active')
//     brush.classList.remove('active')
// }
// brush.onclick=function (){
//     eraserEnable = false
//     brush.classList.add('active')
//     eraser.classList.remove('active')
// }
// black.onclick=function(){
//   ctx.fillStyle = 'black'
//   ctx.strokeStyle = 'black'
//   black.classList.add('active')
//   red.classList.remove('active')
//   yellow.classList.remove('active')
//   green.classList.remove('active')
//   blue.classList.remove('active')
// }
// red.onclick=function(){
//   ctx.fillStyle = 'red'
//   ctx.strokeStyle = 'red'
//   black.classList.remove('active')
//   red.classList.add('active')
//   yellow.classList.remove('active')
//   green.classList.remove('active')
//   blue.classList.remove('active')
// }
// yellow.onclick=function(){
//   ctx.fillStyle = 'yellow'
//   ctx.strokeStyle = 'yellow'
//   black.classList.remove('active')
//   red.classList.remove('active')
//   yellow.classList.add('active')
//   green.classList.remove('active')
//   blue.classList.remove('active')
// }
// green.onclick=function(){
//   ctx.fillStyle = 'green'
//   ctx.strokeStyle = 'green'
//   black.classList.remove('active')
//   red.classList.remove('active')
//   yellow.classList.remove('active')
//   green.classList.add('active')
//   blue.classList.remove('active')
// }
// blue.onclick=function(){
//   ctx.fillStyle = 'blue'
//   ctx.strokeStyle = 'blue'
//   black.classList.remove('active')
//   red.classList.remove('active')
//   yellow.classList.remove('active')
//   green.classList.remove('active')
//   blue.classList.add('active')
// }
// clear.onclick=function(){
//   ctx.clearRect(0, 0, canvas.width,canvas.height);
// }
// big.onclick=function(){
//   lineWidth = 8
//   big.classList.add('active')
//   middle.classList.remove('active') 
//   small.classList.remove('active')
// }
// middle.onclick=function(){
//   lineWidth = 5
//   big.classList.remove('active')
//   middle.classList.add('active') 
//   small.classList.remove('active')
// }
// small.onclick=function(){
//   lineWidth = 2
//   big.classList.remove('active')
//   middle.classList.remove('active') 
//   small.classList.add('active')
// }
// download.onclick=function(){
//   var url = canvas.toDataURL("image/png")
//   console.log(url)
//   var a = document.createElement('a')
//   document.body.appendChild(a)
//   a.href = url
//   a.download = 'canvas画板.png'
//   a.target = '_blank'
//   a.click()
// }
// function listenToMouse(canvas){
//   var usingMouse = false //鼠标触发时间默认设置false
//   var lastPoint = {'x':undefined,'y':undefined} //鼠标最后点击的点坐标初始化
// if(document.body.ontouchstart !== undefined){  //判断设备是否支持touch事件
//   canvas.ontouchstart = function(a){ //touch开始
//     console.log(a)
//     var x =a.touches[0].clientX
//     var y =a.touches[0].clientY
//     usingMouse = true
//     if(eraserEnable){
//       ctx.clearRect(x-25,y-25,50,50);
//     }
//     else{
//       lastPoint = {'x':x,'y':y}
//     }
//   }
//   canvas.ontouchmove =function(a){  //touch移动
//     var x =a.touches[0].clientX
//     var y =a.touches[0].clientY
//     if(!usingMouse){ return }
//     if(eraserEnable){
//       ctx.clearRect(x-10,y-10,20,20);
//     }
//     else{
//         var newPoint ={'x':x,'y':y}
//         drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
//         lastPoint = newPoint
//     }
//   }
//   canvas.ontouchend =function(){  //touch结束
//     usingMouse = false
//   }
// }
// else{                                 //如果不支持touch事件，则执行鼠标事件
//    canvas.onmousedown = function(a){ //鼠标按下事件
//      var x =a.clientX
//      var y =a.clientY
//      usingMouse = true
//      if(eraserEnable){
//        ctx.clearRect(x-10,y-10,20,20);
//      }
//      else{
//        lastPoint = {'x':x,'y':y}
//        // drawPoint(x,y,1)
//      }
//    }
//    canvas.onmousemove =function(a){  //鼠标移动事件
//      var x =a.clientX
//      var y =a.clientY
//      if(!usingMouse){ return }
//      if(eraserEnable){
//        ctx.clearRect(x-10,y-10,20,20);
//      }
//      else{
//          var newPoint ={'x':x,'y':y}
//          // drawPoint(x,y,1)
//          drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
//          lastPoint = newPoint
//      }
//    }
//    canvas.onmouseup =function(){  //鼠标松开事件
//      usingMouse = false
//    }
//   }
// } 
// var isTouchDevice = "ontouchstart" in document.documentElement;
// //手机是否支持触摸
// if (isTouchDevice) {
//   canvas.ontouchstart = e => {
//     let x = e.touches[0].clientX;
//     let y = e.touches[0].clientY;
//     last = [x, y];
//   };
//   canvas.ontouchmove = e => {
//     let x = e.touches[0].clientX;
//     let y = e.touches[0].clientY;
//     drawLine(last[0], last[1], x, y);
//     last = [x, y];
//     // console.log(x, y);
//     // ctx.beginPath();
//     // ctx.arc(x, y, 10, 0, 2 * Math.PI);
//     // ctx.stroke();
//     // ctx.fill();
//   };
// } else {
//   canvas.onmousedown = e => {
//     painting = true;
//     last = [e.clientX, e.clientY];
//   };
// }
// canvas.onmousemove = e => {
//   if (painting === true) {
//     drawLine(last[0], last[1], e.clientX, e.clientY);
//     last = [e.clientX, e.clientY];
//   } else {
//     console.log("什么都不做");
//   }
// };
// canvas.onmouseup = () => {
//   painting = false;
// };
// function autoSetCanvasSize(canvas){ //全屏函数
//   resize()
//   window.onresize = function(){  
//     resize()
//   }
//   function resize(){
//     var pageWidth = document.documentElement.clientWidth
//     var pageHeight = document.documentElement.clientHeight
//     canvas.width = pageWidth
//     canvas.height = pageHeight
//   }
// }
},{}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57438" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map