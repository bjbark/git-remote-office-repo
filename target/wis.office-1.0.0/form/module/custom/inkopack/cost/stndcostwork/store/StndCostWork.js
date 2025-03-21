Ext.define('module.custom.inkopack.cost.stndcostwork.store.StndCostWork', { extend:'Axt.data.Store',

	model :'module.custom.inkopack.cost.stndcostwork.model.StndCostWork',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/incopack/cost/stndcostwork/get/search.do",
			update : _global.api_host_info + "/system/custom/incopack/cost/stndcostwork/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});