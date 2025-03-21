Ext.define('module.custom.iypkg.prod.prodordr.store.ProdOrdrDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr.model.ProdOrdr',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodordr/get/detail3.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
