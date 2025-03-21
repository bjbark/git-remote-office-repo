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
<title>자재 출고</title>
<!-- jquery -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<!--  -->
<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
	rel="stylesheet" type="text/css" />
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css"
	type="text/css" />
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>

<!-- timepicker -->
<script
	src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
<link rel="stylesheet"
	href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

<!-- css file -->

<link href="/resource/css/mblePage.css"
	media="only screen and (min-device-width:1024px)" rel="stylesheet" />
<link href="/resource/css/mblePageMobile.css"
	media="only screen and (min-device-width:320px) and (max-device-width:768px)"
	rel="stylesheet" />
<script>
	const api_url = 'http://180.67.220.141:8080';
/* 	const api_url = 'http://localhost'; */
	var tag;
		$(document).ready(function() {
			if(!sessionStorage.getItem('accepted')){
				location.href="../mobile/login.do?param={}"
			}
			function phoneNumber(number){
					var str ;

					var length = number.length;

					if(number.length ==9){
						str = number.substr(0,2)+'-'+number.substr(2,3)+'-'+number.substr(5,4);
					}else if(number.length ==10){
						str = number.substr(0,3)+'-'+number.substr(3,4)+'-'+number.substr(7,4);
					}else if(number.length==11){
						str = number.substr(0,3)+'-'+number.substr(3,4)+'-'+number.substr(7,length);
					}

				return str;
			}

			$('.setTime').change(function () {
				var text = $(this).attr('id');
				var t1 = $('#t1').val().replace(':','');
				var t2 = $('#t2').val().replace(':','');
				var h1 = t1.substr(0,2);
				var h2 = t2.substr(0,2);
				if(h1 > 24){
					h1 = h1-24;
				}
				if(h2 > 24){
					h2 = h2-24;
				}


				var hour = h2 - h1;
				var min =  t2.substr(2,2) - t1.substr(2,2);

				if(t1.trim() != '' && t2.trim() != ''){
					if(hour < 0){
						hour += 24;
					}else if(hour > 0 ){
						if(min < 0){
							hour -= 1;
							min = 60 + min;
						}
					}
					$('#totalTime').val((hour*60)+min);
				}

			});
			$('.setTime').timepicker({
				timeFormat: 'HH:mm',
				dynamic: false,
				dropdown: false,
			 });


			$('.nav-link').click(function() {
				tag = $(this).text();

				if(tag =='출고처리'){
					$('#change').text('납기일자');
				}else if(tag=='출고내역'){
					$('#change').text('출고일자');
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


		});
		$(function() {
			var toDay = new Date();
			var fday = toDay.getDate();
			var fmonth = toDay.getMonth();
			var fyear = toDay.getFullYear();

			fmonth += 1;
			if(fmonth < 10){
				fmonth = '0'+fmonth;
			}
			if(fday < 10){
				fday ='0'+fday;
			}
			var toDay2= new Date();
			toDay2.setDate(toDay2.getDate()+15);
			var tday = toDay2.getDate();
			var tmonth = toDay2.getMonth();
			var tyear = toDay2.getFullYear();
			tmonth += 1;
			if(tmonth < 10){
				tmonth = '0'+tmonth;
			}
			if(tday < 10){
				tday ='0'+tday;
			}


			var fr_dt = fyear+'-'+fmonth+'-'+fday;
			var to_dt = tyear+'-'+tmonth+'-'+tday;
			$('input=[name=fr_dt]').val(fr_dt);
			$('input=[name=to_dt]').val(to_dt);
				$( ".Datepicker" ).datepicker({
					dateFormat: 'yy-mm-dd' //Input Display Format 변경
					,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
					,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
					,changeYear: true //콤보박스에서 년 선택 가능
					,changeMonth: true //콤보박스에서 월 선택 가능
					,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
					,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
					,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
					,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
					,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
					,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
					,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
					,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
					,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
				});

		});

		function search() {
			var cstm_name = $('input[name=cstm_name]').val();
			var fr_dt = $('input[name=fr_dt]').val();
			var to_dt = $('input[name=to_dt]').val();
			var item_name = $('input[name=item_name]').val();
			var obj = new Object();
			var hqof_idcd = sessionStorage.getItem('hq_id');
			obj.cstm_name = cstm_name;
			obj.fr_dt = fr_dt;
			obj.to_dt = to_dt;
			obj.hqof_idcd = hqof_idcd;
			obj.item_name = item_name;
			var jsonData = JSON.stringify(obj);
			var url;
			if(tag == '출고처리' || tag==null){
				url = api_url+"/system/mobile/prodostt/get/search.do";
			}else if(tag == '출고내역'){
				url = api_url+"/system/mobile/prodostt/get/search2.do";

			}
				 $.ajax({
					url: url,
					data:{param:jsonData},
					type:"post",
					dataType : 'json',
					success:function(data){
						console.log(data);
						if(data.success){
							if(tag == '출고처리' || tag==null){
								$('#ajaxTable1 td').remove();
								for(var i= 0 ; i < data['records']['length'] ;i++){
									$('#ajaxTable1').append('<tr><td><input type="button" value="출고" class="insert" onclick="goUpdate(getName(this),\''+data['records'][i]['acpt_numb']+'\','+data['records'][i]['acpt_seqn']+');" name="'+data['records'][i]['ostt_proc']+
									'"></td><td class="centers">'+chk(data['records'][i]['acpt_numb'])+'</td><td class="centers">'
											+chk(dateFmt(data['records'][i]['acpt_date']))+'</td><td>'
											+chk(data['records'][i]['cstm_name'])+'</td><td class="centers">'
											+chk(data['records'][i]['item_code'])+'</td><td>'
											+chk(data['records'][i]['item_name'])+'</td><td>'
											+chk(data['records'][i]['spec'])+'</td><td class="centers">'
											+dateFmt(chk(data['records'][i]['deli_date']))+'</td><td class="numberFmt">'
											+numberFmt(chk(data['records'][i]['qntt']))+'</td><td class="numberFmt">'
											+numberFmt(chk(data['records'][i]['ostt_qntt']))+'</td></tr>');
								}
							}else if(tag == '출고내역'){
								$('#ajaxTable2 td').remove();
								for(var i= 0 ; i < data['records']['length'] ;i++){
									$('#ajaxTable2').append('<tr><td class="centers">'+dateFmt(chk(data['records'][i]['ostt_date']))+'</td><td class="centers">'
											+chk(data['records'][i]['acpt_numb'])+'</td><td class="centers">'
											+chk(dateFmt(data['records'][i]['acpt_date']))+'</td><td>'
											+chk(data['records'][i]['cstm_name'])+'</td><td class="centers">'
											+chk(data['records'][i]['item_code'])+'</td><td>'
											+chk(data['records'][i]['item_name'])+'</td><td>'
											+chk(data['records'][i]['spec'])+'</td><td class="centers">'
											+dateFmt(chk(data['records'][i]['deli_date']))+'</td><td class="numberFmt">'
											+numberFmt(chk(data['records'][i]['qntt']))+'</td><td class="numberFmt">'
											+numberFmt(chk(data['records'][i]['ostt_qntt']))+'</td></tr>');
								}
							}
						}else{
							alert(data.message);
						}
					}
				});
			}
		function dateFmt(date) {
			date += '';
			if(date == ''){
				return date;
			}else{
				var dateFmt = date.substr(0,4)+'-'+date.substr(4,2)+'-'+date.substr(6,2);
				return dateFmt;
			}
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

		function goUpdate(name,acpt_numb,acpt_seqn) {								//입고,취소 클릭시
			var select = name;
			var hqof_idcd = sessionStorage.getItem('hq_id');

 			var temp = '{"hqof_idcd" : "'											//json dataType에 param:json을 쓰면
						+hqof_idcd+													//각 key마다 param이 붙기 때문에
						'", "records" : [{"_set":"'									//string으로 하나하나 작성해서 쏴줘야함
									+select+
									'","acpt_numb" : "'
										+acpt_numb+
									'","acpt_seqn" : "'
										+acpt_seqn+'"}]}';


			$.ajax({
				url:api_url+"/system/mobile/prodostt/set/record.do?param="+temp,	//뒤에 달아주면 된다
				type:"post",
				contentType : 'application/json; charset=UTF-8',
				success:function(data){
					search();
				}
			});
		}
		function getName(temp) {
			var name = temp.getAttribute('class');
			return name;
		}
	</script>
<style>
@media only screen and (min-device-width:1024px) {
	* {
		padding: 0;
		margin: 0;
	}
	#container {
		width: 100%;
	}
	table {
		width: 80%;
		margin: 0 auto;
	}
	table input[readonly=readonly] {
		text-align: center;
		width: 252px;
		background-color: lightgray;
	}
	table {
		font-size: 1.3em;
		margin-left: 50px;
	}
	input[type=submit] {
		background-color: #3399FF;
		border: 0;
		color: white;
		padding: 5px 15px;
		border-radius: 5px;
		font-weight: bold;
		width: 100%;
	}
	input[type=button]:not (.insert ){
		margin-left: 3%;
		width: 7%;
		height: 32px;
		margin-top: 0.5%
	}
	.tab-content table {
		margin: 0 auto;
	}
	#footer {
		text-align: center;
	}
	.tab select {
		width: 80%;
		height: 40px;
		margin: 10px 0;
	}
	.tab textarea {
		width: 80%;
		margin: 10px 0;
	}
	.tab input[type=text]:not (.Datepicker ){
		width: 80%;
		height: 40px;
		margin: 10px 0;
	}
	.times input[type=text] {
		width: 50%;
		text-align: center;
	}
	.setTime::-webkit-datetime-edit-ampm-field {
		display: none;
	}
	#repairChart th {
		font-size: 0.1em;
		text-align: center;
		background-color: #ECFFFD;
	}
	.nav-item .nav-link {
		height: 32px;
		padding-top: 5px;
	}
	#totalTime {
		margin-left: 4px;
		width: 60px;
	}
	#release th {
		font-size: 0.7em;
		color: white;
	}
	#releaselist th {
		font-size: 0.7em;
		color: white;
	}
	.ui-datepicker-trigger{
			width: 30px;
			height: 30px;
	}
	.nav-tabs {
		height: 50px;
	}
	#first table tr th {
		text-align: right;
		padding-right: 2%;
	}
	#first .dt {
		width: 31%;
		height: 30px;
		text-align: center;
	}
	.table-responsive tr td:not (.centers ):not (.numberFmt ){
		text-align: left;
	}
	.table-responsive tr td:nth-child(1) {
		text-align: center;
	}
	input[type=button]:not(.insert):not(.delete) {
		margin-left: 3%;
		width: 7%;
		height: 29px;
		margin-top: 0.5%;
	}
	.nav-link{
	font-size: 26px;
	}
}

