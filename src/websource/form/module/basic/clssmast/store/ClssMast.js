Ext.define('module.basic.clssmast.store.ClssMast', { extend:'Axt.data.Store',

	model: 'module.basic.clssmast.model.ClssMast',
	autoLoad: false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/basic/clssmast/get/search.do",
			update	: _global.api_host_info + "/system/basic/clssmast/set/record.do"
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
