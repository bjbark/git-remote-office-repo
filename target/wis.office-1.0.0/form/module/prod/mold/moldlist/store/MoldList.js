Ext.define('module.prod.mold.moldlist.store.MoldList', { extend:'Axt.data.Store',
	model: 'module.prod.mold.moldlist.model.MoldList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/mold/moldlist/get/search.do",
			update : _global.location.http() + "/prod/mold/moldlist/set/invoice.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
