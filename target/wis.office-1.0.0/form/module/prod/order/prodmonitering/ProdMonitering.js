Ext.define('module.prod.order.prodmonitering.ProdMonitering', { extend:'Axt.app.Controller',

	requires : [

	],
	models:[
		'module.prod.order.prodmonitering.model.ProdMoniteringMaster'
	],
	stores:[
		'module.prod.order.prodmonitering.store.ProdMoniteringMaster'
	],
	views: [
		'module.prod.order.prodmonitering.view.ProdMoniteringLayout',
		'module.prod.order.prodmonitering.view.ProdMoniteringSearch',
		'module.prod.order.prodmonitering.view.ProdMoniteringListerMaster'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodmonitering-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer master event
			'module-prodmonitering-lister-master button[action=exportAction]' : { click : me.exportAction1},	// 엑셀
			// lister event
			'module-prodmonitering-lister-master' : {
//				selectionchange: me.selectDetail	// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout 		 : function () { return Ext.ComponentQuery.query('module-prodmonitering-layout')[0] },
		search 		 : function () { return Ext.ComponentQuery.query('module-prodmonitering-search')[0] },
		listermaster : function () { return Ext.ComponentQuery.query('module-prodmonitering-lister-master')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
				}
				else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//엑셀
	exportAction1 : function()  {
		this.pocket.listermaster().writer({enableLoadMask:true});
	}

});
