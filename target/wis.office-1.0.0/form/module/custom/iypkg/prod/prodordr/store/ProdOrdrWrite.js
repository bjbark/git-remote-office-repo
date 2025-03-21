Ext.define('module.custom.iypkg.prod.prodordr.store.ProdOrdrWrite', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr.model.ProdOrdrWrite',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodordr/get/write.do",
		},
		actionMethods: { read : 'POST' , update : 'POST' , max : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});