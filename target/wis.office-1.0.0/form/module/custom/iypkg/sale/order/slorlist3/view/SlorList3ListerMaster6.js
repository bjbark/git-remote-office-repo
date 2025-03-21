Ext.define('module.custom.iypkg.sale.order.slorlist3.view.SlorList3ListerMaster6', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist3-lister-master6',
	store		: 'module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master6'	,

	features	: [{ ftype : 'grid-summary' }],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			console.log('Record:', record);

			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '3'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'prod_name'	, text : Language.get('' ,'품명'		) , width : 250 , align : 'left'
					},{	dataIndex: 'invc_date'	, text : Language.get('' ,'수주일자'	) , width : 100 , align : 'center'
					},{ dataIndex: 'invc_numb'	, text : Language.get('' ,'수주번호'	) , width : 124 , align : 'center'
					},{	dataIndex: 'cstm_name'	, text : Language.get('' ,'수주처명'	) , width : 193 , align : 'left'
					},{ dataIndex: 'spec'		, text : Language.get('' ,'상자규격'	) , width : 150
					},{ dataIndex: 'acpt_qntt'	, text : Language.get('' ,'수주수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'pqty_pric'	, text : Language.get('' ,'단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sply_amnt'	, text : Language.get('' ,'공급가액'	) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx'		, text : Language.get('' ,'부가율'		) , width :  70 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'pcod_numb'	, text : Language.get('' ,'PO No'	) , width : 150 , align : 'left'
					},{ dataIndex: 'deli_date'	, text : Language.get('' ,'납기일자'	) , width : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});