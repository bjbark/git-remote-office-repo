Ext.define('module.custom.iypkg.prod.workentry2.store.WorkEntry2DetailFabc', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry2.model.WorkEntry2DetailFabc',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/prod/workentry2/get/detailfabc.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});