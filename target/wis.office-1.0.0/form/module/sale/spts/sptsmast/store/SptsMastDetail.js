Ext.define('module.sale.spts.sptsmast.store.SptsMastDetail', { extend:'Axt.data.Store',
	model: 'module.sale.spts.sptsmast.model.SptsMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/sale/spts/sptsmast/get/detail.do",
			update	: _global.api_host_info + "/system/sale/spts/sptsmast/set/stps.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
