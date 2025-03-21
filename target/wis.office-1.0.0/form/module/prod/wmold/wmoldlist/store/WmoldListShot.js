Ext.define('module.prod.wmold.wmoldlist.store.WmoldListShot', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldlist.model.WmoldListShot',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.location.http() + "/prod/mold/moldlist/get/shotsearch.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams	: {
			token	: _global.token_id
		}
	}
});
