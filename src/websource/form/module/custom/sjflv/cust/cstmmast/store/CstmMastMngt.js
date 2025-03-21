Ext.define('module.custom.sjflv.cust.cstmmast.store.CstmMastMngt', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.cust.cstmmast.model.CstmMastMngt',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/cust/cstmmast/get/cstm_mngt.do",
			update : _global.api_host_info + "/system/custom/sjflv/cust/cstmmast/set/cstm_mngt.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
