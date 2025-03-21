<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>종합현황</title>
<script type="text/javascript" src="../../loader.js"></script>

<!-- jquery -->
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> -->
<!-- <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> -->
<!-- <script src="//code.jquery.com/jquery.min.js"></script> -->
<!-- <script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script> -->
<!-- <script src='//unpkg.com/popper.js@1/dist/umd/popper.min.js'></script> -->
<!-- 부트스트랩 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<!-- 그리드 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/css/ui.jqgrid.min.css">
<script src='https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/i18n/min/grid.locale-kr.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/modules/min/grid.base.js'></script>


<script>
var api_url = _global.api_host_info;
var dataArray;
var dataArray2;
var arrs = new Array();
var arrs2 = new Array();
	$(document).ready(function(){
		if(!sessionStorage.getItem('accepted')){
			location.href="../mobile/login.do?param={}"
		}
		var obj = new Object();
		obj.work_ordr_dvcd = '0';
		obj.hqof_idcd = sessionStorage.getItem('hq_id');
		var jsonData = JSON.stringify(obj);
		$.ajax({																//TODO 그리드 1
			url : _global.api_host_info+'/system/mobile/get/eis_query1.do',
			data:{param:jsonData},
			type:"post",
			async: false,
			dataType : 'json',
			success:function(data){
				if(data.success){
					dataArray = data.records;
// 					$("#list").setGridParam({ data: dataArray }).trigger("reloadGrid");
				}
			}
		});
		obj = new Object();
		obj.work_ordr_dvcd = '1';
		obj.hqof_idcd = sessionStorage.getItem('hq_id');
		jsonData = JSON.stringify(obj);
		$.ajax({
			url : _global.api_host_info+'/system/mobile/get/eis_query1.do',
			data:{param:jsonData},
			type:"post",
			async: false,
			dataType : 'json',
			success:function(data){
				if(data.success){
					dataArray2 = data.records;
// 					$("#list").setGridParam({ data: dataArray }).trigger("reloadGrid");
				}
			}
		});
		$("#list").jqGrid({
			datatype: 'local',
			data: dataArray,
			styleUI  :  'Bootstrap',
			rowList : [10,20,30,40],
			viewrecords:true,
			colNames:['상황','금형번호','금형명','납기일','차수'],
			colModel: [
				{name: 'work_stat_name', index : 'work_stat_name', width : '50px', align:'center',formatter:work_chk, classes:'workcell'},
				{name: 'pjod_idcd'     , index : 'pjod_idcd'     , width : '70px', align:'center',key:true},
				{name: 'item_name'     , index : 'item_name'     , width : '200px'},
				{name: 'deli_date'     , index : 'deli_date'     , width : '80px',formatter:dateFmt, align:'center'},
				{name: 'ordr_degr'     , index : 'ordr_degr'     , width : '50px'},
			],
	 		caption : "신작 금형",
//	 		loadtext : "로딩중 표시할 텍스트",
			height: 'auto',
			rowNum: 10,
			pager: '#pager',
			loadComplete:function(){
				for (var i = 0; i < arrs.length; i++) {
					$('#'+dataArray[i].pjod_idcd+' td:eq(0)').attr('style','background-color:'+arrs[i]+';color:white;text-align:center;');
				}
			},
			onSelectRow :function(rowId){
				var $this = $(this), now = new Date().getTime(),
				    lastTouchTime = $this.data("lastTouchTime") || now + 1,
				    timeInterval = now - lastTouchTime;

				//console.log(e);
				// the next line use constant 500 as 0.5 sec timeout between taps
				if (timeInterval < 400 && timeInterval > 0) {
					var api_host = _global.api_host_info,
						hq_id = _global.hq_id.toUpperCase();
						token = _global.token_id,
						work_ordr_dvcd = '1100',
						pjod_idcd = rowId,
		//				ordr_degr = b.data.ordr_degr,
						search_url	= '/system/eis/project/eisreport/get/getGanttChart.do',
						search_url2	= '/system/eis/project/eisreport/get/getGanttGrid.do',
		//				search_url	= '/system/eis/project/eisreport/get/getTest.do',
						url='/system/ganttchart/getSeriesGantt.do?param={api_host:\''+api_host+'\',search_url:\''+search_url+'\',pjod_idcd:\''+pjod_idcd+'\',token:\''+token+'\',hq_id:\''+hq_id+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\'}',
						url2='/system/ganttchart/grid.do?param={api_host:\''+api_host+'\',search_url:\''+search_url2+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\',token:\''+token+'\',hq_id:\''+hq_id+'\'}'
					;
					window.open('<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="80%" height="100%">iframe</iframe>'+
							'<iframe src="'+_global.api_host_info+encodeURI(url2)+'" width="20%" height="100%" id="iframe2">iframe</iframe>'
							,'진행현황',"width=100%, height=100%, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
				}
				$this.data("lastTouchTime", now);
			}
		});
		$("#list2").jqGrid({
			datatype: 'local',
			data: dataArray2,
			styleUI  :  'Bootstrap',
			viewrecords:true,
			colNames:['상황','금형번호','금형명','납기일','차수'],
			colModel: [
				{name: 'work_stat_name', index : 'work_stat_name', width : '50px', align:'center',formatter:work_chk2, classes:'workcell'},
				{name: 'pjod_idcd'     , index : 'pjod_idcd'     , width : '70px', align:'center',key:true},
				{name: 'item_name'     , index : 'item_name'     , width : '200px'},
				{name: 'deli_date'     , index : 'deli_date'     , width : '80px',formatter:dateFmt, align:'center'},
				{name: 'ordr_degr'     , index : 'ordr_degr'     , width : '50px'},
			],
// 	 		caption : "작업내역",
//	 		loadtext : "로딩중 표시할 텍스트",
			height: 'auto',
			rowNum: 10,
			pager: '#pager2',
			loadComplete:function(){
				for (var i = 0; i < arrs2.length; i++) {
					if(arrs2[i]){
						$('#'+dataArray2[i].pjod_idcd+' td:eq(0)').attr('style','background-color:'+arrs2[i]+';color:white;text-align:center;');
					}else{
						$('#'+dataArray2[i].pjod_idcd+' td:eq(0)').attr('style','background-color:white;color:white;text-align:center;');
					}
				}
			}
		});
		function work_chk(value,option,row){
			var arr = value.split(':');
			arrs.push(arr[1]);
			return arr[0];
		}
		function work_chk2(value,option,row){
			if(value){
				var arr = value.split(':');
				arrs2.push(arr[1]);
				return arr[0];
			}else{
				arrs2 = new Array();
				return '';
			}
		}
		function dateFmt(value,option,row){
			var date = value.substr(0,4)+'-'+value.substr(4,2)+'-'+value.substr(6,2);
			return date;
		}
		$('#select').change(function(){
			var value = this.value;
			var obj = new Object();

			obj.work_ordr_dvcd = value;
			obj.hqof_idcd = sessionStorage.getItem('hq_id');
			var jsonData = JSON.stringify(obj);
			$.ajax({
				url : _global.api_host_info+'/system/mobile/get/eis_query1.do',
				data:{param:jsonData},
				type:"post",
				async: false,
				dataType : 'json',
				success:function(data){
					if(data.success){
						dataArray2 = data.records;
						$('#list2').jqGrid('clearGridData');
	 					$("#list2").setGridParam({ data: dataArray2 }).trigger("reloadGrid");
					}
				}
			});
		});
	});
</script>
<style>
/*
 * Base structure
 */

/* Move down content because we have a fixed navbar that is 50px tall */
body {
  padding-top: 50px;
}


/*
 * Global add-ons
 */

.sub-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/*
 * Top navigation
 * Hide default border to remove 1px line.
 */
.navbar-fixed-top {
  border: 0;
}

/*
 * Sidebar
 */

/* Hide for mobile, show later */
.sidebar {
  display: none;
}
@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 51px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    background-color: #f5f5f5;
    border-right: 1px solid #eee;
  }
}

