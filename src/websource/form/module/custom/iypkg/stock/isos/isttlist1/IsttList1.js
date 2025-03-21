Ext.define('module.custom.iypkg.stock.isos.isttlist1.IsttList1', { extend : 'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.ProdPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.CvicPopup'
	],
	models	: [
		'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister1',
		'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister2',
		'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister3',
		'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister4',
		'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister5',
		'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister6'
	],
	stores	: [
		'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister1',
		'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister2',
		'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister3',
		'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister4',
		'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister5',
		'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister6'
	],
	views	: [
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Layout',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister1',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister2',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister3',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister4',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister5',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister6',
		'module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Search',
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			'module-isttlist1-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-isttlist1-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */

			'module-isttlist1-lister1 button[action=exportAction]'					: { click : me.exportLister1Action	}, /* 엑셀 */
			'module-isttlist1-lister2 button[action=exportAction]'					: { click : me.exportLister2Action	}, /* 엑셀 */
			'module-isttlist1-lister3 button[action=exportAction]'					: { click : me.exportLister3Action	}, /* 엑셀 */
			'module-isttlist1-lister4 button[action=exportAction]'					: { click : me.exportLister4Action	}, /* 엑셀 */
			'module-isttlist1-lister5 button[action=exportAction]'					: { click : me.exportLister5Action	}, /* 엑셀 */
			'module-isttlist1-lister6 button[action=exportAction]'					: { click : me.exportLister6Action	}, /* 엑셀 */

			'module-isttlist1-lister1' : {
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-isttlist1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-isttlist1-search')[0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-isttlist1-lister1')[0]},
		lister2	: function () { return Ext.ComponentQuery.query('module-isttlist1-lister2')[0]},
		lister3	: function () { return Ext.ComponentQuery.query('module-isttlist1-lister3')[0]},
		lister4	: function () { return Ext.ComponentQuery.query('module-isttlist1-lister4')[0]},
		lister5	: function () { return Ext.ComponentQuery.query('module-isttlist1-lister5')[0]},
		lister6	: function () { return Ext.ComponentQuery.query('module-isttlist1-lister6')[0]}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			lister5 = me.pocket.lister5(),
			lister6 = me.pocket.lister6(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = '',
			master = undefined
		;
		if(tindex==0){
			master = lister1;
			temp = 'query';
		}else{
			master = lister2;
			temp = 'entry';
		}
		if(tindex==0){
			lister1.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
		}else if(tindex==1){
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==2){
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , type : '입고'}));
		} else if(tindex==3){
			lister4.select({
				callback:function(records, operation, success) {
					if (success) {
						lister4.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==4){
			lister5.select({
				callback:function(records, operation, success) {
					if (success) {
						lister5.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , type : '입고'}));
		} else if(tindex==5){
			lister6.select({
				callback:function(records, operation, success) {
					if (success) {
						lister6.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , type : '입고대기'}));
		}
	},

	exportLister1Action : function(self){
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportLister2Action : function(self){
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportLister3Action : function(self){
		this.pocket.lister3().writer({enableLoadMask:true});
	},
	exportLister4Action : function(self){
		this.pocket.lister4().writer({enableLoadMask:true});
	},
	exportLister5Action : function(self){
		this.pocket.lister5().writer({enableLoadMask:true});
	},
	exportLister6Action : function(self){
		this.pocket.lister6().writer({enableLoadMask:true});
	}

});