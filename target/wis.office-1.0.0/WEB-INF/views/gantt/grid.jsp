<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script src='//unpkg.com/popper.js@1/dist/umd/popper.min.js'></script>
<!-- 부트스트랩 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/css/ui.jqgrid.min.css">
<script src='https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/i18n/min/grid.locale-kr.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/modules/min/grid.base.js'></script>
<script>
const api_host = "${api_host}";
const search_url = "${search_url}";
const token = "${token}";
const hq_id = '${hq_id}';
const work_ordr_dvcd = '${work_ordr_dvcd}';
const ordr_degr = '${ordr_degr}';
var dataArray;

$(document).ready(function() {

	$("#list").jqGrid({
		datatype: 'local',
		styleUI: 'Foundation',
		data: dataArray,
		colModel: [
			{name: 'invc_date', label : '시작일' , width : '120px', align:'center'},
			{name: 'work_endd_date', label : '종료일', width : '120px', align:'center'},
			{name: 'wker_name1', label : '작업자1', width : '100px'},
			{name: 'wker_name2', label : '작업자2', width : '100px'},
			{name: 'wker_name3', label : '작업자3', width : '100px'},
			{name: 'cvic_name', label : '설비명', width : '100px'},
		],
// 		caption : "작업내역",
// 		loadtext : "로딩중 표시할 텍스트",
		height: 'auto',
		rowNum: 10,
		pager: '#pager'
	});

	$("#searchGrid").keydown(function(key) {
		if (key.keyCode == 13) {
			$("#basic-text1").trigger("click");
		}
	});
	function test(s){
		console.log(s);
	}
})
function changes(){
		var pjod_idcd = $('#gridPjod').val();
		var idcd = $('#gridIdcd').val();
		$('#list').jqGrid('clearGridData');

		var input = $('#searchGrid').val();
		var obj = new Object();
			obj.idcd      = idcd;
			obj.pjod_idcd = pjod_idcd;
			obj.hq_id = hq_id.toUpperCase();
			obj.work_ordr_dvcd = work_ordr_dvcd;
			if(ordr_degr!='' && ordr_degr!= 'undefined' && ordr_degr != null){
				obj.ordr_degr = ordr_degr;
			}
		var jsonData = JSON.stringify(obj);
		$.ajax({
				url : api_host+search_url,
				data:{	token:"1RZnkO1/z4A3Errepd/kiOF/cG1EJQx2iRY7lzXASM9Q=",
						param:jsonData
				},
				type:"post",
				async: false,
				dataType : 'json',
				success:function(data){
				if(data.success){
					dataArray = data.records;
					$("#list").setGridParam({ data: dataArray }).trigger("reloadGrid");
				}
			}
		});
	}
</script>
<style type="text/css">
	#ganttImageDiv table{
		width:100%;
	}
	#ganttImageDiv table tr td{
		padding : 10px;
	}
	#gbox_list{
		top: 330px;
		position: absolute;
	}
</style>
<title>Insert title here</title>
</head>
<body>
<div id = "ganttImageDiv">
		<table>
			<tr>
				<td>
					<img alt="" src="" id="ganttchartImg1"  width="100%" height="300px">
				</td>
			</tr>
<!-- 			<tr> -->
<!-- 				<td> -->
<!-- 					<img alt="" src=""  id="ganttchartImg2" width="100%"  height="300px"> -->
<!-- 				</td> -->
<!-- 			</tr> -->
		</table>
</div>
<input type="hidden" name="pjod_idcd" id="gridPjod" >
<input type="hidden" name="idcd" id="gridIdcd" onchange="changes();" >
<!-- <div class="input-group md-form form-sm form-2 pl-0"> -->
<!-- 	<input class="form-control my-0 py-1 lime-border" id="searchGrid"type="text" placeholder="Search" aria-label="Search"> -->
<!-- 	<div class="input-group-append"> -->
<!-- 		<span class="input-group-text lime lighten-2" id="basic-text1"> -->
<!-- 			<i class="fa fa-search text-grey"aria-hidden="true"></i> -->
<!-- 		</span> -->
<!-- 	</div> -->
<!-- </div> -->
<table id="list" style="width:100%;">
<div id="pager"></div>
</table>
</body>
</html>