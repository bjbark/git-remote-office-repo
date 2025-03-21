Ext.define('module.prod.order.workmonitering.WorkMonitering', { extend:'Axt.app.Controller',

	requires : [

	],
	models:[
		'module.prod.order.workmonitering.model.WorkMoniteringMaster'
	],
	stores:[
		'module.prod.order.workmonitering.store.WorkMoniteringMaster'
	],
	views: [
		'module.prod.order.workmonitering.view.WorkMoniteringLayout',
		'module.prod.order.workmonitering.view.WorkMoniteringSearch',
		'module.prod.order.workmonitering.view.WorkMoniteringListerMaster'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-workmonitering-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer master event
			'module-workmonitering-lister-master button[action=exportAction]' : { click : me.exportAction1},	// 엑셀
			// lister event
			'module-workmonitering-lister-master' : {
//				selectionchange: me.selectDetail	// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout 		 : function () { return Ext.ComponentQuery.query('module-workmonitering-layout')[0] },
		search 		 : function () { return Ext.ComponentQuery.query('module-workmonitering-search')[0] },
		listermaster : function () { return Ext.ComponentQuery.query('module-workmonitering-lister-master')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
				}
				else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//엑셀
	exportAction1 : function()  {
		this.pocket.listermaster().writer({enableLoadMask:true});
	}

});
