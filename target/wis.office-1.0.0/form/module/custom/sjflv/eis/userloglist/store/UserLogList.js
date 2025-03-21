Ext.define('module.custom.sjflv.eis.userloglist.store.UserLogList', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.eis.userloglist.model.UserLogList',
	pageSize: 100,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/sjflv/eis/userloglist/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});