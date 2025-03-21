<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
	function logout(){
		var form = document.createElement('form');
		var objs;
		objs = document.createElement('input');
		objs.setAttribute('type', 'hidden');
		objs.setAttribute('name', 'param');
		objs.setAttribute('value', "{'page':'1'}");
		form.appendChild(objs);
		form.setAttribute('method', 'post');
		form.setAttribute('action', '../mobile/logout.do');
		document.body.appendChild(form);
		sessionStorage.clear();
		form.submit();
	}
	function goUrl(){
		var form = document.createElement('form');
		var objs;
		var url = '';
		console.log(sessionStorage.getItem('hq_id'));

		if(sessionStorage.getItem('hq_id')=='N1000DOWON'){
			url = '../mobile/mbleMain2.do';
		}else{
			url = '../mobile/mbleMain.do';
		}
		objs = document.createElement('input');
		objs.setAttribute('type', 'hidden');
		objs.setAttribute('name', 'param');
		objs.setAttribute('value', "{'page':'1'}");
		form.appendChild(objs);
		form.setAttribute('method', 'post');
		form.setAttribute('action', url);
		document.body.appendChild(form);
		form.submit();
	}
</script>
<style>
	#header{
		height: 100px;
		border-bottom: 1px solid;
	}
	#header ul{
		overflow: hidden;
	}
	#header ul li{
		float: left;
		list-style: none;
		padding-left: 20px;
		padding-top:  16px;
	}
	.doin{
		font-size: 3.3em;
		padding-top:  15px;
	}
	#header ul li:not(.doin){
		float: right;
		padding-right: 10px;
	}
	#logout,#home{
		background-color: #99CC33;
		width: 164px;
	    height: 67px;
	    border: 0;
	    color: white;
	    font-size: 3.1em;
	}

</style>
</head>
<body>
	<div id="header">
		<ul>
			<li class="doin"><spen >현장관리시스템</spen></li>
			<li><button id="logout" onclick="logout();">LogOut</button></li>
			<li><button id="home" onclick="goUrl()">home</button></li>
		</ul>
	</div>
</body>
</html>