<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>금형 관리</title>
<script type="text/javascript" src="../../loader.js"></script>

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

<link href="/resource/css/mblePage.css" media="only screen and (min-device-width:1024px) and (min-width:1024px)" rel="stylesheet"/>
<link href="/resource/css/mblePageMobile.css" media="only screen and (max-width:1023px)" rel="stylesheet"/>
<link href="/resource/css/mblePageMobile.css" media="only screen and (min-device-width:320px) and (max-device-width:768px) " rel="stylesheet"/>
<script>
const api_url = _global.api_host_info;
const hqof_idcd = sessionStorage.getItem('hq_id');
var mold_idcd;
var tag;
	$(document).ready(function() {
		if(!sessionStorage.getItem('accepted')){
			location.href="../mobile/login.do?param={}"
		}
		var mold_code = $('#mold_code').val();
		if(mold_code.trim() != null && mold_code.trim() !=""){
			var obj = new Object();
			obj.mold_code = mold_code;
			obj.hqof_idcd = sessionStorage.getItem('hq_id');
			var jsonData = JSON.stringify(obj);
			$.ajax({
				url: api_url+"/system/mobile/moldmast/get/search.do",
				data:{param:jsonData},
				type:"post",
				dataType : 'json',
				success:function(data){
					if(mold_code == null || mold_code.trim()==""){
						 $('input').val('');
						 $('#submit').val('저장');
						 mold_idcd = "";

					}else{
						if(data['records']['length']==0){
							mold_idcd="";
						}else{
							basicData(data);
						}
					}
				}
			});
		}
		var	obj2 = new Object()
		;
		obj2.hqof_idcd = sessionStorage.getItem('hq_id');
		var dataMold = JSON.stringify(obj2);
		var url2 = api_url+"/system/mobile/moldmast/get/search.do";
		var source;
		$.ajax({
			url: url2,
			data:{param:dataMold},
			type:"post",
			dataType : 'json',
			async    : false,
			success:function(data){
				console.log(data);
				source = $.map(data.records, function(item,idx) {
					return{
						label : item.mold_code,
						value : item.mold_code,
						text  : item.mold_idcd
					}
				})
			}
		});
		$('#mold_code').keydown(function(key) {
			if(key.keyCode==13){

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

		$("#mold_code").autocomplete({
			source : source,
			select : function(event, ui) {
				var mold_code = ui.item.value;
				var obj = new Object();
				obj.mold_idcd = mold_code;
				obj.hqof_idcd = sessionStorage.getItem('hq_id');
				var jsonData = JSON.stringify(obj);

				$.ajax({
					url: api_url+"/system/mobile/moldmast/get/search.do",
					data:{param:jsonData},
					type:"post",
					dataType : 'json',
					success:function(data){
						console.log(data);
						if(mold_code == null || mold_code.trim()==""){
							 $('input').not('#mold_code').val('');
							 $('#submit').val('저장');
						}else{
							if(data['records']['length']==0){
								mold_idcd="";
								$('input').not('#mold_code').val('');
								$('#submit').val('저장');
							}else{
								basicData(data);
							}
						}
					}
				});
			},
			focus : function(event, ui) {    //포커스 가면
				return false;//한글 에러 잡기용도로 사용됨
			},
			minLength: 1,// 최소 글자수
			autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
			classes: {
				"ui-autocomplete": "highlight"
			},
			delay: 500,    //검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
			position: { my : "right top", at: "right bottom" },
			close : function(event){    //자동완성창 닫아질때 호출
			}
		});

		$('.setTime').timepicker({
			timeFormat: 'HH:mm',
			dynamic: false,
			dropdown: false,
		 });
		$('.nav-link').click(function() {

			tag = $(this).text();
			var toDay = new Date();
			var fday = toDay.getDate();
			var fmonth = toDay.getMonth();
			var fyear = toDay.getFullYear();
			fmonth += 1;											//달은 0 부터 시작함

			if(fmonth < 10){
				fmonth = '0'+fmonth;
			}
			if(fday < 10){
				fday ='0'+fday;
			}

			var fr_dt = fyear+'-'+fmonth+'-'+fday;

			if(tag == '수리'){
				$('input=[name=repa_date]').val(fr_dt);

			}else if(tag=='이동'){
				$('input=[name=move_date]').val(fr_dt);

			}
		});

		 $('.nav-link').click(function() {									//탭 클릭시 값을 불러오는 ajax
// 			tag = $(this).text();
// 			var url;
// 			if(tag =='수리'){
// 				url = api_url+"/system/mobile/moldmast/get/repa.do";
// 			}else if(tag=='이동'){
// 				url = api_url+"/system/mobile/moldmast/get/move.do";
// 			}
// 			var mold_code = $('#mold_code').val();

// 			var obj = new Object();
// 			obj.mold_code = mold_code;
// 			obj.hqof_idcd = hqof_idcd;
// 			var jsonData = JSON.stringify(obj);

// 			if(mold_code && mold_code.trim()!=""){
// 				$.ajax({
// 					url: url,
// 					data:{param:jsonData},
// 					type:"post",
// 					dataType : 'json',
// 					success:function(data){
// 						antherData(data,tag);
// 					}
// 				});
// 			}

		});
		$('#submit').click(function() {									//저장 클릭시 발생되는 set이벤트
			var mold_code = $('#mold_code').val();
			var json;

			if(mold_idcd==null && mold_code==null){
				alert('금형코드를 입력해주세요.');
				return false;

			}
			if(mold_code == null || mold_code.trim()==""){
				alert('금형코드를 입력해주세요.');
				return false;
			}
			var select = 'insert';
			var url;
			//기본 설정완료

			if(tag =='금형정보' ||tag == null){

				var cavity = $('input[name=cavity]').val();
				var mold_edtn_numb = $('input[name=mold_edtn_numb]').val();
				var move_loct_name = $('input[name=move_loct_name]').val();
				var work_shot = $('input[name=work_shot]').val();
				var acum_shot = $('input[name=acum_shot]').val();
				var updt_expc_shot = $('input[name=updt_expc_shot]').val();
				var updt_expc_date = $('input[name=updt_expc_date]').val();

				var arr = new HashMap();
				arr.put('mold_idcd',mold_idcd);

				arr.put('cavity',cavity);
				arr.put('mold_edtn_numb',mold_edtn_numb);
				arr.put('move_loct_name',move_loct_name);
				arr.put('work_shot',work_shot);
				arr.put('acum_shot',acum_shot);
				arr.put('updt_expc_shot',updt_expc_shot);
				arr.put('updt_expc_date',updt_expc_date);
				json = jsonFmt(select,arr);

				url = api_url+"/system/moldmast/set/shot.do?param="+json;


			}else if(tag=='수리'){

				var repa_date = ($('input[name=repa_date]').val()).replace(/-/gi,'');
				var repa_entr_name = $('input[name=repa_entr_name]').val();
				var repa_need_time = $('input[name=repa_need_time]').val();
				var need_amnt = Number(($('input[name=need_amnt]').val()).replace(/,/gi,''));
				var repa_resn = $('input[name=repa_resn]').val();
				var repa_cont = $('textarea[name=repa_cont]').val();
				var dmge_regn = $('textarea[name=dmge_regn]').val();

				var arr = new HashMap();
				arr.put('mold_idcd',mold_idcd);

				arr.put('repa_date',repa_date);
				arr.put('repa_entr_name',repa_entr_name);
				arr.put('repa_need_time',repa_need_time);
				arr.put('need_amnt',need_amnt);
				arr.put('repa_resn',repa_resn);
				arr.put('repa_cont',repa_cont);
				arr.put('dmge_regn',dmge_regn);
				json = jsonFmt(select,arr);

				url = api_url+"/system/moldmast/set/repa.do?param="+json;
			}else if(tag=='이동'){

				var move_date = ($('input[name=move_date]').val()).replace(/-/gi,'');
				var move_loct_dvcd = $('select[name=move_loct_dvcd]').val();
				var move_loct_name = $('input[name=move_loct_name]').val();
				var move_purp_dvcd = $('select[name=move_purp_dvcd]').val();
				var move_purp = $('textarea[name=move_purp]').val();
				var remk_cont = $('textarea[name=remk_cont]').val();

				var arr = new HashMap();

				arr.put('mold_idcd',mold_idcd);

				arr.put('move_date',move_date);
				arr.put('move_loct_dvcd',move_loct_dvcd);
				arr.put('move_loct_name',move_loct_name);
				arr.put('move_purp_dvcd',move_purp_dvcd);
				arr.put('move_purp',move_purp);
				arr.put('remk_cont',remk_cont);
				json = jsonFmt(select,arr);
				url = api_url+"/system/moldmast/set/move.do?param="+json;

			}
			$.ajax({
				url: url,
				type:"post",
				contentType : 'application/json; charset=UTF-8',
				success:function(data){
				}
			});


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
			$('.numFmt').change(function() {

				var val = $(this).val();
				if(val != ''){
					val = val.replace(/,/gi, '');
				}
				$(this).val(numberFmt(val));
			});

	});

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

	function getName(temp) {													//button class name 가져와서 뿌리기
		var name = temp.getAttribute('class');
		return name;
	}

	function basicData(data) {
		mold_idcd = chk(data['records'][0]['mold_idcd']);
		//고정 table
		$('input[name=mold_name]').val(chk(data['records'][0]['mold_name']));
		$('input[name=mold_spec]').val(chk(data['records'][0]['mold_spec']));
		$('input[name=make_cmpy_name]').val(chk(data['records'][0]['make_cmpy_name']));
		$('input[name=afsv_tele_numb]').val(chk(data['records'][0]['afsv_tele_numb']));
		$('input[name=puch_date]').val(dateFmt(chk(data['records'][0]['puch_date'])));
		$('input[name=updt_dttm]').val(dateFmt(chk(data['records'][0]['updt_dttm'])));
		$('input[name=cavity]').val(chk(data['records'][0]['cavity']));
		$('input[name=mold_edtn_numb]').val(chk(data['records'][0]['mold_edtn_numb']));
		$('input[name=move_loct_name]').val(chk(data['records'][0]['move_loct_name']));
		$('input[name=init_shot]').val(chk(data['records'][0]['init_shot']));
		$('input[name=work_shot]').val(chk(data['records'][0]['work_shot']));
		$('input[name=acum_shot]').val(chk(data['records'][0]['acum_shot']));
		$('input[name=updt_expc_shot]').val(chk(data['records'][0]['updt_expc_shot']));
		$('input[name=updt_expc_date]').val(chk(data['records'][0]['updt_expc_date']));

	}
	function antherData(data,tag) {
		if(tag == '수리'){
			$('input[name=repa_date]').val(dateFmt(chk(data['records'][0]['repa_date'])));
			$('input[name=repa_entr_name]').val(chk(data['records'][0]['repa_entr_name']));
			$('input[name=repa_repa_need_time]').val(chk(data['records'][0]['repa_repa_need_time']));
			$('input[name=need_amnt]').val(numberFmt(chk(data['records'][0]['need_amnt'])));
			$('input[name=repa_resn]').val(chk(data['records'][0]['repa_resn']));
			$('textarea[name=repa_cont]').val(chk(data['records'][0]['repa_cont']));
			$('textarea[name=dmge_regn]').val(chk(data['records'][0]['dmge_regn']));
		}else if(tag=='이동'){
			$('input[name=move_date]').val(dateFmt(chk(data['records'][0]['move_date'])));
			$('input[name=move_loct_dvcd]').val(chk(data['records'][0]['move_loct_dvcd']));
			$('input[name=move_loct_name]').val(chk(data['records'][0]['move_loct_name']));
			$('input[name=move_purp_dvcd]').val(numberFmt(chk(data['records'][0]['move_purp_dvcd'])));
			$('textarea[name=move_purp]').val(chk(data['records'][0]['move_purp']));
			$('textarea[name=remk_cont]').val(chk(data['records'][0]['remk_cont']));
		}

		/* else if(tag=='금형정보'){
			// 금형정보
			$('input[name=cavity]').val(chk(data['records'][0]['cavity']));
			$('input[name=mold_edtn_numb]').val(chk(data['records'][0]['mold_edtn_numb']));
			$('input[name=move_loct_name]').val(chk(data['records'][0]['move_loct_name']));
			$('input[name=init_shot]').val(chk(data['records'][0]['init_shot']));
			$('input[name=work_shot]').val(chk(data['records'][0]['work_shot']));
			$('input[name=acum_shot]').val(chk(data['records'][0]['acum_shot']));
			$('input[name=updt_expc_shot]').val(chk(data['records'][0]['updt_expc_shot']));
			$('input[name=updt_expc_date]').val(chk(data['records'][0]['updt_expc_date']));

		} */
	}

	function chk(val) {
		if(val == null){
				val = ""
		}
		return val;
	}

	HashMap = function(){													//hashMap이 없어서 그냥 직접만듬
	    this.map = new Array();
	};
	HashMap.prototype = {
	    put : function(key, value){
	        this.map[key] = value;
	    },get : function(key){
	        return this.map[key];
	    },
	    toString : function(){
	        var temp = '';
	        for(i in this.map){
	            temp = temp + ',' + i + ':' +  this.map[i];
	        }
	        temp = temp.replace(',','');
	          return temp;
	    },
	}

	function jsonFmt(select,arr) {															//set할때 보내는 데이터 json같은 string으로 변환
		var json;
		json = '{"hqof_idcd" : "'+hqof_idcd+'", "records" : [{"_set":"'+select+'"' ;
			for(var i in arr.map){
				if(arr.map[i]!=""){
						json += ',"'+i+'" : '+'"'+arr.map[i]+'"';
				}
			}
				json += '}]}';
		return json;
	}
	function numberCommas(x,a) {
		  x = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
		  x = x.replace(/,/g,'');          // ,값 공백처리
 		  $(a).val(x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // 정규식을 이용해서 3자리 마다 , 추가
		}
</script>
<style>
@media only screen and (min-device-width:1024px) and (min-width:1025px){
	.tab-pane select:not(.selectNot){
		height: 41px;
	}
	table tr th{
		width: 175px;
	}
	.tab-content table{
	   table-layout: fixed;
		margin: 0 1%;
	}
	.tab input[type=text]:not(.Datepicker):not(.styleChange):not(#repa_need_time):not(#need_amnt){
	    width: 70%;
	    height: 40px;
	    margin: 10px 0;
	}
	.Datepicker:not(.widthDate):not(.widthDate2) {
    	width: 533px;
    }
    table input, table select:not(.selectNot){
   		 height: 40px;
   		 width:17%;
	}
	.dateTd{
		    width: 43%;
	}
	.dobleTh{
		width: 12%;
	}
	td1 select[name=chek_dvsn]{
		width:73%;
	}
	.tab select {
    width: 50%;
    }
    .repairTh{
		width: 12%;

    }
    .repaTd{
      width: 41%;

    }
    .td1{
    	width:35.6%
    }
	#repa_need_time{
		    width: 129px;
	}
	#need_amnt{
		width: 129px;
	}
	.tr1{
		overflow: hidden;
	}
	.cola{

	}

}
@media only screen and (max-device-width: 768px) and (min-device-width: 320px){
	table:not(.table-responsive) tr th{
		font-size: 2em;
	}
	table tr td{
		width:37%
	}
	#chk .dobleTh{
		width:30px;
		padding-right: 10px;
	}
	#chk .widthDate{
		width: 41%;
	}
	.dateTd .ui-datepicker-trigger{
		width:17%
	}
	#repair tr th:FIRST-CHILD {
		width: 34%;
	}
	.repairTh{
		    width: 19%;

		text-align: center;
		font-size: 2em;

	}
	input[name=need_amnt]{
		    width: 56%;
	}
	#need_amnt{
		width : 49.5%
	}
	#mold_info table tr th:FIRST-CHILD {
		width : 19%;
	}
	#move table tr th:FIRST-CHILD {
		width: 19%;
	}
}
@media only screen and (max-width:1024px){
	table:not(.table-responsive) tr th{
		font-size: 2em;
	}
	table tr td{
		width:37%
	}
	#chk .dobleTh{
		width:30px;
		padding-right: 10px;
	}
	#chk .widthDate{
		width: 41%;
	}
	.dateTd .ui-datepicker-trigger{
		width:17%
	}
	#repair tr th:FIRST-CHILD {
		width: 34%;
	}
	.repairTh{
		    width: 15%;

		text-align: center;
		font-size: 2em;

	}
	table:not(.table-responsive) tr th:not(.repairTh){
		font-size: 2em;
	}
	#need_amnt{
		width : 48%
	}
	#repa_need_time{
		width:
	}
	#chk .td1, #repair .td1 {
    width: 21%;
    }
}

