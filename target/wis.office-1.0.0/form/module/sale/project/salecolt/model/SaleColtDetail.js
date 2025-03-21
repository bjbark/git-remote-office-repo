Ext.define('module.sale.project.salecolt.model.SaleColtDetail',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'invc_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//INVOICE일자
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'dept_idcd',				type: 'string'},		//부서ID
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'iput_amnt_date',		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//입금일자
		{name: 'stot_dvcd',				type: 'string'},		//결제구분코드
		{name: 'stot_bass',				type: 'string'},		//결제근거
		{name: 'apvl_yorn',				type: 'string'},		//승인여부
		{name: 'apvl_drtr_idcd',		type: 'string'},		//승인담당자ID
		{name: 'apvl_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//승인일자
		{name: 'publ_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//발행일자
		{name: 'expr_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//만기일자
		{name: 'paym_bank_name',		type: 'string'},		//지급은행명
		{name: 'drtr_name',				type: 'string'},		//담당자
		{name: 'apvl_drtr_name',		type: 'string'},		//승인담당자
		{name: 'dept_name',				type: 'string'},		//담당부서
		{name: 'colt_amnt',				type: 'float' },		//수금금액
		{name: 'cstm_name',				type: 'string' },		//거래처명

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string', defaultValue : _global.login_pk},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string', defaultValue : _global.login_pk},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
