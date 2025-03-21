Ext.define('module.custom.komec.prod.prodplan.model.ProdPlanListerMaster4', { extend: 'Axt.data.Model',
	fields: [
		{	name : 'invc_numb'			, type: 'string'	//INVOICE번호
		},{	name : 'line_seqn'			, type: 'float'		//순번
		},{	name : 'lott_numb'			, type: 'string'	//LOT번호
		},{	name : 'drtr_name'			, type: 'string'	//담당자명
		},{	name : 'drtr_idcd'			, type: 'string'	//담당자ID
		},{	name : 'bzpl_idcd'			, type: 'string'	//사업장ID
		},{	name : 'wkfw_idcd'			, type: 'string'	//공정흐름ID
		},{	name : 'wkfw_seqn'			, type: 'float'		//공정흐름순번
		},{	name : 'wkct_idcd'			, type: 'string'	//공정ID
		},{	name : 'cvic_idcd'			, type: 'string'	//설비ID
		},{	name : 'otod_yorn'			, type: 'boolean'	//외주여부
		},{	name : 'otod_cstm_idcd'		, type: 'string'	//외주거래처ID
		},{	name : 'wkct_item_idcd'		, type: 'string'	//공정품목ID
		},{	name : 'mold_idcd'			, type: 'string'	//금형ID
		},{	name : 'mtrl_bacd'			, type: 'string'	//재질분류코드
		},{	name : 'dayn_dvcd'			, type: 'string'	//주야구분코드
		},{	name : 'prod_dept_idcd'		, type: 'string'	//생산부서ID
		},{	name : 'orig_invc_numb'		, type: 'string'	//원INVOICE번호
		},{	name : 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name : 'item_idcd'			, type: 'string'	//품목ID
		},{	name : 'bomt_degr'			, type: 'float'		//BOM차수
		},{	name : 'unit_idcd'			, type: 'string'	//단위ID
		},{	name : 'acpt_qntt'			, type: 'float'		//수주수량
		},{	name : 'stok_used_qntt'		, type: 'float'		//재고사용수량
		},{	name : 'indn_qntt'			, type: 'float'		//지시수량
		},{	name : 'indn_qntt_1fst'		, type: 'float'		//지시수량1
		},{	name : 'plan_strt_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime	//계획시작일시
		},{	name : 'plan_endd_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime	//계획종료일시
		},{	name : 'pref_rank'			, type: 'float'		//우선순위
		},{	name : 'work_strt_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime	//작업시작일시
		},{	name : 'work_endd_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime	//작업종료일시
		},{	name : 'work_dvcd'			, type: 'string'	//작업구분코드
		},{	name : 'remk_text'			, type: 'string'	//비고
		},{	name : 'prog_stat_dvcd'		, type: 'string'	//진행상태구분코드
		},{	name : 'pckg_cotr_bacd'		, type: 'string'	//포장용기분류코드
		},{	name : 'uper_seqn'			, type: 'float'		//상위순번
		},{	name : 'disp_seqn'			, type: 'float'		//표시순번
		},{	name : 'wkct_name'			, type: 'string'	//공정명

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
		},{	name : 'crte_user_name'		, type : 'string'		//생성UI
		}
	]
});