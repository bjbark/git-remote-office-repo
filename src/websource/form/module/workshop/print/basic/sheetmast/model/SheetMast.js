Ext.define('module.workshop.print.basic.sheetmast.model.SheetMast',{ extend:'Axt.data.Model',
	fields: [
		{name: 'shet_idcd',				type: 'string'},	//용지ID
		{name: 'shet_code',				type: 'string'},	//용지코드
		{name: 'shet_name',				type: 'string'},	//용지명
		{name: 'lcls_idcd',				type: 'string'},	//대분류ID
		{name: 'mcls_idcd',				type: 'string'},	//중분류ID
		{name: 'scls_idcd',				type: 'string'},	//소분류ID
		{name: 'lcls_name',				type: 'string'},	//대분류명
		{name: 'mcls_name',				type: 'string'},	//중분류명
		{name: 'scls_name',				type: 'string'},	//소분류명
		{name: 'horz_leng',				type: 'float'},		//가로길이
		{name: 'vrtl_leng',				type: 'float'},		//세로길이
		{name: 'shet_wght',				type: 'int'},		//용지무게
		{name: 'colr_name',				type: 'string'},	//컬러명
		{name: 'colr_bacd',				type: 'string'},	//컬러코드
		{name: 'base_name',				type: 'string'},	//컬러코드
		{name: 'clss_desc',				type: 'string'},	//
		{name: 'stnd_pric',				type: 'float'},		//표준단가
		{name: 'puch_pric',				type: 'float'},		//구매단가
		{name: 'esti_pric',				type: 'float'},		//견적단가
		{name: 'sale_pric',				type: 'float'},		//판매단가
		{name: 'sprt_blwt_pric',		type: 'float'},		//단면인쇄흑백단가
		{name: 'dprt_blwt_pric',		type: 'float'},		//양면인쇄흑면단가
		{name: 'sprt_colr_pric',		type: 'float'}, 	//단면인쇄컬러단가
		{name: 'dprt_colr_pric',		type: 'float'},		//양면인쇄컬러단가
		{name: 'shet_size_dvcd',		type: 'string'},	//용지사이즈구분코드
		{name: 'insert',				type: 'string'},	//insert

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
