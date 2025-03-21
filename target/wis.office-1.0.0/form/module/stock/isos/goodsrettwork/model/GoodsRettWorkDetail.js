Ext.define('module.stock.isos.goodsrettwork.model.GoodsRettWorkDetail',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'				,type: 'string'		// INVOICE번호
		},{	name: 'line_seqn'				,type: 'float'		// 순번
		},{	name: 'acpt_numb'				,type: 'string'		// 수주번호
		},{	name: 'acpt_seqn'				,type: 'float'		// 수주순번
		},{	name: 'dlvy_numb'				,type: 'string'		// 납품번호
		},{	name: 'dlvy_seqn'				,type: 'float'		// 납품순번
		},{	name: 'item_idcd'				,type: 'string'		// 품목ID
		},{	name: 'unit_idcd'				,type: 'string'		// 단위ID
		},{	name: 'wrhs_idcd'				,type: 'string'		// 창고ID
		},{	name: 'zone_idcd'				,type: 'string'		// 구역ID
		},{	name: 'rett_resn_dvcd'			,type: 'string'		// 반품사유구분코드
		},{	name: 'norm_sale_pric'			,type: 'float'		// 정상판매단가
		},{	name: 'sale_stnd_pric'			,type: 'float'		// 판매기준단가
		},{	name: 'sale_pric'				,type: 'float'		// 판매단가
		},{	name: 'rett_qntt'				,type: 'float'		// 반품수량
		},{	name: 'vatx_incl_yorn'			,type: 'string'		// 부가세포함여부
		},{	name: 'vatx_rate'				,type: 'float'		// 부가세율
		},{	name: 'sply_amnt'				,type: 'float'		// 공급가액
		},{	name: 'vatx_amnt'				,type: 'float'		// 부가세금액
		},{	name: 'ttsm_amnt'				,type: 'float'		// 합계금액
		},{	name: 'rett_proc_dvcd'			,type: 'string'	, defaultValue: '1000'	// 반품처리구분코드
		},{	name: 'proc_drtr_idcd'			,type: 'string'		// 처리담당자ID
		},{	name: 'proc_dttm'				,type: 'string'		// 처리일시
		},{	name: 'apvl_date'				,type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		// 승인일자
		},{	name: 'apvl_drtr_idcd'			,type: 'string'		// 승인담당자ID
		},{	name: 'rett_memo'				,type: 'string'		// 반품메모
		},{	name: 'lott_numb'				,type: 'string'		// LOT번호
		},{	name: 'orig_invc_numb'			,type: 'string'		// 원INVOICE번호
		},{	name: 'invc_orgn'				,type: 'string'		// 원INVOICE번호
		},{	name: 'acpt_dvcd'				,type: 'string'		// 수주구분
		},{	name: 'prod_trst_dvcd'			,type: 'string'		// 생산구분
		},{	name: 'orig_seqn'				,type: 'float'		// 원순번
		},{	name: 'uper_seqn'				,type: 'float'		// 상위순번
		},{	name: 'disp_seqn'				,type: 'float'		// 표시순번
		},{	name: 'user_memo'				,type: 'string'		// 사용자메모
		},{	name: 'sysm_memo'				,type: 'string'		// 시스템메모
		},{	name: 'prnt_idcd'				,type: 'string'		// 부모ID
		},{	name: 'line_levl'				,type: 'float'  , defaultValue: '0'		// ROW레벨
		},{	name: 'line_ordr'				,type: 'float'		// ROW순서
		},{	name: 'line_stat'				,type: 'string' , defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'				,type: 'string'		// ROW마감
		},{	name: 'find_name'				,type: 'string'		// 찾기명
		},{	name: 'updt_user_name'			,type: 'string'		// 수정사용자명
		},{	name: 'updt_ipad'				,type: 'string'		// 수정IP
		},{	name: 'updt_dttm'				,type: 'string'		// 수정일시
		},{	name: 'updt_idcd'				,type: 'string'		// 수정ID
		},{	name: 'updt_urif'				,type: 'string'		// 수정UI
		},{	name: 'crte_user_name'			,type: 'string'		// 생성사용자명
		},{	name: 'crte_ipad'				,type: 'string'		// 생성IP
		},{	name: 'crte_dttm'				,type: 'string'		// 생성일시
		},{	name: 'crte_idcd'				,type: 'string'		// 생성ID
		},{	name: 'crte_urif'				,type: 'string'		// 생성UI
		},{	name: 'item_code'				,type: 'string'		// 품목코드
		},{	name: 'item_name'				,type: 'string'		// 품명
		},{	name: 'cstm_idcd'				,type: 'string'		// 품목규격
		},{	name: 'cstm_name'				,type: 'string'		// 품목규격
		},{	name: 'item_spec'				,type: 'string'		// 품목규격
		},{	name: 'unit_idcd'				,type: 'string'		// 단위id
		},{	name: 'wrhs_code'				,type: 'string'		// 창고코드
		},{	name: 'wrhs_name'				,type: 'string'		// 창고명
		}
	]
});
