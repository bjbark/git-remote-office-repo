Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_MF', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder2-lister-detail3_mf',
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'mf' }
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
					},{	dataIndex:	'dbwd_yorn'				, text: Language.get('dbwd_yorn'			, '이중창'			) , width :  65, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'cmbf_yorn'				, text: Language.get('cmbf_yorn'			, '공틀'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'tblr'					, text: Language.get('tblr'					, 'TBLR'			) , width :  50, align : 'center',
					},{	dataIndex:	'ivst_ordr'				, text: Language.get('ivst_ordr'			, '투입순서'			) , width :  70,align:'center',
					},{	dataIndex:	'cutt_ordr'				, text: Language.get('cutt_ordr'			, '절단순서'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_widh'				, text: Language.get('item_widh'			, '품목폭'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_hght'				, text: Language.get('item_hght'			, '품목높이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '품목길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'ydge_used_yorn'		, text: Language.get('ydge_used_yorn'		, '자투리사용'			) , width : 100, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'rolr_incl_yorn'		, text: Language.get('rolr_incl_yorn'		, '롤러포함'			) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rolr_name'				, text: Language.get('rolr_name'			, '롤러명'			) , width :  70, align : 'left',
					},{	dataIndex:	'rlho_cutt_angl'		, text: Language.get('rlho_cutt_angl'		, '롤러홀절단각도'		) , width : 100, xtype:'numericcolumn',
					},{	dataIndex:	'midl_rolr_name'		, text: Language.get('midl_rolr_name'		, '중간롤러명'			) , width :  80,
					},{	dataIndex:	'rein_incl_yorn'		, text: Language.get('rein_incl_yorn'		, '보강재포함'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_topp_cncs_yorn'	, text: Language.get('rein_topp_cncs_yorn'	, '보강재상부체결'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_plac_1fst'		, text: Language.get('rein_plac_1fst'		, '보강재위치1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rein_plac_2snd'		, text: Language.get('rein_plac_2snd'		, '보강재위치2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rein_plac_3trd'		, text: Language.get('rein_plac_3trd'		, '보강재위치3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'hair_incl_yorn'		, text: Language.get('hair_incl_yorn'		, '모헤어포함'			) , width :  70, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'ssbr_yorn'				, text: Language.get('ssbr_yorn'			, 'SS바유무'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'rs_yorn'				, text: Language.get('rs_yorn'				, 'RS유무'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'wryp_yorn'				, text: Language.get('wryp_yorn'			, '레핑여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'brcd_hght'				, text: Language.get('brcd_hght'			, '바코드높이'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'brcd_plac'				, text: Language.get('brcd_plac'			, '바코드위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'assa_yorn'				, text: Language.get('assa_yorn'			, '아사여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'brcd'					, text: Language.get('brcd'					, '바코드'			) , width : 100, align : 'left',
					},{	dataIndex:	'prts_numb'				, text: Language.get('prts_numb'			, '부품번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'ctbr_numb'				, text: Language.get('ctbr_numb'			, '절단바번호'			) , width :  80, align : 'left',
					}
				]
			};
		return item;
	},
});
