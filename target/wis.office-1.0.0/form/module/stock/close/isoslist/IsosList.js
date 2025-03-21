Ext.define('module.stock.close.isoslist.IsosList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.stock.close.isoslist.model.IsosList'
	],
	stores	: [
		'module.stock.close.isoslist.store.IsosList',
		'module.stock.close.isoslist.store.IsosList2',
	],
	views	: [
		'module.stock.close.isoslist.view.IsosListLayout',
		'module.stock.close.isoslist.view.IsosListLister',
		'module.stock.close.isoslist.view.IsosListSearch',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init : function() {
		var me = this;
		me.control({
//			// layout event
			'module-isoslist-layout button[action=selectAction]' : { click : me.selectAction },		// 조회
			// lister event
			'module-isoslist-lister button[action=exportAction]' : { click : me.exportAction },		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-isoslist-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-isoslist-search') [0] },
		lister	: function () { return Ext.ComponentQuery.query('module-isoslist-lister') [0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(param.fr_date == ''|| param.to_date == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}else if(param.fr_date > param.to_date) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().excelExport();
	},
});