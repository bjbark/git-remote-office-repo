Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr-lister',
	store		: 'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdr',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , {ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
	}],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}else if(record.get('cstm_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : '<span class="write-button">발주서 발행</span>', action : 'writeAction'  , cls: 'button1-style'},
					'-', '-',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , button : 'lister' , cls: 'button-style'},
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
//					{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',/*, filter : 'disabled',*/
//						listeners:{
//							checkchange:function(element, rowindex, bool, rec) {
//								var record = me.store.getAt(rowindex);
//								rowIndexNum = rowindex;
//							}
//						}
//					},
					{	xtype: 'rownumberer'		, width:35 , hidden : false, align: 'center'
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'offr_date'	, '발주일자'		)
					},{	dataIndex:	'invc_numb'			, width: 130, align : 'center'	, text: Language.get( 'invc_numb'	, '발주번호'		), hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'code'				, width: 150, align : 'center'	, text: Language.get( 'code'		, '발주번호'		), hidden:true
					},{	dataIndex:	'cstm_name'			, width: 170, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		)
					},{	dataIndex:	'fabc_name'			, width: 160, align : 'left'	, text: Language.get( 'fabc_name'	, '원단명'			)
					},{	dataIndex:	'ppln_dvcd'			, width:  80, align : 'center'	, text: Language.get( 'item_line'	, '골'			), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'item_ttln'			, width:  50, align : 'right'	, text: Language.get( 'item_ttln'	, '장'			), xtype: 'numericcolumn', hidden:(_global.hqof_idcd.toUpperCase() == "N1000IYPKG")
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'item_widh'			, width:  50, align : 'right'	, text: Language.get( 'item_widh'	, '폭'			), xtype: 'numericcolumn', hidden:(_global.hqof_idcd.toUpperCase() == "N1000IYPKG")
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'item_fxqt'			, width:  40, align : 'center'	, text: Language.get( 'item_fxqt'	, '절수'			)
					},{	dataIndex:	'offr_qntt'			, width:  70, align : 'right'	, text: Language.get( 'offr_qntt'	, '발주수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'subt_qntt'			, width:  70, align : 'right'	, text: Language.get( 'subt_qntt'	, '감량'			), xtype: 'numericcolumn'
					},{	dataIndex:	'fdat_spec'			, width: 130, align : 'left'	, text: Language.get( ''	, '재단규격'				)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'deli_date'			, width: 100, align : 'center'	, text: Language.get( 'deli_date'	, '납기일자'		)
					},{	dataIndex:	'remk_text'			, width: 230, align : 'left'	, text: Language.get( 'user_memo'	, '비고'			), hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'istt_qntt'			, width:  70, align : 'right'	, text: Language.get( 'istt_qntt'	, '입고량'			), xtype: 'numericcolumn'
					},{	dataIndex:	'unistt'			, width:  70, align : 'right'	, text: Language.get( 'unistt'		, '미입고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'acpt_cstm_name'	, width: 150, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처명'	)
					},{	dataIndex:	'acpt_invc_numb'	, width: 150, align : 'center'	, text: Language.get( 'acpt_numb'	, '수주번호'		), hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'prod_name'			, width: 230, align : 'left'	, text: Language.get( 'item_name'	, '품명'			)
					}
				]
			};
		return item;
	}


 });