/**
 * 
 */
var MAX_PAGES = 0;//总行数
var MAX_TIMES = 10 * 60;  //打字时间s
var totalInputCount = 0; //总录入数
var totalCharCount = 0; //总字数
var backSpaceCount = 0; //退格次数
var totalErrCount = 0; //总错误数
var totalTimeSec = 0; //总耗时s
var totalIdelSec = 0; //连续空闲时间s
var accRate = 0; //正确率
var speedArray = new Array(); //速度曲线
var accrateArray = new Array(); //正确率曲线
var timeArray = new Array(); //时间曲线
var lineArray=new Array();//一篇文章分成若干行
var timerID = 0; //计时器ID
var isPause = false; //是否暂停
var curPage = 1;   //当前page
var cnen="cn";	//中英文
var typingstr;
var lastTotal = 0; //前一阶段总数
var lastErr = 0;
var last_ok = 0;
var isEnd = false;//是否完成
var speed=0;
var okper2=0.0;
var myscore=0.0;//得分
var snapShot = ""; //曲线快照
var timeMs = 200; //时间脉冲200ms
var timeTotalMs=0;//已过去时间ms,200ms递增
var spdlmt = 390;//速度上限(字/分钟)
var SECLIMT = 12;//录入异常字数上限
var artType = 2;//五笔拼音
var secLmtNum = 0;//录入异常次数(>SECLIMT)
var totalPaseCount=1;//must 1
var getPinYin = pinyinEngine.toPinyin;

