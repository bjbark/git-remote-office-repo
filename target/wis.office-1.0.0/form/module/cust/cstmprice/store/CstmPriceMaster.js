Ext.define('module.cust.cstmprice.store.CstmPriceMaster', { extend:'Axt.data.Store',
	model: 'module.cust.cstmprice.model.CstmPriceMaster',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	pageSize : 99999,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/cust/cstmprice/get/search.do",
			update : _global.api_host_info + "/system/cust/cstmprice/set/record.do"
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
