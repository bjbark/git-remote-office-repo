Ext.define('module.project.tablemanager.store.TableManagerDomainUse', { extend:'Axt.data.Store',
	model: 'module.project.tablemanager.model.TableManagerDomainUse',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanager/get/searchdomainuse.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});