Ext.define('module.prod.wmold.wmoldlist.store.WmoldListMove', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldlist.model.WmoldListMove',
	autoLoad  : false,
	remoteSort: true,
	pageSize: /*Const.SELECT.rows*/200,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/mold/moldlist/get/moveSearch.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
