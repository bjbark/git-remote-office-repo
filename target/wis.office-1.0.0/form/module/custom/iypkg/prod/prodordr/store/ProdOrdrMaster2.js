Ext.define('module.custom.iypkg.prod.prodordr.store.ProdOrdrMaster2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr.model.ProdOrdr',
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodordr/get/master2.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
