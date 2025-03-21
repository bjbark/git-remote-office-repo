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
	var obj			= new Object();
	obj.hq_id	= hq_id;
	obj.stdt	= getMonthStdt();				// 첫 로드시 당일로 처리 .fomat()은 하단부 function참고
	obj.eddt	= getMonthEddt();
	var jsonData = JSON.stringify(obj);
	$.ajax({
		url: api_host+"/system/custom/sjflv/prod/prodplanlist/get/events2.do",
		data:{param:jsonData},
		type:"post",
		dataType : 'json',
		async	 : false,
		success:function(data){
			if(data.success){
				for(var i= 0 ; i < data['records']['length'] ;i++){
					var eventData = data['records'][i];
					var stdt = formatTimestamp(eventData.plan_sttm); 
					var eddt = formatTimestamp(eventData.plan_edtm);
					var json = JSON.stringify(eventData);
					var text =
						{	id				: json.id,
							title			: json,
							start			: stdt,
							end				: eddt,
							groupid			: json.groupid,
							allday			: json.allday,
							//url				: json.url,
							classname		: json.classname,
							editable		: json.editable,
							starteditable	: json.starteditable,
							resourceeditable: json.resourceeditable,
							resourceid		: json.resourceid,
							resourceids		: json.resourceids,
							//display			: json.display,
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
			left: 'prev next',
			center: 'title',
			right: 'dayGridMonth'
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
				'<div style="overflow-x: auto;">' +  // 가로 스크롤 추가
				  '<table style="border-collapse: collapse; width: 200px; table-layout: fixed; background-color: #f9f9f9; color: #333; border: 1px solid #ccc;">' + // 고정 너비 설정
				  '  <tr>' +
				  '    <td style="border: 1px solid #ccc; padding: 0px 4px; font-size: 12px; background-color: #e6e6e6; text-align: right;">' + titleObj.cstm_name + ':</b></td>' +
				  '    <td style="width: 60px; border: 1px solid #ccc; padding: 0px 8px; font-size: 12px; text-align: right;">' + titleObj.plan_count + '</td>' +
				  '  </tr>' +
				  '</table>' +
				'</div>';
			return { domNodes: [element] };
		},
		eventClick: function(arg) {
			// opens events in a popup window
			var iframe = arg.jsEvent.view.parent;
			var customEvent = {
				type: 'calendarEventClick',
				params: JSON.parse(arg.event._def.title)
			};
			iframe.postMessage(customEvent, '*');
		},
		loading: function(bool) {
			document.getElementById('loading').style.display =
			bool ? 'block' : 'none';
		 }
	});
	calendar.render();

	// 왼쪽 버튼 클릭 event
	$('.fc-prev-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		console.log("events : ", events);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 오른쪽 버튼 클릭 event
	$('.fc-next-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		console.log("events : ", events);
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
	// 월 버튼 클릭 이벤트
	$('.fc-dayGridMonth-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 주 버튼 클릭 이벤트
	$('.fc-timeGridWeek-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 일 버튼 클릭 이벤트
	$('.fc-timeGridDay-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
		var eventSource = calendar.getEventSources()[0];
		eventSource.remove();
		calendar.addEventSource(events);
		calendar.refetchEvents();
	})
	// 일정목록 버튼 클릭 이벤트
	$('.fc-listMonth-button').click(function(){
		events = [];
		events = fireEvents(api_host,hq_id);
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
			url   = "/system/custom/sjflv/prod/prodplanlist/get/events2.do",
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
			stdt = returnValue + "000000";
			eddt = returnValue.slice(0, -2) + new Date(date[0], monthVal, 0).getDate() + '235959';
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
			stdt = stdty+stdtm+stdtd+'000000';
			eddt = stdty+eddtm+eddtd+'235959';
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

			stdt = stdty+stdtm+stdtd+'000000';
			eddt = stdty+stdtm+stdtd+'235959';;
		}
		
		if (month) {
		} else if (week) {
		} else if (day) {
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
				console.log("responseData: ", data);
				if(data.success){
					for(var i= 0 ; i < data['records']['length'] ;i++){
						var eventData = data['records'][i];
						var stdt = formatTimestamp(eventData.plan_sttm); 
						var eddt = formatTimestamp(eventData.plan_edtm);
						var json = JSON.stringify(eventData);
						var text =
							{	id				: json.id,
								title			: json,
								start			: stdt,
								end				: eddt,
								groupid			: json.groupid,
								allday			: json.allday,
								//url				: json.url,
								classname		: json.classname,
								editable		: json.editable,
								starteditable	: json.starteditable,
								resourceeditable: json.resourceeditable,
								resourceid		: json.resourceid,
								resourceids		: json.resourceids,
								//display			: json.display,
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
			obj.stdt		= today.formatYMD() + '000000';
			obj.eddt		= today.formatYMD() + '235959';
			obj.source_dvcd = $('.fc-toolbar-lookup option:selected').val();
			obj.dvcd		= dvcd;
		var jsonData	= JSON.stringify(obj);
		$.ajax({
			url: api_host+"/system/custom/sjflv/prod/prodplanlist/get/events2.do",
			data:{param:jsonData},
			type:"post",
			dataType : 'json',
			async	 : false,
			success:function(data){
				if(data.success){
					for(var i= 0 ; i < data['records']['length'] ;i++){
						var eventData = data['records'][i];
						var stdt = formatTimestamp(eventData.plan_sttm); 
						var eddt = formatTimestamp(eventData.plan_edtm);
						console.log("stdt : ", stdt);
						console.log("eddt : ", eddt);
						var json = JSON.stringify(eventData);
						var text =
							{	id				: json.id,
								title			: json,
								start			: stdt,
								end				: eddt,
								groupid			: json.groupid,
								allday			: json.allday,
								//url				: json.url,
								classname		: json.classname,
								editable		: json.editable,
								starteditable	: json.starteditable,
								resourceeditable: json.resourceeditable,
								resourceid		: json.resourceid,
								resourceids		: json.resourceids,
								display			: json.display,
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
						event.push(text);
					}
				}
			}
		});
		return event;
	}
	
	function getMonthStdt () {
		var today = new Date();
		var y = today.getFullYear();
		var m = today.getMonth()+1;
		if(m < 10){
			m = '0' + m;
		}
		
		return [y,m,'01000000'].join('');
	}
	
	function getMonthEddt () {
		var today = new Date();
		var y = today.getFullYear();
		var m = today.getMonth()+1;
		var d = new Date(y, m, 0).getDate();
		if(m < 10){
			m = '0' + m;
		}
		
		return [y, m, d, '235959'].join('');
	}
	
	function formatTimestamp (str) {
		var year = str.substring(0, 4);
		var month = str.substring(4, 6);
		var day = str.substring(6, 8);
		var hour = str.substring(8, 10);
		var minute = str.substring(10, 12);
		var second = str.substring(12, 14);
		
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	}
	
	function formatDate (str) {
		var year = str.substring(0, 4);
		var month = str.substring(4, 6);
		var day = str.substring(6, 8);
		return year + '-' + month + '-' + day;
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
	
	.fc-h-event {
		display: block;
		border: none;
		background-color: white;
	}
	
	.fc-v-event {
		display: block;
		background-color: #dfe9f6;
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
