window.requestAnimFrame = (function () {
		return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
window.onload = function(){
	
  loop()
	var asd = 0
	$(document).click(function(e){
        textUp(e,2000,asd,200)
        asd++
        if(asd>6){
        	asd=0
        }
   })
	qiedangao()
}
function qiedangao(){
	var qieimg = document.getElementById('qieimg');
	var btncorner = document.getElementById('corner-button');
	var coutinscake = document.getElementById('coutinus_cake');
	btncorner.onclick = function(){
		qieimg.src = "img/qiedg.gif"
		setTimeout(function(){
			btncorner.style.display = "none"
			coutinscake.style.display = "none"
			setTimeout(render, 500);
		},2340)
	}
	}
    function textUp(e,time,asd,heightUp){
    	var list = ['陈','雪','文','生', '日', '快', '乐']
        var colors = '#'+Math.floor(Math.random()*(0xffffff-0x40e0D0+1)+0x40e0D0).toString(16);
        var $i = $('<span/>').text(list[asd])
        var xx = e.pageX||e.clientX+document.body.scrollLeft
        var yy = e.pageY||e.clientY+document.body.scrollTop
        $('body').append($i)
        
        if(xx>=0&&xx<50||yy<20){
            $i.css({
                top:yy,
                left:xx,
                color:colors,
                transform:'translate(0%,0%)',
                display:'block',
                position:'absolute',
                fontSize:'24px',
                fontFamily:'xinxin',
                zIndex:9
            })
        }
        else{
            $i.css({
            top:yy,
            left:xx,
            color:colors,
            transform:'translate(-50%,-50%)',
            display:'block',
            fontSize:'24px',
            fontFamily:'xinxin',
            position:'absolute',
            zIndex:9
        })
        }
        $i.animate({
            top:yy-(heightUp?heightUp:200),
            opacity:0        
        },time,function(){
            $i.remove()
        })
    }
    ///////////////----------烟花--------------///////////
    
//现在我们将为演示设置基本变量
var canvas1 = document.getElementById('srkl_left_canvas'),
canvas2 = document.getElementById('srkl_right_canvas'),
		ctx1 = canvas1.getContext( '2d' ),
		ctx2 = canvas2.getContext( '2d' ),
		// 全屏幕尺寸
		cw1 = canvas1.offsetWidth,
		ch1 = canvas1.offsetHeight,
		cw2 = canvas2.offsetWidth,
		ch2 = canvas2.offsetHeight,
		// 烟花台
		fireworks = [],
		// 爆炸粒子集合
		particles = [],
		// 开始色调
		hue = 120,
		// 当发射烟花与点击，太多得到一次发射没有限制，一个发射每5循环
		limiterTotal = 5,
		limiterTick = 0,
		// 这将为fireworks的自动发射计时，每80次循环一次
		timerTotal = 80,
		timerTick = 0,
		mousedown = false,
		// 鼠标x坐标,
		mx,
		// 鼠标y坐标
		my;
		
//设置画布尺寸
canvas1.width = cw1;
canvas1.height = ch1;
canvas2.width = cw2;
canvas2.height = ch2;

// 鼠标事件绑定
// 在mousemove上更新鼠标坐标
canvas1.addEventListener( 'mousemove', function( e ) {
	mx = e.pageX - canvas.offsetLeft;
	my = e.pageY - canvas.offsetTop;
});

// 切换mousedown状态并阻止画布被选中
canvas1.addEventListener( 'mousedown', function( e ) {
	e.preventDefault();
	mousedown = true;
});

canvas1.addEventListener( 'mouseup', function( e ) {
	e.preventDefault();
	mousedown = false;
});
// 在mousemove上更新鼠标坐标
canvas2.addEventListener( 'mousemove', function( e ) {
	mx = e.pageX - canvas.offsetLeft;
	my = e.pageY - canvas.offsetTop;
});

// 切换mousedown状态并阻止画布被选中
canvas2.addEventListener( 'mousedown', function( e ) {
	e.preventDefault();
	mousedown = true;
});

canvas2.addEventListener( 'mouseup', function( e ) {
	e.preventDefault();
	mousedown = false;
});
//现在我们要为整个演示设置函数占位符

//取随机数
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

//计算两点之间的距离
function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

//创建烟花画布
function Firework( sx, sy, tx, ty ) {
	//实际坐标
	this.x = sx;
	this.y = sy;
	// 开始坐标
	this.sx = sx;
	this.sy = sy;
	//目标坐标
	this.tx = tx;
	this.ty = ty;
	//从起点到目标的距离
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	//跟踪每个烟花过去的坐标，以创建一个轨迹效果，增加坐标计数，以创建更突出的轨迹
	this.coordinates = [];
	this.coordinateCount = 3;
	//用当前坐标填充初始坐标集合
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	//Math.atan2反正切函数
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 4;
	this.acceleration = 1.05;
	this.brightness = random( 50, 70 );
	//圆形目标指示半径
	this.targetRadius = 1;
}

// 更新烟花
Firework.prototype.update = function( index ) {
	//删除坐标数组中的最后一项
	this.coordinates.pop();
	//将当前坐标添加到数组的开头
	this.coordinates.unshift( [ this.x, this.y ] );
	
	//循环目标指示半径
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	//加快放烟火的速度
	this.speed *= this.acceleration;
	
	//根据角度和速度得到电流速度
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	//烟花的速度能达到多远
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// 如果移动的距离，包括速度，大于到目标的初始距离，那么目标已经到达
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createParticles( this.tx, this.ty );
		//删除烟花，使用传递到更新函数的索引来确定删除哪个
		fireworks.splice( index, 1 );
	} else {
		//没有达到目标，继续前进
		this.x += vx;
		this.y += vy;
	}
}

//画烟花
Firework.prototype.draw = function() {
	ctx1.beginPath();
	//移动到集合中最后一个被跟踪的坐标，然后画一条线到当前的x和y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx1.stroke();
	
	ctx1.beginPath();
	//用一个脉冲圆画出这个烟花的目标
	ctx1.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx1.stroke();
	ctx2.beginPath();
	//移动到集合中最后一个被跟踪的坐标，然后画一条线到当前的x和y
	ctx2.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx2.lineTo( this.x, this.y );
	ctx2.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx2.stroke();
	
	ctx2.beginPath();
	//用一个脉冲圆画出这个烟花的目标
	ctx2.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx2.stroke();
}

//创建粒子
function Particle( x, y ) {
	this.x = x;
	this.y = y;
	// 跟踪每个粒子过去的坐标，以创建一个轨迹效果，增加坐标计数，以创建更突出的轨迹
	this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	//在所有可能的方向上随机设置一个角度，以弧度为单位
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 10 );
	// 摩擦力会使粒子减速
	this.friction = 0.95;
	// 重力会把粒子拉下来
	this.gravity = 1;
	//将色调设置为整个色调变量的随机数+-20
	this.hue = random( hue - 20, hue + 20 );
	this.brightness = random( 50, 80 );
	this.alpha = 1;
	//设置粒子淡出的速度
	this.decay = random( 0.015, 0.03 );
}

