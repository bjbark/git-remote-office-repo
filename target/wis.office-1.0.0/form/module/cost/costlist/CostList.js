Ext.define('module.cost.costlist.CostList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkctCvicPopup'
	],

	models:['module.cost.costlist.model.CostList',],
	stores:['module.cost.costlist.store.CostList',],
	views:
	[
		'module.cost.costlist.view.CostListLayout',
		'module.cost.costlist.view.CostListSearch',
		'module.cost.costlist.view.CostListLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-costlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-costlist-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-costlist-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-costlist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-costlist-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-costlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-costlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-costlist-lister')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(param.invc1_date>param.invc2_date){
			Ext.Msg.alert("알림","생산기간을 다시 입력해주십시오.");
		}else{
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
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
