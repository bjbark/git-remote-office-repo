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
	<title>출고 관리</title>
	<!-- jquery -->
	<script type="text/javascript" src="../../loader.js"></script>


	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"/>
	<script src="http://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

	<!-- css file -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"/>

	<link rel="stylesheet" href="/resource/js/jsgrid/jsgrid.min.css"/>
	<link rel="stylesheet" href="/resource/js/jsgrid/jsgrid-theme.css"/>
	<script src="/resource/js/jsgrid/jsgrid.min.js"></script>


	<link href="/resource/css/mblePage.css" media="only screen and (min-device-width:1024px)" rel="stylesheet"/>
	<link href="/resource/css/mblePageMobile.css" media="only screen and (min-device-width:320px) and (max-device-width:768px)" rel="stylesheet"/>
<script>
const api_url = _global.api_host_info;
var recordsData=[];
var dataArray =[];
var tag;
var colmodel1 = [];
var colmodel2 = [];
var records;
	$(document).ready(function() {
		if(!sessionStorage.getItem('accepted')){
			location.href="../mobile/login.do?param={}"
		}
		$("#list").jsGrid({
			width: "100%",
// 			height: "400px",
			inserting: false,
			editing: false,
			sorting: true,
			paging: true,
			pageSize:7,
			pageButtonCount:5,
			fields: [
				{ title : "지시일자"	,name: "invc_date", type: "text", width: 200 ,align:"center" },
				{ title : "수주번호"	,name: "acpt_numb", type: "text", width: 250 ,align:"center" },
				{ title : "품명"		,name: "item_name", type: "text", width: 250 ,align:"center" },
				{ title : "의뢰수량"	,name: "trst_qntt", type: "text", width: 200 ,align:"center" }

			],
			rowClick:function(args){
				var data = args.item;
				records = [];
				records = args.item;
				$('#myModal').modal();
				$('input[name=cstm_name1]').val(data.cstm_name);
				$('input[name=acpt_numb1]').val(data.acpt_numb);
				$('input[name=item_name1]').val(data.item_name);
				$('input[name=item_spec1]').val(data.item_spec);
				$('input[name=unit_name1]').val(data.unit_name);
				$('input[name=trst_qntt1]').val(data.trst_qntt);
				$('input[name=ostt_qntt1]').val(data.ostt_qntt);
				$('input[name=unpaid1]').val(data.unpaid);
				$('input[name=ostt_qntt2]').val('');
				$('input[name=lott_numb1]').val('');
				$('input[name=invc_numb]').val(data.invc_numb);
				$('input[name=line_seqn]').val(data.line_seqn);
			}
		});
		$("#list2").jsGrid({
			width: "100%",
// 			height: "400px",
			inserting: false,
			editing: false,
			sorting: true,
			paging: true,
			pageSize:10,
			pageButtonCount:5,
			fields: [
				{ title : "출하번호",name: "invc_numb", type: "text", width: 200 ,align:"center" },
				{ title : "거래처명",name: "cstm_name", type: "text", width: 200 ,align:"center" },
				{ title : "출하일자",name: "invc_date", type: "text", width: 200 ,align:"center" }
			],
			rowClick:function(args){
				var data = args.item;
				$('#myModal2').modal();
				$('input[name=invc_numb2]').val(data.invc_numb);
				$('input[name=cstm_name2]').val(data.cstm_name);
				$('input[name=invc_date2]').val(data.invc_date);
				$('input[name=deli_date2]').val(data.deli_date);
				$('input[name=drtr_name2]').val(data.drtr_name);
				search('on',data.invc_numb);
			}
		});
		$("#list3").jsGrid({
			width: "100%",
// 			height: "400px",
			inserting: false,
			editing: false,
			sorting: true,
			paging: false,
			pageSize:10,
			pageButtonCount:5,
			fields: [
				{ title : "순번"		,name: "line_seqn", type: "text", width: 80 ,align:"center" },
				{ title : "품명"		,name: "item_name", type: "text", width: 300 ,align:"center" },
				{ title : "규격"		,name: "item_spec", type: "text", width: 250 ,align:"center" },
				{ title : "LOT번호"	,name: "lott_numb", type: "text", width: 200 ,align:"center" },
				{ title : "창고"		,name: "wrhs_name", type: "text", width: 250 ,align:"center" },
				{ title : "출고수량"	,name: "ostt_qntt", type: "number", width: 150 ,align:"center" },
				{ title : "단가"		,name: "sale_pric", type: "number", width: 150 ,align:"center" },
				{ title : "금액"		,name: "sale_amnt", type: "number", width: 200 ,align:"center" },
				{ title : "부가세"	,name: "vatx_amnt", type: "number", width: 150 ,align:"center" },
				{ title : "합계금액"	,name: "ttsm_amnt", type: "number", width: 200 ,align:"center" }
			],
		});
		$('.nav-link').click(function() {
			tag = $(this).text();
			if(tag =='출하등록'){
				$('#change').text('지시일자');
				$('#change2').text('수주번호');
			}else if(tag=='출하리스트'){
				$('#change').text('출하일자');
				$('#change2').text('출하번호');
			}
		});

		$('.saveParam').click(function(){
			if(tag=='출하등록' || tag =='' || tag==undefined){
				var chk = Number($('input[name=trst_qntt1]').val()-Number($('input[name=ostt_qntt1]').val())-Number($('input[name=ostt_qntt2]').val()));
				var unpaid2 = Number($('input[name=ostt_qntt1]').val())+Number($('input[name=ostt_qntt2]').val())
				if(chk<0){
					alert('입고수량을 확인해주세요.');
					return;
				}
				var	obj = new Object()
				;
				obj.hqof_idcd = sessionStorage.getItem('hq_id');
				obj.invc_numb = $('input[name=invc_numb]').val();
				obj.line_seqn = $('input[name=line_seqn]').val();
				obj.ostt_qntt2 = $('input[name=ostt_qntt2]').val();
				obj.lott_numb = $('input[name=lott_numb1]').val();
				obj.unpaid2 = unpaid2;
				obj.record	  = records;
				var jsonData = JSON.stringify(obj);
				var url = api_url+"/system/mobile/gootsosttwork/set/record.do";
				$.ajax({
					url:url,
					type:"post",
					data:{param:jsonData},
					success:function(data){
						$('.closeBtn').trigger('click');
						search();
					}
				});
			}else{
				console.log('출하리스트')
			}
		});
	});
	function search(_flag,_invc_numb) {
		var cstm_name = $('input[name=cstm_name]').val();
		var fr_dt = $('input[name=fr_dt]').val();
		var to_dt = $('input[name=to_dt]').val();
		var find_name = $('input[name=find_name]').val();
		var obj = new Object();
		if(_flag){											// list3조회를 위해 구분
			obj.invc_numb = _invc_numb;
		}else{
			obj.cstm_name = cstm_name;
			obj.find_name = find_name;
			obj.fr_dt = fr_dt;
			obj.to_dt = to_dt;
		}
		obj.hqof_idcd = sessionStorage.getItem('hq_id');
		var url;
		if(_flag){
			url = api_url+"/system/mobile/gootsosttwork/get/detail.do";
		}else{
			if(tag == '출하등록' || tag == null){
				url = api_url+"/system/mobile/gootsosttwork/get/search.do";
			}else if(tag == '출하리스트'){
				url = api_url+"/system/mobile/gootsosttwork/get/search2.do";
			}
		}
		var jsonData = JSON.stringify(obj);
			 $.ajax({
				url: url,
				data:{param:jsonData},
				type:"post",
				dataType : 'json',
				async	: false,
				success:function(data){
					if(data.success){
						if(_flag){
							dataArray = data.records;
							$("#list3").jsGrid("option", "data", []);
							$("#list3").jsGrid("option", "data", dataArray);
						}else{
							if(tag == '출하등록' || tag==null){
								dataArray = data.records;
								$("#list").jsGrid("option", "data", []);
								$("#list").jsGrid("option", "data", dataArray);
							}else if(tag == '출하리스트'){
								dataArray = data.records;
								$("#list2").jsGrid("option", "data", []);
								$("#list2").jsGrid("option", "data", dataArray);
							}
						}
					}else{
						alert(data.message);
					}
				}
			});
		}

	function goUpdate() {								//입고,취소 클릭시
		var select = name;
		var	obj = new Object()
		;
		obj.hqof_idcd = sessionStorage.getItem('hq_id');
		obj._set = select;
		obj.records = recordsData[idx];
		var jsonData = JSON.stringify(obj);
		var url = api_url+"/system/mobile/mtrlistt/set/record.do";

		$.ajax({
			url:url,	//뒤에 달아주면 된다
			type:"post",
			data:{param:jsonData},
			success:function(data){
				search();
			}
		});
	}

