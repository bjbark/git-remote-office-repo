Ext.define('module.sale.order.slorlist6.SlorList6', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.sale.order.slorlist6.model.SlorList6Master'
	],
	stores:[
		'module.sale.order.slorlist6.store.SlorList6Master'
	],
	views : [
		'module.sale.order.slorlist6.view.SlorList6Layout',
		/* 현황 */
		'module.sale.order.slorlist6.view.SlorList6Search',
		'module.sale.order.slorlist6.view.SlorList6ListerMaster'
	],

	init: function() {
		var me = this;
		me.control({
			'module-slorlist6-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-slorlist6-layout #mainpanel'									: { tabchange : me.mainTabChange  },
			'module-slorlist6-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-slorlist6-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-slorlist6-search')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-slorlist6-lister-master')[0] }
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

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

});
