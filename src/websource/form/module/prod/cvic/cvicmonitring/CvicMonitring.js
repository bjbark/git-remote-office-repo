Ext.define('module.prod.cvic.cvicmonitring.CvicMonitring', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.LaboRatePopup',
		'lookup.upload.BoardUpload'
	],

	models : [	'module.prod.cvic.cvicmonitring.model.CvicMonitringChart1',
	          	'module.prod.cvic.cvicmonitring.model.CvicMonitringRunnStopTime',
				'module.prod.cvic.cvicmonitring.model.CvicMonitringRunningData',
				'module.prod.cvic.cvicmonitring.model.CvicMonitringChart2'
	],

	stores : [	'module.prod.cvic.cvicmonitring.store.CvicMonitringChart1',
	          	'module.prod.cvic.cvicmonitring.store.CvicMonitringChart2',
				'module.prod.cvic.cvicmonitring.store.CvicMonitringRunningData',
				'module.prod.cvic.cvicmonitring.store.CvicMonitringRunnStopTime'
	],
	views  : [	'module.prod.cvic.cvicmonitring.view.CvicMonitringLayout',
				'module.prod.cvic.cvicmonitring.view.CvicMonitringChart1',
				'module.prod.cvic.cvicmonitring.view.CvicMonitringChart2',
				'module.prod.cvic.cvicmonitring.view.CvicMonitringRunningData',
				'module.prod.cvic.cvicmonitring.view.CvicMonitringRunnStopTime',
				'module.prod.cvic.cvicmonitring.view.CvicMonitringSearch'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cvicmonitring-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
		});
		me.callParent(arguments);
	},

	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-cvicmonitring-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-cvicmonitring-search')[0] },
		chart1 : function () { return Ext.ComponentQuery.query('module-cvicmonitring-chart1')[0] },
		chart2 : function () { return Ext.ComponentQuery.query('module-cvicmonitring-chart2')[0] },
		runndata : function () { return Ext.ComponentQuery.query('module-cvicmonitring-runndata')[0] },
		runnstop : function () { return Ext.ComponentQuery.query('module-cvicmonitring-runnstop')[0] },
		},


	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
});