@media only screen and (min-device-width:320px) and
	(max-device-width:768px) {
	* {
		padding: 0;
		margin: 0;
	}
	#container {
		width: 100%;
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
	table {
		width: 80%;
		margin: 0 auto;
	}
	table input[readonly=readonly] {
		text-align: center;
		width: 252px;
		background-color: lightgray;
	}
	table {
		font-size: 2.0em;
	}
	input[type=submit] {
		background-color: #3399FF;
		border: 0;
		color: white;
		padding: 5px 15px;
		border-radius: 5px;
		font-weight: bold;
		width: 100%;
	}
	.tab-content table {
		margin: 0 auto;
	}
	#footer {
		text-align: center;
	}
	.tab select {
		width: 80%;
		height: 40px;
		margin: 10px 0;
	}
	.tab textarea {
		width: 80%;
		margin: 10px 0;
	}
	.tab input[type=text]:not (.Datepicker ){
		width: 80%;
		height: 40px;
		margin: 10px 0;
	}
	.times input[type=text] {
		width: 50%;
		text-align: center;
	}
	.setTime::-webkit-datetime-edit-ampm-field {
		display: none;
	}
	#repairChart th {
		font-size: 0.1em;
		text-align: center;
		background-color: #ECFFFD;
	}
	.nav-item .nav-link {
		height: 32px;
		padding-top: 5px;
	}
	#totalTime {
		margin-left: 4px;
		width: 60px;
	}
	.ui-datepicker-trigger{
			width: 55px;
			height: 56px;
			margin-top: 9px;
	}
	#first table tr th {
		text-align: right;
		padding-right: 2%;
	}
	.table-responsive tr td:nth-child(1) {
		text-align: center;
	}
	.numberFmt {
		text-align: right;
	}
	.nav-tabs{
		height: 75px;
	}
}
}
</style>
</head>
<body>
	<jsp:include page="header.jsp"></jsp:include>
	<div id="container">
		<form action="" method="get" onsubmit="return;">
			<div id="first">
				<table style="margin-left: 2%">
					<tr>
						<th>거래처명</th>
						<td><input type="text" id="cstm_name" name="cstm_name"
							value="${cstm_name }"></td>
					</tr>
					<tr>
						<th><span id="change">납기일자</span></th>
						<td><input type="text" id="fr_dt" class="Datepicker dt"
							name="fr_dt"><span style="margin-left: 1%;">~</span> <input
							type="text" id="to_dt" class="Datepicker dt" name="to_dt">
						</td>
					</tr>
					<tr>
					<tr>
						<th>품명</th>
						<td><input type="text" id="item_name" name="item_name"
							value="${item_name }" style="width: 60%; float: left;"> <input
							type="button" class="search" onclick="search();" value="조회">
						</td>

					</tr>
				</table>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item"><a class="nav-link active"
					data-toggle="tab" href="#release">출고처리</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					href="#releaselist">출고내역</a></li>
			</ul>
			<div class="tab-content" style="margin-top: 0px;">
				<div id="release"
					class="tab tab-pane fade table-responsive active in">
					<table id="ajaxTable1"
						class="table table-bordered table-responsive"
						style="text-align: center;">
						<tr>
							<th style="width: 80px;">출고처리</th>
							<th style="width: 90px;">주문번호</th>
							<th style="width: 80px;">주문일자</th>
							<th style="width: 100px;">거래처명</th>
							<th style="width: 100px;">품목코드</th>
							<th style="width: 150px;">품명</th>
							<th style="width: 90px;">규격</th>
							<th style="width: 80px;">납기일자</th>
							<th style="width: 80px;">주문수량</th>
							<th style="width: 80px;">출고수량</th>
						<tr>
					</table>
				</div>
				<div id="releaselist" class="tab tab-pane fade table-responsive"
					class="container">
					<table class="table table-bordered table-responsive"
						id="ajaxTable2" style="text-align: center;">
						<tr>
							<th style="width: 80px;">출고일자</th>
							<th style="width: 90px;">주문번호</th>
							<th style="width: 80px;">주문일자</th>
							<th style="width: 100px;">거래처명</th>
							<th style="width: 100px;">품목코드</th>
							<th style="width: 150px;">품명</th>
							<th style="width: 90px;">규격</th>
							<th style="width: 80px;">납기일자</th>
							<th style="width: 80px;">주문수량</th>
							<th style="width: 80px;">출고수량</th>
						</tr>
					</table>
				</div>
			</div>
		</form>
	</div>
</body>
</html>