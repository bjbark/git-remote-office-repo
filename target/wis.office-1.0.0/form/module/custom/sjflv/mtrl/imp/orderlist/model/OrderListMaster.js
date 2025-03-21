Ext.define('module.custom.sjflv.mtrl.imp.orderlist.model.OrderListMaster',{ extend:'Axt.data.Model',
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

		{name: 'ordr_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//INVOICE일자
		{name: 'item_idcd',				type: 'string' },		//품목ID
		{name: 'item_name',				type: 'string' },		//품목이름
		{name: 'bzpl_idcd',				type: 'string' },		//사업장ID
		{name: 'bzpl_name',				type: 'string' },		//사업장이름
		{name: 'ordr_numb',				type: 'string' },		//주문번호
		{name: 'amnd_degr',				type: 'float' },		//차수
		{name: 'incm_dvcd',				type: 'string' },		//수입구분코드
		{name: 'mdtn_prsn',				type: 'string' },		//중개인
		{name: 'ship_viaa_dvcd',		type: 'string' },		//중개인
		{name: 'pric_cond_dvcd',		type: 'string' },		//가격조건구분코드
		{name: 'trde_stot_dvcd',		type: 'string' },		//무역결제구분코드
		{name: 'stot_time_dvcd',		type: 'string' },		//결제시기구분코드
		{name: 'stot_ddln',				type: 'string' },		//결제기한
		{name: 'mney_unit',				type: 'string' },		//화폐단위
		{name: 'exrt',					type: 'float' },		//환율
		{name: 'exch_pric',				type: 'float' },		//환율

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
