Ext.define('module.mtrl.po.poisttwork.view.PoIsttWorkListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-poisttwork-lister-detail',

	store: 'module.mtrl.po.poisttwork.store.PoIsttWorkDetail',

	border : 0 ,
	columnLines: true ,
	features: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'}
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'			, width:  40, align : 'center' , text: Language.get( 'line_seqn'      , '순번'), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'istt_wrhs_idcd'	, width:  80, align : 'left'   , text: Language.get( 'ostt_wrhs_idcd' , '입고창고ID'	), hidden : true
					},{	dataIndex:	'istt_wrhs_name'	, width: 120, align : 'left'   , text: Language.get( 'ostt_wrhs_name' , '입고창고'	)
					},{	dataIndex:	'item_idcd'			, width:  80, align : 'left'   , text: Language.get( 'item_idcd'      , '품목ID'		), hidden : true
					},{	dataIndex:	'item_code'			, width:  90, align : 'left'   , text: Language.get( 'item_code'      , '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'   , text: Language.get( 'item_name'      , '품명'		)
					},{	dataIndex:	'item_spec'			, width: 150, align : 'left'   , text: Language.get( 'item_spec'      , '규격'		)
					},{	dataIndex:	'unit_idcd'			, width:  80, align : 'left'   , text: Language.get( 'unit_idcd'      , '단위ID'		), hidden : true
					},{	dataIndex:	'unit_name'			, width:  50, align : 'left'   , text: Language.get( 'unit_name'      , '단위'		)
					},{	dataIndex:	'lott_numb'			, width: 120, align : 'left'   , text: Language.get( 'lott_numb'      , 'LOT번호'	)
					},{	dataIndex:	'istt_qntt'			, width:  80, align : 'right'  , text: Language.get( 'ostt_qntt'      , '입고수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{	dataIndex:	'stnd_unit'			, width:  80, align : 'left'   , text: Language.get( 'stnd_unit'      , '기준단위'	), hidden : true
					},{	dataIndex:	'stnd_unit_qntt'	, width:  80, align : 'right'  , text: Language.get( 'stnd_unit_qntt' , '기준단위수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##', hidden: true
					},{	dataIndex:	'orig_invc_numb'	, width: 110, align : 'left'   , text: Language.get( 'offr_numb'      , '발주번호'	)
					},{	dataIndex:	'orig_seqn'			, width:  40, align : 'center' , text: Language.get( 'offr_seqn'      , '항번'		)
					},{	dataIndex:	'line_stat'			, width:  50, align : 'center' , text: Language.get( 'line_stat'      , '상태'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' )
					},{	dataIndex:	'remk_text'			, flex :   1, align : 'left'   , text: Language.get( 'remk_text'      , '비고'		)
					}
				]
			};
		return item;
	}
 });
