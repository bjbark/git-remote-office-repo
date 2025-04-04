Ext.define('module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
//	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/stock/etcisttwork/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/stock/etcisttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
