Ext.define('module.basic.item.eco.ecomast.view.EcoMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-ecomast-lister-master',
	store		: 'module.basic.item.eco.ecomast.store.EcoMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
					{	text : '승인/승인취소',
						menu : [
							{	text : '승인', action : 'okAction'		},
							{	text : '승인취소', action : 'okCancelAction'	}
						]
					},
					'-', '->','-',
					{	text : '<span class="write-button">복사</span>', action : 'CopyAction'  , cls: 'button1-style',width : 70},	// 복사
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' },	// 신규
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' },	// 수정
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }, '-' ,	//엑셀
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }	//삭제
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
					{	dataIndex: 'ecod_idcd'			, text : Language.get('ecod_idcd'			,'ECO No'	)	, width : 90  , align : 'center'
					},{	dataIndex: 'cofm_yorn'			, text : Language.get('cofm_yorn'			,'확정여부'	)	, width : 60  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'item_code'			, text : Language.get('item_code'			,'품목코드'	)	, width : 80  , align : 'center'
					},{	dataIndex: 'item_name'			, text : Language.get('item_name'			,'품명'		)	, width : 250 , align : 'left',
					},{	dataIndex: 'item_spec'			, text : Language.get('item_spec'			,'규격'		)	, width : 180 , align : 'left',
					},{	dataIndex: 'modl_name'			, text : Language.get('modl_name'			,'모델명'		)	, width : 150 , align : 'left'
					},{	dataIndex: 'dely_cstm_itid'		, text : Language.get('dely_cstm_itid'		,'납품처품번'	)	, width : 80  , align : 'center'
					},{	dataIndex: 'dely_cstm_item_name', text : Language.get('dely_cstm_item_name'	,'납품처품명'	)	, width : 120 , align : 'left'
					},{	dataIndex: 'cstm_itid'			, text : Language.get('cstm_itid'			,'고객품번'	)	, width : 80  , align : 'center'
					},{	dataIndex: 'cstm_item_name'		, text : Language.get('cstm_item_name'		,'고객품명'	)	, width : 120 , align : 'left'
					},{	dataIndex: 'cstm_spec'			, text : Language.get('cstm_spec'			,'고객규격'	)	, width : 150 , align : 'left'
					},{	dataIndex: 'crty_bacd_name'		, text : Language.get('crty_bacd'			,'차종'		)	, width : 100 , align : 'left'
					},{	dataIndex: 'ecod_date'			, text : Language.get('ecod_date'			,'변경일자'	)	, width :  90 , align : 'center'
					},{	dataIndex: 'dtrb_date'			, text : Language.get('dtrb_date'			,'배포일자'	)	, width :  90 , align : 'center'
					},{	dataIndex: 'prnt_date'			, text : Language.get('prnt_date'			,'출력일자'	)	, width :  90 , align : 'center'
					},{	dataIndex: 'item_name'			, text : Language.get('item_name'			,'품명'		)	, width :  90  , hidden:true
					},{	dataIndex: 'prnt_item_idcd'		, text : Language.get('prnt_item_idcd'		,'품목id'	)	, width :  90  , hidden:true
					}
				],
			};
		return item;
	}
});
