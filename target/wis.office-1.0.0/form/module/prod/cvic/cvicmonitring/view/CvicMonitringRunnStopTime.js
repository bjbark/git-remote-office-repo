Ext.define('module.prod.cvic.cvicmonitring.view.CvicMonitringRunnStopTime', { extend: 'Axt.form.Editor',

	alias: 'widget.module-cvicmonitring-runnstop',
	initComponent: function(config){
		var me = this;
		me.items = me.createWest();
		me.callParent(arguments);
		me.id = 'RunnTimePanel';
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
			fieldDefaults: { width : 280, labelWidth : 60,height:300 },
			listeners: {
				delay: 1,
				afterrender: function() {
					me.setWidth($('#RunnTimePanel').width());
					me.setHeight($('#RunnTimePanel').height());
				}
			},
			items		: [
				{	layout : 'vbox',
					items	:[
						{	layout : 'hbox',
							flex : 1,
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#RunnTimePanel').width());
									this.setHeight($('#RunnTimePanel').height()*0.25);
								}
							},
							items :[
								{	text	: '가동시간',
									xtype	: 'label',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									readOnly : true,
									style	:'font-size:1.5em; line-height: 8; text-align:center',
									cls		:'textTemp'
								},{	xtype	: 'textfield',
									name	: 'runn_time',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									readOnly : true,
									fieldCls	: 'textTemp',
									fieldStyle : 'text-align:center;font-size:1.5em;'
								}
							]
						},{	layout : 'hbox',
							flex : 1,
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#RunnTimePanel').width());
									this.setHeight($('#RunnTimePanel').height()*0.25);
								}
							},
							items :[
								{	text	: '가동률',
									xtype	: 'label',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									style	:'font-size:1.5em; line-height: 8; text-align:center',
									cls		:'textTemp'
								},{	xtype	: 'textfield',
									name	: 'runn_time_perc',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									fieldCls	: 'textTemp',
									readOnly : true,
									fieldStyle : 'text-align:center;font-size:1.5em;'
								}
							]
						},{	layout : 'hbox',
							flex : 1,
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#RunnTimePanel').width());
									this.setHeight($('#RunnTimePanel').height()*0.25);
								}
							},
							items :[
								{	text	: '비가동시간',
									xtype	: 'label',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									style	:'font-size:1.5em; line-height: 8; text-align:center',
									cls		:'textTemp'
								},{	xtype	: 'textfield',
									name	: 'stop_time',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									fieldCls	: 'textTemp',
									readOnly : true,
									fieldStyle : 'text-align:center;font-size:1.5em;'
								}
							]
						},{	layout : 'hbox',
							flex : 1,
							listeners: {
								delay: 1,
								afterrender: function() {
									this.setWidth($('#RunnTimePanel').width());
									this.setHeight($('#RunnTimePanel').height()*0.25);
								}
							},
							items :[
								{	text	: '비가동율',
									xtype	: 'label',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
											me.getSelect();
										}
									},
									style	:'font-size:1.5em; line-height: 8; text-align:center',
									cls		:'textTemp'
								},{	xtype	: 'textfield',
									name	: 'stop_time_perc',
									flex	: 1,
									listeners: {
										delay: 1,
										afterrender: function() {
											this.setHeight($('#RunnTimePanel').height()*0.25);
										}
									},
									readOnly	: true,
									fieldCls	: 'textTemp',
									fieldStyle	: 'text-align:center;font-size:1.5em;'
								}
							]
						},
					]
				}
			]
		};
		return item;
	},
	getSelect:function(){
		var me = this,
			store = Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringRunnStopTime'),
			today = me.dateFormat(),
			runn_time,runn_time_perc,stop_time,stop_time_perc
		;
		store.load({
			params : {
				param:JSON.stringify({invc_date : today})
			},
			callback : function(records,operation,success){
				me.down('[name=runn_time]').setValue(records[0].data.runn_time);
				me.down('[name=runn_time_perc]').setValue(records[0].data.runn_time_perc+'%');
				me.down('[name=stop_time]').setValue(records[0].data.stop_time);
				me.down('[name=stop_time_perc]').setValue(records[0].data.stop_time_perc+'%');
			}
		});
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
