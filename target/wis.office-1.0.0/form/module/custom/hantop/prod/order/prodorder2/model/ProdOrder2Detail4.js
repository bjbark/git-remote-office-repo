Ext.define('module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail4', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'
		},{	name: 'amnd_degr'				, type: 'float'
		},{	name: 'line_seqn'				, type: 'float'
		},{	name: 'invc_qntt'				, type: 'float'
		},{	name: 'ings_tick'				, type: 'string'
		},{	name: 'otgs_tick'				, type: 'string'
		},{	name: 'item_widh'				, type: 'float'
		},{	name: 'item_hght'				, type: 'float'
		},{	name: 'item_widh_1fst'			, type: 'float'
		},{	name: 'item_hght_1fst'			, type: 'float'
		},{	name: 'wndw_dirt_dvcd'			, type: 'string'
		},{	name: 'wdsf_rate_name'			, type: 'string'
		},{	name: 'cstm_esti_numb'			, type: 'string'
		},{	name: 'copr_stor_name'			, type: 'string'
		},{	name: 'cont_schd_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'wndw_modl_idcd'			, type: 'string'
		},{	name: 'vald_date'				, type: 'string'
		},{	name: 'moss_itid'				, type: 'string'
		},{	name: 'scen_addr_1fst'			, type: 'string'
		},{	name: 'scen_addr_2snd'			, type: 'string'
		},{	name: 'scen_addr'				, type: 'string'
			, convert : function(value, record){
				return record.get('scen_addr_1fst') + ' ' + record.get('scen_addr_2snd');
			}
		},{	name: 'ispl_name'				, type: 'string'
		},{	name: 'wdbf_itid'				, type: 'string'
		},{	name: 'wdsf_itid'				, type: 'string'
		},{	name: 'wdtp_name'				, type: 'string'
		},{	name: 'wdtp_idcd'				, type: 'string'
		},{	name: 'modl_name'				, type: 'string'
		},{	name: 'inwp_itid'				, type: 'string'
		},{	name: 'otwp_itid'				, type: 'string'
		},{	name: 'ings_itid'				, type: 'string'



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