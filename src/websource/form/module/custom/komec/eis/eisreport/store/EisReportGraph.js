Ext.define('module.custom.komec.eis.eisreport.store.EisReportGraph', { extend:'Axt.data.Store',

	model :'module.custom.komec.eis.eisreport.model.EisReportGraph',
	autoLoad: true,
	pageSize: 4000,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/komec/eis/eisreport/get/graph.do",
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	},
	filters: [{
	    filterFn: function (record) {
	        // 온도와 RPM이 모두 0이 아닌 경우만 통과
//	        return !(record.get('temperature') === 0 || record.get('rpm') === 0 || !record.get('wkct_name'));
	        return !(record.get('temperature') === 0 );
	    }
	}]
});