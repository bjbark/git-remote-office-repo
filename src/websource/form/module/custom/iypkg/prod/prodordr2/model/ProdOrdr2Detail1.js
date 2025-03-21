Ext.define('module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Detail1', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//발주INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//발주순번
		{	name: 'orig_invc_numb',		type: 'string'},		//수주번호
		{	name: 'orig_seqn',			type: 'float' },		//수주순번

		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//발주일자
		{	name: 'deli_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'cstm_name',			type: 'string'},		//외주거래처명
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'wkun_dvcd',			type: 'string'},		//작업단위구분코드
		{	name: 'offr_qntt',			type: 'float' },		//발주수량
		{	name: 'offr_pric',			type: 'float' },		//발주단가
		{	name: 'plan_qntt',			type: 'float' },		//소요량(계획수량)
		{	name: 'qntt_unit_idcd',		type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위명

		{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
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
		}
	]
});
