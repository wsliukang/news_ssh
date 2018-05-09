$(document).keypress(function(event){
	event.keyCode=0; 
    event.returnValue=false;
    return false;
});
$(document).keydown(function(event){
	event.keyCode=0; 
    event.returnValue=false;
    return false;
});
$(document).mousedown(function(event){
	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
	 if (window.event) {
         event = window.event;
     }
     if (event.button == 2) {//鼠标右键
    	 event.returnValue=false;
    	 return false;
     }
})
/*
$(document).keydown(function(event){
  if ((window.event.altKey)&& 
      ((window.event.keyCode==37)||   
       (window.event.keyCode==39)))  
  { //alt+left,alt+right
     event.returnValue=false;return false; 
  } 
  if ((event.keyCode==116)||
      (event.ctrlKey && event.keyCode==82)){ //F5,Ctrl+R
     event.keyCode=0; 
     event.returnValue=false;return false; 
     } 
  if(event.keyCode==32 || event.keyCode==8)	
  {//Space,backspace
     event.keyCode=0; 
     event.returnValue=false;return false; 
  }
  if (event.keyCode==27){//ESC
  event.keyCode=0;event.returnValue=false;return false;}  
  
  if (event.keyCode==114 || event.keyCode==115 || 
	  event.keyCode==116 || event.keyCode==117 || 
	  event.keyCode==118 || event.keyCode==119 || 
	  event.keyCode==120 || event.keyCode==121 || 
	  event.keyCode==123 || event.keyCode==122 ){//F3-F12
	  event.keyCode=0;event.returnValue=false;return false;} 
  if(event.ctrlKey && event.keyCode==67) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+C	
  if(event.ctrlKey && event.keyCode==86) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+V	
  if(event.ctrlKey && event.keyCode==70) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+F	
  if(event.ctrlKey && event.keyCode==87) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+W	
  if(event.ctrlKey && event.keyCode==69) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+E	
  if(event.ctrlKey && event.keyCode==72) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+H	
  if(event.ctrlKey && event.keyCode==73) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+I	
  if(event.ctrlKey && event.keyCode==79) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+X	
  if(event.ctrlKey && event.keyCode==76) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+U	
  if(event.ctrlKey && event.keyCode==80) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+Y	
  if(event.ctrlKey && event.keyCode==66) {event.keyCode=0;event.returnValue=false;return false;}//ctrl+B	
  if (event.ctrlKey && event.keyCode==78) {event.keyCode=0;event.returnValue=false;return false;}//Ctrl+N
  if (event.shiftKey && event.keyCode==121){event.keyCode=0;event.returnValue=false;return false;}//shift+F10
  //Shift+left mouse
  if (window.event.srcElement.tagName == "A" && window.event.shiftKey) {event.keyCode=0;event.returnValue=false;return false;}
});*/