<?php 
	header('content-type:text/html;charset=utf-8');
	$db = new PDO('mysql:host=127.0.0.1;dbname=todo','root','root');

	$action = $_GET['action'];
	//简单的路由
	switch ($action) {
		case 'data_init':
			data_init($db);
			break;
		case 'add_user':
			add_user($db);
			break;
		case 'del_wx':
			del_wx($db);
			break;
		case 'save_wx':
			save_wx($db);
			break;
		case 'update_wx':
			update_wx($db);
			break;
	}
	//更新数据
	function update_wx($db){
		$info = $_POST;
		$z = $db->exec(" UPDATE weixin set wx_name='{$info["wx_name"]}',gf_counts='{$info["gf_counts"]}',reg_counts='{$info["reg_counts"]}',reg_where='{$info["reg_where"]}',m_in_counts='{$info["m_in_counts"]}',created_time='{$info["created_time"]}' where wx_id = '{$info["wx_id"]}'");
		if($z){
			echo '1';
			return;
		}
		echo "0";
	}
	//插入一条数据
	function save_wx($db){
		$info = $_POST;
		$z = $db->exec(" INSERT INTO `weixin` ( `wx_name`, `gf_counts`,`reg_counts`,`reg_where`,`m_in_counts`,`created_time`,`user_id`) VALUES ( '{$info["wx_name"]}', '{$info["gf_counts"]}','{$info["reg_counts"]}','{$info["reg_where"]}','{$info["m_in_counts"]}','{$info["created_time"]}','{$info["user_id"]}')");
		$id = $db->lastInsertId();
		if($z){
			echo $id;
		}
		//var_dump($info);
	}

	//删除微信记录
	function del_wx($db){
		$id = $_POST['id'];
		$z = $db->exec(" DELETE FROM weixin WHERE wx_id = '{$id}'");
		echo '1';
	}
	//添加用户
	function add_user($db){
		$user = $_POST['name'];
		$z = $db->exec(" INSERT into users (`username`) VALUES ('{$user}')");
		$id = $db->lastInsertId();
		$rs = $db->query(" SELECT * from users where id ='{$id}'");
		$info = $rs->fetchAll(PDO::FETCH_ASSOC)[0];
		echo json_encode($info);
	}
	//初始化数据
	function data_init($db){
		$data = getUserWeixinDate($db);
		echo json_encode($data);
	};

	//数据格式化处理
	function getUserWeixinDate($db){
		$user_rs = $db->query(" SELECT * from users");
		$user_data = $user_rs->fetchAll(PDO::FETCH_ASSOC);
		$wx_rs = $db->query(" SELECT * from weixin");
		$wx_data = $wx_rs->fetchAll(PDO::FETCH_ASSOC);
		$data = [];
		for ($i=0; $i < count($user_data); $i++) { 
			$data[] = $user_data[$i];
			for ($j=0; $j < count($wx_data); $j++) { 
				if($wx_data[$j]['user_id'] == $data[$i]['id']){
					$data[$i]['wx'][] = $wx_data[$j];
				}
			}
		}
		return $data;
	}
?>