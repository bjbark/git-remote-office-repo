Ext.define('module.stock.lot.lotisttosttlist.LotIsttOsttList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup'
	],

	models:['module.stock.lot.lotisttosttlist.model.LotIsttOsttList',],
	stores:['module.stock.lot.lotisttosttlist.store.LotIsttOsttList',],
	views:
	[
		'module.stock.lot.lotisttosttlist.view.LotIsttOsttListLayout',
		'module.stock.lot.lotisttosttlist.view.LotIsttOsttListSearch',
		'module.stock.lot.lotisttosttlist.view.LotIsttOsttListLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-lotisttosttlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-lotisttosttlist-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-lotisttosttlist-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-lotisttosttlist-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-lotisttosttlist-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-lotisttosttlist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-lotisttosttlist-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-lotisttosttlist-lister' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-lotisttosttlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-lotisttosttlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-lotisttosttlist-lister')[0] }
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
			}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}) );
		},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
