Ext.define('module.custom.komec.sale.spts.sptsmast.store.SptsMastDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.komec.sale.spts.sptsmast.model.SptsMastDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/komec/sale/spts/sptsmast/get/detailspts.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
