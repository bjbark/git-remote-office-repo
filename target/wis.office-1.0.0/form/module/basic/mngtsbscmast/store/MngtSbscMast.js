Ext.define('module.basic.mngtsbscmast.store.MngtSbscMast', { extend:'Axt.data.Store',

	model :'module.basic.mngtsbscmast.model.MngtSbscMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/mngtsbscmast/get/search.do",
			update : _global.api_host_info + "/system/basic/mngtsbscmast/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});