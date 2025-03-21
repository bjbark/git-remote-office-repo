<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>업무일지</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">


<script type="text/javascript">
$(document).ready(function(){
	$('#select option').each(function(){
		if($(this).val()=='${plan_rslt_dvcd}'){
			$(this).attr("selected","selected"); // attr적용안될경우 prop으로
		}
	});
});

</script>
<style>
	.caption{
		height:26px;
		text-align:center;
		line-height:26px;
		font-weight: bold;
	}
	.data{
		height:26px;
		line-height:26px;
		border:1px solid gray;
	}
	.row div{
		margin-top: 3px;
	}
</style>
</head>
<body>
<fmt:parseNumber var="rate" value="${prog_rate}" integerOnly="true" />
<fmt:formatNumber var="ratefmt" value="${rate}"  pattern="#,###" />
<fmt:parseDate   var="date" value="${dwup_date}" pattern="yyyyMMdd" />
<fmt:formatDate  var="datefmt" value="${date }" pattern="yyyy-MM-dd"/>
<div class="container">
	<div class="row">
		<div class="caption col-xs-12 col-sm-15" style="text-align:center;background-color:#2C3E50;height:80px;margin:5px auto;color:white;">
			<h1>(${user_name}) ${datefmt} 업무일지 보고</h1>
		</div>
	</div>
	<div class="row">
		<div class="caption col-xs-2 col-sm-2">
			요약
		</div>
		<div class="data col-xs-10 col-sm-10">
			${oprt_smry}
		</div>
	</div>
	<div class="row">
		<div class="caption col-xs-2 col-sm-2">
			프로젝트
		</div>
		<div class="data col-xs-7 col-sm-7">
			${prjt_name}
		</div>
		<div class="caption col-xs-2 col-sm-2" >
			진척율
		</div>
		<div class="data col-xs-1 col-sm-1" style="text-align:right;">
			${ratefmt}%
		</div>
	</div>

	<div class="row">

	</div>
	<div class="row" >
		<div class=" col-xs-12 col-sm-15" style="text-align:center;background-color : lightgray;">
			<h2 style="">보고내용</h2>
		</div>
	</div>
	<div class="row">
		<div class="th col-xs-12 col-sm-15" style="height:530px;overflow:auto;border:1px solid gray;padding : 10px;">
			${oprt_cont}
		</div>
	</div>
</div>
</body>
</html>