Ext.define('module.stock.isos.mtrlisttwork.store.MtrlIsttWorkDetail2', { extend:'Axt.data.Store',
	model: 'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/stock/isos/mtrlisttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
