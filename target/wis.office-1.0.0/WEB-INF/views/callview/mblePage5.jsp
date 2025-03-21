<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>설비관리</title>
<!-- jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<!--  -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>

<!-- timepicker -->
<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

<!-- css file -->

	<link href="/resource/css/mblePage.css" media="only screen and (min-device-width:1024px)" rel="stylesheet"/>
	<link href="/resource/css/mblePageMobile.css" media="only screen and (min-device-width:320px) and (max-device-width:768px)" rel="stylesheet"/>
	<script>

	$(document).ready(function() {
		if(!sessionStorage.getItem('accepted')){
			location.href="../mobile/login.do?param={}"
		}else{
			console.log('asd');
		}
		var idcd = $('#mold_code').val();
		var obj = new Object();
		obj.cvic_idcd = idcd;
		var jsonData = JSON.stringify(obj);

		$.ajax({
			url:"../prod/cvic/cvicmast/get/cvic.do",
		 	data:{param:jsonData},
			type:"post",
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success:function(data){
				console.log(JSON.stringify(data));
				if(data['records'][0] != null ){
					var temp = data['records'][0]['puch_date'];
					var date = temp.substr(0,4)+'-'+temp.substr(4,2)+'-'+temp.substr(6,2);
					$('#mold_name').val(data['records'][0]['mold_name']);
					$('#mold_spec').val(data['records'][0]['mold_spec']);
					$('#mker_name').val(data['records'][0]['mker_name']);
					$('#afsv_rele_numb').val(data['records'][0]['afsv_rele_numb']);
					$('#afsv_tele_numb').val(phoneNumber(data['records'][0]['afsv_tele_numb']));
					$('#updt_date').val(data['records'][0]['updt_date']);
				}else{
					alert('찾는 값이 없습니다.');
				}
			}
		});

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
			var val = $(this).text();
			console.log(val);

			if(val =='점검내역'){
				setTimeout(function() { $('#footer').css('display','none'); }, 100)

			}else{
				setTimeout(function() { $('#footer').css('display','block'); }, 200)


			}

		});
		/* if(matchMedia("only screen and (min-device-width:320px) and (max-device-width:768px)")){
			$(window).scroll(function () {
				var scrollHeight = $(document).height();
				var scrollValue= $(window).height()+$(window).scrollTop();
				console.log(scrollHeight +' / '+scrollValue);
				if(scrollValue > scrollHeight-120){
					$('#footer').css('position','relative');

				}else{
					$('#footer').css('position','fixed');
				}
			})
		} */


	});
	$(function() {
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
			font-size	: 1.8em;
		}
		table input[readonly=readonly]{
			text-align	: center;
			width		: 252px;
			background-color : lightgray;
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


		.ui-datepicker-trigger{
		width: 30px;
		height:30px;
		}

		.nav-tabs{
		height: 50px;
		}
		#first table tr th{
			text-align : right;
			padding-right: 1%;
		}
		#acpt_seqn{
			width:6%;
			height:30px;
		}
		#acpt_numb{
			width:87%;
			height:30px;
		}
		table{
			margin-left: 5%;
		}
		#first input[name=deli_date]{
			width:90%;
			height: 30px;
		}


	}
@media only screen and (min-device-width:320px) and (max-device-width:768px){
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
			font-size	: 2.0em;
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


		.ui-datepicker-trigger{
		width: 30px;
		height:30px;
		}

		.nav-tabs{
		height: 50px;
		}
		#first table tr th{
			text-align : right;

			padding-right: 2%;
		}
		#acpt_seqn{
			width:16%;
			height:60px;
		}
		#acpt_numb{
			width:75%;
			height:60px;
		}
		table{
			margin-left: 1%;
		}
		table tr td{
			text-align: left;
			font-size:1.5em;
		}
		#first input[name=deli_date]{
			width:90%;
			height: 60px;
		}
	}
}
</style>
</head>
<body>
<jsp:include page="header.jsp"></jsp:include>
<div id="container" >
	<form action="" method="get" >
		<div id="first" >
			<table>
					<tr>
						<th>
							주문번호
						</th>
						<td>
							<input type="text" id="acpt_numb" name="acpt_numb" value="${acpt_numb }"  >
							<input type="text" id="acpt_seqn" name="acpt_seqn" value="${acpt_seqn }"  >
						</td>
					</tr>
					<tr>
						<th>
							거래처명
						</th>
						<td>
							<input type="text" id="cstm_code" name="cstm_code" value="${cstm_code }" style="width:94%; padding-right: 1%;" >
						</td>
					</tr>
					<tr>
						<th>
							납기일자
						</th>
						<td>
							<input type="text" class="Datepicker" name="deli_date" id="deli_date" value="${deli_date }" >
						</td>
					</tr>
					<tr>
						<th>
							품명
						</th>
						<td>
							<input type="text" id="item_name" name="item_name" value="${item_name }" style="width:94%; padding-right: 3%;">
						</td>
					</tr>
					<tr>
						<th>
							규격
						</th>
						<td>
							<input type="text" id="sepc" name="sepc" value="${sepc }" style="width:94%; padding-right: 3%;">
						</td>
					</tr>
					<tr>
						<th>
							모델
						</th>
						<td>
							<input type="text" id="prod_modl" name="prod_modl"  value="${prod_modl }" style="width:94%; padding-right: 3%;">
						</td>
					</tr>
					<tr>
						<th>
							수주량
						</th>
						<td>
							<input type="text" style="width:94%; padding-right: 3%;">
						</td>
					</tr>
					<tr>
						<th>
							납품완료
						</th>
						<td>
							<input type="text" style="width:94%; padding-right: 3%;">
						</td>
					</tr>
					<tr>
						<th>
							미납잔량
						</th>
						<td>
							<input type="text" style="width:94%; padding-right: 3%;">
						</td>
					</tr>
					<tr>
						<th style="color:blue" style="width:94%; padding-right: 3%;">
							출고수량
						</th>
						<td>
							<input type="text" style="background-color:#99ccff;width:94%; padding-right: 3%;">
						</td>
					</tr>
			</table>
		</div>

		<div id="footer">
			<input type="submit" value="출고처리" onclick="">
	 	</div>
	 </form>
</div>
</body>
</html>