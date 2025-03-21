Ext.define('module.custom.dehansol.prod.workbook.WorkBook', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.WkctCvicPopup'
	],

	models:['module.custom.dehansol.prod.workbook.model.WorkBook',],
	stores:['module.custom.dehansol.prod.workbook.store.WorkBook',],
	views:
	[
		'module.custom.dehansol.prod.workbook.view.WorkBookLayout',
		'module.custom.dehansol.prod.workbook.view.WorkBookSearch',
		'module.custom.dehansol.prod.workbook.view.WorkBookPopup',
		'module.custom.dehansol.prod.workbook.view.WorkBookLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-dehansol-workbook-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-dehansol-workbook-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-dehansol-workbook-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-dehansol-workbook-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-dehansol-workbook-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-dehansol-workbook-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-dehansol-workbook-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-dehansol-workbook-lister button[action=PrintAction]' : { click : me.printAction },	// 삭제
			// lister event
			'module-dehansol-workbook-lister' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-dehansol-workbook-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-dehansol-workbook-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-dehansol-workbook-lister')[0] }
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

	printAction:function() {
		var me = this
		resource.loadPopup({
		widget : 'module-workbook-popup',
		});
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
