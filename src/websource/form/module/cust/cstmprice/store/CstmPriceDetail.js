Ext.define('module.cust.cstmprice.store.CstmPriceDetail', { extend:'Axt.data.Store',
	model: 'module.cust.cstmprice.model.CstmPriceDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/cust/cstmprice/get/detail.do",
			update	: _global.api_host_info + "/system/cust/cstmprice/set/detail.do"
		},
		actionMethods: {
			read   : 'POST' ,
			update : 'POST'
		},
		extraParams:{
			  token : _global.token_id
		}
	}
});
