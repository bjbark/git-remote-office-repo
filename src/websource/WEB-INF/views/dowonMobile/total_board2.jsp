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
var arrs = new Array();
	$(document).ready(function(){
		if(!sessionStorage.getItem('accepted')){
			location.href="../mobile/login.do?param={}"
		}
		var obj = new Object();
			obj.work_ordr_dvcd = '1';
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
		$("#list").jqGrid({
			datatype: 'local',
			data: dataArray,
			styleUI  :  'Bootstrap',
// 			rowList : [10,20,30,40],
			viewrecords:true,
			colNames:['상황','금형번호','금형명','납기일','차수'],
			colModel: [
				{name: 'work_stat_name', index : 'work_stat_name', width : '50px', align:'center',formatter:work_chk, classes:'workcell'},
				{name: 'pjod_idcd'     , index : 'pjod_idcd'     , width : '70px', align:'center',key:true},
				{name: 'item_name'     , index : 'item_name'     , width : '200px'},
				{name: 'deli_date'     , index : 'deli_date'     , width : '80px',formatter:dateFmt, align:'center'},
				{name: 'ordr_degr'     , index : 'ordr_degr'     , width : '50px'},
			],
// 	 		caption : "신작 금형",
//	 		loadtext : "로딩중 표시할 텍스트",
			height: 'auto',
			rowNum: 20,
			pager: '#pager',
			loadComplete:function(){
				for (var i = 0; i < arrs.length; i++) {
					if(dataArray[i]){
						$('#'+dataArray[i].pjod_idcd+' td:eq(0)').attr('style','background-color:'+arrs[i]+';color:white;text-align:center;');
					}
				}
			},
			onSelectRow :function(rowId){
				var $this = $(this), now = new Date().getTime(),
					lastTouchTime = $this.data("lastTouchTime") || now + 1,
					timeInterval = now - lastTouchTime,
					h = $(window).height(),
					w = $(window).width()
				;
				if (timeInterval < 400 && timeInterval > 0) {
					var api_host = _global.api_host_info,
						hq_id = sessionStorage.getItem('hq_id'),
						token = _global.token_id,
						work_ordr_dvcd = '1100',
						pjod_idcd = rowId,
		//				ordr_degr = b.data.ordr_degr,
						search_url	= '/system/eis/project/eisreport/get/getGanttChart.do',
						search_url2	= '/system/eis/project/eisreport/get/getGanttGrid.do',
		//				search_url	= '/system/eis/project/eisreport/get/getTest.do',
						url='mobile/get/SeriesGantt.do?param={api_host:\''+api_host+'\',search_url:\''+search_url+'\',pjod_idcd:\''+pjod_idcd+'\',token:\''+token+'\',hq_id:\''+hq_id+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\'}'
					;
					window.open('../'+url
							,'진행현황',"width="+w+", height="+h+", toolbar=no, menubar=no, scrollbars=no, resizable=yes");
				}
				$this.data("lastTouchTime", now);
			}
		});

		function work_chk(value,option,row){
			var arr = value.split(':');
			arrs.push(arr[1]);
			return arr[0];
		}

		function dateFmt(value,option,row){
			var date = value.substr(0,4)+'-'+value.substr(4,2)+'-'+value.substr(6,2);
			return date;
		}
	});
	function goUrl(url){
		var form = document.createElement('form');
		var objs;
		objs = document.createElement('input');
		objs.setAttribute('type', 'hidden');
		objs.setAttribute('name', 'param');
		objs.setAttribute('value', "{'page':'1'}");
		form.appendChild(objs);
		form.setAttribute('method', 'post');
		form.setAttribute('action', url);
		document.body.appendChild(form);
		form.submit();
	}
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
	<jsp:include page="header.jsp">
		<jsp:param value="설변.품질 육성 진행현황" name="name"/>
	</jsp:include>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li ><a href="javascript:goUrl('../mobile/total_board1.do');">신작 금형 진행현황 </a></li>
					<li class="active"><a href="#">설변.품질 육성 진행현황 <span class="sr-only">(current)</span></a></li>
					<li><a href="javascript:goUrl('../mobile/total_board3.do');">대기 금형 진행현황</a></li>
					<li><a href="javascript:goUrl('../mobile/total_board4.do');">대기 부품</a></li>
					<li><a href="javascript:goUrl('../mobile/total_board5.do');">진행 부품</a></li>
				</ul>
			</div>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div>
					<div class="table-responsive">
						<table id="list" class="table table-striped">
						</table>
					</div>
					<div id="pager"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>