Ext.define('module.custom.hjsys.prod.worklistcvic.WorkListCvic', { extend:'Axt.app.Controller',

	requires : [
	],

	models:[
		'module.custom.hjsys.prod.worklistcvic.model.WorkListCvic',
	],

	stores:[
		'module.custom.hjsys.prod.worklistcvic.store.WorkListCvic',
	],
	views:[
		'module.custom.hjsys.prod.worklistcvic.view.WorkListCvicLayout',
		'module.custom.hjsys.prod.worklistcvic.view.WorkListCvicSearch',
		'module.custom.hjsys.prod.worklistcvic.view.WorkListCvicLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-worklistcvic-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-worklistcvic-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-worklistcvic-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-worklistcvic-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-worklistcvic-lister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister	= me.pocket.lister();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//엑셀
	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	}

});
