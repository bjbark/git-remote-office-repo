Ext.define('module.custom.iypkg.prod.workentry2.model.WorkEntry2Detail', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//입고INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//입고날짜
		{	name: 'istt_qntt',			type: 'float' },		//입고량
		{	name: 'subt_qntt',			type: 'float' },		//감량
		{	name: 'istt_pric',			type: 'float' },		//입고단가
		{	name: 'istt_amnt',			type: 'float' },		//입고공급가
		{	name: 'istt_vatx',			type: 'float' },		//입고부가세
		{	name: 'ttsm_amnt',			type: 'float' },		//합계금액
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'wkun_dvcd',			type: 'string'},		//작업단위
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'unit_name',			type: 'string'},		//수량단위
		{	name: 'vatx_incl_yorn',		type: 'string'},		//부가세포함여부
	]
});
