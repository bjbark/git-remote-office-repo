Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder-lister-cofmdetail2',
	store: 'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail2',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'}],
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'cofmdetail2',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'-',
					{	text : '<span class="write-button">수동으로 전환</span>'	, action : 'manualAction' , cls: 'button1-style' 	},
					,'-',
					{	text : '<span class="write-button">품목 최적화</span>'	, action : 'itemAction' , cls: 'button1-style' 	},
					'->', '-',
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
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
					{	dataIndex:	'lott_numb'				, text: Language.get('lott_numb'			, 'LOT번호'				) , width :  120, align : 'left'
					},{	dataIndex:	'item_idcd'				, text: Language.get('item_idcd'			, '자재'					) , width :  120, align : 'left'
					},{	dataIndex:	'auto_yorn'				, text: Language.get('auto_yorn'			, '자동여부'				) , width :  60,xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'), align : 'center'
					},{	dataIndex:	'bfsf_dvcd'				, text: Language.get('bfsf_dvcd'			, '자재구분'				) , width :  100, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('bfsf_dvcd'),
					},{	dataIndex:	'ivst_ordr'				, text: Language.get('ivst_ordr'			, '투입순서'				) , width :  100, align : 'center'
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'				) , width :  70,xtype:'numericcolumn'
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '자재길이'				) , width :  70,xtype:'numericcolumn'
					},{	dataIndex:	'rate'					, text: Language.get('rate'					, '효율'					) , width :  60,xtype:'numericcolumn'
					},{	dataIndex:	'cutt_union'			, text: Language.get('cutt_union'			, '절단내역'				) , flex  :  1
					}
				]
			};
		return item;
	},
});
