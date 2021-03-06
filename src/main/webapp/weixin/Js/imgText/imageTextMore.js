
   function doSearch() {
            //先销毁在初始化 否则只查询第一次
	   		$("#cusTable").bootstrapTable('destroy'); 
	   
            $('#cusTable').bootstrapTable({
                url: basePath+'/pc/getImgTextList.do',         //请求后台的URL（*）
                method: 'get',                      //请求方式（*）
                toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                showRefresh:false,
                paginationHAlign:'left',
               // search:true,
                //searchAlign:'left',
                toolbarAlign:'left',
                buttonsAlign:'left',
                queryParams:function(params) {
                	 return {
                		 limit: params.limit,
                		 offset: params.offset,
                		 type:1,
                		 parentId:"0",
                		 status:$('#status').val()
                		 };
                },
                sortable: false,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,                       //初始化加载第一页，默认第一页
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                //strictSearch: true,
                clickToSelect: true,                //是否启用点击选中行
                //height: 460,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "id",                     //每一行的唯一标识，一般为主键列
                cardView: false,                    //是否显示详细视图
                detailView: false,                   //是否显示父子表
                contentType: 'application/json;charset=UTF-8',//这里我就加了个utf-8
                dataType: 'json',
                //showPaginationSwitch:true,
                onLoadSuccess: function(data){
                },
                  onLoadError: function(){  //加载失败时执行
                },
                columns: [
				{
				    field: '',
				    title: '选择框',
				    checkbox:true
				},
                 {
                    field: 'id',
                    title: '序号',
                    hidden:true,
                    visible:false
                },{
                    field: 'article_id',
                    title: '',
                    hidden:true,
                    visible:false
                }, {
                    field: 'title',
                    title: '标题'
                },{
        			field : 'opt',
        			title : '操作',
        			width : '300px',
        			align : 'center',
        			formatter : formatOper
        		}
               ]
            });
    };
    
    
    function toUpdate(id) {
    	window.location.href=basePath + "/pc/toGetUpdateImgTextMore.do?id="+id;
    }

    function toAdd() {
    	window.location.href=basePath + "/pc/toGetAddImgTextMore.do";
    }
    
    
    function toBatchDelete() {
    	var $data=$('#cusTable').bootstrapTable('getSelections');
    	//alert(JSON.stringify($data));
    	var ids="";
    	if($data.length>0){
    		$($data).each(function (index, obj) {
    			ids+=obj.id+"@";
            });
    	}else if($data.length>1){
    		alert("只能删除一行选中数据");
    		return false;
    	}else{
    		alert("请选择删除对象");
    		return false;
    	}
    		$.ajax({
    			type : "POST",
    			url : basePath + "/pc/deleteImgTextMore.do",
    			data : {
    				"id" : ids,
    			},
    			async : false,
    			dataType : "json",
    			success : function(result) {
    				$('#delModal').modal('hide');
    				doSearch();
    				if(result.rtnCode == 0){
    					alert(result.rtnMsg);
    				}else{
    					alert(result.rtnMsg);
    				}
    			}
    		});
    }
    
    function toSyn() {
    	var $data=$('#cusTable').bootstrapTable('getSelections');
    	var ids="";
    	if($data.length>0){
    		$($data).each(function (index, obj) {
    			ids+=obj.id+"@";
            });
    	}else if($data.length>1){
    		alert("请选择一行数据");
    		return false;
    	}else{
    		alert("请选择同步数据");
    		return false;
    	}
    		$.ajax({
    			type : "POST",
    			url : basePath + "/pc/synImgTextMore.do",
    			data : {
    				"id" : ids,
    			},
    			async : false,
    			dataType : "json",
    			success : function(result) {
    				$('#synModal').modal('hide');
    				doSearch();
    				if(result.rtnCode == 0){
    					alert(result.rtnMsg);
    				}else{
    					alert(result.rtnMsg);
    				}
    			}
    		});
    }
    
   
    

   
    
    
    function formatOper(value, row, index) {
    	var msg = '';
		if (row.delFlag == 0) {
			msg = "删除";
		} else if (row.delFlag == 1) {
			msg = "启用";
		}
    	var url = "<a href=\"javascript:void(0);\" onclick=\"toUpdate('" + row.id + "')\">编辑</a>&nbsp;"+
    	"<a href=\"#delModal\" role=\"button\" data-toggle=\"modal\">"+msg+"</a>&nbsp;";
    	if(row.is_syn==0){
    		url+="<a href=\"#synModal\" role=\"button\" data-toggle=\"modal\">同步</a>&nbsp;";
    	}
    	
    	return url;
    }