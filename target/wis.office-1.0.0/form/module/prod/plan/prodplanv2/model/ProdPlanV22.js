Ext.define('module.prod.plan.prodplanv2.model.ProdPlanV22', { extend:'Axt.data.Model',
	fields : [
		{	name : 'hq_id'				, type : 'string'  , defaultValue : _global.hq_id
		},{	name : 'invc_numb'			, type : 'string'		//Invoice번호
		},{	name : 'bzpl_idcd'			, type : 'string'		//사업장ID
		},{	name : 'item_idcd'			, type : 'string'		//품목ID
		},{	name : 'item_code'			, type : 'string'		//품목코드
		},{	name : 'item_name'			, type : 'string'		//품명
		},{	name : 'item_spec'			, type : 'string'		//품목규격
		},{	name : 'mold_code'			, type : 'string'		//금형코드
		},{	name : 'mtrl_name'			, type : 'string'		//재질명
		},{	name : 'cstm_idcd'			, type : 'string'		//거래처ID
		},{	name : 'prod_line_idcd'		, type : 'string'		//생산라인ID
		},{	name : 'prod_line_name'		, type : 'string'		//생산라인명
		},{	name : 'acpt_numb'			, type : 'string'		//수주번호
		},{	name : 'pcod_numb'			, type : 'string'		//PONO
		},{	name : 'lott_numb'			, type : 'string'		//lot번호
		},{	name : 'item_lcls_idcd'		, type : 'string'		//품목대분류ID
		},{	name : 'item_mcls_idcd'		, type : 'string'		//품목중분류ID
		},{	name : 'item_scls_idcd'		, type : 'string'		//품목소분류ID
		},{	name : 'bomt_degr'			, type : 'float'		//BOM차수
		},{	name : 'optn_yorn'			, type : 'string'		//사양여부
		},{	name : 'optn_sbsc'			, type : 'string'		//사양항목
		},{	name : 'optn_sbsc_valu'		, type : 'string'		//사양항목값
		},{	name : 'plan_date'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//계획일자
		},{	name : 'plan_sttm'			, type : 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr	//시작일시
		},{	name : 'plan_edtm'			, type : 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr	//완료일시
		},{	name : 'plan_qntt'			, type : 'float'		//계획수량
		},{	name : 'cmpl_schd_date'		, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//완료예정일자
		},{	name : 'mngt_dept_idcd'		, type : 'string'		//관리부서ID
		},{	name : 'trst_dept_idcd'		, type : 'string'		//의뢰부서ID
		},{	name : 'trst_drtr_name'		, type : 'string'		//의뢰담당자명
		},{	name : 'drtr_name'			, type : 'string'		//담당자명
		},{	name : 'trst_drtr_idcd'		, type : 'string'		//의뢰담당자ID
		},{	name : 'prod_trst_dvcd'		, type : 'string'		//생산의뢰구분코드
		},{	name : 'prod_trst_numb'		, type : 'string'		//생산의뢰번호
		},{	name : 'trst_qntt'			, type : 'float'		//의뢰수량
		},{	name : 'cmpl_reqt_date'		, type : 'string'		//완료요청일자
		},{	name : 'curr_stok_qntt'		, type : 'float'		//현재재고수량
		},{	name : 'cofm_drtr_idcd'		, type : 'string'		//확정담당자ID
		},{	name : 'cofm_date'			, type : 'string'		//확정일자
		},{	name : 'last_wker_idcd'		, type : 'string'		//최종작업자ID
		},{	name : 'last_work_date'		, type : 'string'		//최종작업일자
		},{	name : 'remk_text'			, type : 'string'		//비고
		},{	name : 'stok_used_qntt'		, type : 'float'		//재고사용수량
		},{	name : 'deli_date'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납기일자
		},{	name : 'cstm_deli_date'		, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//고객납기일자
		},{	name : 'invc_date'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//Invoice일자
		},{	name : 'deli_chge_resn'		, type : 'string'		//납기조정사유
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
