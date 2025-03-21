Ext.define('module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Master2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodordr2/get/master2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});