Ext.define('module.mtrl.project.prjtpurcorderlist.PrjtPurcOrderList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.mtrl.project.prjtpurcorderlist.model.PrjtPurcOrderList',
	],
	stores	: [
		'module.mtrl.project.prjtpurcorderlist.store.PrjtPurcOrderListMaster',
		'module.mtrl.project.prjtpurcorderlist.store.PrjtPurcOrderListDetail',
	],
	views	: [
		'module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListLayout',
		'module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListMaster',
		'module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListDetail',
		'module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtpurcorderlist-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			'module-prjtpurcorderlist-master button[action=exportAction]'		: { click : me.exportAction	},		// 엑셀

			'module-prjtpurcorderlist-master' : {
				itemdblclick    : me.selectDetail,
			}
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist-search') [0] },
		master		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist-master')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-prjtpurcorderlist-detail')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			master  = me.pocket.master(),
			search  = me.pocket.search(),
			param   = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		master.select({
			callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	selectDetail : function(record){
		var me = this,
			detail = me.pocket.detail(),
			select = me.pocket.master().getSelectionModel().getSelection()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
		if(select.length != 0){
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, invc_numb : select[0].data.invc_numb}) );
		}else{
			Ext.Msg.alert("알림", "조회할 입고번호를 선택하여 주십시오.");
			return;
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.master().writer({enableLoadMask:true});
	},
});