</script>
<style>
@media only screen and (min-device-width:1024px){
*{
			padding	: 0;
			margin	: 0;
		}
		#container{
			width	: 100%;
		}

		table{
			width	: 80%;
			margin	: 0 auto;
		}
		table input[readonly=readonly]{
			text-align	: center;
			width		: 252px;
			background-color : lightgray;
		}
		table{
			font-size	: 1.3em;
			margin-left: 50px;
		}
		input[type=submit]{
			background-color: #3399FF;
			border			: 0;
			color			: white;
			padding			: 5px 15px;
			border-radius	: 5px;
			font-weight		: bold;
			width			: 100%;
		}
		input[type=button]:not(.insert):not(.delete){
			margin-left: 3%;
			width:7%;
			height: 29px;
			margin-top:0.5%
		}

		.tab-content table{
			margin : 0 auto;
		}

		#footer{
			text-align: center;
		}
		.tab select{
			width: 80%;
			height: 40px;
			margin: 10px 0;
		}
		.tab textarea{
			width	: 80%;
			margin	: 10px 0;
		}
		.tab input[type=text]:not(.Datepicker){
			width	: 80%;
			height	: 40px;
			margin	: 10px 0;
		}
		.times input[type=text]{
			width		:50%;
			text-align	: center;
		}
		.setTime::-webkit-datetime-edit-ampm-field {
			display: none;
		}
		#repairChart th{
			font-size	: 0.1em;
			text-align	: center;
			background-color: #ECFFFD;
		}
		.nav-item .nav-link{
			height		: 32px;
			padding-top	: 5px;
		}
		#totalTime{
			margin-left	: 4px;
			width		: 60px;
		}
		#release th{
			font-size: 0.7em;
			color: white;
		}
		#releaselist th{
			font-size: 0.7em;
			color: white;
		}

		.nav-tabs{
		height: 50px;
		}
		#first table tr th{
			text-align : right;

			padding-right: 2%;
		}
		#first .dt{
			width: 39%;
			height:30px;
			text-align: center;
		}
		.table-responsive tr td:not(.numberFmt):not(.centers){
			text-align: left;
		}
		.table-responsive tr td:nth-child(1), .centers {
			text-align: center;
		}
		.numberFmt{
			text-align: right;
		}


	}
