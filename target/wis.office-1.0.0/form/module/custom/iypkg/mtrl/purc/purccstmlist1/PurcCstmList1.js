Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.PurcCstmList1', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup'
	],

	models:[
		'module.custom.iypkg.mtrl.purc.purccstmlist1.model.PurcCstmList1',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.model.PurcCstmList2',
	],
	stores:[
		'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister2',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister3',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister4',
	],
	views : [
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Layout',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Search',
		/* 작업 */
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1WorkerSearch',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister2',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister3',
		'module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Lister4',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purccstmlist1-layout #mainpanel'									: { tabchange : me.selectAction   },
			'module-purccstmlist1-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-purccstmlist1-worker-lister  button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀1 */
			'module-purccstmlist1-worker-lister2 button[action=exportAction]'			: { click : me.exportAction2      }, /* 엑셀2 */
			'module-purccstmlist1-worker-lister3 button[action=exportAction]'			: { click : me.exportAction3      }, /* 엑셀3 */
			'module-purccstmlist1-worker-lister4 button[action=exportAction]'			: { click : me.exportAction4      }, /* 엑셀4 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-purccstmlist1-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-purccstmlist1-search')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister3')[0] },
		lister4 : function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister4')[0] }
	},

	selectAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			lister2	= me.pocket.lister2(),
			lister3	= me.pocket.lister3(),
			lister4	= me.pocket.lister4(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			dvcd
		;
		if(param.ck1 != null){
			dvcd = 1;						// 명세서 기준
		}else if(param.ck2 != null){
			dvcd = 2;						// 계산서 기준
		}

		if(tindex == 0){
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, dvcd : dvcd }));
		}else if(tindex == 1){
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, dvcd : dvcd }));
		}else if(tindex == 2){
			lister3.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, dvcd : dvcd }));
		}else if(tindex == 3){
			lister4.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, dvcd : dvcd }));
		}
	},

	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportAction2 : function(self) {
		this.pocket.lister2().writer({enableLoadMask:true});
	},

	exportAction3 : function(self) {
		this.pocket.lister3().writer({enableLoadMask:true});
	},

	exportAction4 : function(self) {
		this.pocket.lister4().writer({enableLoadMask:true});
	}
});
