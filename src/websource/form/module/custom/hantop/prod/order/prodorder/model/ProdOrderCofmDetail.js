Ext.define('module.custom.hantop.prod.order.prodorder.model.ProdOrderCofmDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'	//INVOICE번호
		},{	name: 'cofm_yorn'				, type: 'string'	//확정여부
		},{	name: 'line_seqn'				, type: 'float'		//순번
		},{	name: 'assi_seqn'				, type: 'float'		//보조순번
		},{	name: 'auto_yorn'				, type: 'string'	//자동여부
		},{	name: 'cmpl_yorn'				, type: 'string'	//완료여부
		},{	name: 'plan_strt_dttm'			, type: 'string'	//계획시작일시
		},{	name: 'plan_endd_dttm'			, type: 'string'	//계획종료일시
		},{	name: 'acpt_numb'				, type: 'string'	//수주번호
		},{	name: 'acpt_amnd_degr'			, type: 'float'		//수주AMD차수
		},{	name: 'acpt_seqn'				, type: 'float'		//수주순번
		},{	name: 'cvic_idcd'				, type: 'string'	//설비ID
		},{	name: 'cvic_name'				, type: 'string'	//설비명
		},{	name: 'ispl_name'				, type: 'string'	//설치위치명
		},{	name: 'brnd_bacd'				, type: 'string'	//브랜드분류코드
		},{	name: 'brnd_name'				, type: 'string'	//브랜드분류명
		},{	name: 'item_idcd'				, type: 'string'	//품목ID
		},{	name: 'item_name'				, type: 'string'	//품목명
		},{	name: 'item_spec'				, type: 'string'	//품목규격
		},{	name: 'dbwd_yorn'				, type: 'string'	//이중창여부
		},{	name: 'cmbf_yorn'				, type: 'string'	//공틀여부
		},{	name: 'asmb_plac_dvcd'			, type: 'string'	//조립위치구분코드
		},{	name: 'bfsf_dvcd'				, type: 'string'	//틀짝망구분코드
		},{	name: 'tblr'					, type: 'string'	//TBLR
		},{	name: 'ivst_item_idcd'			, type: 'string'	//투입품목ID
		},{	name: 'mtrl_grcd'				, type: 'string'	//자재그룹코드
		},{	name: 'stnd_abar_leng'			, type: 'float'		//표준바길이
		},{	name: 'ivst_ordr'				, type: 'string'	//투입순서
		},{	name: 'cutt_ordr'				, type: 'float'		//절단순서
		},{	name: 'cutt_leng'				, type: 'float'		//절단길이
		},{	name: 'cutt_hght'				, type: 'float'		//절단높이
		},{	name: 'sync_cutt_qntt'			, type: 'float'		//동시절단수
		},{	name: 'ctbr_aset_qntt'			, type: 'float'		//절단바SET수
		},{	name: 'pnbr_yorn'				, type: 'string'	//판넬바유무
		},{	name: 'item_widh'				, type: 'float'		//품목폭
		},{	name: 'item_hght'				, type: 'float'		//품목높이
		},{	name: 'item_leng'				, type: 'float'		//품목길이
		},{	name: 'ydge_used_yorn'			, type: 'string'	//자투리사용여부
		},{	name: 'wdbf_cncs_type'			, type: 'string'	//BF체결타입
		},{	name: 'film_dctn_proc'			, type: 'string'	//필름사전가공
		},{	name: 'hndl_incl_yorn'			, type: 'string'	//핸들포함여부
		},{	name: 'hndl_hght'				, type: 'float'		//핸들높이
		},{	name: 'clee_incl_yorn'			, type: 'string'	//크리센트포함여부
		},{	name: 'clee_hght'				, type: 'float'		//크리센트높이
		},{	name: 'hdho_type_dvcd'			, type: 'string'	//핸드홀타입구분코드
		},{	name: 'hdho_1pcs_hght'			, type: 'float'		//핸드홀1P높이
		},{	name: 'hdho_2pcs_hght'			, type: 'float'		//핸드홀2P높이
		},{	name: 'hdho_hght_grip_1fst'		, type: 'float'		//핸드홀높이그립1
		},{	name: 'hdho_hght_grip_2snd'		, type: 'float'		//핸드홀높이그립2
		},{	name: 'hdho_qntt'				, type: 'float'		//핸드홀수
		},{	name: 'hdho_itvl'				, type: 'float'		//핸드홀간격
		},{	name: 'hdho_pass_yorn'			, type: 'string'	//핸드홀관통여부
		},{	name: 'lkho_incl_yorn'			, type: 'string'	//락킹홀포함여부
		},{	name: 'lkho'					, type: 'float'		//락킹홀
		},{	name: 'lkho_1pcs_widh'			, type: 'float'		//락킹홀1P폭
		},{	name: 'lkho_1pcs_leng'			, type: 'float'		//락킹홀1P길이
		},{	name: 'lkho_2pcs_widh'			, type: 'float'		//락킹홀2P폭
		},{	name: 'lkho_2pcs_leng'			, type: 'float'		//락킹홀2P길이
		},{	name: 'lkho_plac_cpsn'			, type: 'float'		//락킹홀위치보정
		},{	name: 'lkho_grip_leng_1fst'		, type: 'float'		//락킹홀그립길이1
		},{	name: 'rnpc_incl_yorn'			, type: 'string'	//고리펀칭포함여부
		},{	name: 'rnpc_plac'				, type: 'float'		//고리펀칭위치
		},{	name: 'rnpc_widh_1fst'			, type: 'float'		//고리펀칭폭1
		},{	name: 'rnpc_widh_2snd'			, type: 'float'		//고리펀칭폭2
		},{	name: 'omhd_hole_incl_yorn'		, type: 'string'	//오목핸들홀포함여부
		},{	name: 'omhd_plac'				, type: 'float'		//오목핸들위치
		},{	name: 'omhd_widh'				, type: 'float'		//오목핸들폭
		},{	name: 'omhd_leng'				, type: 'float'		//오목핸들길이
		},{	name: 'omhd_hght'				, type: 'float'		//오목핸들높이
		},{	name: 'rolr_incl_yorn'			, type: 'string'	//롤러포함여부
		},{	name: 'rolr_name'				, type: 'string'	//롤러명
		},{	name: 'rlho_cutt_angl'			, type: 'float'		//롤러홀절단각도
		},{	name: 'rlho_incl_yorn'			, type: 'string'	//롤러홀포함여부
		},{	name: 'rlho_strt_1pcs'			, type: 'float'		//롤러홀시작1P
		},{	name: 'midl_rolr_name'			, type: 'string'	//중간롤러명
		},{	name: 'rlho_strt_plac'			, type: 'float'		//롤러홀시작위치
		},{	name: 'rlho_1pcs_widh'			, type: 'float'		//롤러홀1P폭
		},{	name: 'rlho_1pcs_leng'			, type: 'float'		//롤러홀1P길이
		},{	name: 'rlho_strt_2pcs'			, type: 'float'		//롤러홀시작2P
		},{	name: 'rlho_2pcs_widh'			, type: 'float'		//롤러홀2P폭
		},{	name: 'rlho_2pcs_leng'			, type: 'float'		//롤러홀2P길이
		},{	name: 'rlho_strt_3pcs'			, type: 'float'		//롤러홀시작3P
		},{	name: 'rlho_3pcs_widh'			, type: 'float'		//롤러홀3P폭
		},{	name: 'rlho_3pcs_leng'			, type: 'float'		//롤러홀3P길이
		},{	name: 'midl_rolr_strt'			, type: 'float'		//중간롤러시작
		},{	name: 'midl_rolr_leng'			, type: 'float'		//중간롤러길이
		},{	name: 'rail_open_itvl'			, type: 'float'		//레일개공간격
		},{	name: 'rail_zero_yorn'			, type: 'string'	//레일0여부
		},{	name: 'rail_1fst_yorn'			, type: 'string'	//레일1여부
		},{	name: 'rail_2snd_yorn'			, type: 'string'	//레일2여부
		},{	name: 'rail_midl_yorn'			, type: 'string'	//레일중간여부
		},{	name: 'rail_3trd_yorn'			, type: 'string'	//레일3여부
		},{	name: 'rail_4frt_yorn'			, type: 'string'	//레일4여부
		},{	name: 'midl_rolr_incl_yorn'		, type: 'string'	//중간롤러포함여부
		},{	name: 'flps_mkng_incl_yorn'		, type: 'string'	//필링피스마킹포함여부
		},{	name: 'flps_plac'				, type: 'float'		//필링피스위치
		},{	name: 'flps_plac_2snd'			, type: 'float'		//필링피스위치2
		},{	name: 'rein_incl_yorn'			, type: 'string'	//보강재포함여부
		},{	name: 'rein_leng'				, type: 'float'		//보강재길이
		},{	name: 'rein_tick'				, type: 'float'		//보강재두께
		},{	name: 'rein_topp_cncs_yorn'		, type: 'string'	//보강재상부체결여부
		},{	name: 'rein_plac_1fst'			, type: 'float'		//보강재위치1
		},{	name: 'rein_plac_2snd'			, type: 'float'		//보강재위치2
		},{	name: 'rein_plac_3trd'			, type: 'float'		//보강재위치3
		},{	name: 'hair_incl_yorn'			, type: 'string'	//모헤어포함여부
		},{	name: 'mult_hole_yorn'			, type: 'string'	//배수홀여부
		},{	name: 'open_widh'				, type: 'float'		//개공폭
		},{	name: 'scrn_wthl_yorn'			, type: 'string'	//스크린물개공여부
		},{	name: 'mult_stop_stag'			, type: 'float'		//배수Stopper단계
		},{	name: 'tagg_asmt'				, type: 'string'	//태그부자재
		},{	name: 'scrw_qntt'				, type: 'float'		//스크류수
		},{	name: 'scrw_widh_1fst'			, type: 'float'		//스크류폭1
		},{	name: 'scrw_widh_2snd'			, type: 'float'		//스크류폭2
		},{	name: 'scrw_widh_3trd'			, type: 'float'		//스크류폭3
		},{	name: 'scrw_plac'				, type: 'float'		//스크류위치
		},{	name: 'ssbr_yorn'				, type: 'string'	//SS바유무
		},{	name: 'rs_yorn'					, type: 'string'	//RS유무
		},{	name: 'fpfp_mkng_qntt'			, type: 'float'		//FP마킹수
		},{	name: 'fpfp_plac_3trd'			, type: 'float'		//FP위치3
		},{	name: 'fpfp_plac_4frt'			, type: 'float'		//FP위치4
		},{	name: 'akho_open_yorn_1fst'		, type: 'string'	//앙카홀개공유무1
		},{	name: 'akho_open_yorn_2snd'		, type: 'string'	//앙카홀개공유무2
		},{	name: 'akho_widh_1fst'			, type: 'float'		//앙카홀폭1
		},{	name: 'akho_widh_2snd'			, type: 'float'		//앙카홀폭2
		},{	name: 'scen_name'				, type: 'string'	//현장명
		},{	name: 'wryp_yorn'				, type: 'string'	//레핑여부
		},{	name: 'innr_wryp_itid'			, type: 'string'	//내측레핑품목ID
		},{	name: 'innr_wryp_itnm'			, type: 'string'	//내측레핑품목명
		},{	name: 'otsd_wryp_itid'			, type: 'string'	//외측레핑품목ID
		},{	name: 'otsd_wryp_itnm'			, type: 'string'	//외측레핑품목명
		},{	name: 'orig_invc_numb'			, type: 'string'	//원INVOICE번호
		},{	name: 'orig_invc_seqn'			, type: 'float'		//원INVOICE순번
		},{	name: 'brcd_hght'				, type: 'float'		//바코드높이
		},{	name: 'brcd_plac'				, type: 'float'		//바코드위치
		},{	name: 'assa_yorn'				, type: 'string'	//아사여부
		},{	name: 'brcd'					, type: 'string'	//바코드
		},{	name: 'wker_idcd'				, type: 'string'	//작업자ID
		},{	name: 'prts_numb'				, type: 'string'	//부품번호
		},{	name: 'main_vent_yorn'			, type: 'string'	//주벤트여부
		},{	name: 'ctbr_numb'				, type: 'float'		//절단바번호
		},{	name: 'rail0_wtho_1'			, type: 'float'		//0레일배수홀위치1
		},{	name: 'rail0_wtho_2'			, type: 'float'		//0레일배수홀위치2
		},{	name: 'rail0_wtho_3'			, type: 'float'		//0레일배수홀위치3
		},{	name: 'rail0_wtho_4'			, type: 'float'		//0레일배수홀위치4
		},{	name: 'rail0_wtho_5'			, type: 'float'		//0레일배수홀위치5
		},{	name: 'rail0_wtho_6'			, type: 'float'		//0레일배수홀위치6
		},{	name: 'rail1_wtho_1'			, type: 'float'		//1레일배수홀위치1
		},{	name: 'rail1_wtho_2'			, type: 'float'		//1레일배수홀위치2
		},{	name: 'rail1_wtho_3'			, type: 'float'		//1레일배수홀위치3
		},{	name: 'rail1_wtho_4'			, type: 'float'		//1레일배수홀위치4
		},{	name: 'rail1_wtho_5'			, type: 'float'		//1레일배수홀위치5
		},{	name: 'rail1_wtho_6'			, type: 'float'		//1레일배수홀위치5
		},{	name: 'rail2_wtho_1'			, type: 'float'		//2레일배수홀위치1
		},{	name: 'rail2_wtho_2'			, type: 'float'		//2레일배수홀위치2
		},{	name: 'rail2_wtho_3'			, type: 'float'		//2레일배수홀위치3
		},{	name: 'rail2_wtho_4'			, type: 'float'		//2레일배수홀위치4
		},{	name: 'rail2_wtho_5'			, type: 'float'		//2레일배수홀위치5
		},{	name: 'rail2_wtho_6'			, type: 'float'		//2레일배수홀위치5
		},{	name: 'rail3_wtho_1'			, type: 'float'		//3레일배수홀위치1
		},{	name: 'rail3_wtho_2'			, type: 'float'		//3레일배수홀위치2
		},{	name: 'rail3_wtho_3'			, type: 'float'		//3레일배수홀위치3
		},{	name: 'rail3_wtho_4'			, type: 'float'		//3레일배수홀위치4
		},{	name: 'rail3_wtho_5'			, type: 'float'		//3레일배수홀위치5
		},{	name: 'rail3_wtho_6'			, type: 'float'		//3레일배수홀위치5
		},{	name: 'rail4_wtho_1'			, type: 'float'		//4레일배수홀위치1
		},{	name: 'rail4_wtho_2'			, type: 'float'		//4레일배수홀위치2
		},{	name: 'rail4_wtho_3'			, type: 'float'		//4레일배수홀위치3
		},{	name: 'rail4_wtho_4'			, type: 'float'		//4레일배수홀위치4
		},{	name: 'rail4_wtho_5'			, type: 'float'		//4레일배수홀위치5
		},{	name: 'rail4_wtho_6'			, type: 'float'		//4레일배수홀위치5
		},{	name: 'rail5_wtho_1'			, type: 'float'		//5레일배수홀위치1
		},{	name: 'rail5_wtho_2'			, type: 'float'		//5레일배수홀위치2
		},{	name: 'rail5_wtho_3'			, type: 'float'		//5레일배수홀위치3
		},{	name: 'rail5_wtho_4'			, type: 'float'		//5레일배수홀위치4
		},{	name: 'rail5_wtho_5'			, type: 'float'		//5레일배수홀위치5
		},{	name: 'rail5_wtho_6'			, type: 'float'		//5레일배수홀위치6
		},{	name: 'wtho_plac_1fst'			, type: 'float'		//배수홀위치1
		},{	name: 'wtho_plac_2snd'			, type: 'float'		//배수홀위치2
		},{	name: 'wtho_plac_3trd'			, type: 'float'		//배수홀위치3
		},{	name: 'wtho_plac_4frt'			, type: 'float'		//배수홀위치4
		},{	name: 'wtho_plac_5fit'			, type: 'float'		//배수홀위치5




		},{	name: 'user_memo'			, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'		//찾기명
		},{	name: 'updt_user_name'		, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'		//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		}
	],
});