Ext.define('module.membership.fee.feereport1.store.FeeReport1Master', { extend:'Axt.data.Store',
	model: 'module.membership.fee.feereport1.model.FeeReport1Master',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/feereport1/get/summary.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
