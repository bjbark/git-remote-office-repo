Ext.define('module.custom.iypkg.sale.sale.salecolt.SaleColt', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.custom.iypkg.sale.sale.salecolt.model.SaleColtMaster',
		'module.custom.iypkg.sale.sale.salecolt.model.SaleColtDetail',
		'module.custom.iypkg.sale.sale.salecolt.model.SaleColtDetail2',
		'module.custom.iypkg.sale.sale.salecolt.model.SaleColtListerPopup'
	],
	stores	: [
		'module.custom.iypkg.sale.sale.salecolt.store.SaleColtMaster',
		'module.custom.iypkg.sale.sale.salecolt.store.SaleColtDetail',
		'module.custom.iypkg.sale.sale.salecolt.store.SaleColtDetail2',
		'module.custom.iypkg.sale.sale.salecolt.store.SaleColtListerPopup'
	],
	views	: [
		'module.custom.iypkg.sale.sale.salecolt.view.SaleColtLayout',
		'module.custom.iypkg.sale.sale.salecolt.view.SaleColtSearch',
		'module.custom.iypkg.sale.sale.salecolt.view.SaleColtListerMaster',
		'module.custom.iypkg.sale.sale.salecolt.view.SaleColtDetail',
		'module.custom.iypkg.sale.sale.salecolt.view.SaleColtDetail2',
		'module.custom.iypkg.sale.sale.salecolt.view.SaleColtListerPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-iypkg-salecolt-layout button[action=selectAction]'				: { click : me.selectAction },		// 조회

			'module-iypkg-salecolt-lister-master button[action=exportAction]'			: { click : me.exportAction },		// 엑셀
			'module-iypkg-salecolt-lister-master button[action=deleteAction]'			: { click : me.deleteAction },		// 삭제
//			'module-iypkg-salecolt-lister-master button[action=iteminfo]'				: { click : me.iteminfo },		// 세금계산서
			// lister detail2 event
			// lister master event
			'module-iypkg-salecolt-detail' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-iypkg-salecolt-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-iypkg-salecolt-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-iypkg-salecolt-lister-master')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-iypkg-salecolt-detail')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-iypkg-salecolt-detail2')[0] },
		listerpopup		: function () { return Ext.ComponentQuery.query('module-iypkg-salecolt-lister-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		console.log(param);
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
					mask.hide();
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
		listerdetail.select({
			callback:function(records, operation, success) {
			if (success) {
				listerdetail.getSelectionModel().select(0);
				mask.hide();
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	//선택
	selectDetail:function( grid, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listerdetail2 = me.pocket.listerdetail2()
		;
		if(record){
			listerdetail2.select({
				callback:function(records, operation, success) {
				if (success) {
					listerdetail2.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id,invc_numb : record.get('invc_numb')}) );
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