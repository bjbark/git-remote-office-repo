<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>현장관리 시스템 메인화면</title>
<script type="text/javascript">
	logout = function(){
		sessionStorage.removeItem('accepted')
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
		form.submit();
	}
	function goUrl(url){
		var form = document.createElement('form');
		var objs;
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
<style type="text/css">

@media only screen and (min-device-width:1024px){
	*{
		padding: 0;
		margin: 0;
	}
	#container table{
		margin: 0 auto;
		margin-top: 2%;
	}
	#container table caption{
		font-size: 2.0em;
		font-weight: bold;
		margin-bottom: 20px;
	}
	#container button{
		width: 600px;
		height: 100px;
		margin: 20px 0;
		border: 0;
		background-color:#99CC33;
		border-radius:5px;
		color: white;
		font-size: 1.5em;
	}
}
@media only screen and (min-device-width:320px) and (max-device-width:768px){
	*{
		padding: 0;
		margin:0;
	}
	#container{
		width: 100%;
	}
	table{
		margin: auto auto;
		margin-top: 25%;
	}
	table caption{
		font-size: 2.0em;
		font-weight: bold;
		margin-bottom: 20px;
	}
	button{
		width: 700px;
		height: 150px;
		margin: 20px 0;
		border: 0;
		background-color:#99CC33;
		border-radius:5px;
		color: white;
		font-size: 3em;
	}
}
</style>
</head>
<body>
<form>
</form>
<div id="container">
	<table>
		<tr>
			<td>
				<button  onclick="goUrl('../mobile/total_board1.do')">신작 금형 진행현황</button>
			</td>
		</tr>
		<tr>
			<td>
				<button onclick="goUrl('../mobile/total_board2.do')">설변.품질 육성 진행현황</button>
			</td>
		</tr>
		<tr>
			<td>
				<button onclick="goUrl('../mobile/total_board3.do')">대기 금형 진행현황</button>
			</td>
		</tr>
		<tr>
			<td>
				<button onclick="goUrl('../mobile/total_board4.do')">대기 부품</button>
			</td>
		</tr>
		<tr>
			<td>
				<button onclick="goUrl('../mobile/total_board5.do')">진행 부품</button>
			</td>
		</tr>
	<!-- 	<tr>
			<td>
				<button  onclick="location.href='../mobile/mblePage5.do?param={}'">설비 관리</button>
			</td>
		</tr> -->
	</table>
</div>
</body>
</html>