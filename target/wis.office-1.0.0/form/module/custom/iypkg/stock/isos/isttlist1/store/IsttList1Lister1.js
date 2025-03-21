Ext.define('module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister1', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttlist1/get/list1.do",
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});