Ext.define('module.custom.kortc.prod.order.porderlist.PorderList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.WkfwPopup',
	],

	models:[
		'module.custom.kortc.prod.order.porderlist.model.PorderListMaster',
		'module.custom.kortc.prod.order.porderlist.model.PorderListDetail'
	],
	stores:[
		'module.custom.kortc.prod.order.porderlist.store.PorderListMaster',
		'module.custom.kortc.prod.order.porderlist.store.PorderListDetail'
	],
	views : [
		'module.custom.kortc.prod.order.porderlist.view.PorderListLayout',
		/* 현황 */
		'module.custom.kortc.prod.order.porderlist.view.PorderListSearch',
		'module.custom.kortc.prod.order.porderlist.view.PorderListListerMaster',
		'module.custom.kortc.prod.order.porderlist.view.PorderListListerDetail',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-porderlist-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-porderlist-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-porderlist-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-porderlist-layout button[action=selectAction]'					: { click : me.selectAction		}, /* 조회		*/
			'module-porderlist-layout button[action=exportAction]'					: { click : me.exportAction		}, /* 엑셀		*/

			'module-porderlist-lister-master' : {
				selectionchange : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-porderlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-porderlist-search')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-porderlist-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-porderlist-lister-detail')[0] }
		},
	},
	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister.master()
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

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail()
		;

	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
		;
		if (record[0]) {
			detail.getStore().clearData();
			detail.getStore().loadData([],false);
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb') });
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
});
