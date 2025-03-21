Ext.define('module.custom.inkopack.prod.pdodlist.PdodList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.custom.inkopack.prod.pdodlist.model.PdodListMaster',
		'module.custom.inkopack.prod.pdodlist.model.PdodListDetail'
	],
	stores	: [
		'module.custom.inkopack.prod.pdodlist.store.PdodListMaster',
		'module.custom.inkopack.prod.pdodlist.store.PdodListDetail'
	],
	views	: [
		'module.custom.inkopack.prod.pdodlist.view.PdodListLayout',
		'module.custom.inkopack.prod.pdodlist.view.PdodListSearch',
		'module.custom.inkopack.prod.pdodlist.view.PdodListListerMaster',
		'module.custom.inkopack.prod.pdodlist.view.PdodListListerDetail'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
//			'module-pdodlist-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
//			'module-pdodlist-lister-master' : {
//				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
//			},
//			'module-pdodlist-lister-detail' : {
//				itemdblclick : me.selectRecord		// 메뉴 선택시 이벤트
//			},

//			'module-pdodlist-layout #mainpanel'							: { tabchange : me.selectAction  }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function  () { return Ext.ComponentQuery.query('module-pdodlist-layout')[0] },
		search			: function  () { return Ext.ComponentQuery.query('module-pdodlist-search')[0] },
		listermaster	: function  () { return Ext.ComponentQuery.query('module-pdodlist-lister-master')[0] },
		listerdetail	: function  () { return Ext.ComponentQuery.query('module-pdodlist-lister-detail')[0] },
	},


	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});