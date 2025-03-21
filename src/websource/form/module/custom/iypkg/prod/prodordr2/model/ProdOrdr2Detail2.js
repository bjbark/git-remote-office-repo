Ext.define('module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Detail2', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'acpt_numb',			type: 'string'},		//수주INVOICE번호
		{	name: 'acpt_seqn',			type: 'float' },		//수주순번
		{	name: 'bzpl_idcd',			type: 'string' , defaultValue: _global.hq_id },		//사업장
		{	name: 'wkct_idcd',			type: 'string'},		//공정ID
		{	name: 'wkct_name',			type: 'string'},		//공정명
		{	name: 'wkun_dvcd',			type: 'string'},		//작업단위구분코드
		{	name: 'plan_qntt',			type: 'float' },		//계획수량
		{	name: 'otod_yorn',			type: 'string'},		//외주여부
		{	name: 'otod_cstm_idcd',		type: 'string'},		//외주거래처ID
		{	name: 'qntt_unit_idcd',		type: 'string'},		//단위ID
		{	name: 'unit_name',			type: 'string'},		//단위명
		{	name: 'prod_idcd',			type: 'string'},		//품목ID
		{	name: 'item_spec',			type: 'string'},		//품목규격(장*폭*고)
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'deli_date',			type: 'string', serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'stnd_pric',			type: 'float' },		//발주단가
		{	name: 'unoffr',				type: 'float' },		//미발주수량
		{	name: 'offr_qntt',			type: 'float' },		//발주수량
		{	name: 'offr_amnt',			type: 'float' },		//발주금액
		{	name: 'offr_vatx',			type: 'float' },		//부가세액
		{	name: 'ttsm_amnt',			type: 'float' },		//합계금액

		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//발주일자
		{	name: 'new_invc_numb',		type: 'string'},		//발주번호
		{	name: 'new_line_seqn',		type: 'string'},		//발주순번

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
