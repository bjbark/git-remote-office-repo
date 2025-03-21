Ext.define('module.custom.sjflv.prod.prodplanlist.view.ProdPlanListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-prodplanlist-layout',
	layout:'card',
	activeItem: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);

	},

	createListCard:function(){
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [{xtype: 'module-sjflv-prodplanlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					split  : true ,
					items	: [
						{	xtype	: 'panel',
							name	: 'tab1',
							layout	: 'fit',
							region	: 'center',
							title	: '생산계획 현황',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-prodplanlist-lister1',
									style	: Const.borderLine.right ,
								}
							]
						},{	xtype	: 'panel',
							padding : 10,
							title	: '월간 일정표',
							items	: [
								me.calendarItem()
							]
						},{	xtype	: 'panel',
							padding : 10,
							title	: '주요거래처 생산계획',
							items	: [
								me.calendarItem2()
							]
						},{	xtype	: 'panel',
							name	: 'tab3',
							title	: '원재료별 생산계획',
							layout	: 'fit',
							items	: [
								{	xtype	: 'module-sjflv-prodplanlist-lister2',
									style	: Const.borderLine.right
								}
							]
						}
					]
				}
			]
		}
		return card;
	},

	calendarItem : function () {
		var me = this,
			chk = Ext.dom.Query.select('.x-css-shadow'),
			hq_id = _global.hq_id.toUpperCase(),
			api_host = _global.api_host_info,
			url = _global.location.http() + '/custom/sjflv/prod/prodplanlist/get/calendar.do?param={"hq_id":"'+hq_id+'","api_host":"'+api_host+'"}',
			//url='/system/eis/report/eisreport15/get/calendar.do?param={"hq_id":"'+hq_id+'","api_host":"'+api_host+'"}',
			item = {
				xtype:'component',
				autoEl:{
					tag:'iframe',
					style : 'height:100%;width:100%;border:none',
					src:_global.api_host_info+encodeURI(url)
					//src: _global.location.http() + '/custom/sjflv/prod/prodplanlist/get/calendar.do'
//					src:src="https://app.powerbi.com/view?r=eyJrIjoiODZlNmJiMTgtM2U0NC00NzhjLWI4OGUtNmY0NWRjMjNjZDFmIiwidCI6IjUyNmU1Mjk5LTk3YTYtNDE0Yi1iYmM3LWFmMzAxNzUzNWZhMyJ9&pageName=ReportSection"
				},
				id: 'iframe_calendar_1'
			}
		;
		return item;
	},
	
	calendarItem2 : function () {
		window.addEventListener('message', function(event) {
			// 메시지 유형 확인
			if (event.data.type === 'calendarEventClick') {
				console.log('Received message from iframe:', event.data);

				// ExtJS 이벤트 발생
				var iframeComponent = Ext.ComponentQuery.query('#iframe_calendar_2')[0];
				if (iframeComponent) {
					iframeComponent.fireEvent('calendarEventClick', event.data);
				}
			}
		});
		var me = this,
			chk = Ext.dom.Query.select('.x-css-shadow'),
			hq_id = _global.hq_id.toUpperCase(),
			api_host = _global.api_host_info,
			url = _global.location.http() + '/custom/sjflv/prod/prodplanlist/get/calendar2.do?param={"hq_id":"'+hq_id+'","api_host":"'+api_host+'"}',
			item = {
				xtype:'component',
				autoEl:{
					tag:'iframe',
					style : 'height:100%;width:100%;border:none',
					src:_global.api_host_info+encodeURI(url)
				},
				id: 'iframe_calendar_2',
				listeners: {
					calendarEventClick: function(data) {
						me.showPopup(data);
					}
				}
			}
		;
		return item;
	},
	
	showPopup: function(data) {
		var popup = resource.loadPopup({
			widget	: 'module-sjflv-prodplanlist-popup1',
			params	: data.params,
		});
		
		popup.down('grid').select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: popup
		}, Ext.merge({cstm_idcd: data.params.cstm_idcd, plan_sttm: data.params.plan_sttm, stor_id: _global.stor_id}));
	}
});
