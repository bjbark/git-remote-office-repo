Ext.define('module.prod.cvic.cvicmonitring.model.CvicMonitringChart2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'cvic_name'			, type: 'string' },		//설비명
		{	name: 'cvic_stat_dvcd'		, type: 'string' },		//상태
		{	name: 'strt_dttm'			, type: 'string' },		//시작
		{	name: 'endd_dttm'			, type: 'string' },		//종료
	]
});

