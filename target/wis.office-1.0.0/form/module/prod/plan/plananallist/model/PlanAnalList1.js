Ext.define('module.prod.plan.plananallist.model.PlanAnalList1', { extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'		//Invoice번호
		},{	name : 'bzpl_idcd'			, type : 'string', defaultValue : _global.stor_id		//사업장ID
		},{	name : 'amnd_degr'			, type : 'float'		//amd차수
		},{	name : 'seqn'				, type : 'float'		//번호
		},{	name : 'line_seqn'			, type : 'float'		//순번
		},{	name : 'acpt_seqn'			, type : 'float'		//수주순번
		},{	name : 'acpt_numb'			, type : 'string'		//수주번호
		},{	name : 'lott_numb'			, type : 'string'		//lot번호
		},{	name : 'item_idcd'			, type : 'string'		//품목ID
		},{	name : 'item_code'			, type : 'string'		//품목코드
		},{	name : 'item_name'			, type : 'string'		//품명
		},{	name : 'item_spec'			, type : 'string'		//품목규격
		},{	name : 'unit_idcd'			, type : 'string'		//단위ID
		},{	name : 'cvic_idcd'			, type : 'string'		//설비ID
		},{	name : 'cvic_name'			, type : 'string'		//설비명
		},{	name : 'orig_invc_numb'		, type : 'string'		//원invoice번호
		},{	name : 'orig_seqn'			, type : 'float'		//원순번
		},{	name : 'orig_invc_qntt'		, type : 'float'		//원invoice수량
		},{	name : 'optn_dvcd'			, type : 'string'		//옵션구분코드
		},{	name : 'optn_psbl_yorn'		, type : 'string'		//옵션가능여부
		},{	name : 'optn_adtn'			, type : 'string'		//옵션추가
		},{	name : 'pric_adpt'			, type : 'float'		//단가적용
		},{	name : 'norm_sale_pric'		, type : 'float'		//정상판매단가
		},{	name : 'sale_stnd_pric'		, type : 'float'		//판매기준단가
		},{	name : 'invc_qntt'			, type : 'float'		//invoice수량
		},{	name : 'invc_pric'			, type : 'float'		//invoice단가
		},{	name : 'vatx_incl_yorn'		, type : 'string'		//부가세포함여부
		},{	name : 'vatx_rate'			, type : 'float'		//부가세율
		},{	name : 'sply_amnt'			, type : 'float'		//공급가액
		},{	name : 'vatx_amnt'			, type : 'float'		//부가세금액
		},{	name : 'invc_amnt'			, type : 'float'		//invoice금액
		},{	name : 'krwn_amnt'			, type : 'float'		//원화금액
		},{	name : 'krwn_vatx'			, type : 'float'		//원화부가세
		},{	name : 'krwn_ttsm_amnt'		, type : 'float'		//원화합계금액
		},{	name : 'stnd_unit'			, type : 'string'		//기준단위
		},{	name : 'stnd_unit_qntt'		, type : 'float'		//기준단위수량
		},{	name : 'wrhs_idcd'			, type : 'string'		//창고ID
		},{	name : 'dlvy_cstm_idcd'		, type : 'string'		//납품거래처ID
		},{	name : 'cstm_idcd'			, type : 'string'		//거래처ID
		},{	name : 'cstm_name'			, type : 'string'		//거래처명
		},{	name : 'deli_date'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납기일자
		},{	name : 'deli_chge_dvcd'		, type : 'string'		//납기변경구분코드
		},{	name : 'deli_chge_resn'		, type : 'string'		//납기조정사유
		},{	name : 'pcod_numb'			, type : 'string'		//PONO
		},{	name : 'cstm_offr_date'		, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//고객발주일자
		},{	name : 'cstm_deli_date'		, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//고객납기일자
		},{	name : 'cstm_lott_numb'		, type : 'string'		//고객lot번호
		},{	name : 'dlvy_date'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납품일자
		},{	name : 'dlvy_hhmm'			, type : 'string'		//납품시분
		},{	name : 'remk_text'			, type : 'string'		//비고
		},{	name : 'ostt_dvcd'			, type : 'string'		//출고구분코드
		},{	name : 'ostt_qntt'			, type : 'float'		//출고수량
		},{	name : 'sale_qntt'			, type : 'float'		//판매수량
		},{	name : 'dsct_qntt'			, type : 'float'		//중단수량
		},{	name : 'dlvy_memo'			, type : 'string'		//배송메모
		},{	name : 'uper_seqn'			, type : 'float'		//상위순번
		},{	name : 'disp_seqn'			, type : 'float'		//표시순번
		},{	name : 'invc_date'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//Invoice일자
		},{	name : 'drtr_idcd'			, type : 'string'		//담당자ID
		},{	name : 'drtr_name'			, type : 'string'		//담당자명
		},{	name : 'qntt'				, type : 'float'		//미납수량
		},{	name : 'stok_used_qntt'		, type : 'float'		//재고사용수량
		},{	name : 'plan_qntt'			, type : 'float'		//계획수량
		},{	name : 'plan_sttm'			, type : 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//계획일자
		},{	name : 'plan_edtm'			, type : 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//완료예정일자
		},{	name : 'user_memo'			, type : 'string'		//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'		//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'		//부모ID
		},{	name : 'line_levl'			, type : 'float'  , defaultValue: '0'		//ROW레벨
		},{	name : 'line_ordr'			, type : 'string'		//ROW순서
		},{	name : 'line_stat'			, type : 'string' , defaultValue: '0'		//ROW상태
		},{	name : 'line_clos'			, type : 'string'		//ROW마감
		},{	name : 'find_name'			, type : 'string'		//찾기명
		},{	name : 'updt_user_name'		, type : 'string'		//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'		//수정IP
		},{	name : 'updt_dttm'			, type : 'string'		//수정일시
		},{	name : 'updt_idcd'			, type : 'string'		//수정ID
		},{	name : 'updt_urif'			, type : 'string'		//수정UI
		},{	name : 'crte_user_name'		, type : 'string'		//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'		//생성IP
		},{	name : 'crte_dttm'			, type : 'string'		//생성일시
		},{	name : 'crte_idcd'			, type : 'string'		//생성ID
		},{	name : 'crte_urif'			, type : 'string'		//생성UI
		}
	]
});
