Ext.define('module.stock.isos.prodosttwait.model.ProdOsttWaitMaster',{ extend:'Axt.data.Model',
	fields : [
			{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
			{	name: 'invc_date'			, type: 'string',defaultV : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },    //지시일자
			{	name: 'bzpl_idcd'			, type: 'string' },		//사업장id
			{	name: 'expt_dvcd'			, type: 'string' },		//수출구분코드
			{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
			{	name: 'ostt_dvcd'			, type: 'string' },		//출고구분코드
			{	name: 'drtr_idcd'			, type: 'string' },		//담당자ID
			{	name: 'drtr_name'			, type: 'string' },		//담당자ID
			{	name: 'dept_idcd'			, type: 'string' },		//부서ID
			{	name: 'ostt_schd_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},    //출고예정일자
			{	name: 'ostt_yorn'			, type: 'string' },		//출고여부
			{	name: 'ostt_date'			, type: 'string' },		//출고일자
			{	name: 'trut_dvcd'			, type: 'string' },		//위탁구분코드
			{	name: 'dlvy_cond_dvcd'		, type: 'string' },		//인도조건구분코드
			{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},    //납기일자
			{	name: 'sale_stor_yorn'		, type: 'string' },		//판매보관여부
			{	name: 'crny_dvcd'			, type: 'string' },		//통화구분코드
			{	name: 'excg_rate'			, type: 'float'  },		//환율
			{	name: 'remk_text'			, type: 'float'  },		//비고
			{	name: 'pcod_numb'			, type: 'float'  },		//pono
			{	name: 'cstm_code'			, type: 'string' },		//
			{	name: 'cstm_name'			, type: 'string' },		//
			{	name: 'user_name'			, type: 'string' },		//
			{	name: 'wrhs_name'			, type: 'string' },		//
			{	name: 'user_memo'			, type: 'string' },		//사용자메모
			{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
			{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
			{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
			{	name: 'line_ordr'			, type: 'float' },		//ROW순서
			{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
			{	name: 'line_clos'			, type: 'string' },		//ROW마감
			{	name: 'find_name'			, type: 'string' },		//찾기명
			{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
			{	name: 'updt_ipad'			, type: 'string' },		//수정IP
			{	name: 'updt_dttm'			, type: 'string' },		//수정일시
			{	name: 'updt_idcd'			, type: 'string' },		//수정ID
			{	name: 'updt_urif'			, type: 'string' },		//수정UI
			{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
			{	name: 'crte_ipad'			, type: 'string' },		//생성IP
			{	name: 'crte_dttm'			, type: 'string' },		//생성일시
			{	name: 'crte_idcd'			, type: 'string' },		//생성ID
			{	name: 'crte_urif'			, type: 'string' },		//생성UI
		]
});
