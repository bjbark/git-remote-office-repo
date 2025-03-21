Ext.define('module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceMaster1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'				, type: 'string' },		//INVOICE번호
		{	name: 'invc_date'				, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE일자
		{	name: 'bzpl_idcd'				, type: 'string' },		//사업장ID
		{	name: 'cstm_idcd'				, type: 'string' },		//거래처ID
		{	name: 'ostt_dvcd'				, type: 'string' },		//출고구분코드
		{	name: 'cstm_pcod_numb'			, type: 'string' },		//고객PONO
		{	name: 'expt_dvcd'				, type: 'string' },		//수출구분코드
		{	name: 'mngt_numb'				, type: 'string' },		//관리번호
		{	name: 'buyr_name'				, type: 'string' },		//바이어명
		{	name: 'mdtn_prsn'				, type: 'string' },		//중개인
		{	name: 'drtr_idcd'				, type: 'string' },		//담당자ID
		{	name: 'pric_cond_dvcd'			, type: 'string' },		//가격조건구분코드
		{	name: 'trde_stot_dvcd'			, type: 'string' },		//무역결제구분코드
		{	name: 'stot_time_dvcd'			, type: 'string' },		//결제시기구분코드
		{	name: 'stot_ddln'				, type: 'string' },		//결제기한
		{	name: 'mney_unit'				, type: 'string' },		//화폐단위
		{	name: 'exrt'					, type: 'float ' , defaultValue : 0},		//환율
		{	name: 'exch_amnt'				, type: 'float ' , defaultValue : 0},		//외환금액
		{	name: 'krwn_amnt'				, type: 'float ' , defaultValue : 0},		//원화금액
		{	name: 'ship_name'				, type: 'string' },		//송화인
		{	name: 'csge_name'				, type: 'string' },		//수화인
		{	name: 'ntfc_text'				, type: 'string' },		//알림문장
		{	name: 'remk_text'				, type: 'string' },		//비고
		{	name: 'paym_cond_name'			, type: 'string' },		//지불조건명


		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'string'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string'},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string'},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
