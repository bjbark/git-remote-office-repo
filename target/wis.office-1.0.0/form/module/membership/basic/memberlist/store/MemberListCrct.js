Ext.define('module.membership.basic.memberlist.store.MemberListInot', { extend:'Axt.data.Store',
	model: 'module.membership.basic.memberlist.model.MemberListInot',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/memberentry/get/inot.do",
			update : _global.api_host_info + "/system/membership/memberentry/set/inot.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
