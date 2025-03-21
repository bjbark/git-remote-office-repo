Ext.define('module.custom.iypkg.prod.workentry2.model.WorkEntry2Detail2', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//입고INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//입고순번
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.hq_id },		//사업장
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//입고invoice일자
		{	name: 'wkun_dvcd',			type: 'string'},		//작업단위
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'cstm_idcd',			type: 'string'},		//발주거래처ID
		{	name: 'cstm_name',			type: 'string'},		//발주거래처명
		{	name: 'offr_qntt',			type: 'float' },		//발주수량
		{	name: 'unistt',				type: 'float' },		//미입고량
		{	name: 'qntt_unit_idcd',		type: 'string'},		//수량단위ID
		{	name: 'unit_name',			type: 'string'},		//수량단위명
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'acpt_seqn',			type: 'float' },		//수주순번
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'prod_code',			type: 'string'},		//품목코드
		{	name: 'prod_name',			type: 'string'},		//품목명
		{	name: 'offr_pric',			type: 'float' },		//발주단가

		{	name: 'subt_qntt',			type: 'float' },		//감량
		{	name: 'istt_qntt',			type: 'float' },		//입고량
		{	name: 'istt_amnt',			type: 'float' },		//공급가
		{	name: 'istt_vatx',			type: 'float' },		//부가세
		{	name: 'ttsm_amnt',			type: 'float' },		//합계
		{	name: 'vatx_incl_yorn',		type: 'string', defaultValue : 1 },		//자료구분 = 부가세포함여부

		{	name: 'new_invc_numb',		type: 'string'},
		{	name: 'new_line_seqn',		type: 'string'},
	]
});
