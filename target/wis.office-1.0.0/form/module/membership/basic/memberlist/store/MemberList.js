Ext.define('module.membership.basic.memberlist.store.MemberList', { extend:'Axt.data.Store',
	model: 'module.membership.basic.memberlist.model.MemberList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/search.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
