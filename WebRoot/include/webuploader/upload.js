var upfileGrid;
var state = 'pending';
var initfilesize = 0;
var md5value = "";
var isUpFile = false;//判断是否有文件上传成功，来提示dialog进行下部操作
$(function () {
	var $ = jQuery,
    $list = $('#thelist'),
    $btn = $('#ctlBtn'),
    state = 'pending',
    uploader;
	$btn.hide();
	/*
    upfileGrid = $("#upfileGrid").datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true,
        nowrap: true,
        animate: false,
        border: false,
        fitColumns: true,
        singleSelect: false,
        idField: 'fileId',
        pagination: false,
        columns: [[
            {field: 'ck', checkbox: true},
            {title: 'fileId', field: 'fileId', hidden: true, width: 100},
            {title: '文件名称', field: 'fileName', width: 230, fixed: true},
            {title: '文件大小', field: 'fileSize', width: 80, fixed: true},
            {title: '文件验证', field: 'validateMd5', width: 60, fixed: true},
            {
                title: '上传进度', field: 'progress', width: 180, fixed: true, formatter: function (value, rec) {
                var htmlstr = '<div class="easyui-progressbar progressbar" style="width: 170px; height: 20px;" value="' + value + '" text="' + value + '%">' +
                    '<div class="progressbar-text" style="width: 170px; height: 20px; line-height: 20px;">' + value + '%</div>' +
                    '<div class="progressbar-value" style="width: ' + value + '%; height: 20px; line-height: 20px;">' +
                    '<div class="progressbar-text" style="width: 170px; height: 20px; line-height: 20px;">' + value + '%</div>' +
                    '</div>' +
                    '</div>';
                return htmlstr;
            }
            },
            {title: '上传状态', field: 'fileState', width: 80, fixed: true},
        ]]
    });

    // 在文件开始发送前做些异步操作。做md5验证
    // WebUploader会等待此异步操作完成后，开始发送文件。
    WebUploader.Uploader.register({
        "before-send-file": "beforeSendFile"
    }, {
        beforeSendFile: function (file) {
            var task = new $.Deferred();
            (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
                upfileGrid.datagrid('updateRow',
                    {
                        index: upfileGrid.datagrid('getRowIndex', file.id),
                        row: {validateMd5: (percentage * 100).toFixed(2) + "%"}
                    });
            }).then(function (val) {
                $.ajax({
                    type: "POST"
                    , url: "./upload/md5Validate.do"
                    , data: {
                        type: "md5Check", md5: val
                    }
                    , cache: false
                    , timeout: 3000
                    , dataType: "json"
                }).then(function (data, textStatus, jqXHR) {
                    if (data.isHave) {   //若存在，这返回失败给WebUploader，表明该文件不需要上传
                        task.reject();
                        uploader.skipFile(file);
                        upfileGrid.datagrid('updateRow',
                            {
                                index: upfileGrid.datagrid('getRowIndex', file.id),
                                row: {fileState: "秒传", progress: 100}
                            });
                    } else {
                        $.extend(uploader.options.formData, {md5: val});
                        task.resolve();
                    }
                }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                    task.resolve();
                });
            });
            return $.when(task);
        }
    });
*/

    uploader = WebUploader.create({
        // 不压缩image
        resize: false,
        // swf文件路径
        swf: base+'webuploader/Uploader.swf',
        // 默认文件接收服务端。
        server: base+'file/impchk',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',
        fileSingleSizeLimit: 500 * 1024,//单个文件大小
        accept: [{
            title: 'file',
            extensions: 'xls,xlsx',
            mimeTypes: '.xls,.xlsx'
        }]
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        //var fileSize = tim.formatFileSize(file.size);
        /*var fileSize = file.size;
        var row = {
            fileId: file.id,
            fileName: file.name,
            fileSize: fileSize,
            validateMd5: '0%',
            progress: 0,
            fileState: "等待上传"
        };
        upfileGrid.datagrid('insertRow', {
            index: 0,
            row: row
        });*/
    	
    	$list.append( '<div id="' + file.id + '" class="item">' +
    	        '<b style="color:#00f">' + file.name + '</b>  <span style="color:#f00">等待上传导入...</span>' +
    	    '</div>' );
    	$btn.show();
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        //upfileGrid.datagrid('updateRow',
        //    {index: upfileGrid.datagrid('getRowIndex', file.id), row: {progress: (percentage * 100).toFixed(2)}});
    	var $li = $( '#'+file.id ),
        $percent = $li.find('.progress .progress-bar');
    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<div class="progress progress-striped active">' +
          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
          '</div>' +
        '</div>').appendTo( $li ).find('.progress-bar');
    }
    $li.find('span').text('上传中');
    $percent.css( 'width', percentage * 100 + '%' );
    });

    //文件上传成功
    uploader.on('uploadSuccess', function (file) {
    	$( '#'+file.id ).find('span').text('已上传');
        /*var rows = upfileGrid.datagrid("getRows");
        //上传成功设置checkbox不可用
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].fileId == file.id) {
                $("input[type='checkbox']")[i + 1].disabled = true;
            }
        }
        $("#removeUpFile").linkbutton("disable");
        upfileGrid.datagrid('updateRow',
            {index: upfileGrid.datagrid('getRowIndex', file.id), row: {fileState: '上传成功'}});
        isUpFile = true;*/
    });
    //文件上传失败
    uploader.on('uploadError', function (file) {
        //upfileGrid.datagrid('updateRow',
        //    {index: upfileGrid.datagrid('getRowIndex', file.id), row: {fileState: '上传失败'}});
    	$( '#'+file.id ).find('span').text('上传出错');
    	$("#loading").hide();
    });

    uploader.on('uploadComplete', function (file) {
    	$( '#'+file.id ).find('.progress').fadeOut();
    	$("#loading").hide();
    });

    uploader.on('uploadFinished', function () {//成功后

    });

    uploader.on('error', function (handler) {
        if (handler == 'F_EXCEED_SIZE') {
            tim.parentAlert('error', '上传的单个文件不能大于' + initfilesize + '。<br>操作无法进行,如有需求请联系管理员', 'error');
        } else if (handler == 'Q_TYPE_DENIED') {
            tim.parentAlert('error', '不允许上传此类文件!。<br>操作无法进行,如有需求请联系管理员', 'error');
        }
    });
    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }

        if ( state === 'uploading' ) {
            $btn.linkbutton({text:'暂停上传'});
        } else {
            $btn.linkbutton({text:'开始导入'});
        }
    });

    $btn.click(function() {
        if ( state === 'uploading' ) {
            uploader.stop(true);
        } else {
        	$("#loading").show();
            uploader.upload();
        }
    });
});//$(function(){})结束

