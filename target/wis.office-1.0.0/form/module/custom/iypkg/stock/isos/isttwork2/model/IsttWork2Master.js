Ext.define('module.custom.iypkg.stock.isos.isttwork2.model.IsttWork2Master', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//invoice일자
		{	name: 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name: 'istt_wrhs_idcd',		type: 'string'},		//입고창고ID
		{	name: 'istt_dvcd',			type: 'string' },		//입고구분코드
		{	name: 'coun_iout_dvcd',		type: 'string'},		//내외자구분코드
		{	name: 'istt_wrhs_name',		type: 'string'},		//입고창고명
		{	name: 'drtr_idcd',			type: 'string'},		//담당자ID
		{	name: 'drtr_name',			type: 'string'},		//담당자명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'dept_idcd',			type: 'string'},		//부서ID
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'vatx_incl_yorn',		type: 'string'},		//자료구분 = 부가세포함여부
		{	name: 'vatx_rate',			type: 'float' },		//부가세율
		{	name: 'istt_amnt',			type: 'float' },		//입고금액
		{	name: 'istt_vatx',			type: 'float' },		//입고부가세
		{	name: 'ttsm_amnt',			type: 'float' },		//합계금액
		{	name: 'remk_text',			type: 'string'},		//비고

		{	name: 'asmt_dvcd',			type: 'string'},		//부자재구분코드
		{	name: 'asmt_idcd',			type: 'string'},		//품목ID
		{	name: 'asmt_code',			type: 'string'},		//품목코드
		{	name: 'asmt_name',			type: 'string'},		//품명
		{	name: 'asmt_spec',			type: 'string'},		//품목규격
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'acpt_cstm_name',		type: 'string'},		//매출처명
		{	name: 'istt_pric',			type: 'float' },		//입고단가
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'offr_qntt',			type: 'float' },		//발주수량

		{	name: 'pric_dvcd',			type: 'string'},		//단가구분코드
		{	name: 'stnd_unit',			type: 'string'},		//기준단위
		{	name: 'stnd_unit_qntt',		type: 'float' },		//기준단위수량
		{	name: 'lott_numb',			type: 'string'},		//LOT번호
		{	name: 'remk_text',			type: 'string'},		//비고
		{	name: 'istt_insp_yorn',		type: 'string'},		//입고검사여부
		{	name: 'poor_caus_bacd',		type: 'string'},		//불량원인분류코드
		{	name: 'poor_caus_name',		type: 'string'},		//불량원인명
		{	name: 'judt_dvcd',			type: 'string'},		//판정구분코드
		{	name: 'orig_invc_numb',		type: 'string'},		//원INVOICE번호
		{	name: 'orig_amnd_degr',		type: 'float' },		//원AMD차수
		{	name: 'orig_seqn',			type: 'float' },		//원순번
		{	name: 'istt_yorn',			type: 'string'},		//입고여부
		{	name: 'uper_seqn',			type: 'float' },		//상위순번
		{	name: 'disp_seqn',			type: 'float' },		//표시순번
		{	name: 'make_cmpy_name',		type: 'string'},		//제조회사명
		{	name: 'make_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//제조일자
		{	name: 'rtil_ddln',			type: 'string'},		//유통기한

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
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
	]
});
