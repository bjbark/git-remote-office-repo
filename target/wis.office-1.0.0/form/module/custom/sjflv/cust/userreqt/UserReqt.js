Ext.define( 'module.custom.sjflv.cust.userreqt.UserReqt', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopupSjung',
	],
	models: [
		'module.custom.sjflv.cust.userreqt.model.UserReqtModel1'
	],
	stores: [
		'module.custom.sjflv.cust.userreqt.store.UserReqtStore1'
	],
	views : [
		'module.custom.sjflv.cust.userreqt.view.UserReqtLayout',
		'module.custom.sjflv.cust.userreqt.view.UserReqtSearch',
		'module.custom.sjflv.cust.userreqt.view.UserReqtLister1'
	],
	
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-userreqt-search button[action=selectAction]'		: { click : me.selectAction }, /* 조회 */
		});
		me.callParent(arguments);
	},
	
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-sjflv-userreqt-layout'		)[0] } ,
		search	: function () { return Ext.ComponentQuery.query('module-sjflv-userreqt-search'		)[0] } ,
		lister1	: function () { return Ext.ComponentQuery.query('module-sjflv-userreqt-lister1'		)[0] } ,
	},
	
	selectAction: function() {
		var me = this,
			lister = me.pocket.lister1();
			
		lister.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, {stor_id: _global.stor_id});
	},
});
