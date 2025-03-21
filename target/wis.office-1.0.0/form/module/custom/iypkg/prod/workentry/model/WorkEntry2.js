Ext.define('module.custom.iypkg.prod.workentry.model.WorkEntry2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'
		},{	name: 'uper_seqn'			, type: 'float'
		},{	name: 'prod_qntt'			, type: 'float'			//수주생산
		},{	name: 'prod_leng'			, type: 'float'			//장
		},{	name: 'prod_widh'			, type: 'float'			//폭
		},{	name: 'prod_hght'			, type: 'float'			//고
		},{	name: 'acpt_qntt'			, type: 'float'			//수주량
		},{	name: 'prod_code'			, type: 'string'		//품목코드
		},{	name: 'prod_name'			, type: 'string'		//품목명
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'wkod_numb'			, type: 'string'		//지시번호
		},{	name: 'wkod_seqn'			, type: 'float'			//지시순번
		},{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'cstm_idcd'			, type: 'string'		//거래처ID
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'wkct_name'			, type: 'string'		//공정명
		},{	name: 'wkct_stnm'			, type: 'string'		//보조명
		},{	name: 'pdsd_numb'			, type: 'string'		//생산계획번호
		},{	name: 'wkun_dvcd'			, type: 'string'		//작업단위
		},{	name: 'prog_stat_dvcd'		, type: 'string'		//상태
		},{	name: 'unit_name'			, type: 'string'		//수량단위
		},{	name: 'pcod_numb'			, type: 'string'		//고객주문번호
		},{	name: 'unprod'				, type: 'float'			//미생산량
		},{	name: 'indn_qntt'			, type: 'float'			//지시량
		},{	name: 'pdod_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//지시일자
		},{	name: 'pdsd_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//지시일자
		},{	name: 'acpt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//수주일자

		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'dvcd'				, type: 'string'		//구분
		},{	name: 'fabc_name'			, type: 'string'		//원단명
		},{	name: 'fdat_spec'			, type: 'string'		//원단명
		},{	name: 'ppln_dvcd'			, type: 'string'		//골
		},{	name: 'item_ttln'			, type: 'float'			//장
		},{	name: 'item_ttwd'			, type: 'float'			//폭
		},{	name: 'item_widh'			, type: 'float'			//발주폭
		},{	name: 'item_fxqt'			, type: 'string'		//절수
		},{	name: 'fabc_spec'			, type: 'string'		//재단규격
		},{	name: 'need_qntt'				, type: 'float'			//수량
		},{	name: 'plan_qntt'			, type: 'float'			//계획수량
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, seralize: Ext.util.Format.dataToStr,		//일자

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