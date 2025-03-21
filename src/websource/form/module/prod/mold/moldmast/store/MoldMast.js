Ext.define('module.prod.mold.moldmast.store.MoldMast', { extend:'Axt.data.Store',
	model: 'module.prod.mold.moldmast.model.MoldMast',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/mold/moldmast/get/search.do",
			update : _global.location.http() + "/prod/mold/moldmast/set/invoice.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
