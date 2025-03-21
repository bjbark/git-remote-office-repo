Ext.define('module.stock.isos.mtrlisttwork.store.MtrlIsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/stock/isos/mtrlisttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
