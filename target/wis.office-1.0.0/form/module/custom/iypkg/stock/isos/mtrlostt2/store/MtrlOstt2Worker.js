Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.store.MtrlOstt2Worker', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.mtrlostt2.model.MtrlOstt2Worker',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/mtrlostt2/get/search2.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/mtrlostt2/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
