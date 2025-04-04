Ext.define('module.prod.wmold.wmoldmast.store.WmoldMast', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldmast.model.WmoldMast',
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
