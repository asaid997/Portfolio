import React, { Component } from 'react';
import RAFManager from 'raf-manager';
import Proton from 'proton-engine';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// Code source from here, thanks author
// https://github.com/drawcall/Proton/blob/gh-pages/source/src/utils/Rand.js
var Rand = function () {
    function Rand() {
        classCallCheck(this, Rand);

        this.list = [];
    }

    createClass(Rand, [{
        key: "set",
        value: function set$$1(probability, target) {
            this.list.push({
                probability: probability,
                target: target,
                a: 0,
                b: 1
            });

            this.calculation();
        }
    }, {
        key: "calculation",
        value: function calculation() {
            var total = 0;
            for (var i = 0; i < this.list.length; i++) {
                total += this.list[i].probability;
            }

            for (var _i = 0; _i < this.list.length; _i++) {
                var obj = this.list[_i];
                var val = obj.probability / total;

                obj.a = _i === 0 ? 0 : this.list[_i - 1].b;
                obj.b = obj.a + val;
            }
        }
    }, {
        key: "getResult",
        value: function getResult() {
            var val = Math.random();
            for (var i = 0; i < this.list.length; i++) {
                var obj = this.list[i];

                if (val <= obj.b && val > obj.a) {
                    return obj.target;
                }
            }

            return this.list[0].target;
        }
    }]);
    return Rand;
}();

var Canvas = function (_React$Component) {
  inherits(Canvas, _React$Component);

  function Canvas(props) {
    classCallCheck(this, Canvas);

    var _this = possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

    _this._id = 0;
    _this.size = { width: 0, height: 0 };
    _this.canvasRef = React.createRef();
    return _this;
  }

  createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.initCanvas();
        _this2.resize = _this2.resize.bind(_this2);
        window.addEventListener("resize", _this2.resize);
      }, 100);

      var canvas = this.canvasRef.current;
      this.props.onCanvasDidMount && this.props.onCanvasDidMount(canvas);
    }
  }, {
    key: "initCanvas",
    value: function initCanvas() {
      var canvas = this.canvasRef.current;
      if (this.props.globalCompositeOperation) {
        var context = canvas.getContext("2d");
        context.globalCompositeOperation = this.props.globalCompositeOperation;
      }

      var _setCanvasSize = this.setCanvasSize(canvas),
          width = _setCanvasSize.width,
          height = _setCanvasSize.height;

      this.heartbeatDetectionCanvasSize(canvas);
      this.props.onCanvasInited(canvas, width, height);
    }
  }, {
    key: "heartbeatDetectionCanvasSize",
    value: function heartbeatDetectionCanvasSize(canvas) {
      var _this3 = this;

      this._id = setInterval(function () {
        if (_this3.canvasRef.current) {
          var newHeight = _this3.canvasRef.current.clientHeight;
          if (newHeight !== _this3.size.height) {
            var _setCanvasSize2 = _this3.setCanvasSize(canvas),
                width = _setCanvasSize2.width,
                height = _setCanvasSize2.height;

            _this3.props.onResize && _this3.props.onResize(width, height);
          }
        }
      }, 1000 / 10);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      try {
        window.removeEventListener("resize", this.resize);
        clearInterval(this._id);
      } catch (e) {}
    }
  }, {
    key: "resize",
    value: function resize() {
      var canvas = this.canvasRef.current;

      var _setCanvasSize3 = this.setCanvasSize(canvas),
          width = _setCanvasSize3.width,
          height = _setCanvasSize3.height;

      this.props.onResize && this.props.onResize(width, height);
    }
  }, {
    key: "setCanvasSize",
    value: function setCanvasSize(canvas) {
      var width = this.canvasRef.current.clientWidth;
      var height = this.canvasRef.current.clientHeight;

      this.size.width = width;
      this.size.height = height;
      canvas.width = width;
      canvas.height = height;
      return { width: width, height: height };
    }
  }, {
    key: "handleWaypointEnter",
    value: function handleWaypointEnter() {
      RAFManager.start();
    }
  }, {
    key: "handleWaypointLeave",
    value: function handleWaypointLeave() {
      RAFManager.stop();
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = { width: "100%", height: "100%" };

      if (this.props.bg) {
        style = Object.assign(style, {
          position: "fixed",
          zIndex: -1,
          top: 0,
          left: 0
        });
      }
      return style;
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      this.props.onMouseDown && this.props.onMouseDown(e);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("canvas", {
        ref: this.canvasRef,
        onMouseDown: this.handleMouseDown.bind(this),
        style: this.getStyle()
      });
    }
  }]);
  return Canvas;
}(React.Component);

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {};
}

