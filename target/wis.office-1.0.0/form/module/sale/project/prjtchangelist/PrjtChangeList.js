Ext.define('module.sale.project.prjtchangelist.PrjtChangeList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.sale.project.prjtchangelist.model.PrjtChangeList'
	],
	stores	: [
		'module.sale.project.prjtchangelist.store.PrjtChangeList'
	],
	views	: [
		'module.sale.project.prjtchangelist.view.PrjtChangeListLayout',
		'module.sale.project.prjtchangelist.view.PrjtChangeListSearch',
		'module.sale.project.prjtchangelist.view.PrjtChangeListLister',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtchangelist-layout button[action=selectAction]'         : { click : me.selectAction },	// 조회
			// layout event
			'module-prjtchangelist-lister button[action=exportAction]'         : { click : me.exportAction },	// 엑셀

			'module-prjtchangelist-layout #mainpanel' : {
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-prjtchangelist-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-prjtchangelist-search')[0] },
		lister			: function () { return Ext.ComponentQuery.query('module-prjtchangelist-lister')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(param.regi_date1>param.regi_date2 || param.deli_date1>param.deli_date2){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister = me.pocket.lister();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});