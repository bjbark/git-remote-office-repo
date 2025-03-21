Ext.define('module.prod.jig.jiglist.store.JigList', { extend:'Axt.data.Store',
	model: 'module.prod.jig.jiglist.model.JigList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/jig/jiglist/get/search.do",
			update : _global.api_host_info + "/system/prod/jig/jiglist/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
