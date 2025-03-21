Ext.define('module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sptslist1-lister',
	store		: 'module.custom.iypkg.stock.isos.sptslist1.store.SptsList1Lister',

	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	viewConfig: {
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
					for(var j = 0; j < cells.length; j++) {
						if(record.data.cstm_name == '소계') {
							Ext.fly(cells[j]).setStyle('color', 'blue');
						}else if(record.data.cstm_name == '합계') {
							Ext.fly(cells[j]).setStyle('color', 'red');
						}else if(record.data.ostt_yorn == 1){
							Ext.fly(cells[j]).setStyle('background-color', 'lightgreen');
						}else if(record.data.ostt_yorn == 0 && record.data.ostt_yorn2 == 1){
							Ext.fly(cells[j]).setStyle('background-color', 'lightblue');
						}
					}
				}
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-'
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'acpt_date'		, width: 100, align : 'center'	, text: Language.get('acpt_date'		, '수주일자'	)
					},{	dataIndex: 'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'		, '수주처'		)
					},{	dataIndex: 'prod_name'		, width: 200, align : 'left'	, text: Language.get('prod_name'		, '제품명'		)
					},{	dataIndex: 'prod_spec'		, width: 120, align : 'left'	, text: Language.get('prod_spec'		, '제품규격'	)
					},{	dataIndex: 'acpt_qntt'		, width:  80, align : 'right'	, text: Language.get('acpt_qntt'		, '수주량'		), xtype: 'numericcolumn'
					},{	dataIndex: 'ostt_qntt'		, width:  80, align : 'right'	, text: Language.get('ostt_qntt'		, '출고량'		), xtype: 'numericcolumn'
					},{	dataIndex: 'trst_qntt'		, width:  80, align : 'right'	, text: Language.get('trst_qntt'		, '계획량'		), xtype: 'numericcolumn'
					},{	dataIndex: 'lcal_name'		, width:  80, align : 'center'	, text: Language.get('lcal_name'		, '운송지역'	)
					},{	dataIndex: 'prod_code'		, width: 100, align : 'center'	, text: Language.get('prod_code'		, '제품코드'	)
					},{	dataIndex: 'pqty_pric'		, width:  80, align : 'right'	, text: Language.get('pqty_pric'		, '단가/개'	), xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}
});
