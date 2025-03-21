Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2Master', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-mtrlostt2-lister',
	store		: 'module.custom.iypkg.stock.isos.mtrlostt2.store.MtrlOstt2Master',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
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
					{	text : Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action , cls: 'button-style' },
					{	text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action , cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get(''		, '사용일자'		)
					},{	dataIndex: 'cstm_name'		, width: 100, align: 'center', text: Language.get(''		, '입고처명'		)
					},{ dataIndex: 'asmt_name'		, width: 230, align: 'left'  , text: Language.get(''		, '부자재명'		)
					},{ dataIndex: 'asmt_dvcd'		, width:  80, align: 'center', text: Language.get(''		, '구분'			), xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{ dataIndex: 'istt_qntt'		, width:  80, align: 'right' , text: Language.get(''		, '입고수량'		), xtype: 'numericcolumn'
					},{ dataIndex: 'ostt_qntt'		, width:  80, align: 'right' , text: Language.get(''		, '사용수량'		), xtype: 'numericcolumn'
					},{ dataIndex: 'unit_name'		, width:  80, align: 'center', text: Language.get(''		, '단위'			)
					},{ dataIndex: 'remk_text'		, width: 200, align: 'left'  , text: Language.get(''		, '비고'			)
					}
				]
			}
		;
		return item;
	}
 });
