Ext.define('module.cust.cstmlist.store.CstmItemPriceLister', { extend:'Axt.data.Store',
	model: 'module.cust.cstmlist.model.CstmItemPriceLister',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/cust/cstmmast/get/itempric.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
