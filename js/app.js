$(function(){
	var panel_group = $('#accordion');
	//ajax		初始化数据
	$.ajax({
		url:'data.php?action=data_init',
		dataType:'json',
		type:'get',
		success:function(data){
			for(var i=0; i<data.length; i++){
				var panel = _create_panel(data[i]);
				panel_group.append(panel);
			}
			//debugger;
			//折叠全部
			$('#onOff').click(function(){
				//debugger;
				for (var i = 1; i <= data.length; i++) {
					$(function () { $('#'+ i +'').collapse('toggle')});
				}
			});
		}
	});
	
	//添加伙伴
	$('.pull-right').click(function(){
		layer.prompt({title: '输入新增姓名!', formType: 2},function(text, index){
			//ajax
			$.ajax({
				url:'data.php?action=add_user',
				data:{name:text},
				dataType:'JSON',
				type:'POST',
				success:function(data){
					var panel = _create_panel(data);
					panel_group.append(panel);
				}
			});
			layer.close(index);
		});
		
	});

	function _create_panel(data){
		var panel = $('<div class="panel panel-default"></div>');
		var panel_title = $('<div class="panel-heading"></div>');
		var h4 = $('<h4 class="panel-title"></h4>');
		var a_btn = $('<a data-toggle="collapse" data-parent="#accordion" class="btn" href="#'+ data["id"] +'">'+data["id"]+' : '+ data["username"] +'</a>');
		var add_btn = $('<button class="btn btn-default pull-right" id="add_btn">添加笔记</button>');
		var clearfix = $('<div class="clearfix"></div>');
		add_btn.attr('dataId',data['id']);
		h4.append(a_btn);
		h4.append(add_btn);
		h4.append(clearfix);
		panel_title.append(h4);
		panel.append(panel_title);
		//panel.append('<div>追加</div>');
		if($.isArray(data['wx'])){
			var div_id = $('<div id="'+ data["id"] +'" class="panel-collapse collapse in"></div>');
			var panel_body = $('<div class="panel-body table-responsive"></div>');
			var table = $('<table class="table"></table>');
			var thead = $('<thead><tr><th>ID</th><th>微信号</th><th>好友人数</th><th>注册人数</th><th>注册平台</th><th>存款人数</th><th>创建时间</th><th>操作</th></tr></thead>');
			var tbody = $('<tbody></tbody>');
			for(var i=0; i < data['wx'].length; i++){
				var tr = _create_tr(data['wx'][i]);
				tbody.append(tr);
			}
			table.append(thead);
			table.append(tbody);
			panel_body.append(table);
			div_id.append(panel_body);
			panel.append(div_id);
		}else{
			var div_id = $('<div id="'+ data["id"] +'" class="panel-collapse collapse in"></div>');
			var panel_body = $('<div class="panel-body table-responsive"></div>');
			var table = $('<table class="table"></table>');
			var thead = $('<thead><tr><th>ID</th><th>微信号</th><th>好友人数</th><th>注册人数</th><th>注册平台</th><th>存款人数</th><th>创建时间</th><th>操作</th></tr></thead>');
			var tbody = $('<tbody></tbody>');
			table.append(thead);
			table.append(tbody);
			panel_body.append(table);
			div_id.append(panel_body);
			panel.append(div_id);
		}
		add_btn.click(function(){
			var user_id = $(this).attr('dataId');
			var append_length;
			var data = [];
			$(function () { $('#'+user_id+'').collapse('show')});
			
			data['wx_id'] = "无";
			data['wx_name'] = "无";
			data['gf_counts'] = "无";
			data['reg_counts'] = "无";
			data['reg_where'] = "无";
			data['m_in_counts'] = "无";
			data['created_time'] = "无";
			var tr = _create_wx(data,user_id);
			table.append(tr);
			console.log(data);
		});
		//debugger;
		return panel;
	}
	//添加微信记录
	function _create_wx(d,id){
		//debugger;
		var user_id = id;
		var tr = $('<tr></tr>');
		var td = $('<td>'+d["wx_id"]+'</td><td><input type="text" class="form-control" value="" /></td><td><input type="text" class="form-control" value="" /></td><td><input type="text" class="form-control" value="" /></td><td><input type="text" class="form-control" value="" /></td><td><input type="text" class="form-control" value="" /></td><td><input type="text" class="form-control" value="" /></td>'); 
		var opt_td = $('<td></td>');
		var save = $('<button type="button" class="btn btn-default btn-sm">保存</button>');
		var canl = $('<button type="button" class="btn btn-default btn-sm">取消</button>');
		opt_td.append(save);
		opt_td.append(canl);
		canl.click(handlcanl);
		function handlcanl(){
			$(this).parent().parent().remove();
		};
		save.click(function(){
			var tr = $(this).parent().parent();
			var input = tr.find('input');
			var data = {
				wx_name:input[0].value,
				gf_counts:input[1].value,
				reg_counts:input[2].value,
				reg_where:input[3].value,
				m_in_counts:input[4].value,
				created_time:input[5].value,
				user_id:user_id
			};
			
			//ajax
			$.ajax({
				url:'data.php?action=save_wx',
				data:data,
				type:'post',
				dataType:'json',
				success:function(id){
					if(id){
						data['wx_id'] = id;
						var html_tr = _create_tr(data);
						tr.replaceWith(html_tr);
						//alert(data);
					}
				}
			})
		});
		tr.append(td);
		tr.append(opt_td);
		return tr;
	}

	function _create_tr(d){
		var tr = $('<tr></tr>');
		var td = $('<td>'+d["wx_id"]+'</td><td>'+d["wx_name"]+'</td><td>'+d['gf_counts']+'</td><td>'+d['reg_counts']+'</td><td>'+d["reg_where"]+'</td><td>'+d["m_in_counts"]+'</td><td>'+d['created_time']+'</td>'); 
		var opt_td = $('<td></td>');
		var del = $('<button type="button" class="btn btn-default btn-sm">删除</button>');
		del.attr('dataId',d["wx_id"]);
		var edit = $('<button type="button" class="btn btn-default btn-sm">编辑</button>');
		edit.attr('dataId',d["wx_id"]);
		//编辑微信记录
		edit.click(handledit);
		function handledit(){
				var id = $(this).attr('dataId');
				var tr = $(this).parent().parent();

				var input_tr = $('<tr></tr>');
				var td = $('<td>'+d["wx_id"]+'</td><td><input type="text" class="form-control" value="'+d["wx_name"]+'" /></td><td><input type="text" class="form-control" value="'+d["gf_counts"]+'" /></td><td><input type="text" class="form-control" value="'+d["reg_counts"]+'" /></td><td><input type="text" class="form-control" value="'+d['reg_where']+'" /></td><td><input type="text" class="form-control" value="'+d["m_in_counts"]+'" /></td><td><input type="text" class="form-control" value="'+d["created_time"]+'" /></td>'); 
				var opt_td = $('<td></td>');
				var save = $('<button type="button" class="btn btn-default btn-sm">保存</button>');
				var canl = $('<button type="button" class="btn btn-default btn-sm">取消</button>');
				opt_td.append(save);
				opt_td.append(canl);
				//取消
				canl.click(function(){
					input_tr.replaceWith(tr);
					tr.find('button').eq(0).click(handledit);
					tr.find('button').eq(1).click(handldel);
				});
				//保存
				save.click(function(){
					var tr = $(this).parent().parent();
					var input = tr.find('input');
					var data = {
						wx_name:input[0].value,
						gf_counts:input[1].value,
						reg_counts:input[2].value,
						reg_where:input[3].value,
						m_in_counts:input[4].value,
						created_time:input[5].value,
						wx_id:id
					};
					//ajax
					$.ajax({
						url:'data.php?action=update_wx',
						data:data,
						type:'post',
						dataType:'json',
						success:function(msg){
							//debugger;
							if(msg == 1){
								var html_tr = _create_tr(data);
								input_tr.replaceWith(html_tr);
							}else{
								layer.alert('没有做修改的内容的哦!');
							}
						}
					});
					//debugger;
				});
				input_tr.append(td);
				input_tr.append(opt_td);
				tr.replaceWith(input_tr);
				
				console.log(d);
			}
		//删除微信记录
		del.click(handldel);
		function handldel(){
				var id = $(this).attr('dataId');
				var _this = $(this);
				//ajax
				$.ajax({
					url:'data.php?action=del_wx',
					data:{id:id},
					dataType:'json',
					type:'post',
					success:function(data){
						//debugger;
						if(data == 1){
							_this.parent().parent().remove();
						}else{
							layer.alert('删除失败');
						}

					}
				});
				//console.log(id);
			}
		opt_td.append(edit);
		opt_td.append(del);
		tr.append(td);
		tr.append(opt_td);
		return tr;
	}

})
