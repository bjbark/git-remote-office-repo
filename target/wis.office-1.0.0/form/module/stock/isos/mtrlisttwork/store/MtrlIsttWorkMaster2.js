Ext.define('module.stock.isos.mtrlisttwork.store.MtrlIsttWorkMaster2', { extend:'Axt.data.Store',
	model: 'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkMaster2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/stock/isos/mtrlisttwork/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
