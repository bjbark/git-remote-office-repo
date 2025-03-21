Ext.define('module.custom.iypkg.prod.workentry2.store.WorkEntry2Detail', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry2.model.WorkEntry2Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/prod/workentry2/get/detail1.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});