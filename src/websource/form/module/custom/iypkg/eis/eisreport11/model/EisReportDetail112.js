Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReportDetail112',{ extend:'Axt.data.Model',
	fields : [
			{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
			{	name: 'cstm_name',			type: 'string' },		//거래처명(상호)
			{	name: 'plan_year'			, type: 'string' },		//계획년도

			{	name: 'mm',					type: 'string'  },		// 1~12월
			{	name: 'istt_amnt',			type: 'float'  },		//sw + dw 합계
	]
});
