Ext.define( 'module.custom.sjflv.mtrl.po.purcordrndqt.PurcOrdrNdqt', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopupSjung',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV4',
	],
	models: [
		'module.custom.sjflv.mtrl.po.purcordrndqt.model.PurcOrdrNdqtLister1',
	],
	stores: [
		'module.custom.sjflv.mtrl.po.purcordrndqt.store.PurcOrdrNdqtLister1',
		'module.custom.sjflv.mtrl.po.purcordrndqt.store.PurcOrdrNdqtLister2',
	],
	views : [
		'module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtLayout',
		'module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtLister1',
		'module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtLister2',
		'module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtSearch'
	],
	initPermission: function(workspace, permission) {

	},
	init: function() {
		var me = this;
		me.control({


			'module-sjflv-purcordrndqt-lister1 button[action=cancelAction]'		: { click : me.cancelAction      }, // 초기화
			'module-sjflv-purcordrndqt-lister1 button[action=selectAction]'		: { click : me.selectAction      }, // 계산

			'module-sjflv-purcordrndqt-lister2 button[action=exportAction]'		: { click : me.exportAction      }, // 엑셀
			// lister event

		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-sjflv-purcordrndqt-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-sjflv-purcordrndqt-search')[0] } ,
		lister1 : function () { return Ext.ComponentQuery.query('module-sjflv-purcordrndqt-lister1')[0] } ,
		lister2 : function () { return Ext.ComponentQuery.query('module-sjflv-purcordrndqt-lister2')[0] } ,
	},

	/**
	 * 조회
	 */

	cancelAction:function( grid, records ){
		var me = this,
			lister = me.pocket.lister1()
			lister2 = me.pocket.lister2()
		;

		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);
	},

	/**
	 * 계산
	 */
	selectAction:function(grid, record) {
		var me        = this,
			lister   = me.pocket.lister1(),
			lister2   = me.pocket.lister2(),
			record	= lister.getSelectionModel().getSelection(),
			records	= lister.getSelectionModel().getSelection(),
			param	=''
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);


			var a =[];
			var msg = "";
			lister.getStore().each(function(record){

				if(record.get('item_idcd') == '' || record.get('mixx_qntt') == ''){
					msg = "품목 또는 수량을 확인해주세요.";

				}else{
					a.push({item_idcd : record.get('item_idcd'), revs_numb : record.get('revs_numb'), mixx_qntt : record.get('mixx_qntt'), loss_rate : record.get('loss_rate')});

				}

			})

			if(msg != ""){
				Ext.Msg.alert('알림',msg);
				return;
			}

			param = JSON.stringify({
					records		: a
				});

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope:me
				}, Ext.merge( {records:a}) );
//
//				Ext.Ajax.request({
//					url		: _global.location.http() + '/custom/sjflv/mtrl/po/purcordrndqt/set/record.do',
//					method		: "POST",
//					params		: {
//						token	: _global.token_id,
//						param	: Ext.encode({
//							records		: a
//						})
//					},
//					async	: false,
//					method	: 'POST',
//					success	: function(response, request) {
//						var result = Ext.decode(response.responseText);
//						if	(!result.success ){
//							Ext.Msg.error(result.message );
//							return;
//						}else{
//							Ext.each(result.records,function(record){
//								if(record.item_code){
//									lister2.getStore().add(record);
//								}
//							})
//						}
//					},
//					failure : function(result, request) {
//					},
//					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//					}
//				});
			},

	exportAction : function(){
		var me = this;
		me.pocket.lister2().excelExport();

	}
});
