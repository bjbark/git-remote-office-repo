Ext.define('module.stock.isos.movework.store.MoveWorkDetail', { extend:'Axt.data.Store',
	model: 'module.stock.isos.movework.model.MoveWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/stock/movework/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
