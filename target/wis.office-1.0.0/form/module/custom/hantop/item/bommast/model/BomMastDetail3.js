Ext.define('module.custom.hantop.item.bommast.model.BomMastDetail3',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'line_seqn',			type: 'float'  , defaultValue: '0', mapping : 'resource.line_seqn'},	//순번
		{	name: 'item_idcd',			type: 'string' , mapping : 'resource.item_idcd'},		//품목ID
		{	name: 'need_qntt',			type: 'float'  , defaultValue: '1', mapping : 'resource.need_qntt'},
		{	name: 'text'	,			type: 'string', mapping : 'resource.item_name' },
		{	name: 'acct_bacd',			type: 'string', mapping : 'resource.acct_bacd' },
		{	name: 'brnd_bacd',			type: 'string', mapping : 'resource.brnd_bacd'},		//브랜드분류코드
		{	name: 'wdtp_idcd',			type: 'string', mapping : 'resource.wdtp_idcd'},		//창호타입ID
		{	name: 'wndw_modl_idcd',		type: 'string', mapping : 'resource.wndw_modl_idcd'},	//창호모델ID
		{	name: 'bfsf_dvcd',			type: 'string', mapping : 'resource.bfsf_dvcd'},		//틀짝망구분코드
		{	name: 'wdmt_dvcd',			type: 'string', mapping : 'resource.wdmt_dvcd'},		//창호자재구분코드
		{	name: 'wndw_itid',			type: 'string', mapping : 'resource.wndw_itid'},		//창호품목ID
		{	name: 'esnt_yorn',			type: 'string', mapping : 'resource.esnt_yorn', defaultValue : 0},		//필수여부
		{	name: 'item_widh',			type: 'float' , mapping : 'resource.item_widh'},		//품목폭
		{	name: 'item_hght',			type: 'float' , mapping : 'resource.item_hght'},		//품목높이
		{	name: 'item_tick',			type: 'float' , mapping : 'resource.item_tick'},		//품목두께
		{	name: 'rail_hght',			type: 'float' , mapping : 'resource.rail_hght'},		//레일높이
		{	name: 'glss_fixh_hght',		type: 'float' , mapping : 'resource.glss_fixh_hght'},		//유리고정턱높이
		{	name: 'moss_rail_hght',		type: 'float' , mapping : 'resource.moss_rail_hght'},		//방충망레일높이
		{	name: 'ssbr_hght',			type: 'float' , mapping : 'resource.ssbr_hght'},		//SS바높이
		{	name: 'topp_clmm',			type: 'float' , mapping : 'resource.topp_clmm'},		//상부걸림치수
		{	name: 'bttm_clmm',			type: 'float' , mapping : 'resource.bttm_clmm'},		//하부걸림치수
		{	name: 'side_clmm',			type: 'float' , mapping : 'resource.side_clmm'},		//측부걸림치수
		{	name: 'calc_frml',			type: 'string', mapping : 'resource.calc_frml'},		//계산공식
		{	name: 'auto_cutt_yorn',		type: 'string', mapping : 'resource.auto_cutt_yorn'},		//자동절단여부
		{	name: 'auto_weld_yorn',		type: 'string', mapping : 'resource.auto_weld_yorn'},		//자동용접여부

		{	name: 'user_memo',			type: 'string', mapping : 'resource.user_memo'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string', mapping : 'resource.sysm_memo'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string', mapping : 'resource.prnt_idcd'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0', mapping : 'resource.line_levl'},	//ROW레벨
		{	name: 'line_ordr',			type: 'float'  , defaultValue: '0', mapping : 'resource.line_ordr'},	//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0', mapping : 'resource.line_stat'},	//ROW상태
		{	name: 'line_clos',			type: 'float'  , defaultValue: '0', mapping : 'resource.line_clos'},	//ROW마감
		{	name: 'find_name',			type: 'string', mapping : 'resource.find_name'},		//찾기명
		{	name: 'updt_user_name',		type: 'string', mapping : 'resource.updt_user_name'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string', mapping : 'resource.updt_ipad'},		//수정IP
		{	name: 'updt_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime, mapping : 'resource.updt_dttm'},	//수정일시
		{	name: 'updt_idcd',			type: 'string' , defaultValue: _global.login_pk, mapping : 'resource.updt_idcd'},			//수정ID
		{	name: 'updt_urif',			type: 'string', mapping : 'resource.updt_urif'},		//수정UI
		{	name: 'crte_user_name',		type: 'string', mapping : 'resource.crte_user_name'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string', mapping : 'resource.crte_ipad'},		//생성IP
		{	name: 'crte_dttm',			type: 'string', convert : Ext.util.Format.strToDateTime, mapping : 'resource.crte_dttm'},	//생성일시
		{	name: 'crte_idcd',			type: 'string', defaultValue: _global.login_pk, mapping : 'resource.crte_idcd'},			//생성ID
		{	name: 'crte_urif',			type: 'string', mapping : 'resource.crte_urif'},		//생성UI
		{	name: 'change'	 ,			type: 'string', mapping : 'resource.change'},		//에디터수정변수
		{	name: 'modify'	 ,			type: 'string', mapping : 'resource.modify'},		//에디터수정변수

		{	name: 'imge_1fst',			type: 'string', mapping : 'resource.imge_1fst'},		//이미지1

		{	name: 'unit_idcd',			type: 'string', mapping : 'resource.unit_idcd'},		//단위ID
		{	name: 'unit_name',			type: 'string', mapping : 'resource.unit_name'},		//단위명

		{	name: 'item_code',			type: 'string', mapping : 'resource.item_code'},		//품목코드
		{	name: 'item_name',			type: 'string', mapping : 'resource.item_name'},		//품목명
		{	name: 'item_spec',			type: 'string', mapping : 'resource.item_spec'},		//품목ID

		{	name: 'wdgr_code',			type: 'string', mapping : 'resource.wdgr_code'},		//창호그룹코드
		{	name: 'wdgr_name',			type: 'string', mapping : 'resource.wdgr_name'},		//창호그룹명

		{	name: 'wndw_modl_code',		type: 'string', mapping : 'resource.wndw_modl_code'},	//창호모델코드
		{	name: 'modl_name',			type: 'string', mapping : 'resource.modl_name'},		//창호모델명

		{	name: 'brnd_name',			type: 'string', mapping : 'resource.brnd_name'},		//브랜드명



		{	name: 'prnt',				type: 'string', mapping : 'resource.prnt'},
		{	name: 'item',				type: 'string', mapping : 'resource.item'},

	]
});
