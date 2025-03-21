Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.store.OsttWaitListLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.osttwaitlist.model.OsttWaitList',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/osttwaitlist/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
