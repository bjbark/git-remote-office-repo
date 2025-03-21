Ext.define('module.prod.wmold.wmoldmast.store.WmoldMastMove', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldmast.model.WmoldMastMove',
	autoLoad  : false,
	remoteSort: true,
	pageSize: /*Const.SELECT.rows*/200,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/mold/moldmast/get/movesearch.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
