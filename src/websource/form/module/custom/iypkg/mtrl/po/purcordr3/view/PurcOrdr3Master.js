Ext.define('module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3Master', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-purcordr3-lister',
	store		: 'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3Master',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					{	text : '<span class="write-button">발주서 발행</span>', action : 'writeAction'  , cls: 'button1-style'},
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style'	},
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
					{	dataIndex: 'invc_numb'		, width: 150, align: 'center', text: Language.get('invc_numb'		, '발주번호'		)
					},{	dataIndex: 'invc_date'		, width:  80, align: 'center', text: Language.get('invc_date'		, '발주일자'		)
					},{ dataIndex: 'cstm_name'		, width: 200, align: 'left'  , text: Language.get('cstm_name'		, '거래처명'		)
					},{ dataIndex: 'prod_code'		, width: 100, align: 'center', text: Language.get('prod_code'		, '품목코드'		)
					},{ dataIndex: 'prod_name'		, width: 170, align: 'left'  , text: Language.get('prod_name'		, '품목명'			)
					},{ dataIndex: 'item_leng'		, width:  60, align: 'right' , text: Language.get('item_leng'		, '장'			), xtype: 'numericcolumn'
					},{ dataIndex: 'item_widh'		, width:  60, align: 'right' , text: Language.get('item_widh'		, '폭'			), xtype: 'numericcolumn'
					},{ dataIndex: 'item_hght'		, width:  60, align: 'right' , text: Language.get('item_hght'		, '고'			), xtype: 'numericcolumn'
					},{ dataIndex: 'prod_qntt'		, width:  80, align: 'right' , text: Language.get('prod_qntt'		, '수주생산'		)
					},{ dataIndex: 'offr_qntt'		, width:  80, align: 'right' , text: Language.get('offr_qntt'		, '발주수량'		), xtype: 'numericcolumn'
					},{ dataIndex: 'offr_pric'		, width:  80, align: 'right' , text: Language.get('offr_pric'		, '단가'			), xtype: 'numericcolumn'
					},{ dataIndex: 'deli_date'		, width: 100, align: 'right' , text: Language.get('deli_date'		, '납기일자'		)
					},{ dataIndex: 'acpt_numb'		, width: 170, align: 'center', text: Language.get('acpt_numb'		, '수주번호'		)
					},{ dataIndex: 'acpt_cstm_name'	, width: 130, align: 'left'  , text: Language.get('acpt_cstm_name'	, '수주처명'		)
					},{ dataIndex: 'pcod_numb'		, width: 130, align: 'left'  , text: Language.get('pcod_numb'		, 'PO No'		)
					},{ dataIndex: 'user_memo'		, flex : 1, minWidth: 130, align: 'left'  , text: Language.get('user_memo'		, '비고'			)
					}
				]
			}
		;
		return item;
	}
 });
