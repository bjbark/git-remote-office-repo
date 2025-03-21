Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.OsttWaitList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.stock.isos.osttwaitlist.model.OsttWaitList',
	],
	stores:[
		'module.custom.iypkg.stock.isos.osttwaitlist.store.OsttWaitListLister',
		'module.custom.iypkg.stock.isos.osttwaitlist.store.OsttWaitListLister2',
	],
	views : [
		'module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListLayout',
		'module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListSearch',
		'module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListLister',
		'module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListLister2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-osttwaitlist-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-osttwaitlist-layout #mainpanel'										: { tabchange : me.selectAction   },

			'module-osttwaitlist-lister  button[action=exportAction]'					: { click : me.exportAction       }, /* 엑셀1 */
			'module-osttwaitlist-lister2 button[action=exportAction]'					: { click : me.exportAction2      }, /* 엑셀2 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-osttwaitlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-osttwaitlist-search')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-osttwaitlist-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-osttwaitlist-lister2')[0] }
	},

	selectAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
			if(tindex == 0){
				lister = lister1;
			}
			else if(tindex == 1){
				lister = lister2;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						console.log('asdgasdgasg');
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

	},

	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportAction2 : function(self) {
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});
