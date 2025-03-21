Ext.define('module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Detail2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Detail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodordr2/get/detail2.do",
			update: _global.api_host_info + "/system/custom/iypkg/prod/prodordr2/set/record.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});