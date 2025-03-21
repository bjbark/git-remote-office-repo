Ext.define('module.custom.iypkg.stock.isos.isttwork2.store.IsttWork2Master', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.isttwork2.model.IsttWork2Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/stock/isos/isttwork2/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});