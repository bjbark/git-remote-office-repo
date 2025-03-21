Ext.define('module.custom.iypkg.prod.prodordr.store.ProdOrdrWkctDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr.model.ProdOrdrWkct',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodordr/get/getWkct2.do",
			update: _global.api_host_info + "/system/custom/iypkg/prod/prodordr/set/write.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
