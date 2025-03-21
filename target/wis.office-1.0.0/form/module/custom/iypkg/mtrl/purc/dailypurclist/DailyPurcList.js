Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.DailyPurcList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
	],

	models:[
		'module.custom.iypkg.mtrl.purc.dailypurclist.model.DailyPurcList1',
		'module.custom.iypkg.mtrl.purc.dailypurclist.model.DailyPurcList2',
		'module.custom.iypkg.mtrl.purc.dailypurclist.model.DailyPurcList3',
		'module.custom.iypkg.mtrl.purc.dailypurclist.model.DailyPurcList4',
	],
	stores:[
		'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister1',
		'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister2',
		'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister3',
		'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister4',
	],
	views : [
		'module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListSearch',
		'module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLayout',
		'module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister1',
		'module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister2',
		'module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister3',
		'module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister4',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-dailypurclist-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-dailypurclist-layout #mainpanel'							: { tabchange : me.selectAction },

			'module-dailypurclist-lister1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			'module-dailypurclist-lister2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-dailypurclist-lister3 button[action=exportAction]'	: { click : me.exportAction3 },	// 엑셀
			'module-dailypurclist-lister4 button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-dailypurclist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-dailypurclist-search')[0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister2')[0] },
		lister3	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister3')[0] },
		lister4	: function () { return Ext.ComponentQuery.query('module-dailypurclist-lister4')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			search = me.pocket.search(),
			param = search.getValues(),
			lister = undefined, type,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		// 원단매입일보 Tab
			if(tindex==0){
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
							lister1.getSelectionModel().select();
						} else {}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, type : '원단'}) );
			}

		// 외주매입일보 Tab
			if(tindex==1){
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select();
						} else {}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, type : '외주'}) );
			}

		// 상품매입일보 Tab
			if(tindex==2){
				lister3.select({
					callback:function(records, operation, success) {
						if (success) {
							lister3.getSelectionModel().select();
						} else {}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, type : '상품'}) );
			}

		// 부자재매입일보 Tab
			if(tindex==3){
				lister4.select({
					callback:function(records, operation, success) {
						if (success) {
							lister4.getSelectionModel().select();
						} else {}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, type : '부자재'}) );
			}

	},

	// 원단매입일보 엑셀
	exportAction1 : function(){
		this.pocket.lister1().writer({enableLoadMask:true});
	},

	// 외주매입일보 엑셀
	exportAction2 : function(){
		this.pocket.lister2().writer({enableLoadMask:true});
	},

	// 상품매입일보 엑셀
	exportAction3 : function(){
		this.pocket.lister3().writer({enableLoadMask:true});
	},

	// 부자재매입일보 엑셀
	exportAction4 : function(){
		this.pocket.lister4().writer({enableLoadMask:true});
	},


});
