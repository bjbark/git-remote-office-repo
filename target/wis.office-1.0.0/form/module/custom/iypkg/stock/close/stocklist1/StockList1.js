Ext.define('module.custom.iypkg.stock.close.stocklist1.StockList1', { extend:'Axt.app.Controller',
	requires:[
	],
	models	: [
		'module.custom.iypkg.stock.close.stocklist1.model.StockList1',
	],
	stores	: [
		'module.custom.iypkg.stock.close.stocklist1.store.StockList1',
	],
	views	: [
		'module.custom.iypkg.stock.close.stocklist1.view.StockList1Layout',
		'module.custom.iypkg.stock.close.stocklist1.view.StockList1Search',
		'module.custom.iypkg.stock.close.stocklist1.view.StockList1Lister',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-stocklist1-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			'module-stocklist1-lister button[action=exportAction]'	: { click : me.exportAction			},		// 엑셀
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-stocklist1-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-stocklist1-search') [0] },
		listermaster1			: function () { return Ext.ComponentQuery.query('module-stocklist1-lister') [0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex == 1){
			Ext.Msg.alert("알림","출고등록의 조회를 눌러주십시오.");
		}else{
			if(param.work_strt_dttm1>param.work_strt_dttm2) {
				Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				if ( tindex == 0 ) {
					master1.select({
						callback:function(records, operation, success) {
							if (success) {
								master1.getSelectionModel().select(0);
							} else { }
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id}));
				}
			}
		}
	},



	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
});