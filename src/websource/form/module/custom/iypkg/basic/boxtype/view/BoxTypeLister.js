Ext.define('module.custom.iypkg.basic.boxtype.view.BoxTypeLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-boxtype-lister'			,
	store		: 'module.custom.iypkg.basic.boxtype.store.BoxType'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },

	border		: 0,
	columnLines : true,
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
		item = {
				xtype	: 'grid-paging',
				itemId	: 'mainbutton',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action,cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action,cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action,cls: 'button-style' } ,
					'-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action,cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width:  60, align : 'center'	, text: Language.get( 'line_stat'		, '상태'				), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),
					},{	dataIndex:	'bxty_code'			, width:  57, align : 'center'	, text: Language.get( 'bxty_code'		, '형식코드'			),
					},{	dataIndex:	'bxty_name'			, width: 130, align : 'left'	, text: Language.get( 'bxty_name'		, '상자형식명'		),
					},{	dataIndex:	'bxty_imge_name'	, width: 100, align : 'left'	, text: Language.get( 'bxty_imge_name'	, '형식도면'			),
					},{	dataIndex:	'scre_dvcd'			, width:  73, align : 'center'	, text: Language.get( 'scre_dvcd'		, '스코어구분'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('scre_dvcd')
					},{	dataIndex:	'fabc_ttln_calc'	, width: 135, align : 'left'	, text: Language.get( 'fabc_ttln_calc'	, '원단총장 계산공식'	),
					},{	dataIndex:	'mxm2_gath'			, width:  70, align : 'right'	, text: Language.get( 'mxm2_gath'		, 'm2접합'			), xtype : 'numericcolumn'
					},{	dataIndex:	'offr_gath'			, width:  70, align : 'right'	, text: Language.get( 'offr_gath'		, '발주접합'			), xtype : 'numericcolumn'
					},{	dataIndex:	'fabc_ttwd_calc'	, width: 135, align : 'left'	, text: Language.get( 'fabc_ttwd_calc'	, '원단총폭 계산공식'	),
					},{	dataIndex:	'sgam_relx'			, width:  80, align : 'right'	, text: Language.get( 'sgam_relx'		, '외낱개여유'		), xtype : 'numericcolumn'
					},{	dataIndex:	'mxm2_fdat_loss'	, width:  85, align : 'right'	, text: Language.get( 'mxm2_fdat_loss'	, 'm2재단Loss'		), xtype : 'numericcolumn'
					},{	dataIndex:	'offr_fdat_loss'	, width:  85, align : 'right'	, text: Language.get( 'offr_fdat_loss'	, '발주재단Loss'		), xtype : 'numericcolumn'
					},{	dataIndex:	'scre_calc'			, width: 135, align : 'left'	, text: Language.get( 'scre_calc'		, '스코어규격 계산식'	),
					},{	dataIndex:	'tsum_ttln_calc'	, width: 135, align : 'left'	, text: Language.get( 'tsum_ttln_calc'	, '2합총장 계산식'		),
					},{	dataIndex:	'tsum_stnd'			, width: 100, align : 'right'	, text: Language.get( 'tsum_stnd'		, '2합기준'			),xtype : 'numericcolumn'
					},{	dataIndex:	'mxm2_tsum'			, width:  70, align : 'right'	, text: Language.get( 'mxm2_tsum'		, 'm2/2합'			),xtype : 'numericcolumn'
					},{	dataIndex:	'offr_tsum'			, width:  70, align : 'right'	, text: Language.get( 'offr_tsum'		, '발주/2합'			),xtype : 'numericcolumn'
					},{	dataIndex:	'minm_leng'			, width:  60, align : 'right'	, text: Language.get( 'minm_leng'		, '최소장'			),xtype : 'numericcolumn'
					},{	dataIndex:	'maxm_leng'			, width:  60, align : 'right'	, text: Language.get( 'maxm_leng'		, '최대장'			),xtype : 'numericcolumn'
					},{	dataIndex:	'minm_widh'			, width:  60, align : 'right'	, text: Language.get( 'minm_widh'		, '최소폭'			),xtype : 'numericcolumn'
					},{	dataIndex:	'maxm_widh'			, width:  60, align : 'right'	, text: Language.get( 'maxm_widh'		, '최대폭'			),xtype : 'numericcolumn'
					},{	dataIndex:	'bxty_leng'			, width:  40, align : 'right'	, text: Language.get( 'bxty_leng'		, '장'				),xtype : 'numericcolumn'
					},{	dataIndex:	'bxty_widh'			, width:  40, align : 'right'	, text: Language.get( 'bxty_widh'		, '폭'				),xtype : 'numericcolumn'
					},{	dataIndex:	'bxty_hght'			, width:  40, align : 'right'	, text: Language.get( 'bxty_hght'		, '고'				),xtype : 'numericcolumn'
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'right'	, text: Language.get( 'user_memo'		, '비고'				)
					}
				]
			}
		;
		return item;
	},
});
