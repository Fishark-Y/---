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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var xx = window.localStorage.getItem('x');
var xxObject = JSON.parse(xx);
var hashMap = xxObject || [{
  logo: 'H',
  url: 'https://haikei.app'
}, {
  logo: 'L',
  url: 'https://layout.bradwoods.io'
}, {
  logo: 'C',
  url: 'https://cssgradient.io'
}, {
  logo: 'B',
  url: 'https://bennettfeely.com/clippy'
}];
var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('hettp://', '').replace('www.', '').replace(/\/.*/, ''); //删除 /开头的内容
};

//html
var render = function render() {
  //重新渲染hash
  $siteList.find('li:not(.last').remove(); //删除旧数据
  hashMap.forEach(function (node, index) {
    //获取索引
    console.log(index);
    var $li = $("<li>\n        <div class=\"site\">\n            <div class=\"logo\">".concat(node.logo, "</div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n            <div class='close'>\n                     <svg class=\"icon\">\n                         <use xlink:href=\"#icon-guanbi\"></use>\n                     </svg>\n                </div>\n            </div>    \n        </li>")).insertBefore($lastLi); //从前面插进去

    $li.on('click', function () {
      //打开新窗口
      window.open(node.url);
    });

    // 删除模块
    $li.on('click', '.close', function (e) {
      console.log('删除执行成功');
      e.stopPropagation(); //阻止冒泡
      console.log(hashMap);
      hashMap.splice(index, 1); //删除当前选择的网页
      render();
    });
  });
};
render();

//添加模块
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是？');
  if (url.indexOf('http') !== 0) {
    //检测是否添加https，没有就自动补上
    url = 'https://' + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

//监听网页，自动保存模块
window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

//键盘监听
$(document).on('keypress', function (e) {
  var key = e.key;
  for (i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e395f0d2.js.map