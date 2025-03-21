Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReportChart111',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
		{	name: 'cstm_name',			type: 'string' },		//거래처명
		{	name: 'invc_numb',			type: 'string' },		//수주번호
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자
		{	name: 'plan_year'			, type: 'string' },		//계획년도

		{	name: 'sw_code'	,			type: 'float' , defaultValue : 0},		//원단지종구분코드 값 sw, tw
		{	name: 'dw_code'	,			type: 'float' , defaultValue : 0},		//원단지종구분코드 값 dw
		{	name: 'istt_amnt',			type: 'float' , defaultValue : 0},		//sw + dw 합계
		{	name: 'mm',					type: 'string'},		//1~12월
	]
});
