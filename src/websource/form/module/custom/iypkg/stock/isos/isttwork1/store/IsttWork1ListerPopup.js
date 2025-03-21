Ext.define('module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1ListerPopup', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1WorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/searchPopup.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
