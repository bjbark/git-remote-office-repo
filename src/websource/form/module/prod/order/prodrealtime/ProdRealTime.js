Ext.define('module.prod.order.prodrealtime.ProdRealTime', { extend:'Axt.app.Controller',

	models	: [
		'module.prod.order.prodrealtime.model.ProdRealTime'
	],
	stores	: [
		'module.prod.order.prodrealtime.store.ProdRealTime1',
		'module.prod.order.prodrealtime.store.ProdRealTime2',
		'module.prod.order.prodrealtime.store.ProdRealTime3'
	],
	views	: [
		'module.prod.order.prodrealtime.view.ProdRealTimeLayout',
		'module.prod.order.prodrealtime.view.ProdRealTimeLister1',
		'module.prod.order.prodrealtime.view.ProdRealTimeLister2',
		'module.prod.order.prodrealtime.view.ProdRealTimeSearch',
		'module.prod.order.prodrealtime.view.ProdRealTimeChart1',
		'module.prod.order.prodrealtime.view.ProdRealTimeChart2',
		'module.prod.order.prodrealtime.view.ProdRealTimeChart3'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodrealtime-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			'module-prodrealtime-layout #mainpanel'                   : { tabchange : me.selectAction },	// 조회
			// lister1 event
			'module-prodrealtime-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-prodrealtime-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-prodrealtime-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-prodrealtime-search') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-prodrealtime-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-prodrealtime-lister2')[0] },
		chart1	: function () { return Ext.ComponentQuery.query('module-prodrealtime-chart1') [0] },
		chart2	: function () { return Ext.ComponentQuery.query('module-prodrealtime-chart2') [0] },
		chart3	: function () { return Ext.ComponentQuery.query('module-prodrealtime-chart3') [0] }
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.invc1_date==''||param.invc2_date=='') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}
		else if(param.invc1_date>param.invc2_date) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}
		else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );

			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

//	changeAction:function() {
//		var me = this,
//			lister1 = me.pocket.lister1(),
//			lister2 = me.pocket.lister2(),
//			tpanel = me.pocket.layout().down('#mainpanel'),
//			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
//		;
//		if ( tindex == 0 ) {
//			lister1.getStore().reload();
//			lister2.getStore().reload();
//		}
//	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});