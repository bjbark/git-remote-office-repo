Ext.define('module.eis.project.eisreport.model.EisReportRunnStopTime', { extend:'Axt.data.Model',
	fields: [
		{	name: 'cvic_name'			, type: 'string' },		//설비명
		{	name: 'runn_time'			, type: 'string' },		//전체가동시간
		{	name: 'runn_time_perc'		, type: 'float' },		//전체가동율
		{	name: 'stop_time'			, type: 'string' },		//전체중단시간
		{	name: 'stop_time_perc'		, type: 'float' },		//전체중단율
	]
});

