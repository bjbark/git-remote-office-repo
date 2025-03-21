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
	<title>입고 관리</title>
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
			pageSize:10,
			pageButtonCount:5,
			fields: [
				{ title : "발주일자",name: "invc_date", type: "text", width: 180},
				{ title : "발주번호",name: "invc_numb", type: "text", width: 190 ,align:"center" },
				{ title : "순번",name: "line_seqn", type: "text", width: 80 ,align:"center" },
				{ title : "품명",name: "item_name", type: "text", width: 200 }
			],
			rowClick:function(args){
				var data = args.item;
				$('#myModal').modal();
				$('input[name=cstm_name1]').val(data.cstm_name);
				$('input[name=dlvy_qntt1]').val(data.dlvy_qntt);
				$('input[name=invc_date1]').val(data.invc_date);
				$('input[name=invc_numb1]').val(data.invc_numb);
				$('input[name=item_name1]').val(data.item_name);
				$('input[name=offr_qntt1]').val(data.offr_qntt);
				$('input[name=qntt1]').val(data.qntt);
				$('input[name=line_seqn]').val(data.line_seqn);
				$('input[name=istt_qntt]').val('');
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
				{ title : "입고일자",name: "invc_date", type: "test", width: 200,align:"center" },
				{ title : "입고번호",name: "invc_numb", type: "text", width: 250 ,align:"center" },
				{ title : "품명",name: "item_name", type: "text", width: 200 }
			],
			rowClick:function(args){
				var data = args.item;
				$('#myModal2').modal();
				$('input[name=cstm_name2]').val(data.cstm_name);
				$('input[name=invc_date2]').val(data.invc_date);
				$('input[name=orig_invc_numb]').val(data.orig_invc_numb);
				$('input[name=item_name2]').val(data.item_name);
				$('input[name=istt_qntt2]').val(data.istt_qntt);
				$('input[name=istt_pric]').val(data.istt_pric);
				$('input[name=istt_amnt]').val(data.istt_amnt);
				$('input[name=istt_vatx]').val(data.istt_vatx);
				$('input[name=ttsm_amnt]').val(data.ttsm_amnt);
			}
		});
		$('.nav-link').click(function() {
			tag = $(this).text();
			if(tag =='입고등록'){
				$('#change').text('발주일자');
				$('#change2').text('발주번호');
			}else if(tag=='입고내역'){
				$('#change').text('입고일자');
				$('#change2').text('입고번호');
			}
		});
		if(matchMedia("only screen and (min-device-width:320px) and (max-device-width:768px)")){
			$(window).scroll(function () {
				var scrollHeight = $(document).height();
				var scrollValue= $(window).height()+$(window).scrollTop();
				if(scrollValue > scrollHeight-120){
					$('#footer').css('position','relative');

				}else{
					$('#footer').css('position','fixed');
				}
			})
		}
		$(window).scroll(function(event){
			var scrollHeight = $(document).height();
			var scrollValue= $(window).height()+$(window).scrollTop();
			if(scrollValue > scrollHeight){
			}else{
			}
		});
		$('.saveParam').click(function(){
			if(tag=='입고등록' || tag =='' || tag==undefined){
				var diff_qntt = Number($('input[name=qntt1]').val()-Number($('input[name=istt_qntt]').val()));
				console.log("diff = "+diff_qntt);
				if(diff_qntt<0){
					alert('입고수량을 확인해주세요.');
					return;
				}
				var	obj = new Object()
				;
				obj.hqof_idcd = sessionStorage.getItem('hq_id');
				obj.invc_numb = $('input[name=invc_numb1]').val();
				obj.line_seqn = $('input[name=line_seqn]').val();
				obj.istt_qntt = $('input[name=istt_qntt]').val();
				obj.diff_qntt = diff_qntt;
				obj.dvly_qntt = Number($('input[name=offr_qntt1]').val())-diff_qntt;
				var jsonData = JSON.stringify(obj);
				var url = api_url+"/system/mobile/prodistt/set/record.do";
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
				console.log('입고내역')
			}
		});
	});
	function search() {
		var cstm_name = $('input[name=cstm_name]').val();
		var fr_dt = $('input[name=fr_dt]').val();
		var to_dt = $('input[name=to_dt]').val();
		var find_name = $('input[name=find_name]').val();
		var obj = new Object();

		obj.cstm_name = cstm_name;
		obj.find_name = find_name;
		obj.fr_dt = fr_dt;
		obj.to_dt = to_dt;
		obj.hqof_idcd = sessionStorage.getItem('hq_id');

		obj.find_name = find_name;
		var url;
// 		$('#list').jqGrid('clearGridData');
		if(tag == '입고등록' || tag == null){
			url = api_url+"/system/mobile/prodistt/get/master.do";
		}else if(tag == '입고내역'){
			url = api_url+"/system/mobile/prodistt/get/detail.do";
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
						if(tag == '입고등록' || tag==null){
							dataArray = data.records;
							$("#list").jsGrid("option", "data", []);
							$("#list").jsGrid("option", "data", dataArray);
						}else if(tag == '입고내역'){
							dataArray = data.records;
							console.log(dataArray);
							$("#list2").jsGrid("option", "data", []);
							$("#list2").jsGrid("option", "data", dataArray);
						}
					}else{
						alert(data.message);
					}
				}
			});
		}

	Number.prototype.format = function(){
	    if(this==0) return 0;

	    var reg = /(^[+-]?\d+)(\d{3})/;
	    var n = (this + '');

	    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

	    return n;
	};

	function numberFmt(number){
	    var num = parseFloat(number);
	    if( isNaN(num) ) return "0";

	    return num.format();
	};
	function chk(val) {

		if(val == null){
				val = ""
		}
		return val;
	}

	function getName(temp) {
		var name = temp.getAttribute('class');
		return name;
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
			width		: 65px;
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
			width		: 65px;
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
input[type=number]{
	width: 76%;
	height: 65px;
	margin: 1% 0;
	text-align: left;
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
							<span id="change">발주일자</span>
						</th>
						<td>
							<input type="date" id="fr_dt" class="Datepicker dt" name="fr_dt" ><span style="margin-left:1%;">~</span>
							<input type="date" id="to_dt" class="Datepicker dt" name="to_dt" >
						</td>
					</tr>
					<tr>
					<tr>
						<th>
							<span id="change2">발주번호</span>
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
					<a class="nav-link active" data-toggle="tab" href="#release">입고등록</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#releaselist">입고내역</a>
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
				<span class="modal-title" id="myModalLabel" style="font-size:1.5em;">입고등록</span>
<!-- 				<h1 class="modal-title" id="myModalLabel">입고등록</h1> -->
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
						발주일자
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="invc_date1" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						발주번호
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="invc_numb1" readonly="readonly">
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
						발주수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="offr_qntt1" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						납품수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="dlvy_qntt1" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						미납잔량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="qntt1" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4" style="line-height: 65px;">
						입고수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="istt_qntt" class="numberField"  >
						<input type="hidden" name="line_seqn" class="numberField"  >
					</div>
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
				<span class="modal-title" id="myModalLabel" style="font-size:1.5em;">입고내역</span>
			</div>
			<div class="modal-body">
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
						입고일자
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="invc_date2" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						발주번호
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="orig_invc_numb" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						품명
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="item_name2" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						입고수량
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="istt_qntt2" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						입고단가
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="istt_pric" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4"style="line-height: 65px;">
						입고금액
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="text" name="istt_amnt" class="numberField" readonly="readonly">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4" style="line-height: 65px;">
						부가세
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="istt_vatx" class="numberField" readonly="readonly" >
					</div>
				</div>
				<div class="row">
					<div class="col-xs-6 col-sm-4" style="line-height: 65px;">
						합계금액
					</div>
					<div class="col-xs-12 col-sm-8 col-lg-8">
						<input type="number" name="ttsm_amnt" class="numberField" readonly="readonly" >
					</div>
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