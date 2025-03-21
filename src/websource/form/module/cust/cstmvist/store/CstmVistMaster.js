Ext.define('module.cust.cstmvist.store.CstmVistMaster', { extend:'Axt.data.Store',
	model    : 'module.cust.cstmvist.model.CstmVistMaster',
	autoLoad : false,
	remoteSort: true,
	pageSize : Const.SELECT.rows,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/cust/cstmvist/get/mastersearch.do",
//			update : _global.api_host_info + "/system/cust/cstmvist/set/record.do"
		},
		actionMethods: {
		    read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

