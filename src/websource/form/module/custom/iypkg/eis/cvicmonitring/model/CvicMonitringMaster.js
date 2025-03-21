Ext.define('module.custom.iypkg.eis.cvicmonitring.model.CvicMonitringMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'cvic_name'				, type: 'string'},		//
		{name: 'cvic_stat'				, type: 'string'},		//
		{name: 'prod_name'				, type: 'string'},		//

		{name: 'strt_time'				, type: 'string '},		//
		{name: 'tody_qntt'				, type: 'float ',defaultValue :0},		//
		{name: 'week_qntt'				, type: 'float '},		//
		{name: 'monh_qntt'				, type: 'float '},		//
	]
});
