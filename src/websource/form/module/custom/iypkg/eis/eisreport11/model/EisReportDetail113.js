Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReportDetail113',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
		{	name: 'cstm_name',			type: 'string' },		//거래처명
		{	name: 'invc_numb',			type: 'string' },		//수주번호
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자
		{	name: 'plan_year'			, type: 'string' },		//계획년도

		{	name: 'mm',					type: 'string' },		//1~12월
		{	name: 'istt_amnt',			type: 'float' },		//매입금액
		{	name: 'amnt',				type: 'float' },		//수금액
		{	name: 'trns_bill_amnt',		type: 'float' },		//거래명세서
		{	name: 'txbl_amnt',			type: 'float' },		//세금계산서
		{	name: 'unpd_amnt',			type: 'float'
			, convert : function(newValue , row){
				return row.get('istt_amnt')-row.get('amnt');
			}
		},		//미지급금
	]
});
