Ext.define('module.prod.order.workbooklist.WorkBookList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.prod.order.workbooklist.model.WorkBookListMaster',
		'module.prod.order.workbooklist.model.WorkBookListDetail'
	],
	stores:[
		'module.prod.order.workbooklist.store.WorkBookListMaster',
		'module.prod.order.workbooklist.store.WorkBookListDetail'
	],
	views : [
		'module.prod.order.workbooklist.view.WorkBookListLayout',
		/* 현황 */
		'module.prod.order.workbooklist.view.WorkBookListSearch',
		'module.prod.order.workbooklist.view.WorkBookListListerMaster',
		'module.prod.order.workbooklist.view.WorkBookListListerDetail'
	],

	init: function() {
		var me = this;
		me.control({
			'module-workbooklist-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */
			'module-workbooklist-layout #mainpanel'									: { tabchange : me.mainTabChange  },
			'module-workbooklist-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			// lister event
			'module-workbooklist-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-workbooklist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workbooklist-search')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-workbooklist-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-workbooklist-lister-detail')[0] }
		}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister.master(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			values = me.pocket.search().getValues()
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
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0]
		;
		if (select) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
				},
				Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp } , {	invc_numb : select.get('acpt_numb')},
						{line_seqn : select.get('acpt_seqn')}));
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

});
