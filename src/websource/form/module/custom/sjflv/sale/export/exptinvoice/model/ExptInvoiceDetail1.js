Ext.define('module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceDetail1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'line_seqn'			, type: 'float ' },		//순번
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'item_hscd'			, type: 'string' },		//품목HS코드
		{	name: 'unit_idcd'			, type: 'string' },		//단위ID
		{	name: 'qntt'				, type: 'float ' , defaultValue:0},		//수량
		{	name: 'exch_pric'			, type: 'float ' , defaultValue:0},		//외환단가
		{	name: 'exch_amnt'			, type: 'float ' , defaultValue:0},		//외환금액
		{	name: 'krwn_pric'			, type: 'float ' , defaultValue:0},		//원화단가
		{	name: 'krwn_amnt'			, type: 'float ' , defaultValue:0},		//원화금액
		{	name: 'deli_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'ostt_wrhs_idcd'		, type: 'string' },		//출고창고ID
		{	name: 'dlvy_cstm_idcd'		, type: 'string' },		//납품거래처ID
		{	name: 'dlvy_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납품일자
		{	name: 'dlvy_time'			, type: 'string' },		//납품시간
		{	name: 'orig_invc_numb'		, type: 'string' },		//원INVOICE번호
		{	name: 'orig_amnd_degr'		, type: 'float ' },		//원AMD차수
		{	name: 'orig_seqn'			, type: 'float ' },		//원순번





		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'string'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string'},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string'},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
