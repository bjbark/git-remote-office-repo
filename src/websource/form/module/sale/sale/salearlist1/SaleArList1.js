Ext.define('module.sale.sale.salearlist1.SaleArList1', { extend:'Axt.app.Controller',

	requires:[
			'lookup.popup.view.BzplPopup',
			'lookup.popup.view.ItemPopup',
			'lookup.popup.view.UserPopup'

		],

	models	: ['module.sale.sale.salearlist1.model.SaleArList1'],
	stores	: ['module.sale.sale.salearlist1.store.SaleArList1'],
	views	: [
		'module.sale.sale.salearlist1.view.SaleArList1Layout',
		'module.sale.sale.salearlist1.view.SaleArList1Search',
		'module.sale.sale.salearlist1.view.SaleArList1Lister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-salearlist1-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-salearlist1-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-salearlist1-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salearlist1-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-salearlist1-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salearlist1-lister')[0] }
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
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});