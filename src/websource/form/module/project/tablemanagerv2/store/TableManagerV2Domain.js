Ext.define('module.project.tablemanagerv2.store.TableManagerV2Domain', { extend:'Axt.data.Store',
	model: 'module.project.tablemanagerv2.model.TableManagerV2Domain',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanagerv2/get/searchdomain.do"
		   ,update : _global.api_http + "/project/tablemanagerv2/set/recorddomain.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});