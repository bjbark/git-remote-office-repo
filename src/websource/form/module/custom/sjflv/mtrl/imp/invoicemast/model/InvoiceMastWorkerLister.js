Ext.define('module.custom.sjflv.mtrl.imp.invoicemast.model.InvoiceMastWorkerLister',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'			, type: 'string'		//INVOICE번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1			//AMD차수
		},{	name: 'line_seqn'			, type: 'float' 		//순번
		},{	name: 'item_idcd'			, type: 'string' 		//품목ID
		},{	name: 'item_code'			, type: 'string' 		//품목코드
		},{	name: 'item_name'			, type: 'string' 		//품목명
		},{	name: 'item_spec'			, type: 'string' 		//품목규격
		},{	name: 'item_hscd'			, type: 'string' 		//품목HS코드
		},{	name: 'mker_name'			, type: 'string'		//제조사명
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위ID
		},{	name: 'qntt'				, type: 'float' , defaultValue : 0			//수량
		},{	name: 'exch_pric'			, type: 'float' , defaultValue : 0			//외환단가
		},{	name: 'exch_amnt'			, type: 'float' , defaultValue : 0			//외환금액
		},{	name: 'krwn_pric'			, type: 'float' , defaultValue : 0			//원화단가
		},{	name: 'krwn_amnt'			, type: 'float' , defaultValue : 0			//원화금액
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 		//납기일자
		},{	name: 'ship_schd_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//선적예정일자
		},{	name: 'ostt_wrhs_idcd'		, type: 'string'		//출고창고ID
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'		//납품거래처ID
		},{	name: 'dlvy_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납품일자
		},{	name: 'dlvy_time'			, type: 'string'		//납품시간
		},{	name: 'orig_seqn'			, type: 'float'			//원순번
		},{	name: 'trnt_exps'			, type: 'float' , defaultValue : 0			//운송비용
		},{	name: 'extr_exps'			, type: 'float' , defaultValue : 0			//부대비용
		},{	name: 'sett_amnt'			, type: 'float' , defaultValue : 0			//정산금액
		},{	name: 'sett_pric'			, type: 'float' , defaultValue : 0			//정산단가
		},{	name: 'json_data'			, type: 'string'		//JSONDATA
		},{	name: 'each_qntt'			, type: 'float' , defaultValue : 0			//EACH
		},{	name: 'pckg_size'			, type: 'float' , defaultValue : 0			//pack size
		},{	name: 'cmis_pric'			, type: 'float'		//
		},{	name: 'cmis_amnt'			, type: 'float'		//
		},{	name: 'pfit_pric'			, type: 'float'		//
		},{	name: 'pfit_amnt'			, type: 'float'		//

		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_code'			, type: 'string'	/* 원단코드		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'item_ttln'			, type: 'float'		/* 장		*/
		},{	name: 'item_ttwd'			, type: 'float'		/* 폭		*/
		},{	name: 'item_fxqt'			, type: 'float'		/* 절수		*/
		},{	name: 'scre_spec'			, type: 'string'	/* 재단및스코어	*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 자료구분(부가세포함여부)	*/, defaultValue : 1

		},{	name: 'offr_qntt'			, type: 'float'		/* 발주량		*/
		},{	name: 'istt_qntt'			, type: 'float'		/* 입고한수량	*/
		},{	name: 'unistt'				, type: 'float'		/* 미입고잔량	*/
		},{	name: 'istt_qntt2'			, type: 'float'		/* 입고할수량	*/
		},{	name: 'istt_amnt'			, type: 'float'		/* 입고공급가	*/
		},{	name: 'istt_vatx'			, type: 'float'		/* 입고부가세	*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 입고합꼐		*/


		},{	name: 'subt_qntt'			, type: 'float'		/* 감량		*/
		},{	name: 'mxm2_qntt'			, type: 'float'		/* 제곱미터수량	*/
		},{	name: 'mxm2_pric'			, type: 'float'		/* 제곱미터단가	*/
		},{	name: 'pqty_pric'			, type: 'float'		/* 개당단가		*/
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID	*/ , defaultValue: _global.stor_id
		},{	name: 'offr_path_dvcd'		, type: 'string'	/* 발주구분코드	*/

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'			, type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	]
});
