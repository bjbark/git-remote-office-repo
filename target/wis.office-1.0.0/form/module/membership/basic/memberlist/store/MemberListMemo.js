Ext.define('module.membership.basic.memberlist.store.MemberListMemo', { extend:'Axt.data.Store',
	model: 'module.membership.basic.memberlist.model.MemberListMemo',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/memo.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/memo.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
