Ext.define('module.custom.hantop.item.bommast.model.BomMast',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'brnd_bacd',			type: 'string'},		//브랜드분류코드
		{	name: 'wdcl_idcd',			type: 'string'},		//창호분류ID
		{	name: 'wdgr_idcd',			type: 'string'},		//창호그룹ID
		{	name: 'line_seqn',			type: 'float'  , defaultValue: '0'},	//순번
		{	name: 'frst_bacd',			type: 'string'},		//1차분류코드
		{	name: 'send_bacd',			type: 'string'},		//2차분류코드
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'need_qntt',			type: 'float'  , defaultValue: '1'},	//소요수량
		{	name: 'esnt_yorn',			type: 'string' },		//필수여부
		{	name: 'calc_frml',			type: 'string' },		//계산공식
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},	//ROW레벨
		{	name: 'line_ordr',			type: 'float'  , defaultValue: '0'},	//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},	//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime},	//수정일시
		{	name: 'updt_idcd',			type: 'string' , defaultValue: _global.login_pk},			//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime},	//생성일시
		{	name: 'crte_idcd',			type: 'string' , defaultValue: _global.login_pk},			//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
		{	name: 'change'	 ,			type: 'string'},		//에디터수정변수
		{	name: 'modify'	 ,			type: 'string'},		//에디터수정변수

		{	name: 'brnd_name',			type: 'string'},		//브랜드명
		{	name: 'bttm_clmm',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'glss_fixh_hght',		type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'moss_rail_hght',		type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'side_clmm',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'ssbr_hght',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'topp_clmm',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'item_widh',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'item_hght',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'item_tick',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'rail_hght',			type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'auto_cutt_yorn',		type: 'float'  , defaultValue: '0'},		//브랜드명
		{	name: 'auto_weld_yorn',		type: 'float'  , defaultValue: '0'},		//브랜드명
	]
});
