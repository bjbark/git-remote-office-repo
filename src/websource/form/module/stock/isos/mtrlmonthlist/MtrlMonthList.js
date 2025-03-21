Ext.define('module.stock.isos.mtrlmonthlist.MtrlMonthList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.stock.isos.mtrlmonthlist.model.MtrlMonthList'
	],
	stores	: [
		'module.stock.isos.mtrlmonthlist.store.MtrlMonthList'
	],
	views	: [
		'module.stock.isos.mtrlmonthlist.view.MtrlMonthListLayout',
		'module.stock.isos.mtrlmonthlist.view.MtrlMonthListLister',
		'module.stock.isos.mtrlmonthlist.view.MtrlMonthListSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-mtrlmonthlist-layout button[action=selectAction]' : { click : me.selectAction },		// 조회
			// lister event
			'module-mtrlmonthlist-lister button[action=exportAction]' : { click : me.exportAction },		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-mtrlmonthlist-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-mtrlmonthlist-search') [0] },
		lister	: function () { return Ext.ComponentQuery.query('module-mtrlmonthlist-lister') [0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues()
		
		if(param.find_date == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
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
		this.pocket.lister().writer({enableLoadMask:true});
	}
});