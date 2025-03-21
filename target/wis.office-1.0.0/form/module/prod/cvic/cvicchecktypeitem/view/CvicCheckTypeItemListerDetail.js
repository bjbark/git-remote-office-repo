Ext.define('module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-cvicchecktypeitem-lister-detail',

	store: 'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemDetail',

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
					},{	dataIndex:	'chek_sbsc_name', width: 150, align : 'left'	, text: Language.get('chek_sbsc_name'	, '점검항목명'	)
					},{	dataIndex:	'chek_cond'		, width: 200, align : 'left'	, text: Language.get('chek_cond'		, '점검조건'		)
					},{	dataIndex:	'msmt_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('msmt_mthd_dvcd'	, '측정방법'		) ,xtype :'lookupcolumn', lookupValue : resource.lookup('msmt_mthd_dvcd')
					},{	dataIndex:	'rslt_iput_dvcd', width:  80, align : 'center'	, text: Language.get('rslt_iput_dvcd'	, '입력구분'		) ,xtype :'lookupcolumn', lookupValue : resource.lookup('rslt_iput_dvcd')
					},{	dataIndex:	'goal_levl'		, width:  70, align : 'right'	, text: Language.get('goal_levl'		, '목표수준'		)
					},{	dataIndex:	'uppr_valu'		, width:  70, align : 'right'	, text: Language.get('uppr_valu'		, '상한값'		) , xtype: 'numericcolumn'
					},{	dataIndex:	'lwlt_valu'		, width:  70, align : 'right'	, text: Language.get('lwlt_valu'		, '하한값'		) , xtype: 'numericcolumn'
					},{	dataIndex:	'remk_text'		, flex :  70, align : 'left'	, text: Language.get('remk_text'		, '참고사항'		)
					}
				]
			};
		return item;
	}
});