function getColor(color, a) {
    var c = void 0;
    if (color) {
        c = hexToRgb(color);
        return "rgba(" + c.r + "," + c.g + "," + c.b + ", " + a + ")";
    } else {
        return null;
    }
}

var Square = function (_React$Component) {
  inherits(Square, _React$Component);

  function Square(props) {
    classCallCheck(this, Square);

    var _this = possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this, props));

    _this.colors = ["#9ECCFA", "#05386B", "#05386B", "#04C1C8", "#9ECCFA", "#05386B"];
    _this.renderProton = _this.renderProton.bind(_this);
    return _this;
  }

  createClass(Square, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      try {
        RAFManager.remove(this.renderProton);
        this.proton.destroy();
      } catch (e) {}
    }
  }, {
    key: "onCanvasDidMount",
    value: function onCanvasDidMount(canvas) { 
      canvas.style.backgroundColor = '#e8ecf1';
    }
  }, {
    key: "onCanvasInited",
    value: function onCanvasInited(canvas, width, height) {
      this.createProton(canvas, width, height);
      RAFManager.add(this.renderProton);
    }
  }, {
    key: "onResize",
    value: function onResize(width, height) {
      var dis = 150;
      this.crossZoneBehaviour.zone.width = width + 2 * dis;
      this.crossZoneBehaviour.zone.height = height + 2 * dis;
      this.proton.renderers[0].resize(width, height);
    }
  }, {
    key: "createProton",
    value: function createProton(canvas, width, height) {
      this.proton = new Proton();
      var emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(this.props.num ? this.props.num : 50);
      emitter.damping = 0;

      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(4, 70));
      emitter.addInitialize(new Proton.Velocity(new Proton.Span(2, 10), new Proton.Span(0), "polar"));
      emitter.addInitialize(new Proton.Position(new Proton.LineZone(0, canvas.height, canvas.width, canvas.height)));

      var dis = 150;
      var crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(0 - dis, 0 - dis, canvas.width + 2 * dis, canvas.height + 2 * dis), "cross");
      emitter.addBehaviour(crossZoneBehaviour);
      emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.1, 0.55)));
      emitter.addBehaviour(new Proton.Color(this.colors));

      emitter.emit("once");
      this.proton.addEmitter(emitter);
      var renderer = this.createRenderer(canvas);
      this.proton.addRenderer(renderer);

      this.crossZoneBehaviour = crossZoneBehaviour;
      emitter.preEmit(2);
    }
  }, {
    key: "createRenderer",
    value: function createRenderer(canvas) {
      var context = canvas.getContext("2d");
      var renderer = new Proton.CustomRenderer();

      renderer.onProtonUpdate = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
      };

      renderer.onParticleCreated = function (particle) {
        var w = particle.radius || 60;
        var h = Proton.MathUtil.randomAToB(100, 200, "int");
        particle.data.w = w;
        particle.data.h = h;
      };

      renderer.onParticleUpdate = function (particle) {
        var w = particle.data.w;
        var h = particle.data.h;
        context.save();
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;

        context.translate(particle.p.x, particle.p.y);
        context.rotate(Proton.MathUtil.degreeTransform(particle.rotation));
        context.translate(-particle.p.x, -particle.p.y);

        context.beginPath();
        context.rect(particle.p.x - w / 2, particle.p.y - h / 2, w, h);

        context.closePath();
        context.fill();
        context.globalAlpha = 1;
        context.restore();
      };

      return renderer;
    }
  }, {
    key: "renderProton",
    value: function renderProton() {
      this.proton && this.proton.update();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Canvas, { bg: this.props.bg,
        globalCompositeOperation: "lighter",
        onCanvasDidMount: this.onCanvasDidMount.bind(this),
        onCanvasInited: this.onCanvasInited.bind(this),
        onResize: this.onResize.bind(this)
      });
    }
  }]);
  return Square;
}(React.Component);

