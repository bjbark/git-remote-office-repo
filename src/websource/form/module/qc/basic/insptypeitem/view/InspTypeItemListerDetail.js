Ext.define('module.qc.baisc.insptypeitem.view.InspTypeItemListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-insptypeitem-lister-detail',

	store: 'module.qc.basic.insptypeitem.store.InspTypeItemDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
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
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex:	'insp_sbsc_name', width: 150, align : 'left'	, text: Language.get('insp_sbsc_name'	, '검사항목명'		)
					},{	dataIndex:	'insp_cond'		, flex : 200, align : 'left'	, text: Language.get('insp_cond'		, '검사조건'		)
					},{	dataIndex:	'ctq_sbsc_yorn'	, width:  90, align : 'center'	, text: Language.get('ctq_sbsc_yorn'	, 'CTQ항목'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('yorn')   , hidden : (_global.options.insp_item_ctq == 0)
					},{	dataIndex:	'msmt_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('msmt_mthd_dvcd'	, '측정방법'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('msmt_mthd_dvcd')
					},{	dataIndex:	'insp_cvic_idcd', width: 150, align : 'left'	, text: Language.get('insp_cvic_idcd'	, '검사기기id'		)	, hidden : true
					},{	dataIndex:	'cvic_name'		, width: 150, align : 'left'	, text: Language.get('cvic_name'		, '측정도구'		)
					},{	dataIndex:	'insp_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('insp_mthd_dvcd'	, '검사방법'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')  , hidden : (_global.options.insp_item_mthd == 0)
					},{	dataIndex:	'insp_levl'		, width:  80, align : 'left'	, text: Language.get('insp_levl'		, '검사수준'		)	, hidden : (_global.options.insp_item_levl == 0)
					},{	dataIndex:	'lott_judt_stnd', width:  80, align : 'left'	, text: Language.get('lott_judt_stnd'	, 'lot판정기준'		)	, hidden : (_global.options.insp_item_lot  == 0)
					},{	dataIndex:	'rslt_iput_dvcd', width:  80, align : 'center'	, text: Language.get('rslt_iput_dvcd'	, '입력구분'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('rslt_iput_dvcd')
					},{	dataIndex:	'goal_levl'		, width:  70, align : 'left'	, text: Language.get('goal_levl'		, '목표수준'		)	/*, hidden : (_global.options.insp_item_goal == 0)*/
					},{	dataIndex:	'uppr_valu'		, width:  70, align : 'left'	, text: Language.get('uppr_valu'		, '상한값'			)	/*, hidden : (_global.options.insp_item_uppr == 0)*/
					},{	dataIndex:	'lwlt_valu'		, width:  70, align : 'left'	, text: Language.get('lwlt_valu'		, '하한값'			)	/*, hidden : (_global.options.insp_item_lwlt == 0)*/
					},{	dataIndex:	'remk_text'		, width: 200, align : 'left'	, text: Language.get('remk_text'		, '참고사항'		)
					}
				]
			};
		return item;
	}
});