/*从队列中移除文件*/
function removeFile(fileId) {
    var fileRows = upfileGrid.datagrid("getSelections");
    var copyRows = [];
    for (var j = 0; j < fileRows.length; j++) {
        copyRows.push(fileRows[j]);
    }
    for (var i = 0; i < copyRows.length; i++) {
        var index = upfileGrid.datagrid('getRowIndex', copyRows[i]);
        uploader.removeFile(copyRows[i].fileId, true);
        upfileGrid.datagrid('deleteRow', index);
    }
    upfileGrid.datagrid('clearSelections');
}

function uploadToServer() {
    if (uploader.getFiles().length <= 0) {
        tim.parentAlert('提示', '没有上传的文件!', 'error');
        return;
    }
    if (state === 'uploading') {
        uploader.stop();
    }
    else {
        uploader.upload();
    }
}

//初始化上传参数
function initUpLoad(args) {
    var opts = {};
    if (args) {
        if (args.url != null && args.url != "") {
            opts.server = args.url;
        }
        if (args.size != null && args.size != "") {
            initfilesize = args.size;
            opts.fileSingleSizeLimit = args.size;
        }
        if (args.args != null && args.args != "") {
            opts.formData = args.args;
        }
        if (opts) {
            $.extend(uploader.options, opts);
        }
    }
}

function getSuccess() {
    return isUpFile;
}