</style>
</head>
<body>
<jsp:include page="header.jsp"></jsp:include>

<div id="container">

	<form action="#" method="get" onsubmit="return false;">

		<div id="first" >
			<table style="margin: 0 1%;">
					<tr>
						<th>
							금형코드
						</th>
						<td>
							<input type="text" id="mold_code" name="mold_code" required="required" value="${mold_code }" style="text-align: center" />
						</td>
					</tr>
					<tr>
						<th>
							금형명
						</th>
						<td>
							<input type="text" id="mold_name" name="mold_name" value="${mold_name }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							규격
						</th>
						<td>
							<input type="text" id="mold_spec" name="mold_spec" value="${mold_spec }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							제조사명
						</th>
						<td>
							<%-- <fmt:formatDate value="${puch_date }" pattern="yyyy-MM-dd" var="p_date"/> --%>
							<input type="text" id="make_cmpy_name" name="make_cmpy_name"  value="${make_cmpy_name }" readonly="readonly">
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
					<tr>
						<th>
							구매일자
						</th>
						<td>
							<input type="text" id="puch_date" name="puch_date"  value="${puch_date }" readonly="readonly">
						</td>
					</tr>
					<tr>
						<th>
							수정일자
						</th>
						<td>
							<input type="text" id="updt_dttm" name="updt_dttm"  value="${updt_dttm }" readonly="readonly">
						</td>
					</tr>
				</table>
			</div>
			<ul class="nav nav-tabs ">
				  <li class="nav-item" >
				    <a class="nav-link active" data-toggle="tab" href="#mold_info">금형정보</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" data-toggle="tab"  href="#repair">수리</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" data-toggle="tab"  href="#move">이동</a>
				  </li>
			</ul>
		<div class="tab-content">
			<div id="mold_info" class="tab tab-pane fade active in " >
				<table>
					<tr>
						<th>
							CAVITY
						</th>
						<td>
							<input name="cavity" type="text" value="${cavity }" class="numberFmt">
						</td>
					</tr>
					<tr>
						<th>
							금형판갯수
						</th>
						<td>
							<input name="mold_edtn_numb" type="text" value="${mold_edtn_numb }" class="numberFmt">
						</td>
					</tr>
					<tr>
						<th>
							설계Shot
						</th>
						<td>
							<input type="text" name="move_loct_name" value="${move_loct_name }" onkeyup="numberCommas(this.value,this)"  class="numberFmt">
						</td>
					</tr>
					<tr>
						<th>
							초기Shot
						</th>
						<td>
							<input type="text" name="init_shot" value="${init_shot }" onkeyup="numberCommas(this.value,this)" class="numberFmt" >
						</td>
					</tr>
					<tr>
						<th>
							작업Shot
						</th>
						<td>
							<input type="text" name="work_shot" value="${work_shot }" onkeyup="numberCommas(this.value,this)" class="numberFmt" >
						</td>
					</tr>
					<tr>
						<th>
							누적Shot
						</th>
						<td>
							<input type="text" name="acum_shot" value="${acum_shot }" onkeyup="numberCommas(this.value,this)" class="numberFmt" >
						</td>
					</tr>
					<tr>
						<th>
							수정예상Shot
						</th>
						<td>
							<input type="text" name="updt_expc_shot" value="${updt_expc_shot }" onkeyup="numberCommas(this.value,this)" class="numberFmt">
						</td>
					</tr>
					<tr>
						<th>
							수정예정일자
						</th>
						<td>
							<input type="text" class="Datepicker" name="updt_expc_date" value="" >
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
						<td colspan="3" >
							<input type="text" name="repa_date" class="Datepicker">
						</td>
					</tr>
					<tr>
						<th>
							수리업체명
						</th>
						<td colspan="3" style="text-align: left;">
							<input type="text" name="repa_entr_name" >
						</td>
					</tr>
					<tr>
						<col class="cola"/>
						<col class="colb"/>
						<col class="colc"/>
						<col class="cold"/>
						<th>
							소요시간
						</th>
						<td class="td1">
							<input style="text-align: right" type="text" name="repa_need_time" id="repa_need_time" class="selectNot" >
						</td>
						<th class="repairTh" >
							수리금액
						</th>
						<td class="repaTd">
							<input style="text-align: right" type="text" name="need_amnt" onkeyup="numberCommas(this.value,this)" id="need_amnt" class="numFmt">
						</td>
					</tr>
					<tr>
						<th>
							수리사유
						</th>
						<td colspan="3" style="text-align: left;">
							<input type="text" name="repa_resn">
						</td>
					</tr>
					<tr>
						<th>
							수리내용
						</th>
						<td colspan="3" style="text-align: left;">
							<textarea rows="5" cols="5" name="repa_cont"></textarea>
						</td>
					</tr>

					<tr>
						<th>
							고장부위
						</th>
						<td colspan="3" style="text-align: left;">
							<textarea rows="5" cols="5" name="dmge_regn"></textarea>
						</td>
					</tr>
				</table>
		 	</div>
		 <div id="move" class="tab tab-pane fade styleChange " >
				<table>
					<tr>
						<th>
							이동일자
						</th>
						<td >
							<input type="text" class="Datepicker" name="move_date" value="${move_date }">
						</td>
					</tr>
					<tr>
						<th>
							이동장소구분
						</th>
						<td>
							<select name="move_loct_dvcd">
								<option value="0" selected="selected"></option>
								<option value="1"></option>
							</select>
						</td>
					</tr>
					<tr>
						<th>
							이동장소명
						</th>
						<td>
							<input type="text" name="move_loct_name" value="${move_loct_name }" >
						</td>
					</tr>
					<tr>
						<th>
							이동구분
						</th>
						<td>
							<select name="move_purp_dvcd">
								<option value="0" selected="selected"></option>
								<option value="1"></option>
							</select>
						</td>
					</tr>
					<tr>
						<th>
							이동목적
						</th>
						<td>
							<textarea name="move_purp" rows="5" cols="5"></textarea>
						</td>
					</tr>
					<tr>
						<th>
							비고
						</th>
						<td>
							<textarea name="remk_cont" rows="5" cols="5"></textarea>
						</td>
					</tr>

				</table>
		 	</div>
		<div id="footer">
			<input id="submit" type="button" value="저장">
	 	</div>
	 </form>
</div>
</body>
</html>