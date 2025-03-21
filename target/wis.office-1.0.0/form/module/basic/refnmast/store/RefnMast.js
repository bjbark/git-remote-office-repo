Ext.define('module.basic.refnmast.store.RefnMast', { extend:'Axt.data.Store',

	model :'module.basic.refnmast.model.RefnMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/refnmast/get/search.do",
			update : _global.api_host_info + "/system/basic/refnmast/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});