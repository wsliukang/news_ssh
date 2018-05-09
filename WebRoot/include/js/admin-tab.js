function closeAllTabs(){
	var tabs=$("#tabs").tabs("tabs");
	for(var i=0;i<tabs.length;i++){
		$("#tabs").tabs("close",i);
	}
}

function swNewTab(newtitle,newurl){
	if($('#tabs').tabs('exists',newtitle))return;
	closeAllTabs();
	$('#tabs').tabs('add',{
	title:newtitle,
	content:'<iframe id="mainframe" name="mainframe" scrolling="auto" height="99%" width="99%" frameboder="0" src="'+newurl+'"></iframe>',
	closable:true
	});
	}

function addNewTab(newtitle,newurl){
	if($('#tabs').tabs('exists',newtitle))return;
	$('#tabs').tabs('add',{
	title:newtitle,
	content:'<iframe id="mainframe" name="mainframe" scrolling="auto" height="99%" width="99%" frameboder="0" src="'+newurl+'"></iframe>',
	closable:true
	});
	}

