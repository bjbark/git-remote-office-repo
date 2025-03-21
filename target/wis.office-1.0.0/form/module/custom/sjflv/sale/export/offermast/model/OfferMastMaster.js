Ext.define('module.custom.sjflv.sale.export.offermast.model.OfferMastMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'    , defaultValue: 1		//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue: _global.hq_id			//사업장
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//invoice일자
		},{	name: 'ordr_dvcd'			, type: 'string'	//오더구분코드
		},{	name: 'orig_invc_numb'		, type: 'string'	//원Invoice번호
		},{	name: 'expt_dvcd'			, type: 'string'	//수출구분코드
		},{	name: 'pcod_numb'			, type: 'string'	//pono
		},{	name: 'mngt_numb'			, type: 'string'	//offer관리번호
		},{	name: 'offr_dvcd'			, type: 'string'	//offer구분코드
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'max_deli'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'buyr_name'			, type: 'string'	//바이어명
		},{	name: 'item_name'			, type: 'string'	//품명
		},{	name: 'item_idcd'			, type: 'string'	//품목코드
		},{	name: 'item_spec'			, type: 'string'	//품목규격
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'cont_date'			, type: 'string'	//계약일자
		},{	name: 'ship_port'			, type: 'string'	//선적항구
		},{	name: 'drtr_idcd'			, type: 'string', defaultValue: _global.login_id		//담당자ID
		},{	name: 'cstm_drtr_name'		, type: 'string'	//담당자명
		},{	name: 'ship_viaa_dvcd'		, type: 'string'	//ShipVia구분코드
		},{	name: 'pric_cond_dvcd'		, type: 'string'	//가격조건구분코드
		},{	name: 'trde_stot_dvcd'		, type: 'string'	//무역결제구분코드
		},{	name: 'stot_time_dvcd'		, type: 'string'	//결제시기구분코드
		},{	name: 'drtr_name'			, type: 'string', defaultValue: _global.login_id		//담당자명
		},{	name: 'dept_idcd'			, type: 'string'	//부서ID
		},{	name: 'stot_ddln'			, type: 'string'	//결제기한
		},{	name: 'dept_name'			, type: 'string'	//부서명
		},{	name: 'crny_dvcd'			, type: 'string'	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float' , defaultValue : 1		//환율
		},{	name: 'trut_dvcd'			, type: 'string'	//위탁구분코드
		},{	name: 'dlvy_cond_dvcd'		, type: 'string'	//인도조건구분코드
		},{	name: 'ostt_schd_date'		, type: 'string'	//출고예정일자
		},{	name: 'crdt_exce_yorn'		, type: 'string'	//여신초과여부
		},{	name: 'amnt_lack_yorn'		, type: 'string'	//금액미달여부
		},{	name: 'sale_stor_yorn'		, type: 'string'	//판매보관여부
		},{	name: 'cofm_yorn'			, type: 'string'	//확정여부
		},{	name: 'cofm_dttm'			, type: 'string'	//확정일시
		},{	name: 'mney_unit'			, type: 'string'	//화폐단위
		},{	name: 'arvl_port'			, type: 'string'	//도착항구
		},{	name: 'pckg_unit'			, type: 'string'	//포장단위
		},{	name: 'ogin_name'			, type: 'string'	//원신지명
		},{	name: 'exrt'				, type: 'float'		//환율
		},{	name: 'etdd'				, type: 'string'	//ETD
		},{	name: 'etaa'				, type: 'string'	//ETA
		},{	name: 'vldt'				, type: 'string'	//Validity
		},{	name: 'cofm_drtr_idcd'		, type: 'string'	//확정담당자
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0010'	//수주상태구분코드
		},{	name: 'deli_reqt_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기요청일자
		},{	name: 'login_nm'			, type: 'string' 	//로그인nm
		},{	name: 'login_id'			, type: 'string' 	//로그인id
		},{	name: 'change'				, type: 'string'	//change
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		}
	]
});