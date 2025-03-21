Ext.define('module.sale.sale.newitemsale.NewItemSale', { extend:'Axt.app.Controller',

	requires	: [
			'lookup.popup.view.BzplPopup',
			'lookup.popup.view.ItemPopup',
			'lookup.popup.view.UserPopup',
			'lookup.popup.view.CstmPopup'
		],
	models	: ['module.sale.sale.newitemsale.model.NewItemSale'],
	stores	: [
		'module.sale.sale.newitemsale.store.NewItemSale',
		'module.sale.sale.newitemsale.store.NewItemSale2'
	],
	views	: [
		'module.sale.sale.newitemsale.view.NewItemSaleLayout',
		'module.sale.sale.newitemsale.view.NewItemSaleSearch',
		'module.sale.sale.newitemsale.view.NewItemSaleLister',
		'module.sale.sale.newitemsale.view.NewItemSaleLister2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-newitemsale-layout #mainpanel'					: { tabchange : me.selectAction		},
			'module-newitemsale-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-newitemsale-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-newitemsale-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-newitemsale-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-newitemsale-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-newitemsale-lister2')[0]},
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = '',
			master = undefined
		;
		if(tindex==0){
			master = lister;
			temp = 'query';
		}else{
			master = lister2;
			temp = 'entry';
		}
		if(tindex==0){
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
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
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});