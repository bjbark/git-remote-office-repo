Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-sjdashboard-order-editor',
	initComponent: function(config){
		var me = this;
		me.items = me.createWest();
		me.callParent(arguments);
		me.id = 'SjDashBoardOrderEditor';
	},
	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
				me.setWidth($('#SjDashBoardOrderEditor').width());
				me.setHeight($('#SjDashBoardOrderEditor').height());
				me.down('[itemId=row1]').setWidth($('#SjDashBoardOrderEditor').width());
				me.down('[itemId=row2]').setWidth($('#SjDashBoardOrderEditor').width());
				me.down('[itemId=row3]').setWidth($('#SjDashBoardOrderEditor').width());
				me.down('[itemId=row4]').setWidth($('#SjDashBoardOrderEditor').width());
				me.down('[itemId=row5]').setWidth($('#SjDashBoardOrderEditor').width());
				me.down('[itemId=row1]').setHeight($('#SjDashBoardOrderEditor').height()*0.2);
				me.down('[itemId=row2]').setHeight($('#SjDashBoardOrderEditor').height()*0.2);
				me.down('[itemId=row3]').setHeight($('#SjDashBoardOrderEditor').height()*0.2);
				me.down('[itemId=row4]').setHeight($('#SjDashBoardOrderEditor').height()*0.2);
				me.down('[itemId=row5]').setHeight($('#SjDashBoardOrderEditor').height()*0.2);
				$('.boxs').height($('#SjDashBoardOrderEditor').height()*0.2);
				$('.boxs').css('line-height',($('#SjDashBoardOrderEditor').height()*0.2)/16.48);
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
			items		: [
				{	layout : 'vbox',
					flex	: 1,
					border	: 0,
					items	:[
						{	layout : 'hbox',
							itemId : 'row1',
							items :[
								{	text	: '구분',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '당일',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '1일전',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '2일전',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '3일전',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '4일전',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '5일전',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{	text	: '주간',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								}
							]
						},{	layout : 'hbox',
							itemId : 'row2',
							items :[
								{	text	: '건수',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								}
							]
						},{	layout : 'hbox',
							itemId : 'row3',
							items :[
								{	text	: '수량',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								}
							]
						},{	layout : 'hbox',
							itemId : 'row4',
							items :[
								{	text	: '생산',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								}
							]
						},{	layout : 'hbox',
							itemId : 'row5',
							items :[
								{	text	: '출고',
									xtype	: 'label',
									flex	: 1,
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
									},
								},{ xtype	: 'textfield',
									flex	: 1,
									name	: '',
									readOnly : true,
									style	:'font-size:1.5em;line-height: 4.5;text-align:center;border-right:1px solid #abc7ec;',
									cls		:'textTemp boxs',
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#SjDashBoardOrderEditor').height()*0.2);
										}
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
