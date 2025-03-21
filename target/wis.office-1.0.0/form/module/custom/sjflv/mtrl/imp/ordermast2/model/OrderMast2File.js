Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2File', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//INVOICE번호
		},{	name: 'line_seqn'			, type: 'float' 		//순번
		},{	name: 'assi_seqn'			, type: 'float' 		//보조순번
		},{	name: 'file_size'			, type: 'string' 		//파일크기
		},{	name: 'file_name'			, type: 'string' 		//파일명
		},{	name: 'upld_dttm'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 		//업로드일자
		},{	name: 'remk_text'			, type: 'string' 		//비고



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
//	recalculation : function(inv) {
//		var row = this,
//			baseamt = row.get('invc_qntt') * row.get('cont_pric')
//		;
//		row.set('sply_amnt'	, Math.floor(row.get('invc_qntt') * row.get('cont_pric') /10)*10 );
//		row.set('vatx_amnt'	, Math.floor(Number(_global.tax_rt) * row.get('sply_amnt')/1000)*10 );
//		row.set('invc_amnt'	, row.get('sply_amnt') + row.get('vatx_amnt')) ;
//	}
});