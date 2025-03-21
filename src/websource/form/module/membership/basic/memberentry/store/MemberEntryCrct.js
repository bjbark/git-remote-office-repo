Ext.define('module.membership.basic.memberentry.store.MemberEntryCrct', { extend:'Axt.data.Store',
	model: 'module.membership.basic.memberentry.model.MemberEntryCrct',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/crct.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/crct.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