/* Sidebar navigation */
.nav-sidebar {
  margin-right: -21px; /* 20px padding + 1px border */
  margin-bottom: 20px;
  margin-left: -20px;
}
.nav-sidebar > li > a {
  padding-right: 20px;
  padding-left: 20px;
}
.nav-sidebar > .active > a,
.nav-sidebar > .active > a:hover,
.nav-sidebar > .active > a:focus {
  color: #fff;
  background-color: #428bca;
}


/*
 * Main content
 */

.main {
  padding: 20px;
}
@media (min-width: 768px) {
  .main {
    padding-right: 40px;
    padding-left: 40px;
  }
}
.main .page-header {
  margin-top: 0;
}


/*
 * Placeholder dashboard ideas
 */

.placeholders {
  margin-bottom: 30px;
  text-align: center;
}
.placeholders h4 {
  margin-bottom: 0;
}
.placeholder {
  margin-bottom: 20px;
}
.placeholder img {
  display: inline-block;
  border-radius: 50%;
}
</style>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#" style ="color:white">종합현황</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#">진행 현황</a></li>
					<li><a href="#">공정 현황</a></li>
				</ul>
				<form class="navbar-form navbar-right">
					<select class="form-control" >
						<option>동</option>
						<option>적</option>
						<option>할</option>
						<option>당</option>
					</select>
				</form>
			</div>
		</div>
	</nav>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
					<li><a href="#">Reports</a></li>
					<li><a href="#">Analytics</a></li>
					<li><a href="#">Export</a></li>
				</ul>
			</div>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<h1 class="page-header">신작 금형 진행 현황</h1>
				<div>
					<div class="table-responsive">
						<table id="list" class="table table-striped">
						</table>
					</div>
					<div id="pager"></div>
				</div>
				<div>
					<span class="sub-header" >
						<select style="font-size:21px;height:35px;" name="select" id="select">
							<option selected="selected" value="1" >설변.품질 육성</option>
							<option value="2">대기금형</option>
						</select>
						<span style="font-size:35px;">진행 현황</span>
					</span>
					<div class="table-responsive">
						<table id="list2" class="table table-striped">
						</table>
					</div>
					<div id="pager2"></div>
				</div>
			</div>

		</div>
	</div>
</body>
</html>