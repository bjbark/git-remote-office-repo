Ext.define('module.membership.inout.inotlist.store.InotList', { extend:'Axt.data.Store',
	model: 'module.membership.inout.inotlist.model.InotList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/inotlist/get/search.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
