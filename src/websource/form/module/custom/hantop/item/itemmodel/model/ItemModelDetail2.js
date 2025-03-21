Ext.define('module.custom.hantop.item.itemmodel.model.ItemModelDetail2',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'brnd_bacd',				type: 'string'},		//브랜드분류코드
		{	name: 'brnd_name',				type: 'string'},		//브랜드명
		{	name: 'wdgr_idcd',				type: 'string'},		//창호그룹ID
		{	name: 'wdgr_name',				type: 'string'},		//창호그룹명
		{	name: 'pdgr_bacd',				type: 'string'},		//제품군분류
		{	name: 'pdgr_name',				type: 'string'},		//제품군분류명
		{	name: 'wndw_modl_idcd',			type: 'string'},		//창호모델ID
		{	name: 'wndw_modl_code',			type: 'string'},		//창호모델코드
		{	name: 'modl_name',				type: 'string'},		//모델명
		{	name: 'wndw_spec',				type: 'string'},		//창호규격
		{	name: 'wdbf_itid',				type: 'string'},		//BF품목ID
		{	name: 'wdbf_item_name',			type: 'string'},		//BF품목명
		{	name: 'wdsf_itid',				type: 'string'},		//SF품목ID
		{	name: 'wdsf_item_name',			type: 'string'},		//SF품목명
		{	name: 'wdbf_widh',				type: 'float' , defaultValue: '0'},		//BF폭
		{	name: 'wdsf_widh',				type: 'float' , defaultValue: '0'},		//SF폭
		{	name: 'wdbf_rail_hght',			type: 'float' , defaultValue: '0'},		//BF레일높이
		{	name: 'wdbf_hght',				type: 'float' , defaultValue: '0'},		//BF높이
		{	name: 'wdsf_hght',				type: 'float' , defaultValue: '0'},		//SF높이
		{	name: 'side_clmm',				type: 'float' , defaultValue: '0'},		//걸림치수
		{	name: 'wdmc_tick',				type: 'float' , defaultValue: '0'},		//MC두께
		{	name: 'glss_fixh_hght',			type: 'float' , defaultValue: '0'},		//유리고정턱높이
		{	name: 'topp_clmm',				type: 'float' , defaultValue: '0'},		//상부걸림치수
		{	name: 'bttm_clmm',				type: 'float' , defaultValue: '0'},		//하부걸림치수
		{	name: 'wdmf_side_clmm',			type: 'float' , defaultValue: '0'},		//MF측부걸림치수
		{	name: 'wdmf_topp_clmm',			type: 'float' , defaultValue: '0'},		//MF상부걸림치수
		{	name: 'wdmf_bttm_clmm',			type: 'float' , defaultValue: '0'},		//MF상부걸림치수
		{	name: 'ssbr_hght',				type: 'float' , defaultValue: '0'},		//SS바높이
		{	name: 'moss_rail_hght',			type: 'float' , defaultValue: '0'},		//방충망레일높이
		{	name: 'wdmf_hght',				type: 'float' , defaultValue: '0'},		//MF높이
		{	name: 'calc_frml',				type: 'string'},		//계산공식
		{	name: 'wdmc_itid',				type: 'string'},		//MC품목ID
		{	name: 'wdmf_itid',				type: 'string'},		//MF품목ID
		{	name: 'wdgb_itid',				type: 'string'},		//GB품목ID
		{	name: 'wdbf_rein_itid',			type: 'string'},		//BF보강재ID
		{	name: 'wdsf_rein_itid',			type: 'string'},		//SF보강재ID
		{	name: 'wdmf_rein_itid',			type: 'string'},		//MF보강재ID
		{	name: 'wdmc_item_name',			type: 'string'},		//MC품목명
		{	name: 'wdmf_item_name',			type: 'string'},		//MF품목명
		{	name: 'wdgb_item_name',			type: 'string'},		//GB품목명
		{	name: 'wdbf_rein_name',			type: 'string'},		//BF보강재명
		{	name: 'wdsf_rein_name',			type: 'string'},		//SF보강재명
		{	name: 'wdbf_auto_cutt_yorn',	type: 'string'},		//BF자동절단여부
		{	name: 'wdbf_auto_weld_yorn',	type: 'string'},		//BF자동용접여부
		{	name: 'wdsf_auto_cutt_yorn',	type: 'string'},		//SF자동절단여부
		{	name: 'wdsf_auto_weld_yorn',	type: 'string'},		//SF자동용접여부
		{	name: 'athd_csvl',				type: 'float' , defaultValue: '0'},		//자동핸들보정값
		{	name: 'mnhd_csvl',				type: 'float' , defaultValue: '0'},		//수동핸들보정값
		{	name: 'butn_yorn',				type: 'float' , defaultValue: 0},		//


		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},	//ROW레벨
		{	name: 'line_ordr',			type: 'float'  , defaultValue: '0'},	//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},	//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime},	//수정일시
		{	name: 'updt_idcd',			type: 'string' , defaultValue: _global.login_pk},			//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string' , convert : Ext.util.Format.strToDateTime},	//생성일시
		{	name: 'crte_idcd',			type: 'string' , defaultValue: _global.login_pk},			//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI

	]
});
