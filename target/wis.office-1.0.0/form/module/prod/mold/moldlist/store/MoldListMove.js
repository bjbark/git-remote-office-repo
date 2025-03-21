Ext.define('module.prod.mold.moldlist.store.MoldListMove', { extend:'Axt.data.Store',
	model: 'module.prod.mold.moldlist.model.MoldListMove',
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
