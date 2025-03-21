Ext.define('module.custom.dehansol.cust.cstmmast.store.CstmMastMngt', { extend:'Axt.data.Store',
	model: 'module.custom.dehansol.cust.cstmmast.model.CstmMastMngt',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/dehansol/cust/custmast/get/cstm_mngt.do",
			update : _global.api_host_info + "/system/custom/dehansol/cust/custmast/set/cstm_mngt.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
