Ext.define('module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-noteiomy-lister2'			,
	store		: 'module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister2',
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
		ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
		trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
		leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
	} ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('cstm_name') == '소계'){
				return 'text-blue';
			}
		}
	},

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
				pagingButton : false,
				items	: [
					'->', '-',
				{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' },
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center' },
				items : [
					{	dataIndex: 'invc_date'		, width:  90, align: 'center', text: Language.get('invc_date'	, '전표일자'	)
					},{	dataIndex: 'cstm_code'		, width: 100, align: 'center', text: Language.get('cstm_code'	, '거래처코드')
					},{ dataIndex: 'cstm_name'		, width: 250, align: 'left'  , text: Language.get('cstm_name'	, '거래처명'	)
					},{ dataIndex: 'stot_bass'		, width: 120, align: 'left'  , text: Language.get('stot_bass'	, '어음번호'	)
					},{ dataIndex: 'expr_date'		, width:  90, align: 'center', text: Language.get('expr_date'	, '만기일자'	)
					},{ dataIndex: 'plan_amnt'		,    flex: 1, align: 'right' , text: Language.get('cars_name'	, '수금금액'	), xtype: 'numericcolumn' , format:  '#,##0.###'
					}
				]
			}
		;
		return item;
	},

});
