Ext.define('module.custom.wontc.prod.order.workbook.WorkBook', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'module.common.view.project.ProjectPayLister',
		'module.common.view.project.ProjectPaySearch',
		'module.common.view.project.ProjectFinder'
	],

	models	: [
		'module.custom.wontc.prod.order.workbook.model.WorkBookLister',
	],
	stores	: [
		'module.custom.wontc.prod.order.workbook.store.WorkBookLister',
	],
	views	: [
		'module.custom.wontc.prod.order.workbook.view.WorkBookLayout',
		'module.custom.wontc.prod.order.workbook.view.WorkBookSearch',
		'module.custom.wontc.prod.order.workbook.view.WorkBookLister',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-workbook-layout button[action=selectAction]'			: { click : me.selectAction  },	// 조회
			'module-workbook-lister button[action=exportAction]'			: { click : me.exportAction  },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-workbook-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-workbook-search')[0] },
		lister		: function () { return Ext.ComponentQuery.query('module-workbook-lister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},


	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},
});