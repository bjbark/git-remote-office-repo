Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_GL', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder2-lister-detail3_gl',
	store: 'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3_2',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
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
//					{	text : '<span class="write-button">확정</span>'		, action : 'editAction'				, cls: 'button1-style' 	},
//					{	text : '<span class="write-button">확정취소</span>'	, action : 'editCancleAction'		, cls: 'button1-style' 	},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'gl' }
				],
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
					{	dataIndex:	'line_seqn'				, text: Language.get('line_seqn'			, '순번'				) , width :  50, align : 'center'
					},{	dataIndex:	'cmpl_yorn'				, text: Language.get('cmpl_yorn'			, '완료'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:[['0','재작업'],['1','완료'],['5','오류'],['8','취소'],['9','보류']],
					},{	dataIndex:	'auto_yorn'				, text: Language.get('auto_yorn'			, '자동'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'item_name'				, text: Language.get('item_name'			, '품목명'			) , width : 160, align : 'left',
					},{	dataIndex:	'ispl_name'				, text: Language.get('ispl_name'			, '설치위치'			) , width : 100, align : 'left',
					},{	dataIndex:	'invc_qntt'				, text: Language.get('invc_qntt'			, '수량'				) , width :  50, xtype : 'numericcolumn',
					},{	dataIndex:	'dbwd_yorn'				, text: Language.get('dbwd_yorn'			, '이중창'			) , width :  65, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'cmbf_yorn'				, text: Language.get('cmbf_yorn'			, '공틀'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'cutt_hght'				, text: Language.get('cutt_hght'			, '절단높이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_widh'				, text: Language.get('item_widh'			, '품목폭'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_hght'				, text: Language.get('item_hght'			, '품목높이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '품목길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'brcd'					, text: Language.get('brcd'					, '바코드'			) , width : 100, align : 'left',
					},{	dataIndex:	'prts_numb'				, text: Language.get('prts_numb'			, '부품번호'			) , width :  80, align : 'left',
					}
				]
			};
		return item;
	},
});
