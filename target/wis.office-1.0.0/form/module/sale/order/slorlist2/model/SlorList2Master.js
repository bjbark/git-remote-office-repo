Ext.define('module.sale.order.slorlist2.model.SlorList2Master',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'line_seqn',			type: 'string'},		//invoice번호
		{	name: 'invc_date',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//주문일자
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//품목규격
		{	name: 'modl_name',			type: 'string'},		//모델명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'prod_trst_dvcd',		type: 'string'},		//생산구분
		{	name: 'week',				type: 'string'},		//요일
		{	name: 'deli_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//요일
		{	name: 'deli_week',			type: 'string'},		//요일
		{	name: 'invc_qntt',			type: 'float'},			//주문수량
		{	name: 'invc_amnt',			type: 'float'},			//주문금액
		{	name: 'day_qntt',			type: 'float'},			//당일주문수량
		{	name: 'day_amnt',			type: 'float'},			//당일주문금액
		{	name: 'week_qntt',			type: 'float'},			//금주주문수량
		{	name: 'week_amnt',			type: 'float'},			//금주주문금액
		{	name: 'month_qntt',			type: 'float'},			//당월주문수량
		{	name: 'month_amnt',			type: 'float'},			//당월주문금액
		{	name: 'tele_numb',			type: 'string'},		//전화번호
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
		{	name: 'mes_system_type',	type: 'string',defaultValue:_global.options.mes_system_type}	//

	]
});
