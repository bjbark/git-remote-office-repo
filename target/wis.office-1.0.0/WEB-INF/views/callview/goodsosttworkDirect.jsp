<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<c:set var="conPath" value="${pageContext.request.contextPath}"/>
<% String conPath = request.getContextPath(); %>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>출고 등록</title>
	<!-- jquery -->
	<script type="text/javascript" src="../../loader.js"></script>


	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"/>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script
	  src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"
	  integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30="
	  crossorigin="anonymous"></script>

	<!-- css file -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"/>

	<link href="/resource/css/mblePage.css" media="only screen and (min-device-width:1024px)" rel="stylesheet"/>
	<link href="/resource/css/mblePageMobile.css" media="only screen and (min-device-width:320px) and (max-device-width:768px)" rel="stylesheet"/>
<script>
const api_url = _global.api_host_info;
var tag;
var records;
	$(document).ready(function() {
		if(!sessionStorage.getItem('accepted')){
			http://localhost/system/
			location.href="../mobile/login.do?param={'path':'../mobile/gosttdir.do?param={\"invc_numb\":\"${invc_numb}\",\"line_seqn\":${line_seqn}}'}"
		}else{
			var	obj = new Object()
			;
			obj.hqof_idcd = sessionStorage.getItem('hq_id');
			obj.invc_numb = '${invc_numb}';
			obj.line_seqn = '${line_seqn}';
			var jsonData = JSON.stringify(obj);
			$.ajax({
				url: api_url+'/system/mobile/gootsosttwork/get/lookup.do',
				data:{param:jsonData},
				dataType:'json',
				async: false,
				type:"post",
				success:function(data){
					if(data.records.length){
						var dataArray = data.records[0];
						records = [];
						records = dataArray;
						$('input[name=cstm_name]').val(dataArray.cstm_name);
						$('input[name=acpt_numb]').val(dataArray.acpt_numb);
						$('input[name=item_name]').val(dataArray.item_name);
						$('input[name=item_spec]').val(dataArray.item_spec);
						$('input[name=unit_name]').val(dataArray.unit_name);
						$('input[name=trst_qntt]').val(dataArray.trst_qntt);
						$('input[name=ostt_qntt]').val(dataArray.ostt_qntt);
						$('input[name=unpaid]').val(dataArray.unpaid);
						$('input[name=ostt_qntt2]').val('');
						$('input[name=lott_numb]').val('');
						$('input[name=invc_numb]').val(dataArray.invc_numb);
						$('input[name=line_seqn]').val(dataArray.line_seqn);
						var item_imge = dataArray.item_imge.toString();
						img = new Uint8Array(item_imge.split(","));
						blob = new Blob([img],{type:'image/png'})
						url = URL.createObjectURL(blob);

						$('#img').attr('src',url);
					}else{
						alert('출고 가능한 내역이 없습니다.');
					}
				}
			});
		}
		$('#frmbtn').click(function(){
			var chk = Number($('input[name=trst_qntt]').val()-Number($('input[name=ostt_qntt]').val())-Number($('input[name=ostt_qntt2]').val()));
			var unpaid2 = Number($('input[name=ostt_qntt]').val())+Number($('input[name=ostt_qntt2]').val())
			if(chk<0){
				alert('출고수량을 확인해주세요.');
				return;
			}
			var	obj = new Object()
			;
			obj.hqof_idcd = sessionStorage.getItem('hq_id');
			obj.invc_numb = $('input[name=invc_numb]').val();
			obj.line_seqn = $('input[name=line_seqn]').val();
			obj.ostt_qntt2 = $('input[name=ostt_qntt2]').val();
			obj.lott_numb = $('input[name=lott_numb]').val();
			obj.unpaid2 = unpaid2;
			obj.record	  = records;
			var jsonData = JSON.stringify(obj);
			var url = api_url+"/system/mobile/gootsosttwork/set/record.do";
			$.ajax({
				url:url,
				type:"post",
				data:{param:jsonData},
				success:function(data){
					var d = JSON.parse(data);
					if(d.success){
						alert('출고등록 완료');
						location.reload();
					}
				}
			});
		});
	});
</script>
<style>
.captions{
	font-size:3em;
}
.page-header{
	text-align : center;
}
.title{
	font-size:5em;
}
input{
	font-size:3em;
}
input[type=number]{
	width: 76%;
	height: 60px;
	margin: 1% 0;
	text-align: right;
}
.row{
	text-align:center;
}
.camimg{
	width: 90%;
	height : 550px;
}
.button{
	width : 100%;
	height : 100px;
	font-size:3em;
}
.buttonDiv{
	margin-top:30px;
}
.cap{
	line-height: 70px;
	text-align:right;
}
</style>
</head>
<body oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
<jsp:include page="header.jsp"></jsp:include>
<div id="container">
	<form action="" method="post" id="frm" enctype="multipart/form-data">
	<div class="page-header">
		<span class="title">출고 등록</span>
	</div>
	<div class = "col-md-6" style="text-align:center; margin:0 0 10px 0;">
		<img alt="" src="" onerror="this.src='https://www.missioninfra.net/img/noimg/noimg_4x3.gif'" id="img" class="camimg">
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">거래처명</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="text" name="cstm_name" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">수주번호</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="text" name="acpt_numb" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">품명</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="text" name="item_name" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">규격</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="text" name="item_spec" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">단위</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="text" name="unit_name" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">의뢰수량</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="number" name="trst_qntt" class="numberField" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">납품수량</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="number" name="ostt_qntt" class="numberField" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4">
			<span class="captions">미납잔량</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="number" name="unpaid" class="numberField" readonly="readonly">
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4" >
			<span class="captions">출고수량</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="number" name="ostt_qntt2" class="numberField"  >
		</div>
	</div>
	<div class="row">
		<div class="cap col-xs-6 col-sm-4"style="">
			<span class="captions">LOT번호</span>
		</div>
		<div class="col-xs-12 col-sm-8 col-lg-8">
			<input type="text" name="lott_numb">
		</div>
		<input type="hidden" name="invc_numb" />
		<input type="hidden" name="line_seqn" />
		<input type="hidden" name="hqof_idcd" />
	</div>
	<div class = "col-sm col-md-6 buttonDiv">
		<div class = "col-sm-6 col-md-6 ">
			<input type="button" id="frmbtn" value="저장" class="button btn btn-primary">
		</div>
		<script>

		</script>
		<div class = "col-sm-6 col-md-6 ">
			<input type="reset"  value="다시쓰기" class="button btn btn-primary">
		</div>
	</div>
	</form>
</div>
</body>
</html>