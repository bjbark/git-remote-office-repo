Ext.define('module.mtrl.po.purctrstwork.store.PurcTrstWorkMaster', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purctrstwork.model.PurcTrstWorkMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/purctrstwork/get/search.do",
			update: _global.api_host_info + "/system/mtrl/po/purctrstwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
