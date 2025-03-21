Ext.define('module.mtrl.po.purcordr2.view.PurcOrdr2ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-purcordr2-lister-detail',

	store: 'module.mtrl.po.purcordr2.store.PurcOrdr2Detail',

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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 200, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'offr_qntt'		, width:  80, align : 'right'	, text: Language.get('offr_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum' ,format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{	dataIndex:	'offr_pric'		, width:  80, align : 'right'	, text: Language.get('offr_pric'	, '단가'		), xtype: 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{	dataIndex:	'offr_amnt'		, width:  80, align : 'right'	, text: Language.get('offr_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType	: 'sum',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{	dataIndex:	'offr_vatx'		, width:  80, align : 'right'	, text: Language.get('offr_vatx'	, '부가세'		), xtype: 'numericcolumn', summaryType	: 'sum',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType	: 'sum',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##0',
					},{	dataIndex:	'deli_date2'	, width:  80, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						}
					},{	dataIndex:	'user_memo'		, flex :  30, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
