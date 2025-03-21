Ext.define('module.custom.iypkg.etc.trsfwork.store.TrsfWorkWorkerLister1', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.etc.trsfwork.model.TrsfWorkWorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/etc/trsfwork/get/search2.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
