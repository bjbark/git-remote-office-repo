Ext.define('module.test.testusermast.store.TestUserMast', { extend:'Axt.data.Store',

	model :'module.test.testusermast.model.TestUserMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/basemast/get/search.do",
			update : _global.api_host_info + "/system/basic/basemast/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});