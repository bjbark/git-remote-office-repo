Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-sjdashboard-editor',
	initComponent: function(config){
		var me = this;
		me.items = me.createWest();
		me.callParent(arguments);
		me.id = 'SjDashBoardEditor';
	},
	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
				me.setWidth($('#SjDashBoardEditor').width());
				me.setHeight($('#SjDashBoardEditor').height());
				me.down('[itemId=noti_labl]').setWidth($('#SjDashBoardEditor').width());
				me.down('[itemId=noti_area]').setWidth($('#SjDashBoardEditor').width());
				me.down('[itemId=noti_area]').setHeight($('#SjDashBoardEditor').height()*0.70);
				me.down('[itemId=chng_Per]').setWidth($('#SjDashBoardEditor').width());
				me.down('[itemId=closeButton]').setWidth($('#SjDashBoardEditor').width());
			}
		}
	},
	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'panel' ,
			layout : 'fit',
			border		: 0,
			fieldDefaults: { width : 280, labelWidth : 60 },
			listeners: {
				delay: 1,
				afterrender: function() {
					me.setWidth($('#SjDashBoardEditor').width());
					me.setHeight($('#SjDashBoardEditor').height());
				},
				resize: {
					fn: function(el) {
						me.setWidth($('#SjDashBoardEditor').width());
						me.setHeight($('#SjDashBoardEditor').height());
					}
				}
			},
			items		: [
				{	layout : 'vbox',
					flex	: 1,
					items	:[
						{	layout : 'hbox',
							height	: 40,
							itemId	: 'chng_Per',
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#SjDashBoardEditor').width());
								},
							},
							items :[
								{	text	: '오늘의 $환율',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 2;text-align:center',
									cls		:'textTemp'
								},{	xtype	: 'textfield',
									name	: 'runn_time',
									flex	: 1,
									height	: 40,
									readOnly : true,
									fieldCls	: 'textTemp',
									fieldStyle : 'text-align:center;font-size:1.5em;',
									listeners:{
										afterrender:function(){
											var exchange = 0;
//											Ext.Ajax.request({
//												url		: _global.location.http() + '/custom/sjflv/eis/sjdashboard/get/exchange.do',
//												params	: {
//													token : _global.token_id,
//													param : JSON.stringify({
//														_set : 'undefinded'
//													})
//												},
//												async	: false,
//												method	: 'POST',
//												success	: function(response, request) {
//
//													var result = Ext.decode(response.responseText);
//													console.log(result);
//													if	(!result.success ){
//														Ext.Msg.error(result.message );
//														return;
//													} else {
//														exchange = result.records[0].basePrice;
//													}
//												},
//												failure : function(result, request) {
//													Ext.Msg.error(result.mesage);
//												},
//												callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//												}
//											});
											this.setValue(exchange);
										}
									}
								}
							]
						},{	layout : 'hbox',
							height : 40,
							border : 0,
							itemId	: 'noti_labl',
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#SjDashBoardEditor').width());
								},
							},
							items :[
								{	text	: '<<공지사항>>',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 2;text-align:center',
									cls		:'textTemp'								}
							]
						},{	layout : 'hbox',
							flex : 1,
							itemId	: 'noti_area',
							border :0,
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#SjDashBoardEditor').width());
									this.setHeight($('#SjDashBoardEditor').height()*0.70);
								},
							},
							items :[
								{	xtype	: 'module-sjdashboard-notice',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardEditor').height()*0.70);
										},
									},

								}
							]
						},{	layout : 'hbox',
							height : 45,
							itemId : 'closeButton',
							border : 0,
							items :[
								{	xtype		: 'button',
									text		: '<span class="btnTemp" style="font-size:25px;">닫기</span>',
									cls			: 'button-right btn btn-danger',
									flex		: 1,
									height		: 45,
									style: 'text-decoration:none;',
									handler:function(){
//										var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
//										sideButton.click();
										me.up('panel').up('panel').up('panel').up('[title=대시보드]').close();
									},
								}
							]
						}
					]
				}
			]
		};
		return item;
	},
	getSelect:function(){
//		var me = this,
//			store = Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringRunnStopTime'),
//			today = me.dateFormat(),
//			runn_time,runn_time_perc,stop_time,stop_time_perc
//		;
//		store.load({
//			params : {
//				param:JSON.stringify({invc_date : today})
//			},
//			callback : function(records,operation,success){
//				me.down('[name=runn_time]').setValue(records[0].data.runn_time);
//				me.down('[name=runn_time_perc]').setValue(records[0].data.runn_time_perc+'%');
//				me.down('[name=stop_time]').setValue(records[0].data.stop_time);
//				me.down('[name=stop_time_perc]').setValue(records[0].data.stop_time_perc+'%');
//			}
//		});
	},
	dateFormat:function(){
		var date = new Date(),
			yyyy = date.getFullYear().toString(),
			mm = (date.getMonth()+1).toString(),
			dd = date.getDate().toString()
		;
		if(mm < 10){
			mm = '0'+mm;
		}
		if(dd < 10){
			dd = '0'+dd;
		}
		return yyyy+mm+dd;
	}
});
