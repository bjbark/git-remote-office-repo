Ext.define('module.project.tablemanagerv2.store.TableManagerV2DomainUse', { extend:'Axt.data.Store',
	model: 'module.project.tablemanagerv2.model.TableManagerV2DomainUse',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanagerv2/get/searchdomainuse.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});