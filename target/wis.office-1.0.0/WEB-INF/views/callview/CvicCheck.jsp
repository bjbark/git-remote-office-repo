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
<title>생산설비 점검</title>
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

<link href="/resource/css/callWebView.css" media="only screen and (min-device-width:1024px)" rel="stylesheet"/>
<link href="/resource/css/callMobileView.css" media="only screen and (min-device-width:320px) and (max-device-width:768px)" rel="stylesheet"/>
<script>

	$(document).ready(function() {
		var idcd = $('#cvic_idcd').val();
		var obj = new Object();
		obj.cvic_idcd = idcd;
		var jsonData = JSON.stringify(obj);

		$.ajax({
			url:"../prod/cvic/cvicmast/get/cvic.do",
		 	data:{param:jsonData},
			type:"GET",
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success:function(data){
				console.log(JSON.stringify(data));
				if(data['records'][0] != null ){
					var temp = data['records'][0]['puch_date'];
					var date = temp.substr(0,4)+'-'+temp.substr(4,2)+'-'+temp.substr(6,2);
					$('#cvic_name').val(data['records'][0]['cvic_name']);
					$('#cvic_spec').val(data['records'][0]['cvic_spec']);
					$('#puch_date').val(date);
					$('#puch_cstm_name').val(data['records'][0]['puch_cstm_name']);
					$('#afsv_tele_numb').val(phoneNumber(data['records'][0]['afsv_tele_numb']));
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

			if(val =='수리이력'){
				setTimeout(function() { $('#footer').css('display','none'); }, 100)

			}else{
				setTimeout(function() { $('#footer').css('display','block'); }, 200)


			}

		});
		if(matchMedia("only screen and (min-device-width:320px) and (max-device-width:768px)")){
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
		}


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



</style>
</head>
<body>
<div id="container">
	<form action="" method="get" >
	<input type="hidden" name="hqof_idcd" value="N1000WINFO">
		<div id="first" >
			<table>
					<tr>
						<th>
							설비번호
						</th>
						<td>
							<input type="text" id="cvic_idcd" name="cvic_idcd" value="${cvic_idcd }"  readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							설비명
						</th>
						<td>
							<input type="text" id="cvic_name" name="cvic_name" value="${cvic_name }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							설비규격
						</th>
						<td>
							<input type="text" id="cvic_spec" name="cvic_spec" value="${cvic_spec }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							구매일자
						</th>
						<td>
							<%-- <fmt:formatDate value="${puch_date }" pattern="yyyy-MM-dd" var="p_date"/> --%>
							<input type="text" id="puch_date" name="puch_date"  value="${puch_date }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							구매처
						</th>
						<td>
							<input type="text" id="puch_cstm_name" name="puch_cstm_name"  value="${puch_cstm_name }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							AS전화번호
						</th>
						<td>
							<input type="text" id="afsv_tele_numb" name="afsv_tele_numb" value="${afsv_tele_numb }" readonly="readonly">
						</td>
					</tr>
				</table>
			</div>
			<ul class="nav nav-tabs">
				  <li class="nav-item">
				    <a class="nav-link active" data-toggle="tab" href="#chk">점검</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" data-toggle="tab" href="#repair">수리</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" data-toggle="tab" href="#repairChart">수리이력</a>
				  </li>
				   <li class="nav-item">
				    <a class="nav-link" data-toggle="tab" style="color: red;" href="#report">이상보고</a>
				  </li>
			</ul>
		<div class="tab-content">
			<div id="chk" class="tab tab-pane fade active in " >
				<table>
					<tr>
						<th>
							점검구분
						</th>
						<td>
							<select name="chek_ccle_dvcd" >
								<option vlaue="0" selected="selected" > </option>
								<option vlaue="1">test1</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>
							점검결과
						</th>
						<td>
							<select name="" >
								<option vlaue="0" selected="selected">정상</option>
								<option vlaue="1">불량</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>
							메모
						</th>
						<td>
							<textarea name="remk_text" rows="5" cols="5" >${pageContext.request.contextPath }</textarea>
						</td>
					</tr>
					<tr>
						<th>
							차기점검일
						</th>
						<td>
							<input type="text" class="Datepicker"  name="nxrm_chek_date" value="${nxrm_chek_date }" >
						</td>
					</tr>
				</table>
		 	</div>
		 	<div id="repair" class="tab tab-pane fade" class="container">
				<table>
					<tr>
						<th>
							수리일자
						</th>
						<td  >
							<input type='text'name="repa_date" class="Datepicker" />

						</td>
					</tr>
					<tr>
						<th>
							수리업체
						</th>
						<td>
							<input type="text" name="repa_entr_name">
						</td>
					</tr>
					<tr>
						<th>
							수리사유
						</th>
						<td>
							<select name="repa_resn_sbsc_dvcd">
								<option value="" selected="selected"></option>
								<option value=""></option>
								<option value=""></option>
							</select>
						</td>
					</tr>
					<tr>
						<th>
							수리시간
						</th>
						<td class="times">
							<input type="text" style="width: 80px" id="t1" data-step="1" data-min-time="00:00" data-max-time="23:59" data-show-2400="true" class="setTime" > &nbsp;~&nbsp;
							<input type="text" style="width: 80px"id="t2"data-step="1" data-min-time="00:00" data-max-time="23:59" data-show-2400="true"class="setTime">
							<input type="text"  id="totalTime" readonly="readonly" maxlength="2" name = "repa_need_time">
						</td>
					</tr>
					<tr>
						<th>
							고장부위
						</th>
						<td>
							<textarea rows="5" cols="5" name="dmge_regn"></textarea>
						</td>
					</tr>
					<tr>
						<th>
							수리내용
						</th>
						<td>
							<textarea rows="5" cols="5" name="repa_cont"></textarea>
						</td>
					</tr>
				</table>
		 	</div>
		 	<div id="repairChart" class="tab tab-pane fade" >
				<table class="table table-bordered table-responsive repairTable">
					<tr>
						<th>
							수리일자
						</th>
						<th>
							수리업체
						</th>
						<th>
							소요시간
						</th>
						<th>
							점검사유
						</th>
						<th>
							수리항목
						</th>
						<th>
							수리내용
						</th>
						<th>
							소요금액
						</th>
						<th>
							고장부위
						</th>
					<tr>
				</table>
		 	</div>
		 		<div id="report" class="tab tab-pane fade" >
				<table>
					<tr>
						<th>
							보고일자
						</th>
						<td>
							<input type='text'name="" class="Datepicker" />
						</td>
					</tr>
					<tr>
						<th>
							고장부위
						</th>
						<td>
							<textarea name="dmge_regn" rows="5" cols="5"></textarea>
						</td>
					</tr>
					<tr>
						<th>
							설비상태
						</th>
						<td>
							<select name="cvic_stat_dvcd">
								<option value=""></option>
								<option value=""></option>
								<option value=""></option>
							</select>
						</td>
					</tr>
					<tr>
						<th>
							보고자
						</th>
						<td>
							<input type="text" name="" value="" >
						</td>
					</tr>
				</table>
		 	</div>
		</div>
		<div id="footer">
			<input type="submit" value="확인" onclick="" >
	 	</div>
	 </form>
</div>
</body>
</html>