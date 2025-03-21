Ext.define('module.custom.iypkg.eis.eisreport.model.EisReportPoorLister',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'poor_bacd'				, type: 'string'},		//불량코드
		{	name: 'poor_name'				, type: 'string'},		//불량명
		{	name: 'poor_qntt'				, type: 'string'},		//불량수량
	]
});
