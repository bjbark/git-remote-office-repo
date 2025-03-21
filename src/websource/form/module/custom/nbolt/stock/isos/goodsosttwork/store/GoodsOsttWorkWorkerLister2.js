Ext.define('module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkWorkerLister2', { extend:'Axt.data.Store',
	model: 'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/nbolt/stock/isos/goodsosttwork/get/workerlister2.do",
			update: _global.api_host_info + "/system/custom/nbolt/stock/isos/goodsosttwork/set/records.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
