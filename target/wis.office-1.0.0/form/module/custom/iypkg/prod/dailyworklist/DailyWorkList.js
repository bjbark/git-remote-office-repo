 Ext.define('module.custom.iypkg.prod.dailyworklist.DailyWorkList', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.WkctPopup'
	],
	models	: [
		'module.custom.iypkg.prod.dailyworklist.model.DailyWorkList',
		'module.custom.iypkg.prod.dailyworklist.model.DailyWorkListDetail1',
		'module.custom.iypkg.prod.dailyworklist.model.DailyWorkListDetail2',
	],
	stores	: [
		'module.custom.iypkg.prod.dailyworklist.store.DailyWorkList',
		'module.custom.iypkg.prod.dailyworklist.store.DailyWorkListDetail1',
		'module.custom.iypkg.prod.dailyworklist.store.DailyWorkListDetail2'
	],
	views	: [
		'module.custom.iypkg.prod.dailyworklist.view.DailyWorkListLayout',
		'module.custom.iypkg.prod.dailyworklist.view.DailyWorkListSearch',
		'module.custom.iypkg.prod.dailyworklist.view.DailyWorkListLister',
		'module.custom.iypkg.prod.dailyworklist.view.DailyWorkListDetail1',
		'module.custom.iypkg.prod.dailyworklist.view.DailyWorkListDetail2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-dailyworklist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-dailyworklist-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-dailyworklist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-dailyworklist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-dailyworklist-lister')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-dailyworklist-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-dailyworklist-detail2')[0] }
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
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	selectDetail : function(grid, record) {
		var me = this,
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			select  = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if (select) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail1.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : select.get('invc_numb') });

			detail2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : select.get('invc_numb') });
		}
	},
	selectRecord:function( grid, records ){
		var me = this,
		detail1 = me.pocket.detail1(),
		detail2 = me.pocket.detail2()
		;
		detail1.getStore().clearData();
		detail1.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});