$(function () {
  $("#text-ipt").on('change keyup keydown', inputChk); //录入框绑定事件
  $("#text-ipt").keydown( keyDown );
  //$("#page_bgn").change( changePage );
  //$("#rec_mins").change( changeMins );
  //$("#cnen").change( changeCnEn );
  $("#pause").click(function(){Pause();});
  $('#rlt-dialog').dialog('close');
  $("#dotyping").click(function(){do_typing();});
  $("#dotyping2").click(function(){
	  if(last_ok==0){
	  getErrText(curPage);
		isEnd = true;
		doSubmit();//计算成绩
	  }

	  if( timerID ) {
			clearInterval(timerID);
			timerID = 0;
		}
		$("#test_total").html( "0" );
		$('#test_error').html( "0" ); 
		$("#test_speed").html( "0" ); 
		$("#test_per").html( "0%" ); 
		$("#test_rest").html( "10分钟0秒" );
		$('#rec_speed').val( "0" );
		$('#rec_rate').val( "0" );
		$('#type-tips').html( "" );
	  do_typing();});
});
function do_typing(){
	typingstr=$("#typingc").textbox("getValue");//用来测试的短文
	  totalCharCount=typingstr.length;//准确的字数
	  $("#test_char").html(totalCharCount);
	  MAX_PAGES=0;
	  cutstr(typingstr,76);//把短文分成若干行
	  //MAX_PAGES=lineArray.length;
	  if(MAX_PAGES<=0){
		  $.messager.alert("打字测试系统","你还没有准备好测试文字","warning");
		  return;
	  }
	  toPage(1);
	  $("#aa").accordion("select",1);//切换到测试UI
	  $('#text-ipt').removeAttr("disabled");
}
//////
//录入开始，计时也开始
function Begin()
{
  if( isEnd ){
    if( timerID > 0 ) clearInterval(timerID);
    timerID = 0;
    return;
  }
  totalTimeSec = 0;
  timerID = setInterval(calcSpeed, timeMs);
  $('#pause').removeAttr("disabled");
}
///确认停止录入
function stopinp(){
	getErrText(curPage);
	isEnd = true;
	doSubmit();//计算成绩
}
//暂停/停止录入
function Pause()
{
	var resttime = MAX_TIMES - totalTimeSec;
	var restchar=totalCharCount- totalInputCount;
	if(restchar>0 && resttime>0){
		$.messager.confirm("系统提示","还有"+restchar+"个字没有录入完成，你确定要停止录入吗？",function(r){
			if (r){
				stopinp();
			}
		});
	}else{
		getErrText(curPage);
		isEnd = true;
		doSubmit();//计算成绩
		return;
	}
}
//监听按键
function keyDown( eve )
{
	if( eve.keyCode == 8 || eve.keyCode == 46 ) { //退格或删除
		backSpaceCount ++;
	}
	timeTotalIdelMs = 0;
  $("#test_bkspace").html( backSpaceCount );
}
//计算速度
var timeTotalIdelMs = 0;
var lastTotalTimeSec = 0;
function calcSpeed()//每200ms计算一次
{
    timeTotalMs += timeMs;
    timeTotalIdelMs += timeMs;
	totalTimeSec = Math.floor(timeTotalMs / 1000);
	if( totalTimeSec < 1 ){
	    return;
	}
	totalIdelSec = timeTotalIdelMs / 1000;  
	speed = totalInputCount / totalTimeSec * 60;
	if( speed.toString().indexOf(".") > 0 ){
		speed = speed.toString().substring(0, speed.toString().indexOf(".") + 3);//2位小数
	}
	if(totalPaseCount>2 && speed > spdlmt )//390
	{
		Pause();
		$.messager.alert("你的打字速度太快了，网站可能无法保存!");
		return false;
	}
	//正确率
	var okper = 0;
	if(totalInputCount > 0) okper = (totalInputCount-totalErrCount) / totalInputCount * 100;
	if( okper.toString().indexOf(".") > 0 ){
		okper = okper.toString().substring(0, okper.toString().indexOf(".") + 3);//2位小数
	}
	accRate = okper;
	var rest = MAX_TIMES - totalTimeSec;
	$("#test_total").html( totalInputCount );
	$('#test_error').html( totalErrCount ); 
	$("#test_speed").html( speed ); 
	$("#test_per").html( okper + "%" ); 
	$("#test_rest").html( Math.floor(rest / 60) + "分钟" + rest % 60 +"秒" );
	$('#rec_speed').val( speed );
	$('#rec_rate').val( okper );
	//最终结果
	$("#rltdiv-spd").html( speed );
	$('#rltdiv-err').html( totalErrCount );
	$("#rltdiv-per").html( okper );
	okper2=(2*totalInputCount-totalCharCount- totalErrCount) / totalCharCount ;
	if(okper2<0)okper2=0;
	myscore=(parseInt(speed/7)*okper2).toFixed(1);
	if(myscore>10)myscore=10.0;
	$("#rltdiv-score").html( myscore);
	
	//保存或推送
	var ti = totalTimeSec % 5;
	if( totalTimeSec > 240 ) ti = totalTimeSec % 10;
	else if( totalTimeSec > 300 ) ti = totalTimeSec % 20;
	else if( totalTimeSec > 600 ) ti = totalTimeSec % 30;
	       
	if( totalTimeSec >0 && totalTimeSec > lastTotalTimeSec )
	{
	    lastTotalTimeSec = totalTimeSec;
	    if( ti == 0 ){
    		speedArray.push( speed );
    		accrateArray.push( okper );
    		timeArray.push( totalTimeSec );
	    }
      //实时推送打字得分
/*      if( (totalTimeSec % 2) == 0 ){
        var score_ = speed * okper / 100.0;
        TypeSend(score_);
      }*/
	}

	if( totalTimeSec >= MAX_TIMES )//超过规定时间
	{
		getErrText(curPage);
		isEnd = true;
		doSubmit();//计算成绩
		return true;
	}
	else if( totalIdelSec >= 20 )//停顿20s
	{
		/*
        isEnd = true;*/
		//$.messager.alert("超过20秒没有打字，还是重新开始吧!", function(){ location.reload(true); });
	}
  else if( secLmtNum > 6 ){//异常录入次数超过6次
    Pause();
    isEnd = true;
    $.messager.alert("打字测试","录入异常(如粘贴)次数太多","warning");
  }
}
//录入检测
var last_input="";//上一次已录入
function inputChk()
{
  timeTotalIdelMs = 0;
  var ipt_txt = document.getElementById("text-ipt").value;//当前已录入
  if( ipt_txt.length > 0 && timerID==0 ){
    Begin(); //刚开始
  }
  if(last_input.length>0)
  {
    var il=ipt_txt.length-last_input.length;//当前次录入的字数
    if(il>SECLIMT)//12
    {
      secLmtNum++;//异常了
    }
    //$('#tips').text(il+'/'+secLmtNum+'/'+totalPaseCount);
  }
  last_input = ipt_txt;
  var curerr = 0;
  var curtotal = 0;
  //var pageid = "#tab_page_"+cnen+" .art-page"+curPage;
  var srctxt =lineArray[curPage-1];// $(pageid).text();
  if(srctxt==undefined)return;
  var newtxt = '';
  var txt_wb = 0;
  last_ok = 0; //最后一个字符是否正确，不正确不翻页
	for (var i = 0;i < srctxt.length; i++){
		var t0 = srctxt.charAt(i);
		var t1 = t0;
		if( i<ipt_txt.length ){
			curtotal ++;
			t1 = ipt_txt.charAt(i);
		}
		if( t0 == t1){//录入正确
			if( i<ipt_txt.length )
				newtxt += ('<span class="txt-suc">'+ html_encode(t0) +'</span>');
			else if(i == ipt_txt.length){
				txt_wb = i-1;
				newtxt += ('<span class="txt-ul">'+ html_encode(t0) +'</span>');
			  } else {
				//newtxt += html_encode(t0);
				newtxt += ('<span class="txt-n">'+ html_encode(t0) +'</span>');
			  }
		}else{//录入错误
			curerr ++;
			newtxt += ('<span class="txt-err">'+ html_encode(t0) +'</span>');
		}
	}
	if( ipt_txt.length >= srctxt.length && ipt_txt.charAt(srctxt.length-1) == srctxt.charAt(srctxt.length-1) )
	{
	    last_ok = 1;
	}
	$('#text-out').html( newtxt );
  totalInputCount = lastTotal + curtotal;
  totalErrCount = lastErr + curerr;
  
  if( srctxt.length <= ipt_txt.length  && last_ok){//
    //转下一页
    lastTotal += curtotal;
    lastErr += curerr;
    getErrText(curPage);
    nextPage();
  }
  
  //拼音和五笔
  if( artType == 2 )
  {
      var py="", wb="", txt="", pw="";
      if( txt_wb>=0 && txt_wb<srctxt.length ){
        txt = srctxt.charAt(txt_wb);
        py = getPinYin(txt, false, ',');
        wb = getWuBi( txt );
        if( py!=txt ){
            pw = "&nbsp;&nbsp;<b style='color:#000'>"+txt+"</b> 拼音("+py+")";
            if(wb.length>0)
             pw += ", 五笔("+wb+")";
        }
      }
      
     /* if( txt_wb+1>=0 && txt_wb+1<srctxt.length ){
        txt = srctxt.charAt(txt_wb+1);
        py = getPinYin(txt, false, ',');
        wb = getWuBi( txt );
        if( py!=txt ){
            pw += "&nbsp;&nbsp;<b style='color:red'>"+txt+"</b> 拼音("+py+")";
            if(wb.length>0)
             pw += ", 五笔("+wb+")";
        }
      }*/
      $('#type-tips').html( pw );
  }
}
//下一页
function nextPage()
{
  curPage++;  
  toPage(curPage);
  totalPaseCount++;
}
//转到页
function toPage(pg)
{
  if( pg > MAX_PAGES ){
    isEnd = true;
    doSubmit(); //???
    return;
  }
  curPage = pg;
  if(curPage>MAX_PAGES)curPage=MAX_PAGES;
  //var pageid = "#tab_page_"+cnen+" .art-page"+pg;
  //var txt_out=$(pageid).text();
  var txt_out=lineArray[curPage-1];
  $('#text-out').html( txt_out );
  document.getElementById("text-ipt").value = "";  
}
function getErrText(pg) //一页或打字结束
{
  //统计错误的字
  var pageid = "#art-page"+pg;
  var ipt_txt = document.getElementById("text-ipt").value;
  var srctxt = $(pageid).text();
  for (var i = 0;i < srctxt.length; i++){
		var t0 = srctxt.charAt(i);
		var t1 = t0;
		if( i<ipt_txt.length ){
			t1 = ipt_txt.charAt(i);
      if( t0 != t1 && snapShot.indexOf(t0) < 0){
        snapShot += t0;//错误的字

      }
    }
	}
}
//提交表单,停止计时
function doSubmit()
{
	if( timerID ) {
		clearInterval(timerID);
		timerID = 0;
	}
	calcSpeed();

  $('#text-ipt').attr("disabled", "disabled");

  /*var p1 ="";// "<p><span>" + typingstr + "</span></p>";
    p1 += "<p><b><span class=tscore2>打字速度：" + speed + "字/分钟</span></b></p>";
    p1 += "<p><b><span class=tscore>实际正确率：" + (okper2*100).toFixed(1) + "%</span></b></p>";


 
	$('#rec_secs').val( totalTimeSec );
	$('#rec_error').val( totalErrCount );
	$('#rec_bkspace').val( backSpaceCount );
	$('#rec_total').val( totalInputCount );

	//快照
	$('#rec_snapshot').val( snapShot );
	//打字曲线
	var t = '[' + timeArray.join(',') + ']';
	var s = '[' + speedArray.join(',') + ']';
	var r = '[' + accrateArray.join(',') + ']';
	$('#rec_curve').val(t + ';' + s + ';' + r);
	
	//$.messager.alert("录入成绩："+myscore);
	*/
	$('#rlt-dialog').dialog('open');
	
}

