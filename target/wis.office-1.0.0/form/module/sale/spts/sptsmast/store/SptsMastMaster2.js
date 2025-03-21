Ext.define('module.sale.spts.sptsmast.store.SptsMastMaster2', { extend:'Axt.data.Store',
	model: 'module.sale.spts.sptsmast.model.SptsMastMaster2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/spts/sptsmast/get/searchspts.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
