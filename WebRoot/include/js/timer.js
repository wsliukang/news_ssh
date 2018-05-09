	function _timer(elem, options, callback) {
		this.element = $(elem);
		this.timerType = options.timerType || '+';
		this.count = options.count || 0;
		this.maxCount = options.maxCount || 60 * 60 * 2;//120minutes
		this.outputObj = options.outputObj || null;
		this.tag = options.tag;
		this.callback = callback;
	};
	_timer.prototype = {
		tick : function() {
			var _this = this, _str = '', msObj;
			if (_this.timerType === '+') {//计时，递增
				if (_this.count < 0) {
					_this.count = 0;
					_str = "00:00:00";
				} else {
					if (_this.count < _this.maxCount) {
						_this.count++;
					} else {
						_this.stop();
						this.callback && this.callback();
						return false;
					}
				}
			} else {//倒计时，递减
				if (_this.count <= 0) {
					_str = "00:00:00";
					_this.stop();
					this.callback && this.callback();
					return false;
				} else {
					_this.count--;
					if(_this.count == 300){
						var html0="考试还剩余5分钟<br /><span style='color:red'>请在考试结束前交卷！</span>";
						dlg_h(300,120,"考试在线提醒",html0,null,null,"warning");
						//$('#ksdlg').dialog({content:html0});
						//$('#ksdlg').dialog('open');
						dowhat1=0;
					}else if(_this.count == 30)  {
						var html0="考试只剩余30秒钟，请交卷！";
						//$('#ksdlg').dialog({content:html0});
						//$('#ksdlg').dialog('open');
						dlg_h(300,120,"考试在线提醒",html0,null,null,"warning");
						dowhat1=0;
					}
				}
			}
			msObj = _this.format(_this.count);
			_str = msObj.day !== '' ? (msObj.day + ' ' + msObj.hour + ':'
					+ msObj.mini + ':' + msObj.sec) : (msObj.hour + ':'
					+ msObj.mini + ':' + msObj.sec);

			//采用分段标签形式
				_this.element[0].innerHTML ="<b>"+ _str+"</b>";
				//_this.element.find("li.hours").text(msObj.hour);
				//_this.element.find("li.minutes").text(msObj.mini);
				//_this.element.find("li.seconds").text(msObj.sec);
			//_this.outputObj && (_this.outputObj.innerHTML = _str);
		},
		format : function(timeStr) {
			var ms = {};
			var d = 24 * 60 * 60, h = 60 * 60, m = 60, D, H, M, S, newCount;
			var fx = function(str) {
				return str < 10 ? '0' + str : str;
			}
			newCount = Math.floor(timeStr);
			D = Math.floor(newCount / d) > 0 ? Math.floor(newCount / d) + '天' : '';
			newCount = newCount % d;
			H = Math.floor(newCount / h) > 0 ? Math.floor(newCount / h) : 00;
			newCount = newCount % h;
			M = Math.floor(newCount / m) > 0 ? Math.floor(newCount / m) : 00;
			S = Math.floor(newCount % m);
			ms.day = D;
			ms.hour = fx(H);
			ms.mini = fx(M);
			ms.sec = fx(S);
			return ms
		},
		start : function() {
			var _this = this;
			if (!timerId) {
				timerId = setInterval(function() {
					_this.tick()
				}, 1000);
			}
		},
		stop : function() {
			clearInterval(timerId);
			timerId = null;
		}
	};	