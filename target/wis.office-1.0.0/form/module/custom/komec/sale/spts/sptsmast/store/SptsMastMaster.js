Ext.define('module.custom.komec.sale.spts.sptsmast.store.SptsMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.komec.sale.spts.sptsmast.model.SptsMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/komec/sale/spts/sptsmast/get/search.do",
			update: _global.api_host_info + "/system/custom/komec/sale/spts/sptsmast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
