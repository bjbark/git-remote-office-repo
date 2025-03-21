Ext.define('module.basic.cust.cstmcredit.store.CstmCreditMaster', { extend:'Axt.data.Store',
	model: 'module.basic.cust.cstmcredit.model.CstmCreditMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/basic/cust/cstmcredit/get/search.do",
			update: _global.api_host_info + "/system/stock/etcosttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
