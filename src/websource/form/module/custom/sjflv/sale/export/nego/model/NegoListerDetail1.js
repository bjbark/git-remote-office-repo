Ext.define('module.custom.sjflv.sale.export.nego.model.NegoListerDetail1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'orig_invc_numb'		, type: 'string' },		//출하번호
		{	name: 'orig_seqn'			, type: 'string' },		//출하순번
		{	name: 'acpt_numb'			, type: 'string' },		//수주번호
		{	name: 'acpt_seqn'			, type: 'string' },		//수주순번
		{	name: 'item_code'			, type: 'string' },		//품목코드
		{	name: 'item_name'			, type: 'string' },		//품명
		{	name: 'cstm_name'			, type: 'string' },		//품명
		{	name: 'item_spec'			, type: 'string' },		//품목규격
		{	name: 'modl_name'			, type: 'string' },		//모델명
		{	name: 'sale_unit'			, type: 'string' },		//판매단위
		{	name: 'norm_sale_pric'		, type: 'float'  },		//정상판매단가
		{	name: 'sale_stnd_pric'		, type: 'float'  },		//판매기준단가
		{	name: 'sale_pric'			, type: 'float'  },		//판매단가
		{	name: 'ostt_qntt'			, type: 'float'  },		//출고수량
		{	name: 'vatx_incl_yorn'		, type: 'string' },		//부가세포함여부
		{	name: 'vatx_rate'			, type: 'float'  },		//부가세율
		{	name: 'sale_amnt'			, type: 'float'  },		//판매금액
		{	name: 'vatx_amnt'			, type: 'float'  },		//부가세금액
		{	name: 'ttsm_amnt'			, type: 'float'  },		//함계금액
		{	name: 'deli_date'			, type: 'string' },		//납기일자
		{	name: 'dlvy_date'			, type: 'string' },		//납품일자
		{	name: 'dlvy_hhmm'			, type: 'string' },		//납품시분
		{	name: 'stnd_unit'			, type: 'string' },		//기준단위
		{	name: 'stnd_unit_qntt'		, type: 'float'  },		//기준단위수량
		{	name: 'lott_numb'			, type: 'string' },		//LOT번호
		{	name: 'wrhs_idcd'			, type: 'string' },		//창고ID
		{	name: 'wrhs_name'			, type: 'string' },		//창고명
		{	name: 'dlvy_cstm_idcd'		, type: 'string' },		//납품거래처ID
		{	name: 'dsct_yorn'			, type: 'string' },		//중단여부
		{	name: 'ostt_dvcd'			, type: 'string' },		//출고구분코드
		{	name: 'insp_dvcd'			, type: 'string' },		//검사구분코드
		{	name: 'insp_date'			, type: 'string' },		//검사일자
		{	name: 'pcod_numb'			, type: 'string' },		//PONO
		{	name: 'sale_date'			, type: 'string' },		//판매일자
		{	name: 'sale_invc_numb'		, type: 'string' },		//판매invoice번호
		{	name: 'cstm_name'			, type: 'string' },		//판매거래처명
		{	name: 'sale_qntt'			, type: 'float'  },		//판매수량
		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
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
		{	name: 'iamt_dvcd'			, type: 'string' },		//입금구분코드
		{	name: 'exch_amnt'			, type: 'string' },		//외환금액
		{	name: 'krwn_amnt'			, type: 'string' },		//원화금액
		{	name: 'finc_inst_name'		, type: 'string' },		//금융기관명
		{	name: 'acct_nmbr'			, type: 'string' },		//계좌번호
		{	name: 'cmsn_amnt'			, type: 'string' },		//수수료
		{	name: 'mngt_numb'			, type: 'string' },		//관리번호
		{	name: 'remk_text'			, type: 'string' },		//비고

	]
});
