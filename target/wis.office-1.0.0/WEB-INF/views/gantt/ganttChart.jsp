<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel=stylesheet href="/resource/js/jQueryGantt-master/platform.css" type="text/css">
<link rel=stylesheet href="/resource/js/jQueryGantt-master/libs/jquery/dateField/jquery.dateField.css" type="text/css">

<link rel=stylesheet href="/resource/js/jQueryGantt-master/gantt.css" type="text/css">
<link rel=stylesheet href="/resource/js/jQueryGantt-master/ganttPrint.css" type="text/css" media="print">

<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

<script src="/resource/js/jQueryGantt-master/libs/jquery/jquery.livequery.1.1.1.min.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/jquery/jquery.timers.js"></script>

<script src="/resource/js/jQueryGantt-master/libs/utilities.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/forms.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/date.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/dialogs.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/layout.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/i18nJs.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/jquery/dateField/jquery.dateField.js"></script>
<script src="/resource/js/jQueryGantt-master/libs/jquery/JST/jquery.JST.js"></script>

<script type="text/javascript" src="/resource/js/jQueryGantt-master/libs/jquery/svg/jquery.svg.min.js"></script>
<script type="text/javascript" src="/resource/js/jQueryGantt-master/libs/jquery/svg/jquery.svgdom.1.8.js"></script>


<script src="/resource/js/jQueryGantt-master/ganttUtilities.js"></script>
<script src="/resource/js/jQueryGantt-master/ganttTask.js"></script>
<script src="/resource/js/jQueryGantt-master/ganttDrawerSVG.js"></script>
<script src="/resource/js/jQueryGantt-master/ganttZoom.js"></script>
<script src="/resource/js/jQueryGantt-master/ganttGridEditor.js"></script>
<script src="/resource/js/jQueryGantt-master/ganttMaster.js"></script>
<!--<script src="libs/profiling.js"></script>-->
<!--<script type="text/javascript" src="ganttTestSuite.js"></script>-->
</head>
<body style="background-color: #fff;">
<div id="workSpace" style="padding:0px; overflow-y:auto; overflow-x:hidden;border:1px solid #e5e5e5;position:relative;margin:0 5px;width:100%"></div>

<style>
	.resEdit {
		padding: 15px;
	}

	.resLine {
		width		: 95%;
		padding		: 3px;
		margin		: 5px;
		border		: 1px solid #d0d0d0;
	}

	body {
		overflow	: hidden;
	}

	.ganttButtonBar h1{
		color		: #000000;
		font-weight	: bold;
		font-size	: 28px;
		margin-left	: 10px;
	}

</style>

<form id="gimmeBack" style="display:none;" action="../gimmeBack.jsp" method="post" target="_blank"><input type="hidden" name="prj" id="gimBaPrj"></form>

<script type="text/javascript">
var te;
var ge;
var schd_dvcd = "${schd_dvcd}";
var api_host = "${api_host}";
var search_url = "${search_url}";
var update_url = "${update_url}";
var invc_numb = "${invc_numb}";
var ordr_degr = "${ordr_degr}";
var work_ordr_dvcd = "${work_ordr_dvcd}";
var hq_id = "${hq_id}";
var levels = "${levels}";
var title = "${title}";
var source = "${source}";
var t_dt = "${to_dt}";
var f_dt = "${fr_dt}";
var updt_idcd = "${updt_idcd}";
var work_ordr_dvcd;
var resources = new Array();
var wkct = new Array();
var tempTasks = new Array();

function getGanttResource(wkct_idcd){
	var obj = new Object();
	obj.wkct_idcd = wkct_idcd;
	obj.hq_id = hq_id;
	var jsonData = JSON.stringify(obj);
	$.ajax({
		url : api_host+'/system/ganttchart/getGanttResource.do',
		data:{token:"1RZnkO1/z4A3Errepd/kiOF/cG1EJQx2iRY7lzXASM9Q=",param:jsonData},
		type:"post",
		async: false,
		dataType : 'json',
		success:function(data){
			if(data.success){
				for(var i = 0; i < data.records.length; i++){
					resources.push({
						"id"	: data.records[i].id,
						"name"	: data.records[i].name,
						"dvcd"	: data.records[i].dvcd
					});
				}
			}
		}
	});
}


