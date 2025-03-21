Ext.define( 'module.basic.carmast.model.CarMast', { extend : 'Axt.data.Model',
	fields: [
		{name: 'cars_idcd',				type: 'string'},		//차량ID
		{name: 'cars_code',				type: 'string'},		//차량코드
		{name: 'cars_numb',				type: 'string'},		//차량번호
		{name: 'cars_alis',				type: 'string'},		//차량별칭
		{name: 'puch_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//구입일자
		{name: 'cars_year_prod',		type: 'string'},		//차랑년식
		{name: 'insp_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//검사일자
		{name: 'runn_dvcd',				type: 'string'},		//운행구분코드
		{name: 'nwek_name',				type: 'string'},		//차주명
		{name: 'load_volm',				type: 'float' },		//적재량
		{name: 'crty_bacd',				type: 'string'},		//차종구분코드
		{name: 'inst_totl_amnt',		type: 'float' },		//할부총액
		{name: 'inst_mont',				type: 'float' },		//할부개월
		{name: 'monh_paid_amnt',		type: 'float' },		//월납부금
		{name: 'paid_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납부일자
		{name: 'expr_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//만기일자
		{name: 'inst_bank_name',		type: 'string'}, 		//할부금융사명
		{name: 'insu_amnt',				type: 'float' },		//보험금액
		{name: 'insu_dvcd',				type: 'string'},		//보험구분코드
		{name: 'insu_trff',				type: 'float' },		//보험요율
		{name: 'insu_open_date',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//보험개시일자
		{name: 'insu_expr_date',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//보험만기일자
		{name: 'paid_mthd_dvcd',		type: 'string'},		//납부방법구분코드
		{name: 'insu_cmpy_name',		type: 'string'},		//보험회사명
		{name: 'insu_drtr_name',		type: 'string'},		//보험담당자명
		{name: 'tele_numb',				type: 'string'},		//전화번호
		{name: 'hdph_numb',				type: 'string'},		//휴대폰번호
		{name: 'emgc_tele_numb',		type: 'string'},		//비상전화번호
		{name: 'frst_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//1회일자
		{name: 'frst_amnt',				type: 'float' },		//1회금액
		{name: 'secd_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//2회일자
		{name: 'secd_amnt',				type: 'float' },		//2회금액
		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'float' },		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI

		{name: 'base_code',				type: 'string'},		//차종코드
		{name: 'base_name',				type: 'string'},		//차종명+
	]
});
