Ext.define('module.custom.iypkg.stock.isos.saleostt.store.SaleOsttListerPopup', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.saleostt.model.SaleOsttListerPopup',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt/get/searchPopup.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
