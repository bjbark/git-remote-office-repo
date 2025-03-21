Ext.define( 'module.custom.hantop.item.itemcam.model.ItemCamMaster', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'brnd_bacd'			, type: 'string'	//브랜드분류코드
		},{	name: 'brnd_name'			, type: 'string'	//브랜드분류명
		},{	name: 'bfsf_dvcd'			, type: 'string'	//bfsf구분코드
		},{	name: 'item_idcd'			, type: 'string'	//품목ID
		},{	name: 'item_code'			, type: 'string'	//품목코드
		},{	name: 'cstm_item_code'		, type: 'string'	//거래처품목코드
		},{	name: 'item_name'			, type: 'string'	//품목명
		},{	name: 'proc_item_name'		, type: 'string'	//가공품목명
		},{	name: 'item_widh'			, type: 'float ' , defaultValue: '0'	//품목폭
		},{	name: 'item_hght'			, type: 'float ' , defaultValue: '0'	//품목높이
		},{	name: 'item_dpth'			, type: 'float ' , defaultValue: '0'	//품목깊이
		},{	name: 'bsmt_leng'			, type: 'float ' , defaultValue: '0'	//품목길이
		},{	name: 'open_widh'			, type: 'float ' , defaultValue: '0'	//개공폭
		},{	name: 'dbwd_yorn'			, type: 'string'	//이중창여부
		},{	name: 'cmbf_yorn'			, type: 'string'	//공틀여부
		},{	name: 'brcd_hght'			, type: 'float ' , defaultValue: '0'	//바코드높이
		},{	name: 'brcd_plac'			, type: 'float ' , defaultValue: '0'	//바코드위치
		},{	name: 'assa_yorn'			, type: 'string'	//아사여부
		},{	name: 'hdho_type_dvcd'		, type: 'string'	//핸드홀타입구분코드
		},{	name: 'hdho_1pcs_hght'		, type: 'float ' , defaultValue: '0'	//핸드홀1P높이
		},{	name: 'hdho_2pcs_hght'		, type: 'float ' , defaultValue: '0'	//핸드홀2P높이
		},{	name: 'hdho_hght_grip_1fst'	, type: 'float ' , defaultValue: '0'	//핸드홀높이그립1
		},{	name: 'hdho_hght_grip_2snd'	, type: 'float ' , defaultValue: '0'	//핸드홀높이그립2
		},{	name: 'hdho_qntt'			, type: 'float ' , defaultValue: '0'	//핸드홀수
		},{	name: 'hdho_itvl'			, type: 'float ' , defaultValue: '0'	//핸드홀간격
		},{	name: 'hdho_pass_yorn'		, type: 'string'	//핸드홀관통여부
		},{	name: 'lkho_incl_yorn'		, type: 'string'	//락킹홀포함여부
		},{	name: 'lkho_1pcs_widh'		, type: 'float ' , defaultValue: '0'	//락킹홀1P폭
		},{	name: 'lkho_1pcs_leng'		, type: 'float ' , defaultValue: '0'	//락킹홀1P길이
		},{	name: 'lkho_2pcs_widh'		, type: 'float ' , defaultValue: '0'	//락킹홀2P폭
		},{	name: 'lkho_2pcs_leng'		, type: 'float ' , defaultValue: '0'	//락킹홀2P길이
		},{	name: 'lkho_plac_cpsn'		, type: 'float ' , defaultValue: '0'	//락킹홀위치보정
		},{	name: 'lkho_grip_leng_1fst'	, type: 'float ' , defaultValue: '0'	//락킹홀그립길이1
		},{	name: 'rnpc_widh_1fst'		, type: 'float ' , defaultValue: '0'	//고리펀칭폭1
		},{	name: 'rnpc_widh_2snd'		, type: 'float ' , defaultValue: '0'	//고리펀칭폭2
		},{	name: 'omhd_widh'			, type: 'float ' , defaultValue: '0'	//오목핸들폭
		},{	name: 'omhd_leng'			, type: 'float ' , defaultValue: '0'	//오목핸들길이
		},{	name: 'omhd_hght'			, type: 'float ' , defaultValue: '0'	//오목핸들높이
		},{	name: 'rlho_incl_yorn'		, type: 'string'	//롤러홀포함여부
		},{	name: 'rolr_name'			, type: 'string'	//롤러명
		},{	name: 'midl_rolr_name'		, type: 'string'	//중간롤러명
		},{	name: 'rlho_strt_plac'		, type: 'float ' , defaultValue: '0'	//롤러홀시작위치
		},{	name: 'rlho_1pcs_widh'		, type: 'float ' , defaultValue: '0'	//롤러홀1P폭
		},{	name: 'rlho_1pcs_leng'		, type: 'float ' , defaultValue: '0'	//롤러홀1P길이
		},{	name: 'rlho_2pcs_widh'		, type: 'float ' , defaultValue: '0'	//롤러홀2P폭
		},{	name: 'rlho_2pcs_leng'		, type: 'float ' , defaultValue: '0'	//롤러홀2P길이
		},{	name: 'rlho_3pcs_widh'		, type: 'float ' , defaultValue: '0'	//롤러홀3P폭
		},{	name: 'rlho_3pcs_leng'		, type: 'float ' , defaultValue: '0'	//롤러홀3P길이
		},{	name: 'midl_rolr_leng'		, type: 'float ' , defaultValue: '0'	//중간롤러길이
		},{	name: 'rein_spps_cncs_yorn'	, type: 'string'	//보강재상부체결여부
		},{	name: 'rein_plac_1fst'		, type: 'float ' , defaultValue: '0'	//보강재위치1
		},{	name: 'rein_plac_2snd'		, type: 'float ' , defaultValue: '0'	//보강재위치2
		},{	name: 'rein_plac_3trd'		, type: 'float ' , defaultValue: '0'	//보강재위치3
		},{	name: 'wthl_yorn'			, type: 'string'	//물개공여부
		},{	name: 'rail_zero_yorn'		, type: 'string'	//레일0여부
		},{	name: 'rail_1fst_yorn'		, type: 'string'	//레일1여부
		},{	name: 'rail_2snd_yorn'		, type: 'string'	//레일2여부
		},{	name: 'rail_midl_yorn'		, type: 'string'	//레일중간여부
		},{	name: 'rail_3trd_yorn'		, type: 'string'	//레일3여부
		},{	name: 'rail_4frt_yorn'		, type: 'string'	//레일4여부
		},{	name: 'rail_zero_hght'		, type: 'float'		//레일0여부
		},{	name: 'rail_1fst_hght'		, type: 'float'		//레일1여부
		},{	name: 'rail_2snd_hght'		, type: 'float'		//레일2여부
		},{	name: 'rail_midl_hght'		, type: 'float'		//레일중간여부
		},{	name: 'rail_3trd_hght'		, type: 'float'		//레일3여부
		},{	name: 'rail_4frt_hght'		, type: 'float'		//레일4여부
		},{	name: 'scrn_wthl_yorn'		, type: 'string'	//스크린물개공여부
		},{	name: 'akho_widh_1fst'		, type: 'float ' , defaultValue: '0'	//앙카홀폭1
		},{	name: 'akho_widh_2snd'		, type: 'float ' , defaultValue: '0'	//앙카홀폭2


		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue: '0'		//ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue: '0'		//ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		//ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		//ROW마감
		},{	name: 'find_name'			, type: 'string'	//찾기명
		},{	name: 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	//수정IP
		},{	name: 'updt_dttm'			, type: 'string'	//수정일시
		},{	name: 'updt_idcd'			, type: 'string'	//수정ID
		},{	name: 'updt_urif'			, type: 'string'	//수정UI
		},{	name: 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	//생성IP
		},{	name: 'crte_dttm'			, type: 'string'	//생성일시
		},{	name: 'crte_idcd'			, type: 'string'	//생성ID
		},{	name: 'crte_urif'			, type: 'string'	//생성UI
		}
	]
});
