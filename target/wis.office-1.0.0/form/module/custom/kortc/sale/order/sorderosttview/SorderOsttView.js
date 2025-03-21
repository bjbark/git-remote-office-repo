Ext.define('module.custom.kortc.sale.order.sorderosttview.SorderOsttView', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
	],

	models:[
		'module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster1',
		'module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster2',
		'module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster3',
	],
	stores:[
		'module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster1',
		'module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster2',
		'module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster3',
	],
	views : [
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewLayout',
		/* 현황 */
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewSearch',
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster1',
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster1_1',
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster2',
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster2_1',
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster3',
		'module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster3_1',
		/* 작업 */
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sorderosttview-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-sorderosttview-layout #mainpanel'							: { tabchange : me.selectAction },
			'module-sorderosttview-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			'module-sorderosttview-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-sorderosttview-lister-master3 button[action=exportAction]'	: { click : me.exportAction3 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sorderosttview-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sorderosttview-search')[0] },
		master1  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master1')[0] },
		master2  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master2')[0] },
		master3  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master3')[0] },
	},



	selectAction:function(callbackFn) {
		var me = this,
			master1 = me.pocket.master1(),
			master2 = me.pocket.master2(),
			master3 = me.pocket.master3(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(param.invc1_date==''||param.invc1_date==''){
			Ext.Msg.alert("알림", "기간을 입력해주십시오.");
		}else if(param.invc1_date > param.invc1_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			if(tindex == 0){
				lister = master1;
			}else if(tindex == 1){
				lister = master2;
			}else if(tindex == 2){
				lister = master3;
			}
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
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.master3().writer({enableLoadMask:true});
	}
});