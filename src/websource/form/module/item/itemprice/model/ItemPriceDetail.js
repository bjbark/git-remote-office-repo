Ext.define('module.item.itemprice.model.ItemPriceDetail', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'item_code'			, type: 'string' },		//품목ID
		{	name: 'item_name'			, type: 'string' },		//품목ID
		{	name: 'line_seqn'			, type: 'float'   , defaultValue : 1},		//순번
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'cont_date'			, type: 'string' ,  serialize: Ext.util.Format.dateToStr },		//계약일자
		{	name: 'drtr_idcd'			, type: 'string' },		//담당자ID
		{	name: 'pric_dvcd'			, type: 'string' },		//단가구분
		{	name: 'cont_pric'			, type: 'float' },		//계약단가
		{	name: 'trnt_mthd_dvcd'		, type: 'string' },		//운송방법구분코드
		{	name: 'deli_dcnt'			, type: 'float'  },		//납기일수
		{	name: 'ftmr_insp_yorn'		, type: 'string' },		//초물검사여부
		{	name: 'mdmr_insp_yorn'		, type: 'string' },		//중물검사여부
		{	name: 'ltmr_insp_yorn'		, type: 'string' },		//종물검사여부
		{	name: 'trmn_date'			, type: 'string' , serialize: Ext.util.Format.dateToStr},		//해지일자
		{	name: 'last_yorn'			, type: 'string' },		//최종여부
		{	name: 'drtr_name'			, type: 'string' },		//담당자명
		{	name: 'cstm_mast'			, type: 'string' },		//거래처명
		{	name: 'acct_bacd'			, type: 'string' },		//계정구분
		{	name: 'uper_seqn'			, type: 'float'  },		//상위순번
		{	name: 'disp_seqn'			, type: 'float'  },		//표시순번
		{	name: 'hq_id'				, type: 'string'  , defaultValue : _global.hq_id },

		{	name: 'cstm_drtr_name'		, type: 'string' },		//거래처 담당자명
		{	name: 'cstm_drtr_tele_numb'	, type: 'string' },		//거래처 담당자 전화번화
		{	name: 'cstm_drtr_hdph_numb'	, type: 'string' },		//거래처 담당자 휴대전화

		{	name: 'user_memo'			, type: 'string' },		//사용자메모 -- 삼정에서는 ㄱ
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' },		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});

