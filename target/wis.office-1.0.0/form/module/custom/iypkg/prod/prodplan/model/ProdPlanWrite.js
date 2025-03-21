Ext.define('module.custom.iypkg.prod.prodplan.model.ProdPlanWrite', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'new_invc_numb'		, type: 'string '
		},{	name: 'line_seqn'			, type: 'float'
		},{	name: 'plan_qntt'			, type: 'float'			//계획수량
		},{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'item_idcd'			, type: 'string'		//품목id
		},{	name: 'cvic_idcd'			, type: 'string'		//설비id
		},{	name: 'cvic_name'			, type: 'string'		//설비명
		},{	name: 'prod_idcd'			, type: 'string'		//제품id
		},{	name: 'prod_name'			, type: 'string'		//제품명
		},{	name: 'prod_leng'			, type: 'string'		//제품길이
		},{	name: 'prod_widh'			, type: 'string'		//제품폭
		},{	name: 'prod_hght'			, type: 'string'		//제품높이
		},{	name: 'fabc_name'			, type: 'string'		//원단명
		},{	name: 'ppln_dvcd'			, type: 'string'		//골
		},{	name: 'item_fxqt'			, type: 'string'		//절수
		},{	name: 'wkct_name'			, type: 'string'		//공정명
		},{	name: 'deli_date2'			, type: 'string' , serialize: Ext.util.Format.dateToStr
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'prod_name'			, type: 'string'		//PONO
		},{	name: 'item_leng'			, type: 'string'		//품목장
		},{	name: 'item_widh'			, type: 'string'		//품목폭
		},{	name: 'item_hght'			, type: 'string'		//품목높이
		},{	name: 'acpt_qntt'			, type: 'float'			//수주수량
		},{	name: 'unit_name'			, type: 'string'		//수량단위
		},{	name: 'wkun_dvcd'			, type: 'string'		//작업단위구분
		},{	name: 'plan_qntt'			, type: 'float'			//계획수량
		},{	name: 'ppln_dvcd'			, type: 'string'		//골
		},{	name: 'item_ttln'			, type: 'float'			//장
		},{	name: 'item_ttwd'			, type: 'float'			//폭
		},{	name: 'item_fxqt'			, type: 'float'			//절수
		},{	name: 'rank'				, type: 'float'			//rank
		},{	name: 'fdat_spec'			, type: 'string'		//재단규격
		},{	name: 'need_qntt'			, type: 'string'		//필요수량
		},{	name: 'plan_sttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr//계획일자
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,//일자
		},{	name: 'dvcd'				, type: 'string'		//구분

		},{	name: 'wkct_idcd'			, type: 'string'	/* 공정ID          */
		},{	name: 'wkun_dvcd'			, type: 'string'	/* 작업단위구분코드 */
		},{	name: 'qntt_unit_idcd'		, type: 'string'	/* 수량단위ID      */
		},{	name: 'stnd_pric'			, type: 'float ' 	/* 표준단가         */
		},{	name: 'otod_yorn'			, type: 'string'	/* 외주여부         */
		},{	name: 'otod_cstm_idcd'		, type: 'string' 	/* 외주거래처ID    */
		},{	name: 'wkct_name'			, type: 'string' 	/* 공정명           */
		},{	name: 'unit_name'			, type: 'string' 	/* 수량단위명       */
		},{	name: 'cstm_name'			, type: 'string' 	/* 외주거래처명     */


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