$(function() {
	if(levels == "2"){
		setTimeout(function(){
			$('#saveButton').hide();
		}, 50)
	}
	var canWrite=true; //this is the default for test purposes
	// here starts gantt initialization
	ge = new GanttMaster();
	ge.set100OnClose=true;

	ge.shrinkParent=true;

	ge.init($("#workSpace"));
	loadI18n(); //overwrite with localized ones
	//in order to force compute the best-fitting zoom level
	delete ge.gantt.zoom;
	var obj = new Object();
		obj.hq_id = hq_id;
		obj.invc_numb = invc_numb;
		obj.schd_dvcd = schd_dvcd;
		obj.work_ordr_dvcd = work_ordr_dvcd;
		obj.ordr_degr = ordr_degr;
		if(title != null && title != ""){
			obj.title = title;
		}
		if(source != null && source != ""){
			obj.source = source;
		}
		if(t_dt != null && t_dt != ""){
			obj.to_dt = t_dt;
		}
		if(f_dt != null && f_dt != ""){
			obj.fr_dt = f_dt;
		}
	var jsonData = JSON.stringify(obj);
	$.ajax({
//			url : api_host+"/system/ganttchart/getGantt.do",
			url : api_host+search_url,
			data:{token:"1RZnkO1/z4A3Errepd/kiOF/cG1EJQx2iRY7lzXASM9Q=",param:jsonData},
			type:"post",
			async: false,
			dataType : 'json',
			success:function(data){
				var assigs = new Array();
				if(data.records){
					for(var i = 0; i < data.records.length;i++){
						assigs = [];
						if(title == ''){
							for(var j = 0; j<data.assigs.length;j++){
									if(data.assigs[j].id == data.records[i].id){
										var asTemp= {
											"resourceId": data.assigs[j].resourceid,
											"id"		: data.assigs[j].id,
											"roleId"	: data.assigs[j].roleid,
											"effort"	: data.assigs[j].effort
										}
										assigs.push(asTemp);
									}
							}
						}
						if(i == 0){
							work_ordr_dvcd = data.records[i].work_ordr_dvcd;
						}
						if(data.records[i].canwrite=='true'){
							data.records[i].canwrite = true;
						}else {
							data.records[i].canwrite = false;
						}
						if(data.records[i].collapsed == 'true'){
							data.records[i].collapsed = true;
						}else{
							data.records[i].collapsed =false;
						}
						if(data.records[i].progressbyworklog == 'true'){
							data.records[i].progressbyworklog = true;
						}else{
							data.records[i].progressbyworklog =false;
						}
						if(data.records[i].endIsMilestone == null){
							data.records[i].endIsMilestone = false;
						}
						if(data.records[i].startIsMilestone == null){
							data.records[i].startIsMilestone = false;
						}
						tempTasks.push({"id": data.records[i].id
							, "name"			: data.records[i].name
							, "progress"		: data.records[i].progress
							, "progressByWorklog": data.records[i].progressbyworklog
							, "relevance"		: data.records[i].relevance
							, "type"			: ""
							, "typeId"			: ""
							, "description"		: data.records[i].description
							, "code"			: data.records[i].code
							, "level"			: (data.records[i].level?data.records[i].level:'0')
							, "status"			: data.records[i].status
							, "depends"			: data.records[i].depends
							, "canWrite"		: data.records[i].canwrite
							, "start"			: Number(data.records[i].start)
							, "duration"		: data.records[i].duration
							, "end"				: Number(data.records[i].end)
							, "startIsMilestone": data.records[i].startIsMilestone
							, "endIsMilestone"	: data.records[i].endIsMilestone
							, "collapsed"		: data.records[i].collapsed
							, "assigs"			: assigs
							, "hasChild"		: true
							, "startTime"		: data.records[i].starttime
							, "endTime"			: data.records[i].endtime
							, "wkct_idcd"		: (data.records[i].wkct_idcd?data.records[i].wkct_idcd:'not')
							, "item_idcd"		: data.records[i].item_idcd
							, "prnt_idcd"		: data.records[i].prnt_idcd
							, "work_item_idcd"	: data.records[i].work_item_idcd
							, "bomt_seqn"		: data.records[i].bomt_seqn
							, "work_ordr_dvcd"	: data.records[i].work_ordr_dvcd
							, "ordr_degr"		: data.records[i].ordr_degr
							, "cvic_idcd"		: (data.records[i].cvic_idcd?data.records[i].cvic_idcd:'not')
							, "otod_yorn"		: data.records[i].otod_yorn
						});
					}
				}
				if(tempTasks.length == 0){
					tempTasks.push({"id": -1,
									"name"				: "Gantt editor",
									"progress"			: 0,
									"progressByWorklog"	: false,
									"relevance"			: 0,
									"type"				: "",
									"typeId"			: "",
									"description"		: "",
									"code"				: "",
									"level"				: 0,
									"status"			: "STATUS_ACTIVE",
									"depends"			: "",
									"canWrite"			: true,
									"start"				: new Date().getTime(),
									"duration"			: 1,
									"end"				: new Date().getTime(),
									"startIsMilestone"	: false,
									"endIsMilestone"	: false,
									"collapsed"			: false,
									"assigs"			: [],
									"hasChild"			: true
					});
				}
				getWkct();
				te = {"tasks":tempTasks,"resources": resources,"roles": [
// 											{"id": "tmp_0", "name": " "},
											{"id": "tmp_1", "name": "책임자"},
											{"id": "tmp_2", "name": "작업자"},
											{"id": "tmp_3", "name": "설비"},
// 											{"id": "tmp_4", "name": "Customer"}
										], "selectedRow": 0, "deletedTaskIds": [],
										canAdd			: true,
										canDelete		: true,
										canWrite		: true,
										canWriteOnParent: true
				}

			}
		});
		var project=te;
		if(project == null){

			var a = callParams();
			project = a;
		}

		if (!project.canWrite)
			$(".ganttButtonBar button.requireWrite").attr("disabled","true");

		ge.loadProject(project);
		ge.checkpoint(); //empty the undo stack

		$('.edit').on('click',function(){
		});
		$('.validated').on('change',function(){				//진행률
		});

		function getWkct(){
			var obj = new Object();
			obj.s = "";
			obj.hq_id = hq_id;
			var jsonData = JSON.stringify(obj);
			$.ajax({
				url : api_host+'/system/ganttchart/getGanttWkct.do',
				data:{token:"1RZnkO1/z4A3Errepd/kiOF/cG1EJQx2iRY7lzXASM9Q=",param:jsonData},
				type:"post",
				async: false,
				dataType : 'json',
				success:function(data){
					if(data.success){
						for(var i = 0; i < data.records.length; i++){
							wkct.push({
								"idcd"	: data.records[i].idcd,
								"name"	: data.records[i].name,
								"dvcd"	: data.records[i].dvcd,
								"code"	: data.records[i].code
							});
						}
					}
				}
			});
		}
	}
);
$(document).ready(function(){

});

