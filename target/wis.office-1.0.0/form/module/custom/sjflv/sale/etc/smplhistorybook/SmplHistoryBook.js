Ext.define( 'module.custom.sjflv.sale.etc.smplhistorybook.SmplHistoryBook', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmPopup',
	],
	models: [
		'module.custom.sjflv.sale.etc.smplhistorybook.model.SmplHistoryBook1',
		'module.custom.sjflv.sale.etc.smplhistorybook.model.SmplHistoryBook2',
		'module.custom.sjflv.sale.etc.smplhistorybook.model.SmplHistoryBook3',
	],
	stores: [
		'module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook1',
		'module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook2',
		'module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook3',
	],
	views : [
		'module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBookLayout',
		'module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBook1',
		'module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBook2',
		'module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBook3',
		'module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBookSearch',
	],
	initPermission: function(workspace, permission) {

	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sjflv-sale-etc-smplhistorybook-search button[action=selectAction]'			: { click : me.selectAction }, // 조회
			// lister event
			'module-sjflv-sale-etc-smplhistorybook-lister2 button[action=revInsertAction]'		: { click : me.revAction }, // 신규
			'module-sjflv-sale-etc-smplhistorybook-lister2 button[action=revDeleteAction]'		: { click : me.revAction }, // 삭제

			'module-sjflv-sale-etc-smplhistorybook-lister3 button[action=updateAction]'			: { click : me.updateAction      }, // 저장
			'module-sjflv-sale-etc-smplhistorybook-lister3 button[action=exportAction]'			: { click : me.treeExportAction  }, // 엑셀

			// lister event
			'module-sjflv-sale-etc-smplhistorybook-lister1' : {
				itemclick      : me.selectAction1
			},
			'module-sjflv-sale-etc-smplhistorybook-lister2' : {
				itemclick      : me.selectAction2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-sjflv-sale-etc-smplhistorybook-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-sjflv-sale-etc-smplhistorybook-search')[0] } ,
		lister1 : function () { return Ext.ComponentQuery.query('module-sjflv-sale-etc-smplhistorybook-lister1')[0] } ,
		lister2 : function () { return Ext.ComponentQuery.query('module-sjflv-sale-etc-smplhistorybook-lister2')[0] } ,
		lister3 : function () { return Ext.ComponentQuery.query('module-sjflv-sale-etc-smplhistorybook-lister3')[0] } ,
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister  = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var err_msg = "";

		switch (tindex) {
		case 0:
			lister2.getStore().clearData();
			lister2.getStore().removeAll();
			lister3.getStore().clearData();
			lister3.getRootNode().removeAll();

			if(param.cstm_idcd && param.cstm_idcd.trim() != ''){
				resource.mask.show({msg: Const.SELECT.mask });

				lister.select({
					callback:function(records, operation, success) {
						resource.mask.hide();
					}, scope:me
				},Ext.merge( me.pocket.search().getValues(), {
					hq_id  : _global.hq_id,
				}));
			}else{
				Ext.Msg.alert("알림", "거래처를 선택해주세요.");
			}
			break;
		default:
			break;
		}
	},

	/**
	 *
	 */
	selectAction1:function( grid, record, item, index, e ){
		var me = this,
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3()
		;
		lister3.getStore().clearData();
		lister3.getRootNode().removeAll();

		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister2.select({
				callback:function(records, operation, success) {
					resource.mask.hide();
				}, scope:me
			},Ext.merge( me.pocket.search().getValues(), {
				hq_id		: _global.hq_id,
				item_idcd	: record.get('item_idcd') ,
			}));
		}
	},

	/**
	 *
	 */
	selectAction2:function( grid, record, item, index, e ){
		var me = this,
			lister = me.pocket.lister3()
		;
		if (record ){
			resource.mask.show({msg: Const.SELECT.mask });
			lister.getStore().load({
				params:{
					param:JSON.stringify({
						invc_numb : record.data.invc_numb
					})
				}, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						lister.getRootNode().expand();

						lister.getSelectionModel().select(0);
					} else {
					}
					resource.mask.hide();
				}
			});
		}
	},
});