@media only screen and (min-device-width:320px) and (max-device-width:768px){

	 	*{
			padding	: 0;
			margin	: 0;
		}
		#container{
			width	: 100%;
			margin-top: 436px;
		}
		#first{
			position: fixed;
			top: 99px;
		}
		.nav-tabs {
			position: fixed;
			top: 355px;
			background-color: white;
			width: 100%;
		}
		#header{
			position: fixed;
			top: 0px;
			background-color: white;
		}
		table{
			width	: 80%;
			margin	: 0 auto;
		}
		table input[readonly=readonly]{
			text-align	: center;
			width		: 252px;
			background-color : lightgray;
		}
		table{
			font-size	: 2.0em;
		}
		table th{
			text-align : right;
			font-size  : large;
		}


		input[type=submit]{
			background-color: #3399FF;
			border			: 0;
			color			: white;
			padding			: 5px 15px;
			border-radius	: 5px;
			font-weight		: bold;
			width			: 100%;
		}
		.tab-content table{
			margin : 0 auto;
		}

		#footer{
			text-align: center;
		}
		.tab select{
			width: 80%;
			height: 40px;
			margin: 10px 0;
		}
		.tab textarea{
			width	: 80%;
			margin	: 10px 0;
		}
		.tab input[type=text]:not(.Datepicker){
			width	: 80%;
			height	: 40px;
			margin	: 10px 0;
		}
		.times input[type=text]{
			width		:50%;
			text-align	: center;
		}
		.setTime::-webkit-datetime-edit-ampm-field {
			display: none;
		}

		.nav-item .nav-link{
			height		: 32px;
			padding-top	: 5px;
		}
		#totalTime{
			margin-left	: 4px;
			width		: 60px;
		}
		.table-responsive tr td:FIRST-CHILD {
	    	text-align: center;
		}
		.nav-tabs{
		height: 75px;
		}
		.numberFmt{
			text-align: right;
		}
		.insert{
			width : 120px;
		}
		.delete{
			width : 120px;
		}
}
.fields{
	text-align: center;
	color:black !important;
}
.jsgrid-header-row{
	font-size:1.2em;
	color : black !important;
}
#list table tr td{
	font-size:1.2em;
}
#list2 table tr td{
	font-size:1.2em;
}
.jsgrid-pager{
	font-size:2.1em;
}
.modal-dialog{
	width: 730px;
}
.modal-content{
	font-size:3em;
	text-align:center;
}
.modal-content input{
	text-align:center;
}
.numberField{
	width: 76% !important;
	height:60px !important;
	text-align:right !important;
}
.modal-footer button{
	font-size:1.4em;
}
.modal-body input{
	padding:10px;
}
.modal {
        text-align: center;
}

