Ext.define('module.membership.basic.memberentry.store.MemberEntryMngt', { extend:'Axt.data.Store',
	model: 'module.membership.basic.memberentry.model.MemberEntryMngt',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/item_mngt.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/item_mngt.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
