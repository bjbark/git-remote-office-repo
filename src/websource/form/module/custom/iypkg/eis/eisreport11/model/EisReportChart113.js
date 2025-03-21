Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReportChart113',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
		{	name: 'cstm_name',			type: 'string' },		//거래처명
		{	name: 'invc_numb',			type: 'string' },		//수주번호
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//invoice일자
		{	name: 'wkct_idcd',			type: 'string'},		//공정id
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'wkct_code',			type: 'string'},		//공정코드
		{	name: 'cstm_idcd',			type: 'string'},		//거래처id
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'istt_amnt',			type: 'float' , defaultValue : 0 },		//수량
		{	name: 'istt_qntt',			type: 'float' , defaultValue : 0 },		//단가
		{	name: 'mm',					type: 'string'},		//1~12월
		{	name: 'amnt',				type: 'string'},		//1~12월

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue : 0 },		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue : '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
		{	name: 'amnt',				type: 'float' },		//지급액
		{	name: 'trns_bill_amnt',		type: 'float' },		//거래명세서
		{	name: 'txbl_amnt',			type: 'float' },		//세금계산서
		{	name: 'unpd_amnt',			type: 'float'
			, convert : function(newValue , row){
				return row.get('istt_amnt')-row.get('txbl_amnt');
			}
		},		//미지급금
	]
});
