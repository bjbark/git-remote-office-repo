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
		$('#select').change(function(){
			var obj = new Object();
				obj.wkct_idcd = this.value;
				obj.hqof_idcd = sessionStorage.getItem('hq_id');
			var jsonData = JSON.stringify(obj);
			$.ajax({																			//TODO 그리드 1
				url : _global.api_host_info+'/system/mobile/get/total_board5.do',
				data:{param:jsonData},
				type:"post",
				async: false,
				dataType : 'json',
				success:function(data){
					if(data.success){
						$('#list').jqGrid('clearGridData');
						if(data.records.length != '0'){
							dataArray = data.records;
							$("#list").setGridParam({ data: dataArray }).trigger("reloadGrid");
						}
					}
				}
			});
		});

		var obj2 = new Object();
			obj2.rslt_rept_yorn	= '1';
			obj2.hqof_idcd = sessionStorage.getItem('hq_id');
		var jsonData2 = JSON.stringify(obj2);

		$.ajax({																			//TODO 작업공정 ajax
			url : _global.api_host_info+'/system/mobile/get/wkct.do',
			data:{param:jsonData2},
			type:"post",
			async: false,
			dataType : 'json',
			success:function(data){
				if(data.success){
					for (var i = 0; i < data.records.length; i++) {
						if(i==0){
							$('#select').empty();
							$('#select').append('<option selected="selected" value="'+data.records[i].wkct_idcd+'">'+data.records[i].wkct_stnm+'</option>');
	//							$('#select').trigger('change');
							$('#select').change();

						}else{
							$('#select').append('<option value="'+data.records[i].wkct_idcd+'">'+data.records[i].wkct_stnm+'</option>');
						}
					}
	//					$("#list").setGridParam({ data: dataArray }).trigger("reloadGrid");
				}
			}
		});



		$("#list").jqGrid({
			datatype: 'local',
			data: dataArray,
			styleUI  :  'Bootstrap',
// 			rowList : [10,20,30,40],
			viewrecords:true,
			colNames:['idcd','금형번호','부품명','공정명','설비명','시작일','시작시간','작업자'],
			colModel: [
				{name: 'idcd'          , index : 'idcd'          , width : '70px' , align:'center',key:true,hidden:true},
				{name: 'pjod_idcd'     , index : 'pjod_idcd'     , width : '70px' , align:'center'},
				{name: 'work_cont'     , index : 'work_cont'     , width : '80px' },
				{name: 'item_name'     , index : 'item_name'     , width : '80px' },
				{name: 'cvic_name'     , index : 'cvic_name'     , width : '80px' },
				{name: 'invc_date'     , index : 'invc_date'     , width : '80px' ,formatter:dateFmt ,align:'center'},
				{name: 'work_sttm'     , index : 'work_sttm'     , width : '80px' ,formatter:timeFmt ,align:'center'},
				{name: 'user_name'     , index : 'user_name'     , width : '80px' },
			],
// 	 		caption : "신작 금형",
//	 		loadtext : "로딩중 표시할 텍스트",
			height: 'auto',
			rowNum: 20,
			pager: '#pager',
			loadComplete:function(){
				for (var i = 0; i < arrs.length; i++) {
					if(arss[i]){
						$('#'+dataArray[i].idcd+' td:eq(0)').attr('style','background-color:'+arrs[i]+';color:white;text-align:center;');
					}else{
						$('#'+dataArray[i].idcd+' td:eq(0)').attr('style','background-color:white;color:white;text-align:center;');
					}
				}
			}
		});

		function work_chk(value,option,row){
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
		function timeFmt(value,option,row){
			var time = value.substr(0,2)+':'+value.substr(2,2);
			return time;
		}
		function dvcd(value,option,row){
			if (value=='0') {
				return '대기';
			}else if(value=='1'){
				return '진행';
			}else if(value=='2'){
				return '지연';
			}else if(value=='3'){
				return '종료';
			}else{
				return '';
			}
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
		<jsp:param value="진행 부품" name="name"/>
	</jsp:include>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li><a href="javascript:goUrl('../mobile/total_board1.do');">신작 금형 진행현황 </a></li>
					<li><a href="javascript:goUrl('../mobile/total_board2.do');">설변.품질 육성 진행현황</a></li>
					<li><a href="javascript:goUrl('../mobile/total_board3.do');">대기 금형 진행현황</a></li>
					<li><a href="javascript:goUrl('../mobile/total_board5.do');">대기 부품</a></li>
					<li class="active"><a href="#">진행 부품 <span class="sr-only">(current)</span></a></li>
				</ul>
			</div>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<span class="page-header" style="">
					<span style="font-size:21px;">작업공정 : </span>
					<select  style="font-size:21px;height:35px;width:110px; margin-bottom:10px;" name="select" id="select">
					</select>
				</span>
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