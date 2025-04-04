Ext.define('module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister6', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister6',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/iypkg/stock/isos/isttlist1/get/list6.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});