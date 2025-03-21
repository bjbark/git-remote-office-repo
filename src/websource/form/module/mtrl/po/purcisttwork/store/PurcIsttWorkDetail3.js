Ext.define('module.mtrl.po.purcisttwork.store.PurcIsttWorkDetail3', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purcisttwork.model.PurcIsttWorkFile',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/mtrl/po/purcisttwork/get/filesearch.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
