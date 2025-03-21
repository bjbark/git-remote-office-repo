Ext.define('module.cust.cstmprice.store.CstmPriceWorkerSearch', { extend:'Axt.data.Store',
	model: 'module.cust.cstmprice.model.CstmPriceWorkerSearch',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/cust/cstmprice/get/itempric.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
