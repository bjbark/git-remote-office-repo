Ext.define('module.custom.inkopack.basic.madestnd.store.MadeStnd2', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.basic.madestnd.model.MadeStnd',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
//			read   : _global.api_host_info + "/system/custom/incopack/basic/makestnd/get/search.do",
			update : _global.api_host_info + "/system/custom/incopack/basic/makestnd/set/record2.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
