Ext.define('module.prod.jig.jigmast.store.JigMast', { extend:'Axt.data.Store',
	model: 'module.prod.jig.jigmast.model.JigMast',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/jig/jigmast/get/search.do",
			update : _global.api_host_info + "/system/prod/jig/jigmast/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
