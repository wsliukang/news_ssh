	var ue;
		$(function(){
		ue=UE.getEditor('content');
			$("#savenews").click(function(){
				var title=$("#title").textbox("getValue");
				var cruser=$("#cruser").textbox("getValue");
				var content=ue.getContent();
				
				if(title==""){
					parent.$.messager.alert('系统提示','请输入新闻标题','warning');
					return;
				}
				if(cruser==""){
					parent.$.messager.alert('系统提示','请输入新闻发布人','warning');
					return;
				}
				if(content==""){
					parent.$.messager.alert('系统提示','请输入新闻内容','warning');
					return;
				}
				
			$.ajax({
            url : "${ctxPath}/news/saveAdd",
      //只封装和传输指定的数据
            data :{"title":title,"cruser":cruser,"content":content},
            type:"POST",
            success : function (res) {
                  if (res=="true") {
                        parent.$.messager.alert('系统提示','添加成功','info');
                  }else {
                  parent.$.messager.alert('系统提示',res,'warning');              }
                  return false;
            },
            
            error : function(res) { 
            parent.$.messager.alert('系统错误','请核实错误','warning');return false;        }
      });
		});
		})