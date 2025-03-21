Ext.define('module.custom.inkopack.prod.workentry.model.WorkEntryProrPopup',{ extend:'Axt.data.Model',
	fields : [
		{	name : 'hq_id'				, type : 'string'  , defaultValue : _global.hq_id
		},{	name : 'invc_numb'			, type : 'string'		//Invoice번호
		},{	name : 'line_seqn'			, type : 'string'		//순번
		},{	name : 'bzpl_idcd'			, type : 'string'		//사업장ID
		},{	name : 'item_idcd'			, type : 'string'		//품목ID
		},{	name : 'item_code'			, type : 'string'		//품목코드
		},{	name : 'item_name'			, type : 'string'		//품명
		},{	name : 'item_spec'			, type : 'string'		//품목규격
		},{	name : 'mold_idcd'			, type : 'string'		//금형ID
		},{	name : 'mold_code'			, type : 'string'		//금형코드
		},{	name : 'mold_name'			, type : 'string'		//금형명
		},{	name : 'cvic_idcd'			, type : 'string'		//설비ID
		},{	name : 'cvic_code'			, type : 'string'		//설비코드
		},{	name : 'cvic_name'			, type : 'string'		//설비코드
		},{	name : 'mtrl_bacd'			, type : 'string'		//재질명
		},{	name : 'mtrl_name'			, type : 'string'		//재질명
		},{	name : 'dayn_dvcd'			, type : 'string'		//주야구분
		},{	name : 'cstm_idcd'			, type : 'string'		//거래처ID
		},{	name : 'cstm_code'			, type : 'string'		//거래처코드
		},{	name : 'cstm_nmae'			, type : 'string'		//거래처명
		},{	name : 'prod_dept_idcd'		, type : 'string'		//생산부서ID
		},{	name : 'orig_invc_numb'		, type : 'string'		//원INVOICE번호
		},{	name : 'lott_numb'			, type : 'string'		//LOT번호
		},{	name : 'bomt_degr'			, type : 'float'		//BOM차수
		},{	name : 'stok_used_qntt'		, type : 'float'		//재고사용수량
		},{	name : 'unit_idcd'			, type : 'string'		//단위ID
		},{	name : 'indn_qntt'			, type : 'string'		//지시수량
		},{	name : 'work_strt_dttm'		, type : 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr		//작업시작시간
		},{	name : 'work_endd_dttm'		, type : 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr		//작업종료시간
		},{	name : 'work_dvcd'			, type : 'string'		//작업구분
		},{	name : 'insp_wkct_yorn'		, type : 'string'		//검사공정여부
		},{	name : 'last_wkct_yorn'		, type : 'string'		//최종공정여부
		},{	name : 'cofm_yorn'			, type : 'string'		//확정여부
		},{	name : 'remk_text'			, type : 'string'		//비고
		},{	name : 'prog_stat_dvcd'		, type : 'string'		//진행상태구분코드
		},{	name : 'pckg_cotr_bacd'		, type : 'string'		//포장용기분류코드
		},{	name : 'pckg_cotr_name'		, type : 'string'		//포장용기명
		},{	name : 'uper_seqn'			, type : 'float'		//상위순번
		},{	name : 'disp_seqn'			, type : 'float'		//표시순번
		},{	name : 'pdod_date'			, type : 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//지시일자
		},{	name : 'acpt_numb'			, type : 'string'		//수주번호
		},{	name : 'acpt_seqn'			, type : 'string'		//수주순번
		},{	name : 'plan_sttm1'			, type : 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//시작일자
		},{	name : 'plan_sttm2'			, type : 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr		//시작시간
		},{	name : 'plan_edtm1'			, type : 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//완료일자
		},{	name : 'plan_edtm2'			, type : 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr		//완료시간
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
