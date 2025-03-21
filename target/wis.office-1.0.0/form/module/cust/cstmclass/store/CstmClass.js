Ext.define('module.cust.cstmclass.store.CstmClass', { extend:'Axt.data.Store',

	model: 'module.cust.cstmclass.model.CstmClass',
	autoLoad: false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/cust/cstmclass/get/search.do",
			update	: _global.api_host_info + "/system/cust/cstmclass/set/record.do"
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
