<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>WIS MES System</title>
<script type="text/javascript" src="../../loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script>
	$(document).ready(function(){
		console.log(sessionStorage.getItem('accepted'));
		if(sessionStorage.getItem('accepted')){
			<% session.setAttribute("accepted", true); %>
			var form = document.createElement('form');
			var objs;
			objs = document.createElement('input');
			objs.setAttribute('type', 'hidden');
			objs.setAttribute('name', 'param');
			objs.setAttribute('value', "{'page':'1'}");
			form.appendChild(objs);
			form.setAttribute('method', 'post');
			if(sessionStorage.getItem("hq_id")=='N1000DOWON'){
				form.setAttribute('action', '../mobile/mbleMain2.do');
			}else{
				form.setAttribute('action', '../mobile/mbleMain.do');
			}
			document.body.appendChild(form);
			form.submit();
		}else{
			sessionStorage.clear();
		}

		$('input[name=stor_id]').keypress(function(event){
			if(event.keyCode == 13){
				var login_id = $('input[name=login_id]').val();
				var password = $('input[name=password]').val();
				if(login_id.trim() !='' && password.trim() !=''){
					loginSubmit();
				}else{
					if(login_id.trim() ==''){
						$('input[name=login_id]').focus();
					}else if(password.trim() == ''){
						$('input[name=password]').focus();
					}
				}
			}
		})
		$('input[name=login_id]').keypress(function(event){
			if(event.keyCode == 13){
				var stor_id = $('input[name=stor_id]').val();
				var password = $('input[name=password]').val();
				if(stor_id.trim() !='' && password.trim() !=''){
					loginSubmit();
				}else{
					if(stor_id.trim() ==''){
						$('input[name=stor_id]').focus();
					}else if(password.trim() == ''){
						$('input[name=password]').focus();
					}
				}
			}
		})
		$('input[name=password]').keypress(function(event){
			if(event.keyCode == 13){
				var stor_id = $('input[name=stor_id]').val();
				var login_id = $('input[name=login_id]').val();
				if(stor_id.trim() !='' && login_id.trim() !=''){
					loginSubmit();
				}else{
					if(stor_id.trim() ==''){
						$('input[name=stor_id]').focus();
					}else if(login_id.trim() == ''){
						$('input[name=login_id]').focus();
					}
				}
			}
		})
	});
	function loginSubmit() {

		var f = document.frm;									// form 태그를 가져온다.
		var path = '${path}';									// 이전 path

		var stor_id = document.getElementsByName('stor_id')[0].value.toUpperCase();	//id값
		var login_id = document.getElementsByName('login_id')[0].value;	//id값
		var password = document.getElementsByName('password')[0].value;	//pw값
		var obj = new Object();									//object로 담을 그릇
		var hq_chg ;

		if	(stor_id.length < 11) {
			hq_chg = 'N1000'+stor_id;
		}
		_global.hq_id		= hq_chg.substring(0,10);
		_global.hqof_idcd	= hq_chg.substring(0,10);
		_global.stor_id		= stor_id ;
		_global.login_pk	= login_id ;
		_global.login_id	= login_id;
		_global.stor_grp	= hq_chg;

		obj.hq_id		= _global.hq_id;
		obj.stor_id		= stor_id;
		obj.login_id	= login_id;
		obj.password	= password;
		obj.solution	= _global.solution;
		obj.app_name	= _global.app_site;
		var jsonData = JSON.stringify(obj);						//json형태로 변형
		$.ajax({
			url : _global.api_host_info+'/system/auth/identify.do',
			data:{param:jsonData},
			type:"post",
			async: false,
			dataType : 'json',
			success:function(data){
				console.log(data);
				if(data.success){
					if( data.message == "Invalid Storage"){
						alert("정보가 일치하지 않습니다.")
						_global.token_id = null;
					}else{
						_global.token_id = data.records.token_id;
						sessionStorage.setItem('accepted',true);
						sessionStorage.setItem('hq_id',_global.hq_id);
						var objt 				= new Object();									//object로 담을 그릇
							objt.hq_id			= _global.hq_id;
							objt.stor_id		= stor_id;
							objt.user_idcd		= data.records.login_pk;
						var jsonDatas			= JSON.stringify(objt);						//json형태로 변형
						$.ajax({
							url : _global.api_host_info+'/system/user/usermast/get/item1.do',
							data:{param:jsonDatas},
							type:"post",
							async: false,
							dataType : 'json',
							success:function(data){
								if(data.success){
									console.log(data);
									for (var i = 0; i < data.records.length; i++) {
										var chek = data.records[i].auth_idcd;
										if(chek){
											sessionStorage.setItem(data.records[i].auth_idcd,true);
										}
									}
								}else{
									alert(data.message);
								}
							},
							error: function (jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
								console.log(textStatus);
								console.log(errorThrown);
							}
						});
					}
				}else{
					alert(data.message);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
		var obj2 = new Object();

		obj2.path = path;
		if(_global.token_id){
			obj2.token_id = _global.token_id;
			obj2.hq_id = _global.hq_id;
		}
		if('${path}'){
			location.href='${path}';
		}else{
			var jsonData2 = JSON.stringify(obj2);
			f.param.value= jsonData2;								//hidden param의 value를 jsonData로 넣기
			f.action='../mobile/login.do';						//이동경로
			f.method='post';										//이동방식
			f.submit();												//서브밋진행
		}
	}
</script>
<style>
@media only screen and (min-device-width:1024px){
	*{
		padding: 0;
		margin: 0;
	}
	body{
		overflow-y: hidden;
		overflow-x: hidden;
	}
	#container{
		background: url(../../resource/img/sky_bg.jpg) center center / cover no-repeat fixed;
		right: auto;
		left: 1px;
		top: 0px;
		margin: 0px;
		height: 959px;
	}
	#content{
		position: absolute;
 		left: 50%;
/* 		top: 72%; */
		bottom : 1px;
		transform:translate(-50%, -50%);
		width: 400px;
		height: 200px;
		margin: 0 auto;
		border: 1px solid #99bce8 ;
		border-radius:5px;
		background-color: #dfe9f6;
	}
	#content .loginButton{

		text-align: right;
	}
	#content table{
		margin:50px auto;
	}
	#content table tr td{
		padding:4px 4px;
	}
	#content .loginButton button{
		background-color: #1e90ff;
		border: 0;
		color:white;
		width:80px;
		height:25px;
		border-radius: 3px;
	}
}
@media only screen and (min-device-width:320px) and (max-device-width:768px){
	*{
		padding: 0;
		margin: 0;
	}
	body{
		overflow-y: hidden;
		overflow-x: hidden;
	}
	#container{
		background: url(../../resource/img/sky_bg.jpg) center center / cover no-repeat fixed;
		height: 1401px;
		position: relative;
	}
	#content{
		position: absolute;
		left: 50%;
		top: 94%;
		float: inherit;
		bottom: 1px;
		transform: translate(-50%, -50%);
		width: 900px;
		height: 500px;
		margin: 0 auto;
		border: 1px solid #99bce8;
		border-radius: 5px;
		background-color: #dfe9f6;
	}
	#content .loginButton{

		text-align: right;
	}
	#content table{
		margin:50px auto;
	}
	#content table th{
		font-size: 5em;
		width: 300px;
	}
	#content input{
		font-size: 2.5em;
		height: 100px;
		border: 2px solid gray;
	}
	#content table tr td:not(.loginButton){
		padding:4px 4px;
		width: 300px;
	}
	#content .loginButton button{
		background-color: #1e90ff;
		margin: 6px;
		border: 0;
		color:white;
		width: 200px;
		height: 80px;
		border-radius: 3px;
		font-size:2.5em;
	}
}
</style>
</head>
<body>
	<div id = "container">
		<div id="content">
		<form name="frm" onsubmit="return loginSubmit();">
			<input type="hidden" name="param">
		</form>
			<table>
				<tr>
					<th>
						사업장ID
					</th>
					<td>
						<input type="text" name="stor_id" required="required" placeholder="사업장 코드를 입력 하세요.">
					</td>
				<tr>
					<th>
						로그인ID
					</th>
					<td>
						<input type="text" name="login_id" required="required" value="${id }"placeholder="로그인 ID를 입력 하세요.">
					</td>
				</tr>
				<tr>
					<th>
						패스워드
					</th>
					<td>
						<input type="password" name="password" required="required" placeholder="패스워드를 입력 하세요.">
					</td>
				</tr>
				<tr >
					<td colspan="2" class="loginButton">
						<button onclick="loginSubmit();" >Login</button>
					</td>
				</tr>
				</form>
			</table>
		</div>
	</div>
</body>
</html>