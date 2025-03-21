Ext.define('module.custom.sjflv.prod.prodplan.store.ProdPlanLister1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodplan.model.ProdPlanLister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	groupField: 'item_code',
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/get/search1.do",
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
