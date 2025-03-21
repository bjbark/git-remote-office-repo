Ext.define('module.workshop.eis.eisreport1.view.EisReport1Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport1-lister'			,
	store		: 'module.workshop.eis.eisreport1.store.EisReport1'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE'},
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: { ptype:'cellediting-directinput'},
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
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	xtype: 'rownumberer', width:  50, text: '순번', align : 'center', hidden : true
					},{	dataIndex:	'line_clos'			, width:  50, align : 'center'	, text: Language.get('line_clos'		, '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'invc_date'		, '수주일자'	)
					},{	dataIndex:	'cstm_name'			, width: 200, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'ttle'				, width: 250, align : 'left'	, text: Language.get( 'ttle'			, '품명'		)
					},{	dataIndex:	'shet_size_dvcd'	, width: 100, align : 'left'	, text: Language.get( 'shet_size_dvcd'	, '용지사이즈'	), hidden : true
					},{	dataIndex:	'colr_name'			, width:  80, align : 'center'	, text: Language.get( 'colr_name'		, '컬러'		)
					},{	dataIndex:	'volm_qntt'			, width: 100, align : 'right'	, text: Language.get( 'volm_qntt'		, '수주량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'esti_pric'			, width: 130, align : 'right'	, text: Language.get( 'esti_pric'		, '단가'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'esti_amnt'			, width: 150, align : 'right'	, text: Language.get( 'esti_amnt'		, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'deli_date'			, width: 100, align : 'center'	, text: Language.get( 'deli_date'		, '납품요청일'	)
					},{	dataIndex:	'dlvy_date'			, width: 100, align : 'center'	, text: Language.get( 'dlvy_date'		, '납품일'		)
					},{	dataIndex:	'need_dcnt'			, width:  80, align : 'right'	, text: Language.get( 'need_dcnt '		, '소요일'		)
					},{	dataIndex:	'dely_dcnt'			, width:  80, align : 'right'	, text: Language.get( 'dely_dcnt '		, '지연일수'		)
					}
				]
			}
		;
		return item;
	}
});
