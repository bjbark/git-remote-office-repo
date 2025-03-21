Ext.define('module.custom.kortc.prod.order.prodnotlist.ProdNotList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
	],

	models:[
		'module.custom.kortc.prod.order.prodnotlist.model.ProdNotListLister',
	],
	stores:[
		'module.custom.kortc.prod.order.prodnotlist.store.ProdNotListLister',
	],
	views : [
		'module.custom.kortc.prod.order.prodnotlist.view.ProdNotListLayout',
		/* 현황 */
		'module.custom.kortc.prod.order.prodnotlist.view.ProdNotListSearch',
		'module.custom.kortc.prod.order.prodnotlist.view.ProdNotListWorkerSearch',
		'module.custom.kortc.prod.order.prodnotlist.view.ProdNotListLister',
		/* 작업 */
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
//		this.joinPermission(workspace.down('module-porderlist2-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-porderlist2-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-prodnotlist-lister button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({

			'module-prodnotlist-layout button[action=selectAction]'			: { click : me.selectAction		}, /* 조회		*/

			'module-prodnotlist-editor button[action=cancelAction]' 		: { click : me.cancelAction 	},	// 취소

			'module-prodnotlist-lister button[action=exportAction]'			: { click : me.exportDetailAction}, /* 엑셀		*/
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-prodnotlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prodnotlist-search')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-prodnotlist-lister')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-prodnotlist-copy-popup')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-prodnotlist-editor')[0] },
		worker : function () { return Ext.ComponentQuery.query('module-prodnotlist-worker-search')[0] },

	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			worker = me.pocket.worker(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		invc1_date  = param.invc1_date;
		invc2_date  = param.invc2_date;


		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);}
//				else { me.pocket.editor().getForm().reset(true);
//				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/kortc/prod/order/prodnotlist/get/search2.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc1_date		: invc1_date,
					invc2_date		: invc2_date,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					console.log()
					worker.down('[name=count]').setValue(result.records[0].count);
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},


	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});

	}
});
