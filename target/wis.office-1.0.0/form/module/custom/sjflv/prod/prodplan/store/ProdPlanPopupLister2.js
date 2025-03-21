Ext.define('module.custom.sjflv.prod.prodplan.store.ProdPlanPopupLister2', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodplan.model.ProdPlanPopupLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			update	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/set/prodplan2.do"
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
