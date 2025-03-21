Ext.define('module.custom.iypkg.sale.sale.salesumlist.SaleSumList', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.sale.sale.salesumlist.model.SaleSumList',
	],
	stores:[
		'module.custom.iypkg.sale.sale.salesumlist.store.SaleSumList',
	],
	views : [
		'module.custom.iypkg.sale.sale.salesumlist.view.SaleSumListLayout',
		'module.custom.iypkg.sale.sale.salesumlist.view.SaleSumListSearch',
		'module.custom.iypkg.sale.sale.salesumlist.view.SaleSumListLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-salesumlist-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-salesumlist-lister button[action=exportAction]'					: { click : me.exportAction       }, /* 엑셀 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-salesumlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salesumlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salesumlist-lister')[0] },
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			dvcd
		;

		if(param.ck1 == null && param.ck2 == null && param.ck3== null ){
			Ext.Msg.alert("알림","구분을 선택해주십시오.");
			return;
		}

		if(param.ck1 == 1){				// 명세서 기준
			dvcd = 1
		}else if(param.ck2 == 1){		// 청구서 기준
			dvcd = 2
		}else if(param.ck3 == 1){		// 계산서 기준
			dvcd = 3
		}

		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					console.log(records);
				} else {}
//				mask.hide();
			}, scope:me
		}, Ext.merge(param, { stor_grp : _global.stor_grp, dvcd : dvcd }));

	},


	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},

});
