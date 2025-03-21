Ext.define('module.eis.project.eisreport.model.EisReportRunningData', { extend:'Axt.data.Model',
	fields: [
		{	name: 'cvic_idcd'			, type: 'string' },		//설비ID
		{	name: 'cvic_name'			, type: 'string' },		//설비명
		{	name: 'invc_date'			, type: 'string' },		//가동일
		{	name: 'title'				, type: 'string' },		//
		{	name: 'runn_data'			, type: 'string' },		//전체중단시간
	]
});

