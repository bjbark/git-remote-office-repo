Ext.define('module.sale.spts.sptsmast.store.SptsMastDetail2', { extend:'Axt.data.Store',
	model: 'module.sale.spts.sptsmast.model.SptsMastDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/spts/sptsmast/get/detailspts.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
