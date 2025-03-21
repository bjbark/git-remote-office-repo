Ext.define('module.custom.iypkg.prod.prodplan.model.ProdPlanWriteBop', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 수주번호          */
		},{	name: 'new_invc_numb'		, type: 'string '
		},{	name: 'acpt_numb'			, type: 'string '
		},{	name: 'acpt_seqn'			, type: 'float '
		},{	name: 'line_seqn'			, type: 'float ' 	/* 순번             */
		},{	name: 'invc_seqn'			, type: 'float ' 	/* 순번             */
		},{	name: 'prod_idcd'			, type: 'string'	/* 품목ID          */
		},{	name: 'cvic_idcd'			, type: 'string'	/* 설비ID          */
		},{	name: 'cvic_name'			, type: 'string'	/* 설비명          */
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID          */
		},{	name: 'wkct_idcd'			, type: 'string'	/* 공정ID          */
		},{	name: 'wkun_dvcd'			, type: 'string'	/* 작업단위구분코드 */
		},{	name: 'qntt_unit_idcd'		, type: 'string'	/* 수량단위ID      */
		},{	name: 'qntt_unit'			, type: 'string'	/* 수량단위ID      */
		},{	name: 'istt_qntt'			, type: 'float ' 	/* 원단입고수량    */
		},{	name: 'stnd_pric'			, type: 'float ' 	/* 표준단가         */
		},{	name: 'otod_yorn'			, type: 'string'	/* 외주여부         */
		},{	name: 'otod_cstm_idcd'		, type: 'string' 	/* 외주거래처ID    */
		},{	name: 'wkct_name'			, type: 'string' 	/* 공정명           */
		},{	name: 'unit_name'			, type: 'string' 	/* 수량단위명       */
		},{	name: 'cstm_name'			, type: 'string' 	/* 외주거래처명     */
		},{	name: 'plan_qntt'			, type: 'float' 	/* 계획수량         */
		},{	name: 'indn_qntt'			, type: 'float' 	/* 계획수량         */
		},{	name: 'qntt'				, type: 'float' 	/* 계획된수량         */
		},{	name: 'plan_sttm'			, type: 'string', convert : Ext.util.Format.dateToStr, serialize: Ext.util.Format.dateToStr	//시작일자

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