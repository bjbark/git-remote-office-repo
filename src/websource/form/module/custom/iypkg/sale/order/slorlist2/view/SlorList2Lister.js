Ext.define('module.custom.iypkg.sale.order.slorlist2.view.SlorList2Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist2-lister',
	store		: 'module.custom.iypkg.sale.order.slorlist2.store.SlorList2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'} ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},


	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '3'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		},
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
					for(var j = 0; j < cells.length; j++) {
						if(record.data.stat == 1){													// 발주
							Ext.fly(cells[j]).setStyle('background-color', '#FFC080');
						}else if(record.data.stat == 2){											// 입고
							Ext.fly(cells[j]).setStyle('background-color', '#FFC8FB');
						}else if(record.data.stat == 3){											// 생산
							Ext.fly(cells[j]).setStyle('background-color', '#CBFFC8');
						}else if(record.data.stat == 4){											// 출고
							Ext.fly(cells[j]).setStyle('background-color', '#CECFFF');
						}
					}
				}
			}
		}

	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : true,
				items : [
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				],
			};
		return item ;
	},
	renderer : function (val, meta, record) {

	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'			, width: 100, align : 'center',	text: Language.get( 'acpt_date'		, '수주일자'	)
					},{	dataIndex:	'deli_date'			, width: 100, align : 'center',	text: Language.get( 'deil_date'		, '납기일자'	)
					},{	dataIndex:	'cstm_name'			, width: 165, align : 'left',	text: Language.get( ''				, '수주처명'	)
					},{	dataIndex:	'prod_name'			, width: 280, align : 'left',	text: Language.get( 'prod_name'		, '품명'		)
					},{	dataIndex:	'prod_spec'			, width: 100, align : 'left',	text: Language.get( 'prod_spec'		, '상자규격'	)
					},{	dataIndex:	'acpt_qntt'			, width:  70, align : 'right',	text: Language.get( 'acpt_qntt'		, '수주량'	), xtype: 'numericcolumn' ,
					},{	dataIndex:	'dely_cstm_name'	, width: 130, align : 'left',	text: Language.get( 'offr_offe_name', '발주처'	)
					},{	dataIndex:	'fabc_name'			, width: 130, align : 'left',	text: Language.get( 'fabc_name'		, '원단명'	)
					},{	dataIndex:	'ppln_dvcd'			, width:  80, align : 'left',	text: Language.get( 'ppln_dvcd'		, '골'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_dvcd' )
					},{	dataIndex:	'fabc_spec'			, width: 100, align : 'left',	text: Language.get( 'fabc_spec'		, '원단규격'	)
					},{	dataIndex:	'item_fxqt'			, width:  60, align : 'right',	text: Language.get( 'item_fxqt'		, '절수'		), xtype: 'numericcolumn' ,
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '소계' || rec.data.cstm_name == '월계' || rec.data.invc_date == '합계'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{	dataIndex:	'item_ttln'			, width:  60, align : 'right',	text: Language.get( 'item_ttln'		, '총장'		), xtype: 'numericcolumn' ,
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '소계' || rec.data.cstm_name == '월계' || rec.data.invc_date == '합계'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{	dataIndex:	'item_ttwd'			, width:  60, align : 'right',	text: Language.get( 'item_ttwd'		, '총폭'		), xtype: 'numericcolumn' ,
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '소계' || rec.data.cstm_name == '월계' || rec.data.invc_date == '합계'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{	dataIndex:	'item_leng'			, width:  60, align : 'right',	text: Language.get( 'item_leng'		, '월장'		), xtype: 'numericcolumn' ,
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '소계' || rec.data.cstm_name == '월계' || rec.data.invc_date == '합계'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{	dataIndex:	'item_widh'			, width:  60, align : 'right',	text: Language.get( 'item_widh'		, '월폭'		), xtype: 'numericcolumn' ,
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '소계' || rec.data.cstm_name == '월계' || rec.data.invc_date == '합계'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{	dataIndex:	'offr_qntt'			, width:  70, align : 'right',	text: Language.get( 'offr_qntt'		, '발주수량'	), xtype: 'numericcolumn' ,
					},{	dataIndex:	'ostt_date'			, width: 100, align : 'center',	text: Language.get( 'ostt_date'		, '출고일자'	),
					},{	dataIndex:	'ostt_qntt'			, width:  70, align : 'right',	text: Language.get( 'ostt_qntt'		, '출고수량'	), xtype: 'numericcolumn' ,
					},{	dataIndex:	'deff_qntt'			, width:  70, align : 'right',	text: Language.get( 'upid_baln_qntt', '미납잔량'	), xtype: 'numericcolumn' ,
						renderer: function(val,meta,rec) {
							if(rec.data.cstm_name == '일계' || rec.data.cstm_name == '소계' || rec.data.cstm_name == '월계' || rec.data.invc_date == '합계'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					}
				]
			};
		return item;
	}
 });