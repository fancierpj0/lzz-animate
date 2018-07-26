const ABOVE_IE9 = window.getComputedStyle;


//以下是动画的算法

//- t要变化量
//- b初始位置
//- c当前时间
//- d动画持续总时间
const animateEffect = {
  //当前时间*变化量/持续时间+初始值
  Linear: function (t, b, c, d) {
    return c * t / d + b;
  },
  Quad: {//二次方的缓动（t^2）；
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
  Cubic: {//三次方的缓动（t^3）
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  },
  Quart: {//四次方的缓动（t^4）；
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  Quint: {//5次方的缓动（t^5）；
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  Sine: {//正弦曲线的缓动（sin(t)）
    easeIn: function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOut: function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
  },
  Expo: {//指数曲线的缓动（2^t）；
    easeIn: function (t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  Elastic: {//指数衰减的正弦曲线缓动；
    easeIn: function (t, b, c, d, a, p) {
      let s;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      }
      else s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function (t, b, c, d, a, p) {
      let s;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      }
      else s = p / (2 * Math.PI) * Math.asin(c / a);
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    easeInOut: function (t, b, c, d, a, p) {
      let s;
      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (.3 * 1.5);
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      }
      else s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
  },
  Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
    easeIn: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
  },
  Bounce: {//指数衰减的反弹缓动。
    easeIn: function (t, b, c, d) {
      return c - animateEffect.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) return animateEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      else return animateEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  }
}
////////////////////以上都是算法
/*
	animate的参数：当effect参数是数字的情况
	effect：是指定的动画效果，它可以由一个简单数字来快捷表示某种常用的动画效果，也可以以数组的方式来指定某个不常用的动画效果。还可以不给effect参数传值，则动画使用默认的效果（我们指定减速的效果为默认效果）
	如果用数字来快捷表示某种常用效果效，则
	0：减速效果Expo
	1:匀速效果:linear
	2:弹性:Elastic
	3:返回：Back
	4：反弹：Bounce
*/

/*
  前两个参数为必传，其它皆可省略
*/
function animate(ele, targetCollection, duration = 345, effect, callback) {
  //默认为easeOut减速
  let fnEffect = animateEffect.Expo.easeOut
    //TODO 每个属性具有各自的duration、effect、回调
    // , isMultiply;

  if (typeof effect == "number") {
    switch (effect) {
      case 0:
        break;
      case 1:
        fnEffect = animateEffect.Linear;
        break;
      case 2:
        fnEffect = animateEffect.Elastic.easeOut;
        break;
      case 3:
        fnEffect = animateEffect.Back.easeOut;
        break;
      case 4:
        fnEffect = animateEffect.Bounce.easeOut;
        break;
    }
  } else if (effect instanceof Array) {
    if (effect.length == 2) fnEffect = animateEffect[effect[0]][effect[1]];
  } else if (typeof effect == "function") { //说明effect没有传，使用默认值
    callback = effect;
  }

  if (typeof duration == "function") {
    callback = duration;
    duration = 345;
  }

  //用来保存多个方向begin；
  let oBegin = {}
    //用来保存多个方向的change;
    , oChange = {}
    //用来记录各个方向的距离是否有效
    , flag = 0;


  for (let attr in targetCollection) {
    //TODO 每个属性具有不同的duration、effect、回调
    // if(typeof targetCollection[attr] === 'object'){
    //   !isMultiply && (isMultiply = true);
    // }

    let target = animate.transToPx(ele, targetCollection, attr)
      , begin = animate.getCss(ele, attr)
      , change = target - begin;

    if (change) {//判断一下此方向的运动距离有效，不为0
      oBegin[attr] = begin;
      oChange[attr] = change;
      flag++;
    }
  }//for in 循环结束

  if (!flag) return;//如果各个方向的运动距离都是0，则结束动画的执行

  let interval = 15
    , times = 0;

  clearInterval(ele.timer);

  function step() {

    times += interval;
    if (times < duration) {
      for (let attr in oChange) {
        let change = oChange[attr]
          , begin = oBegin[attr]
          , val = fnEffect(times, begin, change, duration);

        animate.setCss(ele, attr, val);
      }
    } else { //times>duration
      for (let attr in oChange) {
        let target = targetCollection[attr];
        animate.setCss(ele, attr, target);
      }
      clearInterval(ele.timer);
      ele.timer = null;
      if (typeof callback == "function") {
        //this指向元素本身
        callback.call(ele);
      }
    }

  }

  ele.timer = setInterval(step, interval);
};

animate.transToPx = function (ele, targetCollection, attr) {

  const curVal = targetCollection[attr]

    , isEm = /^(-?\d+(\.\d+)?)em$/.test(curVal)

    , isRem = /^(-?\d+(\.\d+)?)rem$/.test(curVal)

    , isPercent = /^(-?\d+(\.\d+)?)%$/.test(curVal)

    , getComputedStyle = window.getComputedStyle;


  if (isEm) {
    let fontSize = getComputedStyle(ele, null)['fontSize']
      , newTarget = parseFloat(curVal) * parseFloat(fontSize);

    targetCollection[attr] = newTarget;
    return newTarget;
  }

  if (isRem) {
    let htmlFontSize = getComputedStyle(window.document.documentElement, null)['fontSize']
      , newTarget = parseFloat(curVal) * parseFloat(htmlFontSize);

    targetCollection[attr] = newTarget;
    return newTarget;
  }


  if (isPercent) {
    let position = getComputedStyle(ele, null)['position']
      , reference
      , reference_v
      , newTarget
      , isFixed
      , byRefWidth =( ['left', 'right', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].indexOf(attr) !== -1) || (attr === 'width')
      , byRefHeight = (['top', 'bottom'].indexOf(attr) !== -1) || (attr === 'height');


    //决定参照物元素
    if (position === 'absolute') reference = ele.offsetParent;
    if (position === 'fixed') {
      reference = window;
      isFixed = true;
    }
    //没错relative的百分比值是相对于包含块的，只有普通值才是相对于自身
    if (position === 'static' || position === 'relative') reference = ele.parentNode;


    //决定参照 参照物 的哪个属性
    if (byRefWidth) {
      isFixed ? reference_v = reference.innerWidth
        : reference_v = getComputedStyle(reference, null).width;

    } else if (byRefHeight){
      isFixed ? reference_v = reference.innerHeight
        : reference_v = getComputedStyle(reference, null).height;

    }else{

      switch (attr){
        case 'fontSize':
          reference_v = getComputedStyle((ele.parentNode||window.document.body), null).fontSize
          break;
        case 'lineHeigth':
          reference_v = getComputedStyle(ele, null).fontSize;
          break;
        case 'verticalAlign':
          reference_v = getComputedStyle(ele, null).lineHeight;
          break;
        case 'borderRadius':
          //TODO 暂不支持分开设置
          //横轴上的百分比参考的是元素自身的宽度，纵轴上的百分比参考的是元素自身的高度
          reference_v = getComputedStyle(ele, null).width;
          break;
        case 'backgroundPosition':
          //TODO background-position是参考剩余空间
          break;
      }

    }

    newTarget = parseFloat(reference_v) * parseFloat(curVal) / 100;
    targetCollection[attr] = newTarget;

    return newTarget;
  }

  //本身就为px单位的值
  return parseFloat(curVal);
};

animate.getCss = function (ele, attr) {
  if (ABOVE_IE9) {
    return parseFloat(window.getComputedStyle(ele, null)[attr]);
  } else {
    if (attr == "opacity") {
      let val = ele.currentStyle.filter
        //"alpha(opacity=50)";//匹配到这样的一个字符串，然后把这个字符串中的数字部分拿到
        , reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;

      return reg.test(val) ? reg.exec(val)[1] / 100
        //如果没有给IE中的不透明度赋值，则上边的正则会为false
        //而此时我们应该将1作为返回值(opacity:1)
        : 1;

    } else {
      return parseFloat(ele.currentStyle[attr]);
    }
  }
}

animate.setCss = function (ele, attr, val) {
  if (attr == "opacity") {
    ele.style.opacity = val;
    ele.style.filter = "alpha(opacity=" + val * 100 + ")";
  } else {
    ele.style[attr] = val + "px";
  }
}

export default animate;
