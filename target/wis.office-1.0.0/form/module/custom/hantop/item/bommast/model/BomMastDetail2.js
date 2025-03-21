Ext.define('module.custom.hantop.item.bommast.model.BomMastDetail2',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'brnd_bacd',			type: 'string'},		//브랜드분류코드
		{	name: 'wndw_modl_idcd',		type: 'string'},		//창호모델ID
		{	name: 'wdgr_idcd',			type: 'string'},		//창호그룹ID
		{	name: 'wndw_modl_code',		type: 'string'},		//창호모델코드
		{	name: 'modl_name',			type: 'string'},		//모델명
		{	name: 'pdgr_bacd',			type: 'string'},		//제품군분류코드
		{	name: 'wndw_spec',			type: 'string'},		//창호규격
		{	name: 'wdbf_itid',			type: 'string'},		//BF품목ID
		{	name: 'wdsf_itid',			type: 'string'},		//SF품목ID
		{	name: 'wdbf_widh',			type: 'string'},		//BF폭
		{	name: 'wdsf_widh',			type: 'string'},		//SF폭
		{	name: 'wdmc_itid',			type: 'string'},		//MC품목ID
		{	name: 'wdmf_itid',			type: 'string'},		//MF품목ID
		{	name: 'wdgb_itid',			type: 'string'},		//GB품목ID
		{	name: 'wdbf_rein_itid',		type: 'string'},		//BF보강재품목ID
		{	name: 'wdsf_rein_itid',		type: 'string'},		//SF보강재품목ID
		{	name: 'wdmf_rein_itid',		type: 'string'},		//MF보강재품목ID
		{	name: 'wdbf_rail_hght',		type: 'string'},		//BF레일높이
		{	name: 'wdbf_hght',			type: 'string'},		//BF높이
		{	name: 'wdsf_hght',			type: 'string'},		//SF높이
		{	name: 'side_clmm',			type: 'string'},		//측부걸림치수
		{	name: 'wdmc_tick',			type: 'string'},		//MC두께
		{	name: 'glss_fixh_hght',		type: 'string'},		//유리고정턱높이
		{	name: 'topp_clmm',			type: 'string'},		//상부걸림치수
		{	name: 'bttm_clmm',			type: 'string'},		//하부걸림치수
		{	name: 'wdmf_side_clmm',		type: 'string'},		//MF측부걸림치수
		{	name: 'wdmf_topp_clmm',		type: 'string'},		//MF상부걸림치수
		{	name: 'wdmf_bttm_clmm',		type: 'string'},		//MF하부걸림치수
		{	name: 'ssbr_hght',			type: 'string'},		//SS바높이
		{	name: 'moss_rail_hght',		type: 'string'},		//방충망레일높이
		{	name: 'wdmf_hght',			type: 'string'},		//MF높이
		{	name: 'calc_frml',			type: 'string'},		//계산공식
		{	name: 'wdbf_auto_cutt_yorn',type: 'string'},		//BF자동절단여부
		{	name: 'wdbf_auto_weld_yorn',type: 'string'},		//BF자동용접여부
		{	name: 'wdsf_auto_cutt_yorn',type: 'string'},		//SF자동절단여부
		{	name: 'wdsf_auto_weld_yorn',type: 'string'},		//SF자동용접여부

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

		{	name: 'wdtp_code',			type: 'string'},		//창호형태코드
		{	name: 'wdtp_name',			type: 'string'},		//창호형태명
		{	name: 'wdtp_idcd',			type: 'string'},		//창호ID


	]
});