//更新爆炸粒子
Particle.prototype.update = function( index ) {
	// 删除坐标数组中的最后一项
	this.coordinates.pop();
	// 将当前坐标添加到数组的开头
	this.coordinates.unshift( [ this.x, this.y ] );
	//减缓粒子
	this.speed *= this.friction;
	// 适用于速度
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	//粒子消失参数
	this.alpha -= this.decay;
	
	// 当alpha值足够低时，根据传入的索引移除粒子
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}

// 绘制爆炸粒子
Particle.prototype.draw = function() {
	ctx1. beginPath();
	// 移动到集合中最后一个跟踪的坐标，然后画一条线到当前的x和y
	ctx1.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx1.lineTo( this.x, this.y );
	ctx1.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx1.stroke();
	ctx2. beginPath();
	// 移动到集合中最后一个跟踪的坐标，然后画一条线到当前的x和y
	ctx2.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx2.lineTo( this.x, this.y );
	ctx2.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx2.stroke();
}

//创建粒子组/爆炸
function createParticles( x, y ) {
	//增加粒子数为更大的爆炸，小心画布性能打击增加的粒子
	var particleCount = 30;
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// 主要演示循环
function loop() {
	// 这个函数将在requestAnimationFrame中无休止地运行
	requestAnimFrame( loop );
	
	// 随着时间的推移，增加色调以得到不同颜色的烟花
	hue += 0.5;
	
	// 通常使用clearRect()来清除画布
	// 我们想要创造一个尾随效果
	// 将组合操作设置为destination-out将允许我们以特定的不透明度清除画布，而不是完全清除它
	ctx1.globalCompositeOperation = 'destination-out';
	//减少alpha属性来创建更突出的轨迹
	ctx1.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx1.fillRect( 0, 0, cw1, ch1 );
	// 将复合操作更改回主模式
	// 打火机创造明亮的亮点，因为烟花和粒子相互重叠
	ctx1.globalCompositeOperation = 'lighter';
	ctx2.globalCompositeOperation = 'destination-out';
	//减少alpha属性来创建更突出的轨迹
	ctx2.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx2.fillRect( 0, 0, cw2, ch2 );
	// 将复合操作更改回主模式
	// 打火机创造明亮的亮点，因为烟花和粒子相互重叠
	ctx2.globalCompositeOperation = 'lighter';
	
	// 循环每个烟花，画它，更新它
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// 循环每个粒子，画出它，更新它
	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw();
		particles[ i ].update( i );
	}
	
	// 自动发射烟花随机坐标，当鼠标不下来
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// 在屏幕的底部中间开始放烟花，然后设置随机的目标坐标，随机的y坐标将设置在屏幕上半部分的范围内
			for(var i =0;i<4;i++){
				fireworks.push( new Firework( cw1 / 2, ch1, random( 0, cw1 ), random( 0, ch1 / 2 ) ) );
			}
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	
	// 限制当鼠标下降时烟花发射的速度
	if( limiterTick >= limiterTotal ) {
		if( mousedown ) {
			// 在屏幕的底部中间开始烟火，然后设置当前鼠标坐标为目标
			fireworks.push( new Firework( cw1 / 2, ch1, mx, my ) );
			limiterTick = 0;
		}
	} else {
		limiterTick++;
	}
}

