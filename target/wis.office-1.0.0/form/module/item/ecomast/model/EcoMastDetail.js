Ext.define('module.item.ecomast.model.EcoMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'ecod_idcd'			, type: 'string'		//ECOID
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
		},{	name: 'wkfw_idcd'			, type: 'string'		//투입 공정 흐름
		},{	name: 'wkfw_name'			, type: 'string'		//투입 공정 흐름명
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'ndqt_nmrt'			, type: 'float'			//소요량분자
		},{	name: 'ndqt_dnmn'			, type: 'float'			//소요량분모
		},{	name: 'lwcs_yorn'			, type: 'string'		//하위유무수량
		},{	name: 'incm_loss_rate'		, type: 'float'			//사내LOSS율단가
		},{	name: 'otcm_loss_rate'		, type: 'float'			//사외LOSS율
		},{	name: 'strt_date'			, type: 'string'		//시작일자
		},{	name: 'endd_date'			, type: 'string'		//종료일자
		},{	name: 'stok_plac'			, type: 'string'		//재고위치
		},{	name: 'stok_unit_idcd'		, type: 'string'		//재고단위ID금액
		},{	name: 'aset_clss_dvcd'		, type: 'string'		//자산분류구분코드
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'uper_seqn'			, type: 'float'		,defaultValue : 1	//상위순번
		},{	name: 'disp_seqn'			, type: 'float'		,defaultValue : 1		//표시순번
		},{	name: 'unit_name'			, type: 'string'		//단위
		},{	name: 'item_spec'			, type: 'string'		//규격
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
		},{	name: 'item_code'			, type: 'string' ,	// 품목코드
		}
	]
});