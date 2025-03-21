<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link href='/resource/js/fullcalendar-5.1.0/lib/main.css' rel='stylesheet' />
<script type="text/javascript" charset="UTF-8" src='/resource/js/fullcalendar-5.1.0/lib/main.js'></script>
<script type="text/javascript" charset="UTF-8" src='/resource/js/fullcalendar-5.1.0/lib/locales-all.js'></script>

<script>
var events = [];
$( document ).ready(function(){
	var hq_id = '${hq_id}';
	var api_host = '${api_host}';
	var today = new Date();
// 	lookup create						나중에 ajax로 불러와서 넣어야함
	var sourceOptions = ["업무일지","test2"];	// name
	var source_dvcd	= ["1","2"];			// value

	var obj			= new Object();
		obj.hq_id	= hq_id;
		obj.stdt	= today.formatYMD();				// 첫 로드시 당일로 처리 .fomat()은 하단부 function참고
		obj.eddt	= today.formatYMD();
		obj.source_dvcd = source_dvcd[0];			// default값 필요 ( 처음에는 lookup을 만들기 전에 불러와야하기 때문에 미리 데이터의 첫번째 (selected) 값을 넣어준다.)
		obj.dvcd	= 'CM';							// default값 필요 ( 처음에는 월,주,일,일정목록중 월이 먼저 나오므로 default를 월로맞춰준다.)
	var jsonData = JSON.stringify(obj);
	$.ajax({
		url: api_host+"/system/eis/report/eisreport15/get/fltx_cont.do",
		data:{param:jsonData},
		type:"post",
		dataType : 'json',
		async	 : false,
		success:function(data){
			if(data.success){
				for(var i= 0 ; i < data['records']['length'] ;i++){
					var json = JSON.parse(data['records'][i]['fltx_cont']);
					if (json.start.length === 8) {
						var year = json.start.substring(0, 4);
						var month = json.start.substring(4, 6);
						var day = json.start.substring(6, 8);
						json.start = year + '-' + month + '-' + day;
					}
					var text =
						{	id				: json.id,
							title			: json.title,
							start			: json.start,
							end				: json.end,
							groupid			: json.groupid,
							allday			: json.allday,
							url				: json.url,
							classname		: json.classname,
							editable		: json.editable,
							starteditable	: json.starteditable,
							resourceeditable: json.resourceeditable,
							resourceid		: json.resourceid,
							resourceids		: json.resourceids,
// 							display			: json.display,
							overlap			: json.overlap,
							constraint		: json.constraint,
							color			: json.color,
							backgroundcolor : json.backgroundcolor,
							bordercolor		: json.bordercolor,
							textcolor		: json.textcolor,
							dayofweek		: json.dayofweek,
							starttime		: json.starttime,
							endtime			: json.endtime,
							startrecur		: json.startrecur,
							endrecur		: json.endrecur
						};
					events.push(text);
				}
			}
		}
	});
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		height: '100%',
		expandRows: true,
		slotMinTime: '00:00',
		slotMaxTime: '24:00',
		headerToolbar: {
			left: 'prev,next today lookup',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
		},
		locale	: 'ko',
		initialView: 'dayGridMonth',
		initialDate: new Date(),
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		selectable: true,
		nowIndicator: true,
		dayMaxEvents: true, // allow "more" link when too many events
		events: events,

		eventRender: function(info){
			$(info.el).find('.fc-event-title').html(info.event.title);
		},
		eventContent: function(info) {
			var element = document.createElement('div');

			// title이 JSON 문자열이므로 이를 객체로 변환
			var titleObj = JSON.parse(info.event.title);

			// 파싱된 객체의 필드에 접근하여 HTML 생성
			element.innerHTML =
				'<div><b>제물코드:</b> ' + titleObj.item_code + '</div>' +
				'<div><b>품명:</b> ' + titleObj.item_name + '</div>' +
				'<div><b>규격:</b> ' + titleObj.item_spec + '</div>' +
				'<div><b>납기일자:</b> ' + titleObj.delivery_date + '</div>';
			return { domNodes: [element] };
		},
		eventClick: function(arg) {
			// opens events in a popup window
			$('#frm').attr('action', arg.event.url);
			var json = {"id" : arg.event.id , "hq_id":hq_id };
			var param = JSON.stringify(json);
			$('#param').val(param);
			window.open("","popupForm", 'width=800,height=760');

			arg.jsEvent.preventDefault() // don't navigate in main tab
			$('#frm').submit();
		},

		loading: function(bool) {
			document.getElementById('loading').style.display =
			bool ? 'block' : 'none';
		 }
	});
	calendar.render();

	// lookup 값넣기
	for(var i = 0; i < sourceOptions.length; i++){
		var option = new Option(sourceOptions[i], source_dvcd[i]);
		$('.fc-toolbar-lookup')[0].append(option);
	}

	// lookup change event
	$('.fc-toolbar-lookup').change(function(){
		events = [];
		events = todaySearch(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 왼쪽 버튼 클릭 event
	$('.fc-prev-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 오른쪽 버튼 클릭 event
	$('.fc-next-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 오늘 버튼 클릭 이벤트
	$('.fc-today-button').click(function(){
		events = [];
		events = todaySearch(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
})
	function fireEvents(api_host,hq_id) {
		var	month = $('.fc-dayGridMonth-view').length,
			week  = $('.fc-timeGridWeek-view').length,
			day   = $('.fc-timeGridDay-view').length,
			list  = $('.fc-listMonth-view').length,
			text  = $('.fc-toolbar-title').text(),
			stdt  = '',
			eddt  = '',
			url   = "/system/eis/report/eisreport15/get/fltx_cont.do",
			dvcd  = ''
		;
		if(month || list){
			var rplDate = text.replace('년','').replace(' ','-').replace('월','');
			var date = rplDate.split('-');
			var returnValue = '';
			returnValue = date[0];
			
			var monthVal = '';

			if(date[1] < 10){
				monthVal = '0'+date[1];
				returnValue += '0'+date[1]+'01';
			}else{
				monthVal = date[1];
				returnValue += date[1]+'01';
			}
			stdt = returnValue;
			eddt = returnValue;
			//eddt = returnValue.slice(0, -2) + new Date(date[0], monthVal, 0).getDate();
		}else if (week){
			var date = text.replace(' ','').split('–');
			var stdty,stdtm,stdtd, endtm,endtd;
			var indexY =date[0].indexOf('년'),
				indexM =date[0].indexOf('월'),
				indexD =date[0].indexOf('일')
			;

			stdty = date[0].substr('0',indexY);
			stdtm = date[0].substr(indexY+1,indexM-indexY).replace('월','');
			stdtd = date[0].substr(indexM+1,indexD-indexM).replace('일','').replace(' ','');

			if(stdtm < 10){
				stdtm = '0'+stdtm;
			}
			if(stdtd < 10){
				stdtd = '0'+stdtd;
			}


			var eddtm = '',
				eddtd = ''
			;
			if(date[1].indexOf('월') != -1){
				eddtm = date[1].substr(0,date[1].indexOf('월')).replace(' ','');
				eddtd = date[1].substr(date[1].indexOf('월')+1,date[1].indexOf('일')).replace('일','').replace(' ','');
			}else{
				eddtd = date[1].substr(0,date[1].indexOf('일')).replace('일','').replace(' ','');
			}
			if(eddtm == ''){
				eddtm = stdtm;
			}
			if(eddtd < 10){
				eddtd = '0'+eddtd;
			}
			stdt = stdty+stdtm+stdtd;
			eddt = stdty+eddtm+eddtd;
		}else if(day){
			var date = text.replace(' ','').split('–');
			var stdty,stdtm,stdtd, endtm,endtd;
			var indexY =date[0].indexOf('년'),
				indexM =date[0].indexOf('월'),
				indexD =date[0].indexOf('일')
			;

			stdty = date[0].substr('0',indexY);
			stdtm = date[0].substr(indexY+1,indexM-indexY).replace('월','');
			stdtd = date[0].substr(indexM+1,indexD-indexM).replace('일','').replace(' ','');

			if(stdtm < 10){
				stdtm = '0'+stdtm;
			}
			if(stdtd < 10){
				stdtd = '0'+stdtd;
			}

			stdt = stdty+stdtm+stdtd;
			eddt = stdt;
		}

		if(month||list){
			dvcd = 'CM'
		}else if(week||day){
			dvcd = 'CW'
		}

		event = [];
		var obj			= new Object();
			obj.hq_id	= hq_id;
			obj.stdt	= stdt;
			obj.eddt	= eddt;
			obj.dvcd	= dvcd;
			obj.source_dvcd = $('.fc-toolbar-lookup option:selected').val();
		var jsonData	= JSON.stringify(obj);
		$.ajax({
			url: api_host+url,
			data:{param:jsonData},
			type:"post",
			dataType : 'json',
			async	 : false,
			success:function(data){
				if(data.success){
					for(var i= 0 ; i < data['records']['length'] ;i++){
						var json = JSON.parse(data['records'][i]['fltx_cont']);
						if (json.start.length === 8) {
							var year = json.start.substring(0, 4);
							var month = json.start.substring(4, 6);
							var day = json.start.substring(6, 8);
							json.start = year + '-' + month + '-' + day;
						}
						var text =
							{	id				: json.id,
								title			: json.title,
								start			: json.start,
								end				: json.end,
								groupid			: json.groupid,
								allday			: json.allday,
								url				: json.url,
								classname		: json.classname,
								editable		: json.editable,
								starteditable	: json.starteditable,
								resourceeditable: json.resourceeditable,
								resourceid		: json.resourceid,
								resourceids		: json.resourceids,
// 								display			: json.display,
								overlap			: json.overlap,
								constraint		: json.constraint,
								color			: json.color,
								backgroundcolor : json.backgroundcolor,
								bordercolor		: json.bordercolor,
								textcolor		: json.textcolor,
								dayofweek		: json.dayofweek,
								starttime		: json.starttime,
								endtime			: json.endtime,
								startrecur		: json.startrecur,
								endrecur		: json.endrecur
							}
						event.push(text);
					}
				}
			}
		});
		return event;
	}

	function todaySearch(api_host,hq_id){
		var	month = $('.fc-dayGridMonth-view').length,
			week  = $('.fc-timeGridWeek-view').length,
			day   = $('.fc-timeGridDay-view').length,
			list  = $('.fc-listMonth-view').length,
			dvcd = 'CM',
			today = new Date();
			event = []
		;

		var obj				= new Object();
			obj.hq_id		= hq_id;
			obj.stdt		= today.formatYMD();
			obj.eddt		= today.formatYMD();
			obj.source_dvcd = $('.fc-toolbar-lookup option:selected').val();
			obj.dvcd		= dvcd;
		var jsonData	= JSON.stringify(obj);
		$.ajax({
			url: api_host+"/system/eis/report/eisreport15/get/fltx_cont.do",
			data:{param:jsonData},
			type:"post",
			dataType : 'json',
			async	 : false,
			success:function(data){
				if(data.success){
					for(var i= 0 ; i < data['records']['length'] ;i++){
						var json = JSON.parse(data['records'][i]['fltx_cont']);

						var text =
							{	id				: json.id,
								title			: json.title,
								start			: json.start,
								end				: json.end,
								groupid			: json.groupid,
								allday			: json.allday,
								url				: json.url,
								classname		: json.classname,
								editable		: json.editable,
								starteditable	: json.starteditable,
								resourceeditable: json.resourceeditable,
								resourceid		: json.resourceid,
								resourceids		: json.resourceids,
// 								display			: json.display,
								overlap			: json.overlap,
								constraint		: json.constraint,
								color			: json.color,
								backgroundcolor : json.backgroundcolor,
								bordercolor		: json.bordercolor,
								textcolor		: json.textcolor,
								dayofweek		: json.dayofweek,
								starttime		: json.starttime,
								endtime			: json.endtime,
								startrecur		: json.startrecur,
								endrecur		: json.endrecur
							}
						event.push(text);
					}
				}
			}
		});
		return event;
	}

	Date.prototype.formatYMD = function() {
		var mm = this.getMonth() + 1;
		var dd = this.getDate();

		return [
				this.getFullYear(),
				(mm>9 ? '' : '0') + mm,
				(dd>9 ? '' : '0') + dd
		].join('');
	};
</script>
<style>

	html, body {
		overflow: hidden; /* don't do scrollbars */
		font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
		font-size: 14px;
	}

	#calendar-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.fc-header-toolbar {
		/*
		the calendar will be butting up against the edges,
		but let's scoot in the header's buttons
		*/
		padding-top: 1em;
		padding-left: 1em;
		padding-right: 1em;
	}
	.fc-day-sat{color:blue;} /* ì£¼ë§ìì */
	.fc-day-sun{color:red;}
	.fc-toolbar-lookup{
		height: 32px;
		font-weight: bold;
	}

	#loading {
		display: none;
		position: absolute;
		top: 10px;
		right: 10px;
	}

</style>
</head>
<body>
  <form  method='get' target='popupForm' id='frm'>
  	<input type="hidden" name="param" id="param" >
  </form>
  <div id='loading'>loading...</div>
  <div id='calendar-container'>
    <div id='calendar'></div>
  </div>

</body>
</html>