function loadGanttFromServer(taskId, callback) {

	//this is a simulation: load data from the local storage if you have already played with the demo or a textarea with starting demo data
	var records=te;

	//this is the real implementation
	/*
	//var taskId = $("#taskSelector").val();
	var prof = new Profiler("loadServerSide");
	prof.reset();

	$.getJSON("ganttAjaxController.jsp", {CM:"LOADPROJECT",taskId:taskId}, function(response) {
		//console.debug(response);
		if (response.ok) {
			prof.stop();

			ge.loadProject(response.project);
			ge.checkpoint(); //empty the undo stack

			if (typeof(callback)=="function") {
				callback(response);
			}
		} else {
			jsonErrorHandling(response);
		}
	});
  */
	return records;
}


function saveGanttOnServer() {

	//this is a simulation: save data to the local storage or to the textarea
	saveInLocalStorage();
	var prj = ge.saveProject();
	console.log('save');
	delete prj.resources;
	delete prj.roles;
	//   var prof = new Profiler("saveServerSide");
	//   prof.reset();
	if (ge.deletedTaskIds.length>0) {
		if (!confirm("TASK_THAT_WILL_BE_REMOVED\n"+ge.deletedTaskIds.length)) {
			return;
		}
	}
	prj.invc_numb = invc_numb;
	prj.schd_dvcd = schd_dvcd;
	prj.hq_id = hq_id;
	prj.updt_idcd = updt_idcd;
	prj.work_ordr_dvcd = work_ordr_dvcd;
	var temp = JSON.stringify(prj);
	$.ajax({
		//		url : api_host+"/system/ganttchart/setGantt.do",
		url		: api_host+update_url,
		dataType: "json",
		data	: {token:"1RZnkO1/z4A3Errepd/kiOF/cG1EJQx2iRY7lzXASM9Q=",param:temp},
		type	: "POST",

		success: function(response) {
			if(response.success){
				closeIframe();
			}else{
				alert('저장하는 과정에서 오류가 발생하였습니다..')
			}
		}
	});
}

function newProject(){
	clearGantt();
}


function clearGantt() {
	ge.reset();
}

//-------------------------------------------  Get project file as JSON (used for migrate project from gantt to Teamwork) ------------------------------------------------------
function getFile() {
	$("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
	$("#gimmeBack").submit();
	$("#gimBaPrj").val("");

	/*  var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(JSON.stringify(prj));
		neww=window.open(uriContent,"dl");*/
}


function loadFromLocalStorage() {
	console.log("loadFromLocalStorage");
	var records;
		records = temp;
	return records;

}


function saveInLocalStorage() {
	var prj = ge.saveProject();
	if (localStorage) {
		localStorage.setObject("teamworkGantDemo", prj);
	}
}


//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------
function editResources(){

	//make resource editor
	var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
	var resTbl=resourceEditor.find("#resourcesTable");

	for (var i=0;i<ge.resources.length;i++){
		var res=ge.resources[i];
		resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
	}


	//bind add resource
	resourceEditor.find("#addResource").click(function(){
		resTbl.append($.JST.createFromTemplate({id:"new",name:"resource"}, "RESOURCE_ROW"))
	});

	//bind save event
	resourceEditor.find("#resSaveButton").click(function(){
		console.log("작업자관리 save");
		var newRes=[];
		//find for deleted res
		for (var i=0;i<ge.resources.length;i++){
			var res=ge.resources[i];
			var row = resourceEditor.find("[resId="+res.id+"]");
			if (row.length>0){
				//if still there save it
				var name = row.find("input[name]").val();
				if (name && name!="")
					res.name=name;
				newRes.push(res);
			} else {
				//remove assignments
				for (var j=0;j<ge.tasks.length;j++){
					var task=ge.tasks[j];
					var newAss=[];
					for (var k=0;k<task.assigs.length;k++){
						var ass=task.assigs[k];
						if (ass.resourceId!=res.id)
							newAss.push(ass);
					}
					task.assigs=newAss;
				}
			}
		}
		//loop on new rows
		var cnt=0
		resourceEditor.find("[resId=new]").each(function(){
			cnt++;
			var row = $(this);
			var name = row.find("input[name]").val();
			if (name && name!="")
				newRes.push (new Resource("tmp_"+new Date().getTime()+"_"+cnt,name));
		});
		ge.resources=newRes;

		closeBlackPopup();
		ge.redraw();
	});
	var ndo = createModalPopup(400, 500).append(resourceEditor);
}

function initializeHistoryManagement(){
	//si chiede al server se c'è della hisory per la root
	$.getJSON(contextPath+"/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTPOINTS", OBJID:10236}, function (response) {

		//se c'è
		if (response.ok == true && response.historyPoints && response.historyPoints.length>0) {
			//si crea il bottone sulla bottoniera
			var histBtn = $("<button>").addClass("button textual icon lreq30 lreqLabel").attr("title", "SHOW_HISTORY").append("<span class=\"teamworkIcon\">&#x60;</span>");

			//al click
			histBtn .click(function () {
				var el = $(this);
				var ganttButtons = $(".ganttButtonBar .buttons");

				//è gi�  in modalit�  history?
				if (!ge.element.is(".historyOn")) {
					ge.element.addClass("historyOn");
					ganttButtons.find(".requireCanWrite").hide();

					//si carica la history server side
					if (false) return;
					showSavingMessage();
					$.getJSON(contextPath + "/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTPOINTS", OBJID: ge.tasks[0].id}, function (response) {
						jsonResponseHandling(response);
						hideSavingMessage();
						if (response.ok == true) {
							var dh = response.historyPoints;
							//ge.historyPoints=response.historyPoints;
							if (dh && dh.length > 0) {
								//si crea il div per lo slider
								var sliderDiv = $("<div>").prop("id", "slider").addClass("lreq30 lreqHide").css({"display":"inline-block","width":"500px"});
								ganttButtons.append(sliderDiv);

								var minVal = 0;
								var maxVal = dh.length-1 ;

								$("#slider").show().mbSlider({
									rangeColor	: '#2f97c6',
									minVal		: minVal,
									maxVal		: maxVal,
									startAt		: maxVal,
									showVal		: false,
									grid		: 1,
									formatValue	: function (val) {
										return new Date(dh[val]).format();
									},
									onSlideLoad	: function (obj) {
										this.onStop(obj);

									},
									onStart		: function (obj) {},
									onStop		: function (obj) {
										var val = $(obj).mbgetVal();
										showSavingMessage();
										$.getJSON(contextPath + "/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTORYAT", OBJID: ge.tasks[0].id, millis:dh[val]}, function (response) {
											jsonResponseHandling(response);
											hideSavingMessage();
											if (response.ok ) {
												ge.baselines=response.baselines;
												ge.showBaselines=true;
												ge.baselineMillis=dh[val];
												ge.redraw();
											}
										})
									},
									onSlide		: function (obj) {
									clearTimeout(obj.renderHistory);
										var self = this;
										obj.renderHistory = setTimeout(function(){
											self.onStop(obj);
										}, 200)
									}
								});
							}
						}
					});
				// quando si spenge
				} else {
					//si cancella lo slider
					$("#slider").remove();
					ge.element.removeClass("historyOn");
					if (ge.permissions.canWrite)
						ganttButtons.find(".requireCanWrite").show();
					ge.showBaselines=false;
					ge.baselineMillis=undefined;
					ge.redraw();
				}
			});
			$("#saveGanttButton").before(histBtn);
		}
	})
}

