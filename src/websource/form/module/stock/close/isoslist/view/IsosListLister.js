Ext.define('module.stock.close.isoslist.view.IsosListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isoslist-lister',
	store		: 'module.stock.close.isoslist.store.IsosList',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
//	columnLines : true,

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

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
						if(record.data.sysm_memo == 2){
							Ext.fly(cells[j]).setStyle('background-color', '#FFC080');
						}
					}
				}
			}
		}

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'isoslist',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'->', '-' ,
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex : 'item_code'	, text : Language.get('item_code'	,'품목코드'	), width : 150 , align : 'center'
					},{	dataIndex : 'item_name'	, text : Language.get('item_name'	,'품명'	), width : 200 , align : 'left'
					},{	dataIndex : 'item_spec'	, text : Language.get('item_spec'	,'규격'	), width : 120 , align : 'left'
					},{	dataIndex : 'unit_name'	, text : Language.get('unit_name'	,'단위'	), width :  60 , align : 'left'
					},{	dataIndex : 'invc_date'	, text : Language.get('isos_date'	,'수불일자'	), width :  80 , align : 'center'
					},{	dataIndex : 'remk_text'	, text : Language.get('remk_text'	,'수불구분'	), width : _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? 150 : 80
					},{	dataIndex : 'make_date'	, text : Language.get('make_date'		,'제조일자'	), width :  80 , align : 'center',hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false : true
					},{	dataIndex : 'rtil_ddln_date'	, text : Language.get('rtil_ddln_date'	,'유통기한'	), width :  80 , align : 'center',hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false : true
					},{	dataIndex : 'wrhs_name'	, text : Language.get('wrhs_name'	,'창고이름'	), width : 120 , align : 'left', hidden : _global.hq_id.toUpperCase()=='N1000A-ONE'? false : true,
					},{	dataIndex : 'zone_name'	, text : Language.get('zone_name'	,'보관위치'	), width : 100 , align : 'left', hidden : _global.hq_id.toUpperCase()=='N1000A-ONE'? false : true,
					},{	dataIndex : 'orig_invc_numb'	, text : Language.get('orig_invc_numb'	,'적요'		), width : 120 , align : 'left'
					},{	dataIndex : 'istt_qntt'	, text : Language.get('istt_qntt'	,'입고수량'	), width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9',
					},{	dataIndex : 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'출고수량'	), width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9',
					},{	dataIndex : 'stok_qntt'	, text : Language.get('stok_qntt'	,'재고수량'	), width : 100 , xtype : 'numericcolumn', align : 'right', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9',
					},{	dataIndex : 'lott_numb'	, text : Language.get('lott_numb'	,'LOT번호'), width : 120, align : 'center'	,hidden :true
					},{	dataIndex : 'user_memo'	, text : Language.get('user_memo'	,'비고'	), flex  :  1 , minWidth:120, align : 'left'
					}
				]
			}
		;
		return item;
	}
});