Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_RN', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder2-lister-detail3_rn',
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'rn' }
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
					},{	dataIndex:	'bfsf_dvcd'				, text: Language.get('bfsf_dvcd'			, '틀짝망구분코드'		) , width :  90, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('bfsf_dvcd'),
					},{	dataIndex:	'tblr'					, text: Language.get('tblr'					, 'TBLR'			) , width :  50, align : 'center',
					},{	dataIndex:	'ivst_ordr'				, text: Language.get('ivst_ordr'			, '투입순서'			) , width :  70,align:'center',
					},{	dataIndex:	'cutt_ordr'				, text: Language.get('cutt_ordr'			, '절단순서'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_widh'				, text: Language.get('item_widh'			, '품목폭'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_hght'				, text: Language.get('item_hght'			, '품목높이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '품목길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'ydge_used_yorn'		, text: Language.get('ydge_used_yorn'		, '자투리사용'			) , width :  90, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),hidden : true
					},{	dataIndex:	'tagg_asmt'				, text: Language.get('tagg_asmt'			, '태그부자재'			) , width :  80, xtype:'numericcolumn',hidden : true
					},{	dataIndex:	'scrw_qntt'				, text: Language.get('scrw_qntt'			, '스크류수'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_1fst'		, text: Language.get('scrw_widh_1fst'		, '스크류폭1'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_2snd'		, text: Language.get('scrw_widh_2snd'		, '스크류폭2'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_3trd'		, text: Language.get('scrw_widh_3trd'		, '스크류폭3'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_plac'				, text: Language.get('scrw_plac'			, '스크류위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'brcd_hght'				, text: Language.get('brcd_hght'			, '바코드높이'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'brcd_plac'				, text: Language.get('brcd_plac'			, '바코드위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'assa_yorn'				, text: Language.get('assa_yorn'			, '아사여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden : true
					},{	dataIndex:	'brcd'					, text: Language.get('brcd'					, '바코드'			) , width : 100, align : 'left',
					},{	dataIndex:	'prts_numb'				, text: Language.get('prts_numb'			, '부품번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'ctbr_numb'				, text: Language.get('ctbr_numb'			, '절단바번호'			) , width :  80, align : 'left',
					}
				]
			};
		return item;
	},
});
