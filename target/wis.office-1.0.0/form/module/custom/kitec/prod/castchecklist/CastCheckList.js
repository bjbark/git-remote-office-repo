Ext.define('module.custom.kitec.prod.castchecklist.CastCheckList', { extend:'Axt.app.Controller',
	requires:[
	],
	models	: [
		'module.custom.kitec.prod.castchecklist.model.CastCheckListMaster',
		'module.custom.kitec.prod.castchecklist.model.CastCheckListDetail'
	],
	stores	: [
		'module.custom.kitec.prod.castchecklist.store.CastCheckListMaster',
		'module.custom.kitec.prod.castchecklist.store.CastCheckListDetail'
	],
	views	: [
		'module.custom.kitec.prod.castchecklist.view.CastCheckListLayout',
		'module.custom.kitec.prod.castchecklist.view.CastCheckListDetail',
		'module.custom.kitec.prod.castchecklist.view.CastCheckListMaster',
		'module.custom.kitec.prod.castchecklist.view.CastCheckListSearch',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-castchecklist-layout button[action=selectAction]'			: { click : me.selectAction	},			// 조회
			// lister1 event
			'module-castchecklist-master button[action=exportAction]'			: { click : me.exportAction1},			// 엑셀1
			'module-castchecklist-detail button[action=exportAction]'			: { click : me.exportAction2},			// 엑셀2
			'module-castchecklist-master' : {
				click : me.selectRecord ,
				itemdblclick: me.selectDetail
			},
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-castchecklist-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-castchecklist-search')[0] },
		lister		: function () { return Ext.ComponentQuery.query('module-castchecklist-master')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-castchecklist-detail')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}));
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			search = me.pocket.search(),
			param  = search.getValues(),
			detail = me.pocket.detail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, Ext.merge( param, {stor_id : _global.stor_id, cvic_idcd : record.get('cvic_idcd')}));
		}
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.detail().writer({enableLoadMask:true});
	}
});