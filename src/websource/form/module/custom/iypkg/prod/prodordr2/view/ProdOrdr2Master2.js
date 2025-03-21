Ext.define('module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Master2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodordr2-master2',
	store		: 'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master2',

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
					{	text : '<span class="write-button">외주지시등록</span>'	, action : 'ordrAction'	, cls: 'button1-style'	, width: 80 } , '-',
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
					},{ dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get(''		, '거래처'		)
					},{ dataIndex: 'prod_name'		, flex :   1, align: 'left'  , text: Language.get(''		, '품명'		)
					},{ dataIndex: 'prod_leng'		, width:  50, align: 'right' , text: Language.get(''		, '장'		), xtype : 'numericcolumn'
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
