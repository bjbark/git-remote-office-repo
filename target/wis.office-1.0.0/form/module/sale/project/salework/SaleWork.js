Ext.define('module.sale.project.salework.SaleWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.upload.BoardUpload',
		'module.sale.project.salework.view.ModlPopup',
		'module.sale.project.salework.view.SaleWorkPjodPopup'
	],

	models	: [
		'module.sale.project.salework.model.SaleWorkMaster',
		'module.sale.project.salework.model.SaleWorkDetail',
		'module.sale.project.salework.model.SaleWorkListerPopup'
	],
	stores	: [
		'module.sale.project.salework.store.SaleWorkMaster',
		'module.sale.project.salework.store.SaleWorkDetail',
		'module.sale.project.salework.store.SaleWorkListerPopup'
	],
	views	: [
		'module.sale.project.salework.view.SaleWorkLayout',
		'module.sale.project.salework.view.SaleWorkSearch',
		'module.sale.project.salework.view.SaleWorkListerMaster',
		'module.sale.project.salework.view.SaleWorkListerDetail',
		'module.sale.project.salework.view.SaleWorkListerPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-salework-layout button[action=selectAction]'				: { click : me.selectAction },		// 조회

			'module-salework-lister-master button[action=exportAction]'			: { click : me.exportAction },		// 엑셀
			'module-salework-lister-master button[action=deleteAction]'			: { click : me.deleteAction },		// 삭제
			'module-salework-lister-master button[action=modifyAction]'			: { click : me.modifyAction },		// 세금계산서
			// lister detail2 event
			'module-salework-lister-detail1 button[action=exportAction]'		: { click : me.exportAction1 },		// 엑셀
//			'module-salework-lister-detail1 button[action=deleteAction]'		: { click : me.deleteAction1 },		// 삭제
			// lister master event
			'module-salework-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-salework-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-salework-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-salework-lister-master')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-salework-lister-detail')[0] },
		listerpopup		: function () { return Ext.ComponentQuery.query('module-salework-lister-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster.select({
			callback:function(records, operation, success) {
			if (success) {
				listermaster.getSelectionModel().select(0);
				mask.hide();
			} else { me.pocket.editor().getForm().reset(true);}

			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectDetail:function( grid, record ){
		var me = this,
			listermaster  = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			record        = listermaster.getSelectionModel().getSelection()[0]
		;
		if(record){
			listerdetail.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},

	deleteAction:function( ){
		var me				= this,
			listermaster	= me.pocket.listermaster(),
			listerdetail	= me.pocket.listerdetail(),
			record			= listermaster.getSelectionModel().getSelection()[0]
		;
		console.log(record);
		if(record){
			Ext.Msg.confirm('확인','삭제 하시겠습니까?',  function(button) {
				if (button === 'yes'){
					Ext.Ajax.request({
						url		: _global.location.http() + '/sale/project/salework/set/delete.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id	: _global.stor_id,
								invc_numb: record.get('invc_numb')
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
								listermaster.getStore().reload();
								listerdetail.getStore().clearData();
								listerdetail.getStore().loadData([],false);
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		}
	},
	selectRecord:function( grid, record ){
		var me = this
		;
	},


	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
});