Ext.define('module.custom.sjflv.mtrl.imp.orderlist.OrderList', { extend:'Axt.app.Controller',

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
		'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListMaster',
		'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListDetail',
		'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListMaster2',
		'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListListerPopup'
	],
	stores	: [
		'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListMaster',
		'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListDetail',
		'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListMaster2',
		'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListListerPopup'
	],
	views	: [
		'module.custom.sjflv.mtrl.imp.orderlist.view.OrderListLayout',
		'module.custom.sjflv.mtrl.imp.orderlist.view.OrderListSearch',
		'module.custom.sjflv.mtrl.imp.orderlist.view.OrderListMaster',
		'module.custom.sjflv.mtrl.imp.orderlist.view.OrderListMaster2',
		'module.custom.sjflv.mtrl.imp.orderlist.view.OrderListDetail'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
	    var me = this;
	    me.control({
	        'module-orderlist-layout button[action=selectAction]': { click: me.selectAction },
	        'module-orderlist-lister-master button[action=exportAction]': { click: me.exportAction },
	        'module-orderlist-lister-master button[action=deleteAction]': { click: me.deleteAction },
	        'module-orderlist-master': {
	            itemdblclick: me.selectDetail,
	            selectionchange: me.selectRecord
	        }
		});
		me.callParent(arguments);
	},

	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-orderlist-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-orderlist-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-orderlist-master')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-orderlist-detail')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-orderlist-master2')[0] },
		listerpopup		: function () { return Ext.ComponentQuery.query('module-orderlist-lister-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster  = me.pocket.listermaster(),
			listerdetail  = me.pocket.listerdetail(),
			listermaster2 = me.pocket.listermaster2(),
			search        = me.pocket.search(),
			param         = search.getValues(),
			tpanel        = me.pocket.layout().down('#mainpanel'),
			tindex        = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(tindex==0){
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
						mask.hide();
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			listermaster2.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
						mask.hide();
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectDetail:function( grid, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster()
		;

		if(record){
			listerdetail.select({
				callback:function(records, operation, success) {
				if (success) {
					listerdetail.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id,invc_numb : record.get('ordr_numb')}) );
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