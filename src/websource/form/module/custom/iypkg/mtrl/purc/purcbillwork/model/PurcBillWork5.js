Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork5', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb',			type: 'string'},		//입고INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//입고날짜
		{	name: 'publ_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//등록날짜
		{	name: 'istt_qntt',			type: 'float' },		//입고량
		{	name: 'subt_qntt',			type: 'float' },		//감량
		{	name: 'istt_pric',			type: 'float' },		//입고단가
		{	name: 'istt_amnt',			type: 'float' },		//입고공급가
		{	name: 'istt_vatx',			type: 'float' },		//입고부가세
		{	name: 'ttsm_amnt',			type: 'float' },		//합계금액
		{	name: 'acpt_qntt',			type: 'float' },		//수주량
		{	name: 'txbl_qntt',			type: 'float' },		//발행한수량
		{	name: 'untxbl',				type: 'float' },		//미발행수량
		{	name: 'qntt',				type: 'float' },		//발행할수량
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'wkun_dvcd',			type: 'string'},		//작업단위
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'unit_name',			type: 'string'},		//수량단위
		{	name: 'offr_path_dvcd',		type: 'string'},		//발주구분
		{	name: 'txbl_path_dvcd',		type: 'string'},		//세금계산서구분
		{	name: 'item_idcd',			type: 'string'},		//수주품목id
		{	name: 'item_name',			type: 'string'},		//수주품목명
		{	name: 'purc_invc_numb',		type: 'string'},		//매입대장 invoice 번호
		{	name: 'puch_sale_dvcd',		type: 'string'},		//매입매출구분코드
		{	name: 'rqod_rcvd_dvcd',		type: 'string'},		//청구영수구분코드
		{	name: 'new_invc_numb',		type: 'string'},		//발행 invoice 번호
		{	name: 'new_line_seqn',		type: 'float' },		//발행 invoice 순번
		{	name: 'stot_dvcd',			type: 'string'},		//결제구분코드
		{	name: 'txbl_volm',			type: 'float' },		//세금계산서권
		{	name: 'txbl_honm',			type: 'float' },		//세금계산서호
		{	name: 'txbl_seqn',			type: 'float' },		//세금계산서일련번호
		{	name: 'remk_text',			type: 'string'},		//비고
		{	name: 'drtr_idcd',			type: 'string'},		//세금계산서 담당자
		{	name: 'txbl_cstm_idcd',		type: 'string'},		//세금계산서 발행거래처ID
		{	name: 'txbl_cstm_name',		type: 'string'},		//세금계산서 발행거래처명
		{	name: 'txbl_path_dvcd',		type: 'string'},		//세금계산서 경로구분코드

		{	name: 'sum_sply_amnt',		type: 'float' },		//합계공급가
		{	name: 'sum_vatx_amnt',		type: 'float' },		//합계부가세
		{	name: 'sum_ttsm_amnt',		type: 'float' },		//합계합계금액
	],
});