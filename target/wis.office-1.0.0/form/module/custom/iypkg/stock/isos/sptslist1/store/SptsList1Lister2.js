Ext.define('module.custom.iypkg.stock.isos.sptslist1.store.SptsList1Lister2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.sptslist1.model.SptsList1Lister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/iypkg/sale/order/sptslist1/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
