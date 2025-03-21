Ext.define('module.user.meslog.store.MesLog', { extend:'Axt.data.Store',
	model: 'module.user.meslog.model.MesLog',
	pageSize: 100,
	proxy:{
		api:{
			 read	: _global.location.http() + "/user/meslog/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});