@media screen and (min-width: 768px) {
        .modal:before {
                display: inline-block;
                vertical-align: middle;
                content: " ";
                height: 100%;
        }
}

.modal-dialog {
        display: inline-block;
        text-align: left;
        vertical-align: middle;
}
#list3, #list3 div, #list3 table{
	font-size:0.8em !important;
}
#myModal2 .modal-dialog{
	width: 900px !important;
}
#list3 .jsgrid-cell{
	font-size : 1.4em;
}
input[type=number]{
	width: 76%;
	height: 60px;
	margin: 1% 0;
	text-align: right;
}
</style>
</head>
<body oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
<jsp:include page="header.jsp"></jsp:include>
<div id="container">
	<form action="#" method="get" onsubmit="return false;" >
		<div id="first" >
			<table style="margin-left: 2%">
					<tr>
						<th>
							거래처명
						</th>
						<td>
							<input type="text" id="cstm_name" name="cstm_name" value="${cstm_name }">
						</td>
					</tr>
					<tr>
						<th>
							<span id="change">지시일자</span>
						</th>
						<td>
							<input type="date" id="fr_dt" class="Datepicker dt" name="fr_dt" ><span style="margin-left:1%;">~</span>
							<input type="date" id="to_dt" class="Datepicker dt" name="to_dt" >
						</td>
					</tr>
					<tr>
					<tr>
						<th>
							<span id="change2">수주번호</span>
						</th>
						<td>
							<input type="text" id="find_name" name="find_name" value="${find_name }" style="width: 60%; float:left;">
							<input type="button" class="search" onclick="search();" value="조회" >
						</td>

					</tr>
				</table>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link active" data-toggle="tab" href="#release">출하등록</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#releaselist">출하리스트</a>
				</li>
			</ul>
		<div class="tab-content" style="margin-top:0px;">
			<div id="release" class="tab tab-pane fade table-responsive active in">
				<div id ="list">
				</div>
			</div>
			<div id="releaselist" class="tab tab-pane fade table-responsive" class="container">
				<div id ="list2">
				</div>
			</div>
		</div>
	</form>
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
<!-- 			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button> -->
				<span class="modal-title" id="myModalLabel" style="font-size:1.5em;">출하등록</span>
<!-- 				<h1 class="modal-title" id="myModalLabel">출하등록</h1> -->
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						거래처명
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="cstm_name1" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						수주번호
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="acpt_numb1" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						품명
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="item_name1" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						규격
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="item_spec1" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						단위
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="unit_name1" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						의뢰수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="trst_qntt1" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						납품수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="ostt_qntt1" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						미납잔량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="unpaid1" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4" style="line-height: 65px;">
						출고수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="ostt_qntt2" class="numberField"  >
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						LOT번호
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="lott_numb1">
					</div>
					<input type="hidden" name="invc_numb" />
					<input type="hidden" name="line_seqn" />
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default pull-left closeBtn" data-dismiss="modal">닫기</button>
				<button type="button" class="btn btn-primary saveParam">저장</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
				<span class="modal-title" id="myModalLabel" style="font-size:1.5em;">출하리스트</span>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						출하번호
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="invc_numb2" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						거래처명
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="cstm_name2" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						출하일자
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="invc_date2" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						납기일자
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="deli_date2" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4" style="line-height: 65px;">
						담당자
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="drtr_name2" readonly="readonly" >
					</div>
				</div>
				<div id="list3">
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>