Ext.define('module.membership.fee.feereport1.store.FeeReport1Detail', { extend:'Axt.data.Store',
	model: 'module.membership.fee.feereport1.model.FeeReport1Detail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/feereport1/get/search.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
