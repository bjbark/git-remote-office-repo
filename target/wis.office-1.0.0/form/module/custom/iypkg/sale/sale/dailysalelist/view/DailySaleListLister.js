Ext.define('module.custom.iypkg.sale.sale.dailysalelist.view.DailySaleListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dailysalelist-lister'			,
	store		: 'module.custom.iypkg.sale.sale.dailysalelist.store.DailySaleList'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '3'){
				if(_global.hqof_idcd.toUpperCase()=='N1000LIEBE'){			// TODO: 추후 변경예정
					return 'text-warn';
				}else{
					return 'text-green';
				}
			}else if(record.get('rnum') == '2'){
				return 'text-blue';
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : true,
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-','->','->','->','->','-',
					{	text : '<span class="write-button">매출일보 발행</span>'	, action : 'printAction'	, cls: 'button1-style'} , '-',
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
					{	xtype: 'rownumberer'		, width:40 , hidden : true
					},{	dataIndex: 'ostt_date'		, text : Language.get('ostt_date'		,'매출일자'	), width :  77,align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'매출처명'	), width : 193
					},{ dataIndex: 'prod_spec'		, text : Language.get('prod_spec'		,'제품형식'	), width :  90
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'품명'		), width : 250
					},{ dataIndex: 'bxty_spec'		, text : Language.get('bxty_spec'		,'상자규격'	), width :  85
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고수량'	), width :  80,xtype:'numericcolumn'
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'		), width :  80,xtype:'numericcolumn'
					},{ dataIndex: 'sale_amnt'		, text : Language.get('sale_amnt'		,'공급가액'	), width : 120,xtype:'numericcolumn'
					},{ dataIndex: 'pcod_numb'		, text : Language.get('pcod_numb'		,'P/O No'	), width : 180
					},{ dataIndex: ''				, text : Language.get(''				,'부가율'		), width :  80,xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});