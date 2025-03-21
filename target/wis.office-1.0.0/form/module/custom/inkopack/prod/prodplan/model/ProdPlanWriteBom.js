Ext.define('module.custom.inkopack.prod.prodplan.model.ProdPlanWriteBom', { extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'		//Invoice번호
		},{	name : 'new_invc_numb'		, type : 'string'		//new_invc_numb
		},{	name : 'wkct_item_idcd'		, type : 'string'		//wkct_item_idcd
		},{	name : 'wkfw_idcd'			, type : 'string'		//생산라인ID
		},{	name : 'wkfw_name'			, type : 'string'		//생산라인명
		},{	name : 'seqn'				, type : 'float'		//순번
		},{	name : 'line_seqn'			, type : 'float'		//순번
		},{	name : 'bomt_degr'			, type : 'float'		//bom차수
		},{	name : 'lott_numb'			, type : 'string'		//LOT번호
		},{	name : 'acpt_numb'			, type : 'string'		//수주번호
		},{	name : 'pdsd_numb'			, type : 'string'		//생산계획번호
		},{	name : 'acpt_seqn'			, type : 'float'		//수주순번
		},{	name : 'item_idcd'			, type : 'string'		//품목ID
		},{	name : 'item_code'			, type : 'string'		//품목코드
		},{	name : 'item_name'			, type : 'string'		//품명
		},{	name : 'cvic_idcd'			, type : 'string'		//설비ID
		},{	name : 'cvic_code'			, type : 'string'		//설비코드
		},{	name : 'cvic_name'			, type : 'string'		//설비명
		},{	name : 'mold_idcd'			, type : 'string'		//금형ID
		},{	name : 'mold_code'			, type : 'string'		//금형코드
		},{	name : 'mold_name'			, type : 'string'		//금형명
		},{	name : 'mtrl_bacd'			, type : 'string'		//재질
		},{	name : 'mtrl_name'			, type : 'string'		//재질
		},{	name : 'pckg_cotr_bacd'		, type : 'string'		//포장용기
		},{	name : 'pckg_cotr_name'		, type : 'string'		//포장용기
		},{	name : 'used_qntt'			, type : 'float'		//재고사용수량
		},{	name : 'invc_qntt'			, type : 'float'		//재고사용수량
		},{	name : 'indn_qntt'			, type : 'float'		//지시수량
		},{	name : 'prod_qntt'			, type : 'float'		//생산수량
		},{	name : 'plan_qntt'			, type : 'float'		//계획수량
		},{	name : 'unit_qntt'			, type : 'float'		//계획수량
		},{	name : 'stok_used_qntt'		, type : 'float'		//재고사용수량
		},{	name : 'plan_sttm1'			, type : 'string' , convert : Ext.util.Format.strToDate		//시작일자
		},{	name : 'plan_sttm2'			, type : 'string' , convert : Ext.util.Format.strToTime		//시작시간
		},{	name : 'plan_sttm3'			, type : 'string' 		//시작시간
		},{	name : 'plan_sttm4'			, type : 'string' 		//시작시간
		},{	name : 'work_strt_dttm'		, type : 'string'		//시작시간
		},{	name : 'plan_edtm1'			, type : 'string' , serialize: Ext.util.Format.dateToStr		//완료일자
		},{	name : 'plan_edtm2'			, type : 'string' , serialize: Ext.util.Format.dateToStr		//완료시간
		},{	name : 'plan_edtm3'			, type : 'string' 		//완료시간
		},{	name : 'work_endd_dttm'		, type : 'string'		//완료시간
		},{	name : 'pref_rank'			, type : 'string'		//우선순위
		},{	name : 'remk_text'			, type : 'string'		//비고
		},{	name : 'user_memo'			, type : 'string'		//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'		//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'		//부모ID
		},{	name : 'line_levl'			, type : 'float', defaultValue: '0'		//ROW레벨
		},{	name : 'line_ordr'			, type : 'string'		//ROW순서
		},{	name : 'line_stat'			, type : 'string', defaultValue: '0'		//ROW상태
		},{	name : 'line_clos'			, type : 'string'		//ROW마감
		},{	name : 'find_name'			, type : 'string'		//찾기명
		},{	name : 'updt_user_name'		, type : 'string'		//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'		//수정IP
		},{	name : 'updt_dttm'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//수정일시
		},{	name : 'updt_idcd'			, type : 'string'		//수정ID
		},{	name : 'updt_urif'			, type : 'string'		//수정UI
		},{	name : 'crte_user_name'		, type : 'string'		//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'		//생성IP
		},{	name : 'crte_dttm'			, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//생성일시
		},{	name : 'crte_idcd'			, type : 'string'		//생성ID
		},{	name : 'crte_urif'			, type : 'string'		//생성UI
		}
	]
});
