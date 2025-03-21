Ext.define('lookup.popup.model.ShetPopupDetail',{ extend:'Axt.data.Model',
	fields: [
		{name: 'shet_idcd',				type: 'string'},	//용지ID
		{name: 'line_seqn',				type: 'float'},		//순번
		{name: 'shet_wght',				type: 'float', defaultValue: 0},		//용지무게
		{name: 'colr_name',				type: 'string'},	//컬러명
		{name: 'colr_bacd',				type: 'string'},	//컬러코드
		{name: 'stnd_pric',				type: 'float', defaultValue: 0},		//표준단가
		{name: 'puch_pric',				type: 'float', defaultValue: 0},		//구매단가
		{name: 'esti_pric',				type: 'float', defaultValue: 0},		//견적단가
		{name: 'sale_pric',				type: 'float', defaultValue: 0},		//판매단가
		{name: 'sprt_blwt_pric',		type: 'float', defaultValue: 0},		//단면인쇄흑백단가
		{name: 'dprt_blwt_pric',		type: 'float', defaultValue: 0},		//양면인쇄흑면단가
		{name: 'sprt_colr_pric',		type: 'float', defaultValue: 0}, 		//단면인쇄컬러단가
		{name: 'dprt_colr_pric',		type: 'float', defaultValue: 0},		//양면인쇄컬러단가
		{name: 'mixx_blwt_sprt_pric',	type: 'float', defaultValue: 0},		//혼합흑백단면인쇄단가
		{name: 'mixx_blwt_dprt_pric',	type: 'float', defaultValue: 0},		//혼합흑백양면인쇄단가
		{name: 'mixx_colr_sprt_pric',	type: 'float', defaultValue: 0},		//혼합컬러단면인쇄단가
		{name: 'mixx_colr_dprt_pric',	type: 'float', defaultValue: 0},		//혼합컬러양면인쇄단가

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
