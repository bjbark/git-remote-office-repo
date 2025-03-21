Ext.define('module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
//	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/stock/etcisttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
