<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>프로젝트 스케쥴</title>
<meta charset="utf-8">
<link href="/resource/js/seriesGanttchart/css/style.css" type="text/css"
	rel="stylesheet">
<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
	type="text/css" rel="stylesheet">
<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"
	type="text/css" rel="stylesheet">
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">

</script>
<style type="text/css">
	body {
		font-family: Helvetica, Arial, sans-serif;
		font-size: 13px;
		padding: 0 0 50px 0;
	}

	.contain {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	h1 {
		margin: 40px 0 20px 0;
	}

	h2 {
		font-size: 1.5em;
		padding-bottom: 3px;
		border-bottom: 1px solid #DDD;
		margin-top: 50px;
		margin-bottom: 25px;
	}

	table th:first-child {
		width: 150px;
	}
	.fn-label{
		font-size:1.5em;
	}
	.fn-gantt .leftPanel {
		width: 275px;
	}

	.buttonDiv {
		height: 40px;
	}
	.fn-gantt-hint{
		font-size:2em;
	}
	.buttonDiv .closeButton {
		margin: 10px;
		/* float: right; */
		width: 200px;
		height: 50px;
		position: absolute;
		font-size: 2em;
		right: 2px;
	}
	.toggleButton {
		position: absolute;
		font-size: 2em;
		top: 17px;
		left : 50px;
	}

	.dis {
		display: none;
	}
	.buttonDiv table tr th span{
		margin-right : 10px;
		font-size: 2em;
	}
	.buttonDiv table tr td input{
		font-size: 2em;
	}
	.buttonDiv table tr th{
		width:120px;
		text-align: right;
	}
	.buttonDiv table{
		float:left;
		margin-top: 12px;
	}
	input[name=pjod_idcd]{
		float:left;
		width:168px;
	}
	input[name=item_name]{
		float:left;
		width:400px;
	}
	input[name=deli_date]{
		float:left;
		width:168px;
	}
	.bottom{
		position: fixed;
		bottom: 0px;
		z-index: 99;
	}
	.fn-gantt .headerPanel {
	    overflow: hidden;
	}
</style>
</head>
<body>
	<div class='buttonDiv'>
		<div class="toggleButton" >
			<input id="toggle-state" type="checkbox" data-toggle="toggle" data-on="설계일정" data-off="작업일정">
		</div>
	</div>
	<div class="gantt"></div>


	<script src="/resource/js/seriesGanttchart/js/jquery.min.js"></script>
	<script src="/resource/js/seriesGanttchart/js/jquery.fn.gantt.js"></script>
	<script src="/resource/js/seriesGanttchart/js/bindWithDelay.js"></script>
	<script src="/resource/js/seriesGanttchart/js/onDelay.js"></script>
	<script
		src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
	<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	<script>
		$(function() {
			var api_host = '${api_host}',
				pjod_idcd = '${pjod_idcd}',
				item_name = '${item_name}',
				deli_date = '${deli_date}',
				work_ordr_dvcd = '${work_ordr_dvcd}',
				search_url = '${search_url}',
				hq_id = '${hq_id}',
				token = '${token}',
				hide='${hide}'
			;
			if(hide == '1'){
				$('.buttonDiv').css('display','none');
			}
			function loadGanttChart(inq_dvcd){
				var obj = new Object();
				obj.pjod_idcd = pjod_idcd;
				obj.hq_id = hq_id;
				obj.inq_dvcd = inq_dvcd;
				obj.work_ordr_dvcd = work_ordr_dvcd;
				var jsonData = JSON.stringify(obj);
				var tempTasks = new Array();
				$('input[name=pjod_idcd]').val(pjod_idcd)
				$('input[name=item_name]').val(item_name)
				$('input[name=deli_date]').val(deli_date)
				$.ajax({
					url : api_host + search_url,
					data : {
						param : jsonData
					},
					type : "post",
					async : false,
					dataType : 'json',
					success : function(data) {
						if(data.records.length <= 0){
							return;
						}
						if (data.success) {
							for (var i = 0; i < data.records.length; i++) {
								var tempName = "";
								tempName = data.records[i].grup_name;
								var item_name = data.records[i].item_name;
								var tempTasks2 = new Array();
								tempTasks2.push({
									"customClass" : data.records[i].plan_stdt ? data.records[i].plan_css_type : 'dis',
									"from" : data.records[i].plan_stdt ? datefmt(data.records[i].plan_stdt) : new Date().setDate(new Date().getDate() + 90),
									"to" : data.records[i].plan_eddt ? datefmt(data.records[i].plan_eddt) : datefmt(data.records[i].plan_stdt),
									"desc" : data.records[i].grup_name ? data.records[i].grup_name+" : "+data.records[i].item_name : data.records[i].item_name,
									"dataObj" : data.records[i]
								})
								if(data.records[i].clos_stdt){
									tempTasks2.push({
										"customClass" : data.records[i].clos_stdt ? data.records[i].clos_css_type : 'dis',
										"from" : data.records[i].clos_stdt ? datefmt(data.records[i].clos_stdt) : new Date().setDate(new Date().getDate() + 90),
										"to" : data.records[i].clos_eddt ? datefmt(data.records[i].clos_eddt) : datefmt(data.records[i].clos_stdt),
										"desc" : data.records[i].grup_name ? data.records[i].grup_name+" : "+data.records[i].item_name : data.records[i].item_name,
										"dataObj" : data.records[i]
									})
								}
								var work_days_before = data.records[i].work_days;
								if(work_days_before){
									var work_days = JSON.parse(work_days_before);
									for(var j = 0; j < work_days.actl.length;j++){
										tempTasks2.push({
											"customClass" : work_days.actl[j].actl_stdt ? work_days.actl[j].actl_css_type : 'dis',
											"from" : work_days.actl[j].actl_stdt ? datefmt(work_days.actl[j].actl_stdt) : new Date().setDate(new Date().getDate() + 90),
											"to" : work_days.actl[j].actl_eddt ? datefmt(work_days.actl[j].actl_eddt) : datefmt(work_days.actl[j].actl_stdt),
											"desc" : tempName ? tempName+" : "+item_name : item_name,
											"dataObj" : data.records[i]
										})

									}
								}
								tempTasks.push({
									"name" : data.records[i].grup_name ? tempName : '',
									"desc": data.records[i].item_name ? data.records[i].item_name : '',
									"values" : tempTasks2
								});
							}
						}
					}
				});
				function datefmt(value) {
					var result;

					result = value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2)
					return result;
				}
				$(".gantt").gantt({
					source : tempTasks,
					scale : "days",
					minScale : "days",
					maxScale : "months",
					navigate : "scroll",
					dow : [ "일", "월", "화", "수", "목", "금", "토" ],
					months : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
					waitText : 'Please Wait...',
					itemsPerPage : 200,
					scrollToToday : false,
					onRender:function(){
						if(hide == '1'){
							$('.leftPanel').css({"width":"420px"});
							$('.leftPanel').children('.desc').children('.fn-label').css({"width":"200px"});
							$('.leftPanel').children('.name').css({"width":"40%"});
							$('.leftPanel').children('.desc').css({"width":"60%"});
							$('.highbar').css({"width":"420px"});
						}
					}
				});
			}
			loadGanttChart('1');
			$('#toggle-state').change(function(){
				var chk = document.getElementById('toggle-state').checked;
				if(chk){
					loadGanttChart('2');
				}else{
					loadGanttChart('1');
				}
			});

		});

		$(window).scroll(function(event){
			var leftPanelWidth = $('.leftPanel').css('width');
			var hide = '${hide}';
			if ( $(window).scrollTop() == $(document).height() - $(window).height() ) {
		    }else{
		    	$('.bottom').css("position","fixed");
				$('.bottom').css('bottom',"0");
		    }
			if($(window).scrollTop()>50){
				if(hide == '1'){
					$('.highbar').css("z-index","92");
					$('.highbar').css("position","fixed");
					$('.highbar').css("top","0px");
					$('.leftPanel').css("z-index","91");
					$('.headerPanel').css("position","fixed");
					$('.headerPanel').css("z-index","90");
					$('.headerPanel').css("top","0px");
				}else{
					$('.highbar').css("z-index","92");
					$('.highbar').css("position","fixed");
					$('.highbar').css("top","60px");

					$('.buttonDiv').css("position","fixed");
					$('.buttonDiv').css("top","0");
					$('.buttonDiv').css("z-index","99");
					$('.buttonDiv').css("width","100%");
					$('.buttonDiv').css("background-color","white");
					$('.buttonDiv').css("height","60px");
					$('.leftPanel').css("z-index","91");
					$('.headerPanel').css("position","fixed");
					$('.headerPanel').css("z-index","90");
					$('.headerPanel').css("top","60px");
				}
			}else{
				$('.highbar').css("position","absolute");
				$('.highbar').css("top","");
				$('.highbar').css("z-index","");
				$('.buttonDiv').css("height","");
				$('.buttonDiv').css("background-color","");
				$('.buttonDiv').css("position","");
				$('.buttonDiv').css('top',"");
				$('.buttonDiv').css("z-index","");
				$('.headerPanel').css("z-index","");
				$('.leftPanel').css("z-index","");
				$('.headerPanel').css("position","");
				$('.headerPanel').css("top","");
			}
		});
	</script>


</body>
</html>
