Ext.define('module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkLabelPopup', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkLabelPopup',
	pageSize: 100,
	autoLoad  : false,
	proxy	: {
		type: 'memory',
	}
});