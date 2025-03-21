Ext.define('module.sale.sale.salelist.SaleList', { extend : 'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
	],
	models	: [
		'module.sale.sale.salelist.model.SaleListLister1',
		'module.sale.sale.salelist.model.SaleListLister2',
		'module.sale.sale.salelist.model.SaleListLister3',
		'module.sale.sale.salelist.model.SaleListLister4',
		'module.sale.sale.salelist.model.SaleListLister5'
	],
	stores	: [
		'module.sale.sale.salelist.store.SaleListLister1',
		'module.sale.sale.salelist.store.SaleListLister2',
		'module.sale.sale.salelist.store.SaleListLister3',
		'module.sale.sale.salelist.store.SaleListLister4',
		'module.sale.sale.salelist.store.SaleListLister5'
	],
	views	: [
		'module.sale.sale.salelist.view.SaleListLayout',
		'module.sale.sale.salelist.view.SaleListLister1',
		'module.sale.sale.salelist.view.SaleListLister2',
		'module.sale.sale.salelist.view.SaleListLister3',
		'module.sale.sale.salelist.view.SaleListLister4',
		'module.sale.sale.salelist.view.SaleListLister5',
		'module.sale.sale.salelist.view.SaleListSearch',
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			'module-salelist-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-salelist-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */

			'module-salelist-lister1 button[action=exportAction]'					: { click : me.exportLister1Action	}, /* 엑셀 */
			'module-salelist-lister2 button[action=exportAction]'					: { click : me.exportLister2Action	}, /* 엑셀 */
			'module-salelist-lister3 button[action=exportAction]'					: { click : me.exportLister3Action	}, /* 엑셀 */
			'module-salelist-lister4 button[action=exportAction]'					: { click : me.exportLister4Action	}, /* 엑셀 */
			'module-salelist-lister5 button[action=exportAction]'					: { click : me.exportLister5Action	}, /* 엑셀 */

		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-salelist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-salelist-search')[0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-salelist-lister1')[0]},
		lister2	: function () { return Ext.ComponentQuery.query('module-salelist-lister2')[0]},
		lister3	: function () { return Ext.ComponentQuery.query('module-salelist-lister3')[0]},
		lister4	: function () { return Ext.ComponentQuery.query('module-salelist-lister4')[0]},
		lister5	: function () { return Ext.ComponentQuery.query('module-salelist-lister5')[0]}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			lister5 = me.pocket.lister5(),
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
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , mes_system_type:_global.options.mes_system_type}));
		}else if(tindex==1){
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, mes_system_type:_global.options.mes_system_type}));
		}
			else if(tindex==2){
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , type : '입고', mes_system_type:_global.options.mes_system_type}));
		}
				else if(tindex==3){
			lister4.select({
				callback:function(records, operation, success) {
					if (success) {
						lister4.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , mes_system_type:_global.options.mes_system_type}));
		} else if(tindex==4){
			lister5.select({
				callback:function(records, operation, success) {
					if (success) {
						lister5.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp , type : '입고', mes_system_type:_global.options.mes_system_type}));
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
});