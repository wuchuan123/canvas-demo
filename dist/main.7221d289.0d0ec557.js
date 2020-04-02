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
})({"main.7221d289.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = function (modules, cache, entry, globalName) {
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
        } // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.


        if (previousRequire) {
          return previousRequire(name, true);
        } // Try the node require function if it exists.


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

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
      module.exports = mainExports; // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      }); // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  } // Override the current require with this new one


  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
}({
  "epB2": [function (require, module, exports) {
    var canvas = document.getElementById("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.strokeStyle = "none";
    var lineWidth = 8;
    var painting = false;
    var last;
    autoSetCanvasSize(canvas);
    listenToMouse(canvas);
    var eraserEnable = false; //橡皮擦画笔切换

    eraser.onclick = function () {
      eraserEnable = true;
      eraser.classList.add("active");
      brush.classList.remove("active");
    };

    brush.onclick = function () {
      eraserEnable = false;
      brush.classList.add("active");
      eraser.classList.remove("active");
    };

    black.onclick = function () {
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      black.classList.add("active");
      red.classList.remove("active");
      yellow.classList.remove("active");
      green.classList.remove("active");
      blue.classList.remove("active");
    };

    red.onclick = function () {
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      black.classList.remove("active");
      red.classList.add("active");
      yellow.classList.remove("active");
      green.classList.remove("active");
      blue.classList.remove("active");
    };

    yellow.onclick = function () {
      ctx.fillStyle = "yellow";
      ctx.strokeStyle = "yellow";
      black.classList.remove("active");
      red.classList.remove("active");
      yellow.classList.add("active");
      green.classList.remove("active");
      blue.classList.remove("active");
    };

    green.onclick = function () {
      ctx.fillStyle = "green";
      ctx.strokeStyle = "green";
      black.classList.remove("active");
      red.classList.remove("active");
      yellow.classList.remove("active");
      green.classList.add("active");
      blue.classList.remove("active");
    };

    blue.onclick = function () {
      ctx.fillStyle = "blue";
      ctx.strokeStyle = "blue";
      black.classList.remove("active");
      red.classList.remove("active");
      yellow.classList.remove("active");
      green.classList.remove("active");
      blue.classList.add("active");
    };

    clear.onclick = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    big.onclick = function () {
      lineWidth = 8;
      big.classList.add("active");
      middle.classList.remove("active");
      small.classList.remove("active");
    };

    middle.onclick = function () {
      lineWidth = 5;
      big.classList.remove("active");
      middle.classList.add("active");
      small.classList.remove("active");
    };

    small.onclick = function () {
      lineWidth = 2;
      big.classList.remove("active");
      middle.classList.remove("active");
      small.classList.add("active");
    };

    download.onclick = function () {
      var url = canvas.toDataURL("image/png");
      console.log(url);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "canvas画板.png";
      a.target = "_blank";
      a.click();
    };

    function listenToMouse(canvas) {
      var usingMouse = false; //鼠标触发时间默认设置false

      var lastPoint = {
        x: undefined,
        y: undefined
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
              x: x,
              y: y
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
              x: x,
              y: y
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
              x: x,
              y: y
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
              x: x,
              y: y
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
      ctx.closePath();
      ctx.lineCap = "round";
    }

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
    }
  }, {}]
}, {}, ["epB2"], null);
},{}]