Ext.define('module.basic.hldymast.store.HldyMast', { extend:'Axt.data.Store',
	model: 'module.basic.hldymast.model.HldyMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/basic/hldymast/get/search.do",
			update	: _global.api_host_info + "/system/basic/hldymast/set/record.do"
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
