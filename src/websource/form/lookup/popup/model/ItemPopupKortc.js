Ext.define('lookup.popup.model.ItemPopupKortc',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'prnt_item_idcd'	, type: 'string'
		},{	name: 'revs_numb'		, type: 'string'
		},{	name: 'revs_dvcd'		, type: 'string'
		},{	name: 'befr_splr_name'	, type: 'string'
		},{	name: 'splr_name'		, type: 'string'
		},{	name: 'line_stat'		, type: 'string', defaultValue: '0'	// ROW상태
		},{	name: 'usag_qntt_memo'	, type: 'string'
		},{	name: 'dely_cstm_itid'	, type: 'string'//납품처품번
		},{	name: 'dely_cstm_itid2'	, type: 'string'//납품처품번
		},{	name: 'dely_cstm_spec'	, type: 'string'//납품처규격
		},{	name: 'dely_cstm_spec2'	, type: 'string'//납품처규격
		},{	name: 'dely_cstm_item_name'	, type: 'string'//납품처품명
		},{	name: 'dely_cstm_item_name2', type: 'string'//납품처품명
		},{	name: 'dely_cstm_modl'	, type: 'string'//납품처모델
		},{	name: 'dely_cstm_modl2'	, type: 'string'//납품처모델
		},{	name: 'cstm_itid'		, type: 'string'//고객품번
		},{	name: 'cstm_itid2'		, type: 'string'//고객품번
		},{	name: 'acct_bacd_name'	, type: 'string'//계정명
		},{	name: 'cstm_item_name'	, type: 'string'//고객품명
		},{	name: 'cstm_item_name2'	, type: 'string'//고객품명
		},{	name: 'crty_bacd_name'	, type: 'string'//차종
		},{	name: 'crty_bacd_name2'	, type: 'string'//차종
		},{	name: 'crty_bacd'		, type: 'string'//차종분류코드
		},{	name: 'crty_bacd2'		, type: 'string'//차종분류코드
		},{	name: 'cstm_spec'		, type: 'string'//고객규격
		},{	name: 'cstm_spec2'		, type: 'string'//고객규격
		},{	name: 'ecod_purp'		, type: 'string'
		},{	name: 'item_mtrl'		, type: 'string'
		},{	name: 'drtr_idcd'		, type: 'string'
		},{	name: 'drtr_name'		, type: 'string'
		},{	name: 'test_date'		, type: 'string'
		},{	name: 'adpt_date'		, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'remk_text'		, type: 'string'
		},{	name: 'prnt_idcd'		, type: 'string'//상위
		},{	name: 'item_idcd'		, type: 'string'//상위품명
		},{	name: 'item_code'		, type: 'string'//품목코드
		},{	name: 'item_name'		, type: 'string'//품목명
		},{	name: 'item_name2'		, type: 'string'//품목명
		},{	name: 'item_spec'		, type: 'string'//품목규격
		},{	name: 'item_spec2'		, type: 'string'//품목규격
		}
	]
});





