Ext.define('module.stock.isos.movework.view.MoveWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-movework-lister-master',

	store		: 'module.stock.isos.movework.store.MoveWorkMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text   : '마감/해지',
						hidden : !_global.auth.auth_stok_1001,
						menu   : [
							{ text : '마감', action : 'closeAction'       },
							{ text : '해지', action : 'closecancelAction' }
						]
					},
					'-', '->', '-',
//					{text : '명세서'			 , iconCls: Const.REPORT.icon, action : 'etcPrintAction' 	} , '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_clos'			, width:  40, align : 'center' , text: Language.get( 'line_clos'		, '마감'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_numb'			, width:  80, align : 'left'   , text: Language.get( 'invc_numb'		, '전표번호'		)
					},{	dataIndex:	'invc_date'			, width: 100, align : 'left'   , text: Language.get( 'move_date'		, '이동 일자'		)
					},{	dataIndex:	'istt_bzpl_idcd'	, width:  80, align : 'left'   , text: Language.get( 'istt_bzpl_idcd'	, '입고사업장ID'	), hidden : true
					},{	dataIndex:	'istt_wrhs_idcd'	, width:  80, align : 'left'   , text: Language.get( 'istt_wrhs_idcd'	, '입고창고ID'	), hidden : true
					},{	dataIndex:	'ostt_bzpl_idcd'	, width:  80, align : 'left'   , text: Language.get( 'ostt_bzpl_idcd'	, '출고사업장ID'	), hidden : true
					},{	dataIndex:	'ostt_wrhs_idcd'	, width:  80, align : 'left'   , text: Language.get( 'ostt_wrhs_idcd'	, '출고창고ID'	), hidden : true
					},{	dataIndex:	'istt_bzpl_name'	, width: 100, align : 'left'   , text: Language.get( 'istt_bzpl_name'	, '입고사업장'		)
					},{	dataIndex:	'istt_wrhs_name'	, width: 100, align : 'left'   , text: Language.get( 'istt_wrhs_name'	, '입고창고'		)
					},{	dataIndex:	'ostt_bzpl_name'	, width: 100, align : 'left'   , text: Language.get( 'ostt_bzpl_name'	, '출고사업장'		)
					},{	dataIndex:	'ostt_wrhs_name'	, width: 100, align : 'left'   , text: Language.get( 'ostt_wrhs_name'	, '출고창고'		)
					},{	dataIndex:	'move_hope_date'	, width: 100, align : 'left'   , text: Language.get( 'move_hope_date'	, '이동희망일자'	) , hidden : true
					},{	dataIndex:	'trns_yorn'			, width:  80, align : 'left'   , text: Language.get( 'trns_yorn'		, '수송여부'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'reqt_dept_idcd'	, width:  80, align : 'left'   , text: Language.get( 'reqt_dept_idcd'	, '요청부서ID'	) , hidden : true
					},{	dataIndex:	'reqt_drtr_idcd'	, width:  80, align : 'left'   , text: Language.get( 'reqt_drtr_idcd'	, '요청담당자ID'	) , hidden : true
					},{	dataIndex:	'remk_text'			, width:  80, align : 'left'   , text: Language.get( 'remk_text'		, '비고'			) , hidden : true
					},{	dataIndex:	'proc_dept_idcd'	, width:  80, align : 'left'   , text: Language.get( 'proc_dept_idcd'	, '처리부서ID'	) , hidden : true
					},{	dataIndex:	'proc_drtr_idcd'	, width:  80, align : 'left'   , text: Language.get( 'proc_drtr_idcd'	, '처리담당자ID'	) , hidden : true
					},{	dataIndex:	'reqt_dept_name'	, width:  80, align : 'left'   , text: Language.get( 'reqt_dept_name'	, ''			) , hidden : true
					},{	dataIndex:	'reqt_drtr_name'	, width:  80, align : 'left'   , text: Language.get( 'reqt_drtr_name'	, ''			) , hidden : true
					},{	dataIndex:	'proc_dept_name'	, width:  80, align : 'left'   , text: Language.get( 'proc_dept_name'	, '처리부서'		)
					},{	dataIndex:	'proc_drtr_name'	, width:  80, align : 'left'   , text: Language.get( 'proc_drtr_name'	, '처리담당'		)
					},{	dataIndex:	'user_memo'			, flex:    1, align : 'left'   , text: Language.get( 'user_memo'		, '메모'			)
					},{	dataIndex:	'line_stat'			, width:  50, align : 'center' , text: Language.get( 'line_stat'		, '상태'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ), hidden : true
					}
				]
			};
		return item;
	}
 });
