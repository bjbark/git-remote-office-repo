Ext.define('module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister2', { extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'	//Invoice번호
		},{	name: 'line_seqn'			, type: 'string'	/* 순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 발주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 발주처명		*/

		},{	name: 'prod_name'			, type: 'string'	/* 수주품명		*/
		},{	name: 'acpt_cstm_name'		, type: 'string'	/* 수주처		*/
		},{	name: 'acpt_invc_numb'		, type: 'string'	/* 수주번호		*/
		},{	name: 'offr_qntt'			, type: 'float'		/* 발주량		*/
		},{	name: 'istt_qntt'			, type: 'float'		/* 소요량		*/
		},{	name: 'unistt'				, type: 'string'	/* 미발주량		*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'fabc_code'			, type: 'string'	/* 원단코드		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'item_fxqt'			, type: 'string'	/* 절수		*/
		},{	name: 'pcod_numb'			, type: 'string'	/* 고객주문번호	*/
		},{	name: 'scre_spec'			, type: 'string'	/* 재단및스코어	*/

		},{	name : 'user_memo'			, type : 'string'		//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'		//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'		//부모ID
		},{	name : 'line_levl'			, type : 'float'  , defaultValue: '0'		//ROW레벨
		},{	name : 'line_ordr'			, type : 'string'		//ROW순서
		},{	name : 'line_stat'			, type : 'string' , defaultValue: '0'		//ROW상태
		},{	name : 'line_clos'			, type : 'string'		//ROW마감
		},{	name : 'find_name'			, type : 'string'		//찾기명
		},{	name : 'updt_user_name'		, type : 'string'		//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'		//수정IP
		},{	name : 'updt_dttm'			, type : 'string'		//수정일시
		},{	name : 'updt_idcd'			, type : 'string'		//수정ID
		},{	name : 'updt_urif'			, type : 'string'		//수정UI
		},{	name : 'crte_user_name'		, type : 'string'		//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'		//생성IP
		},{	name : 'crte_dttm'			, type : 'string'		//생성일시
		},{	name : 'crte_idcd'			, type : 'string'		//생성ID
		},{	name : 'crte_urif'			, type : 'string'		//생성UI
		}
	]
});
