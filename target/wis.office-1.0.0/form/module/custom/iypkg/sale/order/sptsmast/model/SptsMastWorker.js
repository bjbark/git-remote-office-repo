Ext.define('module.custom.iypkg.sale.order.sptsmast.model.SptsMastWorker', { extend: 'Axt.data.Model',

	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호*/
		},{	name: 'new_invc_numb'		, type: 'string' 	/* 출하계획번호*/
		},{	name: 'new_line_seqn'		, type: 'float' 	/* 출하계획순번*/
		},{	name: 'invc_date'			, type: 'string' 	/* INVOICE일자*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string' 	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string' 	/* 거래처명		*/
		},{	name: 'prod_idcd'			, type: 'string' 	/* 품목ID		*/
		},{	name: 'prod_name'			, type: 'string' 	/* 품목명		*/
		},{	name: 'prod_code'			, type: 'string' 	/* 품목코드		*/
		},{	name: 'item_leng'			, type: 'string' 	/* 장		*/
		},{	name: 'item_widh'			, type: 'string' 	/* 폭		*/
		},{	name: 'item_hght'			, type: 'string' 	/* 고		*/
		},{	name: 'cars_idcd'			, type: 'string' 	/* 차량id		*/
		},{	name: 'dlvy_cstm_name'		, type: 'string' 	/* 납품처		*/
		},{	name: 'cars_name'			, type: 'string' 	/* 차량명		*/
		},{	name: 'spec'				, type: 'string' ,	/* 상자규격		*/
			convert : function(newValue , row){
				return row.get('item_leng')+'*'+row.get('item_widh')+'*'+row.get('item_hght');
			}
		},{	name: 'acpt_qntt'			, type: 'float' 	/* 수주수량		*/
		},{	name: 'ostt_qntt'			, type: 'float' 	/* 출고수량		*/
		},{	name: 'unostt'				, type: 'float' 	/* 미출고잔량		*/
		},{	name: 'lcal_idcd'			, type: 'string' 	/* 운송지역idcd	*/
		},{	name: 'lcal_name'			, type: 'string' 	/* 운송지역명		*/
		},{	name: 'mxm2_qntt'			, type: 'float' 	/* m2/총		*/
		},{	name: 'plan_qntt'			, type: 'float' 	/* 계획량		*/
		},{	name: 'plan_date'			, type: 'float' 	/* 계획일자	*/
		},{	name: 'pcod_numb'			, type: 'string' 	/* P/O No	*/
		},{	name: 'user_idcd'			, type: 'string' 	/* 담당자ID	*/
		},{	name: 'user_name'			, type: 'string' 	/* 담당자명		*/
		},{	name: 'deli_date'			, type: 'string' 	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'assi_cstm_idcd'		, type: 'string' 	/* 보조거래처 = 납품처	*/
		},{	name: 'assi_cstm_name'		, type: 'string' 	/* 보조거래처 = 납품처	*/

		},{	name: 'user_memo'			, type: 'string' 	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string' 	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string' 	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float' 	/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float' 	/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string' 	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string' 	/* ROW마감		*/ , defaultValue: 0
		},{	name: 'find_name'			, type: 'string' 	/* 찾기명			*/ , defaultValue : 0
		},{	name: 'updt_user_name'		, type: 'string' 	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string' 	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string' 	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string' 	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string' 	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string' 	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string' 	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string' 	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string' 	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string' 	/* 생성UI		*/
		}
	]
});