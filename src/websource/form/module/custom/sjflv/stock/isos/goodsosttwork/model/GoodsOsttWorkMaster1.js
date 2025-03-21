Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'				, type: 'string' },		//INVOICE번호
		{	name: 'invc_date'				, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },	//지시일자
		{	name: 'orig_invc_numb'			, type: 'string' },		//출하번호
		{	name: 'acpt_numb'				, type: 'string' },		//수주번호
		{	name: 'bzpl_idcd'				, type: 'string' },		//사업장id
		{	name: 'expt_dvcd'				, type: 'string' },		//수출구분코드
		{	name: 'cstm_idcd'				, type: 'string' },		//거래처ID
		{	name: 'cstm_name'				, type: 'string' },		//거래처명
		{	name: 'ostt_dvcd'				, type: 'string' },		//출고구분코드
		{	name: 'drtr_idcd'				, type: 'string' },		//담당자ID
		{	name: 'drtr_name'				, type: 'string' },		//담당자명
		{	name: 'dept_idcd'				, type: 'string' },		//부서ID
		{	name: 'trut_dvcd'				, type: 'string' },		//위탁구분코드
		{	name: 'dlvy_cond_dvcd'			, type: 'string' },		//인도조건구분코드
		{	name: 'deli_date'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },	//납기일자
		{	name: 'sale_stor_yorn'			, type: 'string' },		//판매보관여부
		{	name: 'crny_dvcd'				, type: 'string' },		//통화구분코드
		{	name: 'excg_rate'				, type: 'string' },		//환율
		{	name: 'ostt_trnt_dvcd'			, type: 'string' },		//
		{	name: 'ostt_trnt_amnt'			, type: 'float' },		//
		{	name: 'dlvy_cstm_name'			, type: 'string' },		//
		{	name: 'remk_text'				, type: 'string' },		//비고
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
		{	name: 'ostt_item_list'			, type: 'string' },		//출고품목리스트
	]
});