var Cobweb = function (_React$Component) {
  inherits(Cobweb, _React$Component);

  function Cobweb(props) {
    classCallCheck(this, Cobweb);

    var _this = possibleConstructorReturn(this, (Cobweb.__proto__ || Object.getPrototypeOf(Cobweb)).call(this, props));

    _this.renderProton = _this.renderProton.bind(_this);
    return _this;
  }

  createClass(Cobweb, [{
    key: "onCanvasInited",
    value: function onCanvasInited(canvas, width, height) {
      this.createProton(canvas, width, height);
      RAFManager.add(this.renderProton);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      try {
        RAFManager.remove(this.renderProton);
        this.proton.destroy();
      } catch (e) {}
    }
  }, {
    key: "onResize",
    value: function onResize(width, height) {
      this.crossZoneBehaviour.zone.width = width;
      this.crossZoneBehaviour.zone.height = height;
      this.proton.renderers[0].resize(width, height);
    }
  }, {
    key: "createProton",
    value: function createProton(canvas, width, height) {
      this.proton = new Proton();

      var emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(this.props.num ? new Proton.Span(this.props.num) : new Proton.Span(100), new Proton.Span(0.05, 0.2));

      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(1, 4));
      emitter.addInitialize(new Proton.Life(Infinity));

      var pointZone = new Proton.Position(new Proton.RectZone(0, 0, width, height));
      emitter.addInitialize(pointZone);
      emitter.addInitialize(new Proton.Velocity(new Proton.Span(0.3, 0.6), new Proton.Span(0, 360), "polar"));

      emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.2, 0.9)));
      emitter.addBehaviour(new Proton.Color(this.props.color || "#333"));
      this.crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(0, 0, width, height), "cross");
      emitter.addBehaviour(this.crossZoneBehaviour);

      emitter.emit("once");
      emitter.damping = 0;
      this.proton.addEmitter(emitter);
      this.proton.addRenderer(this.createRenderer(canvas, emitter));
    }
  }, {
    key: "createRenderer",
    value: function createRenderer(canvas, emitter) {
      var _this2 = this;

      var context = canvas.getContext("2d");
      var renderer = new Proton.CanvasRenderer(canvas);
      var R = 140;

      renderer.onProtonUpdateAfter = function () {
        var particles = emitter.particles;

        for (var i = 0; i < particles.length; i++) {
          for (var j = i + 1; j < particles.length; j++) {
            var pA = particles[i];
            var pB = particles[j];
            var dis = pA.p.distanceTo(pB.p);

            if (dis < R) {
              var alpha = (1 - dis / R) * 0.5;
              context.strokeStyle = getColor(_this2.props.color, alpha) || "rgba(3, 3, 3, " + alpha + ")";
              context.beginPath();
              context.moveTo(pA.p.x, pA.p.y);
              context.lineTo(pB.p.x, pB.p.y);
              context.closePath();
              context.stroke();
            }
          }
        }
      };

      return renderer;
    }
  }, {
    key: "renderProton",
    value: function renderProton() {
      this.proton && this.proton.update();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Canvas, { bg: this.props.bg,
        globalCompositeOperation: "darker",
        onCanvasInited: this.onCanvasInited.bind(this),
        onResize: this.onResize.bind(this)
      });
    }
  }]);
  return Cobweb;
}(React.Component);

var ParticlesBg = function (_Component) {
  inherits(ParticlesBg, _Component);

  function ParticlesBg(props) {
    classCallCheck(this, ParticlesBg);
    return possibleConstructorReturn(this, (ParticlesBg.__proto__ || Object.getPrototypeOf(ParticlesBg)).call(this, props));
  }

  createClass(ParticlesBg, [{
    key: "getRandom",
    value: function getRandom() {
      var _props = this.props,
          num = _props.num,
          bg = _props.bg,
          color = _props.color;

      // Code source from here, thanks author
      // https://github.com/drawcall/Proton/blob/gh-pages/source/src/utils/Rand.js

      if (!this.random) {
        this.random = new Rand();
        this.random.set(0.04, React.createElement(Cobweb, { num: num, bg: bg, color: color }));
        this.random.set(0.08, React.createElement(Square, { num: num, bg: bg, color: color }));
      }
      return this.random.getResult();
    }
  }, {
    key: "getBgParticles",
    value: function getBgParticles() {
      var _props2 = this.props,
          type = _props2.type,
          num = _props2.num,
          bg = _props2.bg,
          color = _props2.color;


      var particles = void 0;
      switch (String(type).toLowerCase()) {
        case "cobweb":
          particles = React.createElement(Cobweb, { num: num, bg: bg, color: color });
          break;
        case "square":
          particles = React.createElement(Square, { num: num, bg: bg, color: color });
          break;

        default:
          particles = React.createElement(Square, { num: num, bg: bg, color: color });
          break;
      }

      return particles;
    }
  }, {
    key: "render",
    value: function render() {
      var particles = this.getBgParticles();
      return React.createElement(
        React.Fragment,
        null,
        particles
      );
    }
  }]);
  return ParticlesBg;
}(Component);

export default ParticlesBg;
//# sourceMappingURL=index.es.js.map
