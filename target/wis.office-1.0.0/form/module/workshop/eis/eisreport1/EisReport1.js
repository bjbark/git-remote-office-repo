Ext.define('module.workshop.eis.eisreport1.EisReport1', { extend : 'Axt.app.Controller',

	requires:[

		'lookup.popup.view.UserPopup',
	],

	models:[
		'module.workshop.eis.eisreport1.model.EisReport1'
	],
	stores:[
		'module.workshop.eis.eisreport1.store.EisReport1'
	],
	views : [
		'module.workshop.eis.eisreport1.view.EisReport1Layout',
		/* 현황 */
		'module.workshop.eis.eisreport1.view.EisReport1Search',
		'module.workshop.eis.eisreport1.view.EisReport1Lister',
		'module.workshop.eis.eisreport1.view.EisReport1Lister2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-eisreport1-lister menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-eisreport1-lister menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-eisreport1-lister button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({

			// lister event
			'module-eisreport1-layout button[action=selectAction]'					: { click : me.selectAction		}, /* 조회		*/
			'module-eisreport1-lister button[action=exportAction]'			: { click : me.exportAction}, /* 엑셀		*/
			'module-itemlist-work-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회

			'module-eisreport1-lister' : {
//				itemdblclick    : me.selectDetail,
//				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-eisreport1-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-eisreport1-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-eisreport1-lister')[0] },
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},

});
