Ext.define('module.custom.sjflv.sale.sale.salecolt.model.SaleColtMaster1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'				, type: 'string' },		//수금번호
		{	name: 'invc_date'				, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },	//수금일자
		{	name: 'cstm_code'				, type: 'string' },		//거래처코드
		{	name: 'cstm_name'				, type: 'string' },		//거래처명
		{	name: 'stot_dvcd'				, type: 'string' },		//결재구분
		{	name: 'paym_bank_name'			, type: 'string' },		//계좌은행
		{	name: 'stot_bass'				, type: 'string' },		//결재근거
		{	name: 'publ_date'				, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },	//발행일자
		{	name: 'expr_date'				, type: 'string'  ,	convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },	//만기일자
		{	name: 'dept_name'				, type: 'string' },		//부서명
		{	name: 'user_name'				, type: 'string' },		//담당자명
		{	name: 'sply_amnt'				, type: 'float'  , defaultValue: '0' },		//공급가
		{	name: 'vatx_amnt'				, type: 'float'  , defaultValue: '0' },		//부가세
		{	name: 'ttsm_amnt'				, type: 'float'  , defaultValue: '0' },		//합계금액
		{	name: 'ttsm_amnt'				, type: 'float'  , defaultValue: '0' },		//합계금액
		{	name: 'iomy_date'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//어음입금일
		{	name: 'iomy_amnt'				, type: 'float' },		//어음입금액

		{	name: 'line_seqn'				, type: 'string' },		//수금항목

		{	name: 'user_memo'				, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'				, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'				, type: 'string' },		//부모ID
		{	name: 'line_levl'				, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'				, type: 'float' },		//ROW순서
		{	name: 'line_stat'				, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'				, type: 'string' },		//ROW마감
		{	name: 'find_name'				, type: 'string' },		//찾기명
		{	name: 'updt_user_name'			, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'				, type: 'string' },		//수정IP
		{	name: 'updt_dttm'				, type: 'string' },		//수정일시
		{	name: 'updt_idcd'				, type: 'string' },		//수정ID
		{	name: 'updt_urif'				, type: 'string' },		//수정UI
		{	name: 'crte_user_name'			, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'				, type: 'string' },		//생성IP
		{	name: 'crte_dttm'				, type: 'string' },		//생성일시
		{	name: 'crte_idcd'				, type: 'string' },		//생성ID
		{	name: 'crte_urif'				, type: 'string' },		//생성UI
	]
});
