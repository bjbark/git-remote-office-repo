Ext.define('module.custom.dhtec.item.eco.ecomast.model.EcoMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'ecod_idcd'			, type: 'string'		//ECOID
		},{	name: 'ecod_idcd2'			, type: 'string'		//복사ECOID
		},{	name: 'ecod_date'			, type: 'string'		//변경일자
		},{	name: 'prnt_item_idcd'		, type: 'string'		//부모품목ID
		},{	name: 'line_seqn'			, type: 'float'			//순번
		},{	name: 'chge_optn_dvcd'		, type: 'string'		//변경옵션구분코드드
		},{	name: 'bomt_degr_chge'		, type: 'string'		//BOM차수변경
		},{	name: 'befr_item_idcd'		, type: 'string'		//전품목ID
		},{	name: 'befr_unit_idcd'		, type: 'string'		//전단위ID
		},{	name: 'befr_ndqt_nmrt'		, type: 'float'			//전소요량분자
		},{	name: 'befr_ndqt_dnmn'		, type: 'float'			//전소요량분모
		},{	name: 'befr_lwcs_yorn'		, type: 'string'		//전하위유무e번호
		},{	name: 'befr_incm_loss'		, type: 'float'			//전사내LOSS
		},{	name: 'befr_otcm_loss'		, type: 'float'			//전사외LOSSe수량
		},{	name: 'befr_stok_plac'		, type: 'string'		//전재고위치
		},{	name: 'befr_aset_dvcd'		, type: 'string'		//전자산구분코드
		},{	name: 'ivst_wkct_idcd'		, type: 'string'		//투입공정
		},{	name: 'colr_bacd_name'		, type: 'string'		//컬러명
		},{	name: 'colr_bacd_name2'		, type: 'string'		//컬러명
		},{	name: 'chge_resn_dvcd'		, type: 'string'		//변경사유코드
		},{	name: 'chge_resn'			, type: 'string'		//변경사유
		},{	name: 'item_mtrl'			, type: 'string'		//재질
		},{	name: 'dely_cstm_itid'		, type: 'string'		//납품처품번
		},{	name: 'dely_cstm_itid2'		, type: 'string'		//납품처품번
		},{	name: 'dely_cstm_modl'		, type: 'string'		//납품처모델
		},{	name: 'dely_cstm_modl2'		, type: 'string'		//납품처모델
		},{	name: 'dely_cstm_item_name'	, type: 'string'		//납품처품명
		},{	name: 'dely_cstm_item_name2'	, type: 'string'		//납품처품명
		},{	name: 'dely_cstm_spec'		, type: 'string' ,		//납품처규격
		},{	name: 'dely_cstm_spec2'		, type: 'string' ,		//납품처규격
		},{	name: 'crty_bacd'			, type: 'string'		//차종분류코드
		},{	name: 'crty_bacd_name'			, type: 'string'		//차종분류코드
		},{	name: 'cstm_itid'			, type: 'string' ,		//고객품번
		},{	name: 'cstm_itid2'			, type: 'string' ,		//고객품번
		},{	name: 'cstm_item_name'		, type: 'string' ,		//고객품명
		},{	name: 'cstm_item_name2'		, type: 'string' ,		//고객품명
		},{	name: 'cstm_name'			, type: 'string' ,		//거래처명
		},{	name: 'cstm_spec'			, type: 'string' ,		//고객규격
		},{	name: 'cstm_spec2'			, type: 'string' ,		//고객규격
		},{	name: 'colr_bacd'			, type: 'string'		//색상구분코드
		},{	name: 'colr_bacd2'			, type: 'string'		//색상구분코드
		},{	name: 'bomt_seqn'			, type: 'string'		//순번
		},{	name: 'apvl_dvcd'			, type: 'string'		//승인
		},{	name: 'prts_plac'			, type: 'string'		//부품위치
		},{	name: 'mker_name'			, type: 'string'		//제조사명
		},{	name: 'mtrl_bacd'			, type: 'string'		//재질
		},{	name: 'flat_drwg_numb'		, type: 'string'		//2D도면번호
		},{	name: 'sold_drwg_numb'		, type: 'string'		//3D도면번호
		},{	name: 'msll_valu'			, type: 'string'		//MSL
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'srfc_proc'			, type: 'string'		//표면처리
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'ivst_qntt'			, type: 'string'		//투입수량
		},{	name: 'reqt_qntt'			, type: 'string'		//요청수량
		},{	name: 'ndqt_nmrt'			, type: 'float'			//소요량분자
		},{	name: 'ndqt_dnmn'			, type: 'float'			//소요량분모
		},{	name: 'lwcs_yorn'			, type: 'string'		//하위유무수량
		},{	name: 'incm_loss_rate'		, type: 'float'			//사내LOSS율단가
		},{	name: 'otcm_loss_rate'		, type: 'float'			//사외LOSS율
		},{	name: 'strt_date'			, type: 'string'		, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//배포일자(출력일자)
		},{	name: 'endd_date'			, type: 'string'		//종료일자
		},{	name: 'dtrb_date'			, type: 'string'		//배포일자
		},{	name: 'prnt_date'			, type: 'string'		//출력일자
		},{	name: 'stok_plac'			, type: 'string'		//재고위치
		},{	name: 'stok_unit_idcd'		, type: 'string'		//재고단위ID금액
		},{	name: 'aset_clss_dvcd'		, type: 'string'		//자산분류구분코드
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'wkfw_idcd'			, type: 'string'		//투입 공정 흐름
		},{	name: 'wkfw_name'			, type: 'string'		//투입 공정 흐름명

		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'uper_seqn'			, type: 'float'		,defaultValue : 1	//상위순번
		},{	name: 'disp_seqn'			, type: 'float'		,defaultValue : 1		//표시순번
		},{	name: 'unit_name'			, type: 'string'		//단위
		},{	name: 'item_spec'			, type: 'string'		//규격
		},{	name: 'item_spec2'			, type: 'string'		//규격
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'wkct_name'			, type: 'string'		//공정명
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
		},{	name: 'updt_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		},{	name: 'item_code'			, type: 'string' ,		// 품목코드
		}
	]
});