function showBaselineInfo (event,element){
	//alert(element.attr("data-label"));
	$(element).showBalloon(event, $(element).attr("data-label"));
	ge.splitter.secondBox.one("scroll",function(){
		$(element).hideBalloon();
	})
}

function closeIframe() {
	$(parent.document).find(".x-tool-close").trigger('click');
	return;
}
</script>

<div id="innerCset">
</div>

<input type="hidden" name ="api_host" value="${api_host }" id="api_host"/>
<div id="gantEditorTemplates" style="display:none;">
	<div class="__template__" type="GANTBUTTONS"><!--
		<div class="ganttButtonBar noprint">
			<div class="buttons">
				<button onclick="$('#workSpace').trigger('undo.gantt');return false;" class="button textual icon requireCanWrite" title="이전복구"><span class="">&#39;</span></button>
				<button onclick="$('#workSpace').trigger('redo.gantt');return false;" class="button textual icon requireCanWrite" title="복구"><span class="teamworkIcon">&middot;</span></button>
				<span class="ganttButtonSeparator requireCanWrite requireCanAdd"></span>
				<button onclick="$('#workSpace').trigger('addAboveCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanAdd" title="insert above"><span class="teamworkIcon">l</span></button>
				<button onclick="$('#workSpace').trigger('addBelowCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanAdd" title="insert below"><span class="teamworkIcon">X</span></button>
				<span class="ganttButtonSeparator requireCanWrite requireCanInOutdent"></span>
				<button onclick="$('#workSpace').trigger('outdentCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanInOutdent" title="우선순위 증가"><span class="teamworkIcon">.</span></button>
				<button onclick="$('#workSpace').trigger('indentCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanInOutdent" title="우선순위 감소"><span class="teamworkIcon">:</span></button>
				<span class="ganttButtonSeparator requireCanWrite requireCanMoveUpDown"></span>
				<button onclick="$('#workSpace').trigger('moveUpCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanMoveUpDown" title="올리기"><span class="teamworkIcon">k</span></button>
				<button onclick="$('#workSpace').trigger('moveDownCurrentTask.gantt');return false;" class="button textual icon requireCanWrite requireCanMoveUpDown" title="내리기"><span class="teamworkIcon">j</span></button>
				<span class="ganttButtonSeparator requireCanWrite requireCanDelete"></span>
				<button onclick="$('#workSpace').trigger('deleteFocused.gantt');return false;" class="button textual icon delete requireCanWrite" title="삭제"><span class="teamworkIcon">&cent;</span></button>
				<span class="ganttButtonSeparator"></span>
				<button onclick="$('#workSpace').trigger('expandAll.gantt');return false;" class="button textual icon " title="펼쳐보기"><span class="teamworkIcon">6</span></button>
				<button onclick="$('#workSpace').trigger('collapseAll.gantt'); return false;" class="button textual icon " title="접기"><span class="teamworkIcon">5</span></button>

				<span class="ganttButtonSeparator"></span>
					<button onclick="$('#workSpace').trigger('zoomMinus.gantt'); return false;" class="button textual icon " title="축소"><span class="teamworkIcon">)</span></button>
					<button onclick="$('#workSpace').trigger('zoomPlus.gantt');return false;" class="button textual icon " title="확대"><span class="teamworkIcon">(</span></button>
				<span class="ganttButtonSeparator"></span>
					<button onclick="$('#workSpace').trigger('print.gantt');return false;" class="button textual icon " title="인쇄"><span class="teamworkIcon">p</span></button>
				<span class="ganttButtonSeparator"></span>
					<button onclick="ge.gantt.showCriticalPath=!ge.gantt.showCriticalPath; ge.redraw();return false;" class="button textual icon requireCanSeeCriticalPath" title="주 작업 경로"><span class="teamworkIcon">&pound;</span></button>
				<span class="ganttButtonSeparator requireCanSeeCriticalPath"></span>
					<button onclick="ge.splitter.resize(.1);return false;" class="button textual icon" ><span class="teamworkIcon">F</span></button>
					<button onclick="ge.splitter.resize(50);return false;" class="button textual icon" ><span class="teamworkIcon">O</span></button>
					<button onclick="ge.splitter.resize(100);return false;" class="button textual icon"><span class="teamworkIcon">R</span></button>
					<span class="ganttButtonSeparator"></span>
					<button onclick="$('#workSpace').trigger('fullScreen.gantt');return false;" class="button textual icon" title="전체화면" id="fullscrbtn"><span class="teamworkIcon">@</span></button>
					<button onclick="ge.element.toggleClass('colorByStatus' );return false;" class="button textual icon" title="색상 제거"><span class="teamworkIcon">&sect;</span></button>
				<button onclick="editResources();" class="button textual requireWrite" title="edit resources"><span class="teamworkIcon">M</span></button>
					&nbsp; &nbsp; &nbsp; &nbsp;
				<button onclick="saveGanttOnServer();" class="button first big requireWrite " id="saveButton" title="저장">저장</button>

				<button onclick='closeIframe();' class='button requireWrite newproject'>닫기</button>
				<button class="button login" title="login/enroll" onclick="loginEnroll($(this));" style="display:none;">login/enroll</button>
				<button class="button opt collab" title="Start with Twproject" onclick="collaborate($(this));" style="display:none;"><em>collaborate</em></button>
			</div>
		</div>
		-->
	</div>

	<div class="__template__" type="TASKSEDITHEAD">
		<table class="gdfTable" cellspacing="0" cellpadding="0">
			<thead>
				<tr style="height:40px">
					<th class="gdfColHeader" style="width:35px; border-right: none"></th>
					<th class="gdfColHeader" style="width:25px;"></th>
					<th class="gdfColHeader gdfResizable" style="width:100px;display:none">작업 코드</th>
					<th class="gdfColHeader gdfResizable" style="width:300px;">작업내용</th>
					<th class="gdfColHeader"  align="center" style="width:17px;" title="Start date is a milestone."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>
					<th class="gdfColHeader gdfResizable" style="width:80px;">시작일자</th>
					<th class="gdfColHeader"  align="center" style="width:17px;" title="End date is a milestone."><span class="teamworkIcon" style="font-size: 8px;">^</span></th>
					<th class="gdfColHeader gdfResizable" style="width:80px;">종료일자</th>
					<th class="gdfColHeader gdfResizable" style="width:30px;">기간</th>
					<th class="gdfColHeader gdfResizable" style="width:70px;">달성률(%)</th>
					<th class="gdfColHeader gdfResizable" style="width:200px; text-align: left; padding-left: 10px;">비고</th>
					<th class="gdfColHeader gdfResizable requireCanSeeDep" style="width:60px; ">작업관계</th>
					<th class="gdfColHeader gdfResizable" style="width:800px; text-align: left; padding-left: 10px;">작업자</th>
					<th class="gdfColHeader gdfResizable" style="width:100px;display:none">수주번호</th>
				</tr>
			</thead>
		</table>
	</div>

	<div class="__template__" type="TASKROW"><!--
		<tr id="tid_(#=obj.id#)" taskId="(#=obj.id#)" class="taskEditRow (#=obj.isParent()?'isParent':''#) (#=obj.collapsed?'collapsed':''#)" level="(#=level#)">
			<th class="gdfCell edit" align="right" style="cursor:pointer;"><span class="taskRowIndex">(#=obj.getRow()+1#)</span> <span class="teamworkIcon" style="font-size:12px;" >e</span></th>
			<td class="gdfCell noClip" align="center"><div class="taskStatus cvcColorSquare" status="(#=obj.status#)"></div></td>
			<td class="gdfCell" style="display:none"><input type="hidden" name="code" value="(#=obj.code?obj.code:''#)" placeholder="code/short name"></td>
			<td class="gdfCell indentCell" style="padding-left:(#=obj.level*10+18#)px;">
				<div class="exp-controller" align="center"></div>
				<input type="text" name="name" value="(#=obj.name#)" placeholder="name">
			</td>
			<td class="gdfCell" align="center"><input type="checkbox" name="startIsMilestone"></td>
			<td class="gdfCell"><input type="text" name="start"  value=""  style="text-align:center;" class="date"></td>
			<td class="gdfCell" align="center"><input type="checkbox"  style="text-align:center;" name="endIsMilestone"></td>
			<td class="gdfCell"><input type="text" name="end"  style="text-align:center;" value="" class="date"></td>
			<td class="gdfCell"><input type="text" name="duration" autocomplete="off" style="text-align:right;" value="(#=obj.duration#)"></td>
			<td class="gdfCell"><input type="text" name="progress" class="validated" style="text-align:right;" entrytype="PERCENTILE" autocomplete="off" value="(#=obj.progress?obj.progress:''#)" (#=obj.progressByWorklog?"readOnly":""#)></td>
			<td class="gdfCell"><input type="text" name="description" value="(#=obj.description#)"></td>
			<td class="gdfCell requireCanSeeDep"><input type="text" name="depends" style="text-align:center;" autocomplete="off" value="(#=obj.depends#)" (#=obj.hasExternalDep?"readonly":""#)></td>
			<td class="gdfCell taskAssigs">(#=obj.getAssigsString()#)</td>
		</tr>
		-->
	</div>

	<div class="__template__" type="TASKEMPTYROW"><!--
		<tr class="taskEditRow emptyRow" >
			<th class="gdfCell" align="right"></th>
			<td class="gdfCell noClip" align="center"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell"></td>
			<td class="gdfCell requireCanSeeDep"></td>
			<td class="gdfCell"></td>
		</tr>
		-->
	</div>

	<div class="__template__" type="TASKBAR"><!--
		<div class="taskBox taskBoxDiv" taskId="(#=obj.id#)" >
			<div class="layout (#=obj.hasExternalDep?'extDep':''#)">
				<div class="taskStatus" status="(#=obj.status#)"></div>
				<div class="taskProgress" style="width:(#=obj.progress>100?100:obj.progress#)%; background-color:(#=obj.progress>100?'red':'rgb(153,255,51);'#);"></div>
				<div class="milestone (#=obj.startIsMilestone?'active':''#)" ></div>

				<div class="taskLabel"></div>
				<div class="milestone end (#=obj.endIsMilestone?'active':''#)" ></div>
			</div>
		</div>
		-->
	</div>


	<div class="__template__" type="CHANGE_STATUS"><!--
		<div class="taskStatusBox">
		<div class="taskStatus cvcColorSquare" status="STATUS_ACTIVE" title="Active"></div>
		<div class="taskStatus cvcColorSquare" status="STATUS_DONE" title="Completed"></div>
		<div class="taskStatus cvcColorSquare" status="STATUS_FAILED" title="Failed"></div>
		<div class="taskStatus cvcColorSquare" status="STATUS_SUSPENDED" title="Suspended"></div>
		<div class="taskStatus cvcColorSquare" status="STATUS_WAITING" title="Waiting" style="display: none;"></div>
		<div class="taskStatus cvcColorSquare" status="STATUS_UNDEFINED" title="Undefined"></div>
		</div>
		-->
	</div>




<div class="__template__" type="TASK_EDITOR">
	<div class="ganttTaskEditor">
		<h4 class="taskData"><b>작업 편집기</b></h4>
		<table  cellspacing="1" cellpadding="5" width="100%" class="taskData table" border="0">
			<tr >
				<td width="200" style="height: 80px;display:none;"   valign="top">
					<label for="code">작업 코드</label><br>
					<input type="text" name="code" id="code" value="" size=15 class="formElements" autocomplete='off' maxlength=255 style='width:100%' oldvalue="1">
				</td>
				<td colspan="3" valign="top"><label for="name" class="required" >작업명</label><br><input type="text" name="name" id="name"class="formElements workName" autocomplete='off' maxlength=255 style='width:100%' value="" required="true" oldvalue="1">
				</td>
			</tr>

			<tr class="dateRow">
				<td nowrap="">
					<div style="position:relative">
						<label for="start">시작일</label>&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="checkbox" id="startIsMilestone" name="startIsMilestone" value="yes"> &nbsp;<label for="startIsMilestone">기준설정</label>&nbsp;
						<br><input type="text" name="start" id="start" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">
						<span title="calendar" id="starts_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(':input:first'),isSearchField:false});">m</span>
						<input type="text"  id="startTime"name="startTime" class="timepicker formElements" style="width:100px" autocomplete='off' placeholder="00:00" value="">
					</div>
				</td>

				<td nowrap="">
					<label for="end">종료일</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="checkbox" id="endIsMilestone" name="endIsMilestone" value="yes"> &nbsp;<label for="endIsMilestone">기준설정</label>&nbsp;
					<br><input type="text" name="end" id="end" size="8" class="formElements dateField validated date" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DATE">
					<span title="calendar" id="ends_inputDate" class="teamworkIcon openCalendar" onclick="$(this).dateField({inputField:$(this).prevAll(':input:first'),isSearchField:false});">m</span>
					<input type="text" id="endTime"name="endTime" class="timepicker formElements" style="width:100px"  placeholder="00:00" value="">
				</td>

				<td nowrap="" >
					<label for="duration" class=" ">진행기간</label><br>
					<input type="text" name="duration" id="duration" size="4" class="formElements validated durationdays" title="Duration is in working days." autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="DURATIONDAYS" style="text-align:right">&nbsp;
				</td>
			</tr>

			<tr>
				<td  colspan="1">
					<label for="status" class=" ">상태</label><br>
					<select id="status" name="status" class="taskStatus" status="(#=obj.status#)"  onchange="$(this).attr('STATUS',$(this).val());">
						<option value="STATUS_ACTIVE" class="taskStatus" status="STATUS_ACTIVE" >진행</option>
						<option value="STATUS_WAITING" class="taskStatus" status="STATUS_WAITING" >중단</option>
						<option value="STATUS_SUSPENDED" class="taskStatus" status="STATUS_SUSPENDED" >정지</option>
						<option value="STATUS_DONE" class="taskStatus" status="STATUS_DONE" >완료</option>
						<option value="STATUS_FAILED" class="taskStatus" status="STATUS_FAILED" >실패</option>
						<option value="STATUS_UNDEFINED" class="taskStatus" status="STATUS_UNDEFINED" >undefined</option>
					</select>
				</td>
				<td >
					<div >
						<table>
							<tr>
								<label for="wkct_idcd" class=" ">작업공정</label><br>
								<td style="text-align: center;">
									<select name="wkct_idcd" id = "wkct_idcd" style="width:230px">
									</select>
									<input type="hidden" name="wkct_idcd_temp" id="wkct_idcd_temp" />
								</td>
								<script type="text/javascript">
									for (var i = 0; i < wkct.length; i++) {
										var a = '<option value="'+wkct[i].idcd+'">'+wkct[i].name+'</option>';
										$('#wkct_idcd').append(a);
									}
									var wkct_idcd_temp = $('#wkct_idcd_temp').val();
									$('#wkct_idcd').val(wkct_idcd_temp).prop("selected", true);
									var wkct_idcd = $("#wkct_idcd option:selected").val();
									resources = [];
									getGanttResource(wkct_idcd);
									if($('#wkct_idcd').val() == null){
										$('select[name=resourceId]').html('<option></option>');
									}else{
										$('select[name=resourceId]').html('<option></option>');
										var temp;
										for (var i = 0; i < tempTasks.length; i++) {
											if(tempTasks[0]){
												if($('.workName').val() == tempTasks[i].name){
													temp = tempTasks[i].assigs;
												}
											}
										}
										var x = Number(temp.length)+1;
										for(var j = 0 ; j < x; j++){
											for (var i = 0; i < resources.length; i++) {
												var a;
												if(j<temp.length){
													if(resources[i].id == temp[j].resourceId){
														a = $('<option value="'+resources[i].id+'" selected="selected">'+resources[i].name+'</option>');
													}else{
														a = $('<option value="'+resources[i].id+'">'+resources[i].name+'</option>');
													}
												}else{
													a = $('<option value="'+resources[i].id+'">'+resources[i].name+'</option>');
												}
												$('select[name=resourceId]')[j].append(a[0]);
											}
										}
									}
									$('#wkct_idcd').on('change',function(){
										var wkct_idcd = $("#wkct_idcd option:selected").val();
										resources = [];
										getGanttResource(wkct_idcd);
										$('select[name=resourceId]').html('<option value=""></option>');
										for (var i = 0; i < resources.length; i++) {
											var a = '<option value="'+resources[i].id+'">'+resources[i].name+'</option>';
											$('select[name=resourceId]').append(a);
										}
									});
								</script>
							</tr>
						</table>
					</div>
				</td>
				<td valign="top" nowrap>
					<label>진행률(%)</label><br>
					<input type="text" name="progress" id="progress" size="4" class="formElements validated percentile" autocomplete="off" maxlength="255" value="" oldvalue="1" entrytype="PERCENTILE" style="text-align:right">
				</td>
			</tr>

		</tr>
		<tr>
			<td colspan="4">
				<label for="description">비고</label><br>
				<textarea rows="3" cols="30" id="description" name="description" class="formElements" style="width:100%"></textarea>
			</td>
		</tr>
	</table>

		<h4><b>작업자원 선택</b></h4>
		<table  cellspacing="1" cellpadding="0" width="100%" id="assigsTable">
			<tr>
				<th style="width:100px;">이름</th>
				<th style="width:70px;">직책</th>
				<th style="width:30px;">예상 작업량</th>
				<th style="width:30px;" id="addAssig"><span class="teamworkIcon" style="cursor: pointer">+</span></th>
			</tr>
		</table>

		<div style="text-align: right; padding-top: 20px">
			<span id="saveButton" class="button first" onClick="$(this).trigger('saveFullEditor.gantt');">Save</span>
		</div>

	</div>
</div>



<div class="__template__" type="ASSIGNMENT_ROW"><!--
	<tr taskId="(#=obj.task.id#)" assId="(#=obj.assig.id#)" class="assigEditRow" >
		<td style="text-align:center;"><select name="resourceId"  class="formElements" (#=obj.assig.id.indexOf("tmp_")==0?"":"disabled"#) ></select></td>
		<td style="text-align:center;"><select type="select" name="roleId"  class="formElements"></select></td>
		<td style="text-align:center;"><input type="text" name="effort" value="(#=getMillisInHoursMinutes(obj.assig.effort)#)" size="5" class="formElements"></td>
		<td align="center"><span class="teamworkIcon delAssig del" style="cursor: pointer">d</span></td>
	</tr>
	-->
</div>


<div class="__template__" type="RESOURCE_EDITOR"><!--
	<div class="resourceEditor" style="padding: 5px;">

		<h2>Project team</h2>
		<table  cellspacing="1" cellpadding="0" width="100%" id="resourcesTable">
			<tr>
				<th style="width:100px;">이름</th>
				<th style="width:30px;" id="addResource"><span class="teamworkIcon" style="cursor: pointer">+</span></th>
			</tr>
		</table>

		<div style="text-align: right; padding-top: 20px"><button id="resSaveButton" class="button big">Save</button></div>
	</div>
  -->
</div>



<div class="__template__" type="RESOURCE_ROW"><!--
	<tr resId="(#=obj.id#)" class="resRow" >
		<td ><input type="text" name="name" value="(#=obj.name#)" style="width:100%;" class="formElements"></td>
		<td align="center"><span class="teamworkIcon delRes del" style="cursor: pointer">d</span></td>
	</tr>
	-->
</div>


</div>

<script type="text/javascript">
	$.JST.loadDecorator("RESOURCE_ROW", function(resTr, res){
		resTr.find(".delRes").click(function(){$(this).closest("tr").remove();});
	});

	$.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig){ 	//작업자 선택 list뿌리기

		var resEl = assigTr.find("[name=resourceId]");
		var opt = $("<option>");
		resEl.append(opt);
		for(var i=0; i< resources.length;i++){		//작업자 이름
			var res = resources[i];
			opt = $("<option>");
			opt.val(res.id).html(res.name);
			if(taskAssig.assig.resourceId == res.id)
				opt.attr("selected", "true");
			resEl.append(opt);
		}
		var roleEl = assigTr.find("[name=roleId]");							//직책
		for(var i=0; i< taskAssig.task.master.roles.length;i++){
			var role = taskAssig.task.master.roles[i];
			var optr = $("<option>");
			optr.val(role.id).html(role.name);
			if(taskAssig.assig.roleId == role.id)
				optr.attr("selected", "true");
			roleEl.append(optr);
		}

		if(taskAssig.task.master.permissions.canWrite && taskAssig.task.canWrite){
			assigTr.find(".delAssig").click(function(){
				var tr = $(this).closest("[assId]").fadeOut(200, function(){$(this).remove()});
			});
		}


	});



	function loadI18n(){
		GanttMaster.messages = {	//에러메세지들
			"CANNOT_WRITE"				:"다음 작업을 변경할 수있는 권한이 없습니다.:",
			"CHANGE_OUT_OF_SCOPE"		:"상위 프로젝트 업데이트 권한이 없으므로 프로젝트 업데이트가 불가능합니다.",
			"START_IS_MILESTONE"		:"Start date is a milestone.",
			"END_IS_MILESTONE"			:"End date is a milestone.",
			"TASK_HAS_CONSTRAINTS"		:"상위값과 차이가 있습니다.",
			"TASK_HAS_EXTERNAL_DEPS"	:"이 작업에는 외부 종속성이 있습니다.",
			"CIRCULAR_REFERENCE"		:"Circular reference.",
			"INVALID_DATE_FORMAT"		:"삽입된 데이터가 필드 형식에 적합하지 않습니다..",
			"CANNOT_MOVE_TASK"			:"작업을 이동할 수 없습니다.",
			"PLEASE_SAVE_PROJECT"		:"프로젝트 저장하십시오.",
			"GANTT_SEMESTER"			:"Semester",
			"GANTT_SEMESTER_SHORT"		:"s.",
			"GANTT_QUARTER"				:"Quarter",
			"GANTT_QUARTER_SHORT"		:"q.",
			"GANTT_WEEK"				:"Week",
			"GANTT_WEEK_SHORT"			:"w.",
			"CANNOT_DEPENDS_ON_ANCESTORS"			: "Cannot depend on ancestors.",
			"GANTT_ERROR_DEPENDS_ON_OPEN_TASK"		: "Error: there is a dependency on an open task.",
			"GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK"	: "Error: due to a descendant of a closed task.",
			"GANNT_ERROR_LOADING_DATA_TASK_REMOVED"	: "GANNT_ERROR_LOADING_DATA_TASK_REMOVED",
			"GANTT_ERROR_LOADING_DATA_TASK_REMOVED"	: "데이터로드 중 오류가 발생했습니다. 작업이 삭제처리되었습니다.",
			"CANNOT_CLOSE_TASK_IF_OPEN_ISSUE"		: "종료되지 않은 작업으로 인해 작업을 닫을 수 없습니다.",
			"TASK_MOVE_INCONSISTENT_LEVEL"			: "다른 LEVEL의 작업을 교환 할 수는 없습니다.",
		};
	}



	function createNewResource(el) {
		var	row		= el.closest("tr[taskid]");
		var	name	= row.find("[name=resourceId_txt]").val();
		var	url		= contextPath + "/applications/teamwork/resource/resourceNew.jsp?CM=ADD&name=" + encodeURI(name);


		openBlackPopup(url, 700, 320, function (response) {
		//fillare lo smart combo
		if (response && response.resId && response.resName) {
			//fillare lo smart combo e chiudere l'editor
			row.find("[name=resourceId]").val(response.resId);
			row.find("[name=resourceId_txt]").val(response.resName).focus().blur();
		}

		});
	}
</script>

</body>
</html>