Ext.define('module.custom.iypkg.prod.worklist3.WorkList3', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.IypkgOrdrPopup',
	],
	models	: [
		'module.custom.iypkg.prod.worklist3.model.WorkList3',
	],
	stores	: [
		'module.custom.iypkg.prod.worklist3.store.WorkList3',
	],
	views	: [
		'module.custom.iypkg.prod.worklist3.view.WorkList3Layout',
		'module.custom.iypkg.prod.worklist3.view.WorkList3Lister',
		'module.custom.iypkg.prod.worklist3.view.WorkList3Lister2',
		'module.custom.iypkg.prod.worklist3.view.WorkList3Search',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-worklist3-layout button[action=selectAction]'	: { click : me.selectAction },
			'module-worklist3-layout #mainpanel'					: { tabchange : me.selectAction },

			'module-worklist3-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-worklist3-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-worklist3-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-worklist3-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==0){
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else if(tindex==1){
		}
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

