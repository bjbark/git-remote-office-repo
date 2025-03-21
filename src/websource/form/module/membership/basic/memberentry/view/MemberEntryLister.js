Ext.define('module.membership.basic.memberentry.view.MemberEntryLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-memberentry-lister'			,
	store		: 'module.membership.basic.memberentry.store.MemberEntry'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
//	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		console.log(_global.hq_id);
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get('line_stat'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'mmbr_stat_dvcd'	, width:  70, align : 'center'	, text: Language.get('line_stat'		, '등록상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('mmbr_stat_dvcd')
					},{	dataIndex:	'drtr_name'			, width: 100, align : 'center'	, text: Language.get('drtr_name'		, '담당코치'		)
					},{	dataIndex:	'mmbr_code'			, width: 100, align : 'center'	, text: Language.get('mmbr_code'		, '회원코드'		)
					},{	dataIndex:	'mmbr_name'			, width: 120, align : 'left'	, text: Language.get('mmbr_name'		, '회원명'		)
					},{	dataIndex:	'alis_name'			, width: 120, align : 'left'	, text: Language.get('alis_name'		, '닉네임'		)
					},{	dataIndex:	'gndr_dvcd'			, width:  50, align : 'center'	, text: Language.get( 'gndr_dvcd'		, '성별'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'gndr_dvcd' ), hidden : false
					},{	dataIndex:	'entr_dvcd'			, width:  70, align : 'center'	, text: Language.get( 'entr_dvcd'		, '가입구분'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'entr_dvcd' ), hidden : false
					},{	dataIndex:	'entr_date'			, width:  80, align : 'center'	, text: Language.get( 'entr_date'		, '가입일자'		),
					},{	dataIndex:	'scsn_date'			, width:  80, align : 'center'	, text: Language.get( 'scsn_date'		, '탈퇴일자'		),
					},{	dataIndex:	'hdph_numb'			, width: 120, align : 'center'	, text: Language.get( 'hdph_numb'		, '연락처'		),
					},{	dataIndex:	'brth_date'			, width:  80, align : 'center'	, text: Language.get( 'brth_date'		, '생년월일'		),
					},{	dataIndex:	'lssn_type_dvcd'	, width: 100, align : 'center'	, text: Language.get( 'lssn_type_dvcd'	, '레슨형태'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'lssn_type_dvcd' ), hidden : false
					},{	dataIndex:	'lssn_ccle_dvcd'	, width: 100, align : 'center'	, text: Language.get( 'lssn_ccle_dvcd'	, '레슨주기'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'lssn_ccle_dvcd' ), hidden : false
					},{	dataIndex:	'amtm_yorn'			, width:  70, align : 'center'	, text: Language.get( 'amtm_yorn'		, '오전'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : false
					},{	dataIndex:	'amtm_term'			, width:  70, align : 'center'	, text: Language.get( 'amtm_term'		, '오전시간'		),
					},{	dataIndex:	'pmtm_yorn'			, width:  70, align : 'center'	, text: Language.get( 'pmtm_yorn'		, '오후'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : false
					},{	dataIndex:	'pmtm_term'			, width:  70, align : 'center'	, text: Language.get( 'pmtm_term'		, '오후시간'		),
					},{	dataIndex:	'lssn_stdt'			, width: 100, align : 'center'	, text: Language.get( 'lssn_stdt'		, '레슨시작일'		),
					},{	dataIndex:	'mond_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '월'			),
					},{	dataIndex:	'tued_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '화'			),
					},{	dataIndex:	'wedd_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '수'			),
					},{	dataIndex:	'thud_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '목'			),
					},{	dataIndex:	'frid_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '금'			),
					},{	dataIndex:	'satd_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '토'			),
					},{	dataIndex:	'sund_time'			, width:  50, align : 'center'	, text: Language.get( ''				, '일'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'mond_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '월'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'tued_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '화'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'wedd_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '수'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'thud_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '목'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'frid_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '금'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'satd_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '토'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true
					},{	dataIndex:	'sund_time_dvcd'	, width:  50, align : 'center'	, text: Language.get( ''				, '일'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ampm_dvcd' ), hidden : true

					},{	dataIndex:	'user_memo'			, flex : 1  , align : 'left'	, text: Language.get( 'user_memo'		, '기타사항'	),

					},{	dataIndex:	'updt_dttm'			, width: 150, align : 'center'	, text: Language.get( 'updt_dttm'		, '수정일시'		), hidden : false
					},{	dataIndex:	'crte_dttm'			, width: 150, align : 'center'	, text: Language.get( 'crte_dttm'		, '생성일시'		), hidden : false
					}
				]
			}
		;
		return item;
	}
});
