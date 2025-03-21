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
	<title>일자별 재고현황</title>
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
	var tag;
		$(document).ready(function() {
			if(!sessionStorage.getItem('accepted')){
				location.href="../mobile/login.do?param={}"
			}
			var	obj = new Object()
			;
			obj.hqof_idcd = sessionStorage.getItem('hq_id');
			obj.hqof_idcd = sessionStorage.getItem('hq_id');
			var jsonData = JSON.stringify(obj);
			var url = api_url+"/system/mobile/mdailystockwork/get/mwkct.do";
			$.ajax({
				url: url,
				data:{param:jsonData},
				type:"post",
				dataType : 'json',
				async    : false,
				success:function(data){
					for (var i = 0; i < data.records.length; i++) {
						$('#wkct_idcd').append('<option value ='+data.records[i].wkct_idcd+'>'+data.records[i].wkct_name+'</option>');
					}
				}
			});

			$("#list").jsGrid({
				width: "100%",
//	 			height: "400px",
				inserting: false,
				editing: false,
				sorting: true,
				paging: true,
				pageSize:10,
				pageButtonCount:5,
				fields: [
					{ title : "거래처명"	,name: "cstm_name", type: "text", width: 300 ,align:"center" },
					{ title : "품명"		,name: "item_name", type: "text", width: 250 ,align:"center" },
					{ title : "규격"		,name: "item_spec", type: "text", width: 300 ,align:"center" },
					{ title : "적정재고"	,name: "optm_stok_qntt", type: "text", width: 200 ,align:"center" },
					{ title : "전일재고"	,name: "pday_stok_qntt", type: "text", width: 200 ,align:"center" },
					{ title : "금일재고"	,name: "tody_stok_qntt", type: "text", width: 200 ,align:"center" }

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


		});


		function search() {
			var invc_date = $('input[name=invc_date]').val();
			var wkct_idcd = $('#wkct_idcd').val();
			var wkct_name = $('input[name=wkct_name]').val();
			var obj = new Object();
			obj.wkct_idcd = wkct_idcd;
			obj.invc_date = invc_date.replace(/-/gi,'');
			obj.hqof_idcd = sessionStorage.getItem('hq_id');

			obj.find_name = find_name;
			var url;

			url = api_url+"/system/mobile/mdailystockwork/get/lister.do";

			var jsonData = JSON.stringify(obj);
			 $.ajax({
				url: url,
				data:{param:jsonData},
				type:"post",
				dataType : 'json',
				success:function(data){
					if(data.success){
						var dataArray = data.records;
						$("#list").jsGrid("option", "data", []);
						$("#list").jsGrid("option", "data", dataArray);
					}
					else{
						alert(data.message);
					}
				}
			});
		}

</script>
<style>
@media only screen and (min-device-width:1024px) and (max-device-width:1200px) {
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
		.ui-datepicker-trigger{
		width: 30px;
		height:30px;
		}

		.nav-tabs{
		height: 50px;
		}
		#first table tr th{
			text-align : right;
b
			padding-right: 2%;
		}
		#first .dt{
			width: 31%;
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
			margin-top: 285px;
		}
		#first{
			position: fixed;
			top: 99px;
		}
		.nav-tabs {
			position: fixed;
			top: 280px;
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
			width		: 217px;
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
			padding-top	: 3px;
		}
		#totalTime{
			margin-left	: 4px;
			width		: 60px;
		}
		.table-responsive tr td:FIRST-CHILD {
			text-align: center;
		}

		.ui-datepicker-trigger{
			width: 55px;
			height: 56px;
			margin-top: 7px;
		}

		.nav-tabs{
		height: 70px;

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
		.text1{
		font-size : 0.7em;
		border:1px solid;
	}
}

.fields{
	text-align: center;
	color:black !important;
}
.jsgrid-header-row{
	font-size:1.6em;
	color : black !important;
}
#list table tr td{
	font-size:1.6em;
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
#list, #list div:not(.jsgrid-pager), #list3 table{
	font-size:0.8em !important;
}
#list .jsgrid-cell{
	font-size : 1.6em;
}
input[type=number]{
	width: 76%;
	height: 60px;
	margin: 1% 0;
	text-align: left;
}
.jsgrid-pager{
	font-size:3.1em  !important;
}
</style>
</head>
<body>
<jsp:include page="header.jsp"></jsp:include>
<div id="container">
	<form action="#" method="get" onsubmit="return false;" >
		<div id="first" >
			<table style="margin-left: 2%">
					<tr>
						<th>
							<span id="change">재고일자</span>
						</th>
						<td>
							<input type="date" id="invc_date" style="font-size: 0.7em;margin: 4% 0; width: 50%;" name="invc_date" >
						</td>
						<script>
							document.getElementById('invc_date').value = new Date().toISOString().substring(0, 10);;
						</script>
					</tr>
					<tr>
					<tr>
						<th>
							보관장소
						</th>
						<td>
							<input type="text" id="find_name" name="find_name" value="${find_name }" style="width: 60%; float:left;" hidden : true>
							<select name="wkct_idcd" id="wkct_idcd" class="text1" style="width: 50%; float:left;">
							<input type="button" class="search" onclick="search();"style="margin-top: 6px;" value="조회" >
						</td>
					</tr>
				</table>
			</div>
		<div class="tab-content" style="margin-top:0px;">
			<div id="release" class="tab tab-pane fade table-responsive active in">
				<div id="list"></div>
			</div>
		</div>
	</form>
</div>
</body>
</html>