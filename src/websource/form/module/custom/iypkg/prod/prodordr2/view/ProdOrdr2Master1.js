Ext.define('module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Master1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodordr2-master1',
	store		: 'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master1',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	columnLines : true,

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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'rnum'			, width:  35, align: 'center', text: Language.get(''		, '순위'		)
					},{	dataIndex: 'invc_numb'		, width: 120, align: 'center', text: Language.get(''		, '수주번호'	)
					},{	dataIndex: 'offr_date'		, width: 100, align: 'center', text: Language.get(''		, '발주일자'	), hidden : true
					},{ dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get(''		, '거래처'		)
					},{ dataIndex: 'prod_name'		, flex :   1, align: 'left'  , text: Language.get(''		, '품명'		)
					},{ dataIndex: 'prod_leng'		, width:  50, align: 'right'  , text: Language.get(''		, '장'		), xtype : 'numericcolumn'
					},{ dataIndex: 'prod_widh'		, width:  50, align: 'right' , text: Language.get(''		, '폭'		), xtype : 'numericcolumn'
					},{ dataIndex: 'prod_hght'		, width:  50, align: 'right' , text: Language.get(''		, '고'		), xtype : 'numericcolumn'
					},{ dataIndex: 'acpt_qntt'		, width:  80, align: 'right' , text: Language.get(''		, '수주량'		), xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
 });
