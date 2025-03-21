Ext.define('module.custom.kortc.prod.order.porderlist.model.PorderListMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'item_idcd'			, type: 'string'	//품목ID
		},{	name: 'item_code'			, type: 'string'	//품목코드
		},{	name: 'item_name'			, type: 'string'	//품명
		},{	name: 'item_spec'			, type: 'string'	//품목규격
		},{	name: 'modl_name'			, type: 'string'	//모델명
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'acpt_numb'			, type: 'string'	//수주명
		},{	name: 'lott_numb'			, type: 'string'	//lot번호
		},{	name: 'indn_qntt'			, type: 'float'		//지시수량
		},{	name: 'wkfw_idcd'			, type: 'string'	//공정흐름(라인)
		},{	name: 'wkfw_name'			, type: 'string'	//공정흐름(라인)명
		},{	name: 'strt_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime
		},{	name: 'endd_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime
		},{	name: 'remk_text'			, type: 'string'	//지시사항 (pror_mast)

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
		},{	name : 'crte_user_name'		, type : 'string'		//생성UI
		}
	]
});