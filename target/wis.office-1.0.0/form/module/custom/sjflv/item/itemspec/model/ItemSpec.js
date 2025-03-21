Ext.define( 'module.custom.sjflv.item.itemspec.model.ItemSpec', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'item_code'			, type: 'string' },		//소분류id
		{	name: 'item_name'			, type: 'string' },		//소분류id
		{	name: 'item_spec'			, type: 'string' },		//소분류id
		{	name: 'lcls_name'			, type: 'string' },		//소분류id
		{	name: 'mcls_name'			, type: 'string' },		//소분류id
		{	name: 'scls_name'			, type: 'string' },		//소분류id
		{	name: 'appr'				, type: 'string' },		//Apperarance
		{	name: 'test_ordr'			, type: 'string' },		//Test And ORDR
		{	name: 'dnst'				, type: 'string' },		//Density
		{	name: 'rfct_indx'			, type: 'string' },		//Refractive Index
		{	name: 'asen'				, type: 'string' },		//Arsenic
		{	name: 'hmtl'				, type: 'string' },		//중금속
		{	name: 'lead'				, type: 'string' },		//납
		{	name: 'alin_mtrl'			, type: 'string' },		//이물
		{	name: 'ingd'				, type: 'string' },		//Ingredients
		{	name: 'slvt_carr'			, type: 'string' },		//Solvent/Carrier
		{	name: 'shlf_life'			, type: 'string' },		//Shelf Life
		{	name: 'strg_cond'			, type: 'string' },		//Storage Conditions
		{	name: 'melt_pont'			, type: 'string' },		//Melting Point
		{	name: 'flsh_pont'			, type: 'string' },		//Flash Point
		{	name: 'ph'					, type: 'string' },		//PH
		{	name: 'ecil'				, type: 'string' },		//E-Coil
		{	name: 'vtrl_cont'			, type: 'string' },		//Vacterrial Count
		{	name: 'brix'				, type: 'string' },		//Brix
		{	name: 'guis'				, type: 'string' },		//외관
		{	name: 'etcc_cont'			, type: 'string' },		//기타내용
		{	name: 'etcc_memo'			, type: 'string' },		//기타내용
		{	name: 'remk_text'			, type: 'string' },		//비고
		{	name: 'acct_bacd_name'		, type: 'string' },		//계정구분

		{	name: 'brix_yorn'			, type: 'string' },		//Brix 여부
		{	name: 'ph_yorn'				, type: 'string' },		//PH 여부
		{	name: 'ecil_yorn'			, type: 'string' },		//알레르기 여부
		{	name: 'ingd_yorn'			, type: 'string' },		//첨부 여부
		{	name: 'chng_valu'			, type: 'float'   , defaultValue: '0'},		//변경값

		{	name: 'user_memo'			, type: 'string' },		//사용자메모
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