function cutstr(str, len) { //按指定长度切分一篇文章 
lineArray.splice(0,lineArray.length); //清空原有数据     
var str_len = str.replace(/[^\x00-\xff]/g, '__').length; //匹配双字节字符(包括汉字在内).字符串实际长度，中文2，英文1.         
if (str_len <= len){lineArray.push(str);MAX_PAGES++;return;}//如果给定字符串小于指定长度；
var str_cut = new String();
var str_length = 0;
str_len=str.length;//
	for (var str_len2=0; str_len2<str_len; str_len2++) {//分离出每一行
		a = str.charAt(str_len2);
		str_length++;
		if (/[^\x00-\xff]/.test(a))  str_length++;//Unicode汉字[\u4e00-\u9fa5]
		str_cut = str_cut.concat(a);
		if(str_length >= len){
			lineArray.push(str_cut);
			MAX_PAGES++;
			str_length = 0;
			str_cut = new String();
		}
	}
	if(str_length < len){//最后一行
		lineArray.push(str_cut);
		MAX_PAGES++;
		str_length = 0;
		str_cut = new String();
	}
}
function html_encode(str) 
{ 
    var s = ""; 
    if (str.length == 0) return ""; 
    s = str.replace(/&/g, "&amp;"); 
    s = s.replace(/</g, "&lt;"); 
    s = s.replace(/>/g, "&gt;"); 
    s = s.replace(/\'/g, "&#39;"); 
    s = s.replace(/\"/g, "&quot;"); 
	//s = s.replace(/\n/g, "<br/>"); 
    return s; 
} 

