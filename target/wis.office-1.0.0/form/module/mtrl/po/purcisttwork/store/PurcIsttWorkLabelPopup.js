Ext.define('module.mtrl.po.purcisttwork.store.PurcIsttWorkLabelPopup', { extend:'Axt.data.Store',
	model	: 'module.mtrl.po.purcisttwork.model.PurcIsttWorkLabelPopup',
	pageSize: 100,
	autoLoad  : false,
	proxy	: {
		type: 'memory',
	}
});