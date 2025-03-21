Ext.define('module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master1', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Master1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/prod/prodordr2/get/master1.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});