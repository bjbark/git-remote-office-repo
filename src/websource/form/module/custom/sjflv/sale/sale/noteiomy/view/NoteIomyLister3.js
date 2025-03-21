Ext.define('module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLister3', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-noteiomy-lister3'			,
	store		: 'module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister3',
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
				defaults: {style: 'text-align: center', sortable: false, menuDisabled: true },
				items : [
					{	dataIndex: 'iomy_date'		, width:  90, align: 'center', text: Language.get('invc_date'	, '입금일자'	)
					},{	dataIndex: 'cstm_code'		, width: 100, align: 'center', text: Language.get('cstm_name'	, '거래처코드')
					},{ dataIndex: 'cstm_name'		, width: 250, align: 'left'  , text: Language.get('acpt_numb'	, '거래처명'	)
					},{ dataIndex: 'stot_bass'		, width: 120, align: 'left'  , text: Language.get('stot_bass'	, '어음번호'	)
					},{ dataIndex: 'iomy_amnt'		, width: 130, align: 'right' , text: Language.get('lcal_name'	, '수금금액'	), xtype: 'numericcolumn'  , format:  '#,##0.###'
					},{ dataIndex: 'remk_text'		, flex:    1, align: 'left'  , text: Language.get('cars_name'	, '비고'		)
					}
				]
			}
		;
		return item;
	},

});