///////////------落雪---------////////////
function k(a, b, c) {
		if(a.addEventListener) a.addEventListener(b, c, false);
		else a.attachEvent && a.attachEvent("on" + b, c)
	}

	function g(a) {
		if(typeof window.onload != "function") window.onload = a;
		else {
			var b = window.onload;
			window.onload = function() {
				b();
				a()
			}
		}
	}

	function h() {
		var a = {};
		for(type in {
				Top: "",
				Left: ""
			}) {
			var b = type == "Top" ? "Y" : "X";
			if(typeof window["page" + b + "Offset"] != "undefined") a[type.toLowerCase()] = window["page" + b + "Offset"];
			else {
				b = document.documentElement.clientHeight ? document.documentElement : document.getElementById('srkl_continus');
				a[type.toLowerCase()] = b["scroll" + type]
			}
		}
		return a
	}

	function l() {
		var a = document.getElementById('srkl_continus'),
			b;
		if(window.innerHeight) b = window.innerHeight;
		else if(a.parentElement.clientHeight) b = a.parentElement.clientHeight;
		else if(a && a.clientHeight) b = a.clientHeight;
		return b
	}

	function i(a) {
		this.parent = document.getElementById('srkl_continus');
		this.createEl(this.parent, a);
		//this.size = Math.random() * 5 + 5;
		this.size = 60;
		this.el.style.width = Math.round(this.size) + "px";
		this.el.style.height = Math.round(this.size) + "px";
		this.maxLeft = document.getElementById('srkl_continus').offsetWidth - this.size;
		this.maxTop = document.getElementById('srkl_continus').offsetHeight - this.size;
		this.left = Math.random() * this.maxLeft;
		this.top = h().top + 1;
		this.angle = 1.4 + 0.4 * Math.random();
		this.minAngle = 1.4;
		this.maxAngle = 1.6;
		this.angleDelta = 0.01 * Math.random();
		this.speed = 2 + Math.random()
	}
	var j = false;
	g(function() {
		j = true
	});
	var f = true;
	window.createSnow = function(a, b) {
		if(j) {
			var c = [],
				m = setInterval(function() {
					f && b > c.length && Math.random() < b * 0.0025 && c.push(new i(a));
					!f && !c.length && clearInterval(m);
					for(var e = h().top, n = l(), d = c.length - 1; d >= 0; d--)
						if(c[d])
							if(c[d].top < e || c[d].top + c[d].size + 1 > e + n) {
								c[d].remove();
								c[d] = null;
								c.splice(d, 1)
							} else {
								c[d].move();
								c[d].draw()
							}
				}, 40);
			k(window, "scroll", function() {
				for(var e = c.length - 1; e >= 0; e--) c[e].draw()
			})
		} else g(function() {
			createSnow(a, b)
		})
	};
	window.removeSnow = function() {
		f = false
	};
	i.prototype = {
		createEl: function(a, b) {
			this.el = document.createElement("img");
			//this.el.setAttribute("src", b + "img/snow" + Math.floor(Math.random() * 4) + ".gif");
			this.el.setAttribute("src", b + "img/gift" + Math.floor(Math.random() * 2+1) + ".png");
			this.el.style.position = "absolute";
			this.el.style.display = "block";
			this.el.style.zIndex = "7";
			this.el.onmousemove = null;
			this.parent.appendChild(this.el)
		},
		move: function() {
			if(this.angle < this.minAngle || this.angle > this.maxAngle) this.angleDelta = -this.angleDelta;
			this.angle += this.angleDelta;
			this.left += this.speed * Math.cos(this.angle * Math.PI);
			this.top -= this.speed * Math.sin(this.angle * Math.PI);
			if(this.left < 0) this.left = this.maxLeft;
			else if(this.left > this.maxLeft) this.left = 0
		},
		draw: function() {
			this.el.style.top = Math.round(this.top) + "px";
			this.el.style.left = Math.round(this.left) + "px"
		},
		remove: function() {
			this.parent.removeChild(this.el);
			this.parent = this.el = null
		}
	}
	createSnow('', 60);
	//====context==
	var prefix = '';
			var skills = [
				'陈雪文，生日快乐陈雪文，生日快乐陈雪文，生日快乐陈雪文，生日快乐陈雪文，生日快乐'
			].map(function(s) {
				return s + ".";
			});
			var delay = 2;
			var step = 1;
			var tail = 5;
			var timeout = 75;
			var p = document.createElement('p');
			var ccc = document.getElementById('srkl_continus')
			ccc.appendChild(p);
			var colors = [
				"rgb(110,64,170)",
				"rgb(150,61,179)",
				"rgb(191,60,175)",
				"rgb(228,65,157)",
				"rgb(254,75,131)",
				"rgb(255,94,99)",
				"rgb(255,120,71)",
				"rgb(251,150,51)",
				"rgb(226,183,47)",
				"rgb(198,214,60)",
				"rgb(175,240,91)",
				"rgb(127,246,88)",
				"rgb(82,246,103)",
				"rgb(48,239,130)",
				"rgb(29,223,163)",
				"rgb(26,199,194)",
				"rgb(35,171,216)",
				"rgb(54,140,225)",
				"rgb(76,110,219)",
				"rgb(96,84,200)",
			];

			function getRandomColor() {
				return colors[Math.floor(Math.random() * colors.length)];
			}

			function getRandomChar() {
				return String.fromCharCode(Math.random() * (555 - 333) + 333);
			}

			function getRandomColoredString(n) {
				var fragment = document.createDocumentFragment();
				for(var i = 0; i < n; i++) {
					var char = document.createElement('span');
					char.textContent = getRandomChar();
					char.style.color = getRandomColor();
					fragment.appendChild(char);
				}
				return fragment;
			}
			/** Global State */
			var $$ = {
				text: '',
				prefixP: -tail,
				skillI: 0,
				skillP: 0,
				direction: 'forward',
				delay: delay,
				step: step
			};

			function render() {
				var skill = skills[$$.skillI];
				if($$.step) {
					$$.step--;
				} else {
					$$.step = step;
					if($$.prefixP < prefix.length) {
						if($$.prefixP >= 0) {
							$$.text += prefix[$$.prefixP];
						}
						$$.prefixP++;
					} else {
						if($$.direction === 'forward') {
							if($$.skillP < skill.length) {
								$$.text += skill[$$.skillP];
								$$.skillP++;
							} else {
								/*if ($.delay) {
								    $.delay--;
								}
								else {
								    $.direction = 'backward';
								    $.delay = delay;
								}*/
							}
						} else {
							if($$.skillP > 0) {
								$$.text = $$.text.slice(0, -1);
								$$.skillP--;
							} else {
								$$.skillI = ($$.skillI + 1) % skills.length;
								$$.direction = 'forward';
							}
						}
					}
				}
				p.textContent = $$.text;
				p.appendChild(getRandomColoredString($$.prefixP < prefix.length ?
					Math.min(tail, tail + $$.prefixP) :
					Math.min(tail, skill.length - $$.skillP)));
				setTimeout(render, timeout);
}
