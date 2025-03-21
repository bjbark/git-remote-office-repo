Ext.define('module.custom.sjflv.prod.order.prodorder.view.ProdOrderLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodorder-lister1',
	store		: 'module.custom.sjflv.prod.order.prodorder.store.ProdOrder1',

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
//					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style'	},
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: ''				, text : Language.get(''			, '생산지시'	) , width: 100	, align : 'center'
						, renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: '<span style="color : white !important;">생산지시</span>',
									width	: 60,
									height	: 19,
									cls		: 'button-style',
									handler	: function(b, e){
										e.stopEvent();
										if(me.getSelectionModel().getSelection().length == 0){
											Ext.Msg.alert('알림', '선택된 항목이 없습니다.')
											return false;
										}
										var selection = me.getSelectionModel().getSelection();
										var itemCode = selection[0].get('item_code');
										var count = 0;

										Ext.Array.forEach(selection, function(record){
											if (itemCode != record.get('item_code')) {
												count++;
											}
										})

										if (count > 0) {
											Ext.Msg.alert('알림', '통합 생산지시는 동일 제품이어야 합니다.');
											return false;
										} else {
											me.loadPopup(selection)
										}
									}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						}
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'	,'계획번호'		) , width : 100 , align : 'center'
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'	,'주문번호'		) , width : 100 , align : 'center'
//					},{	dataIndex: ''		, text : Language.get(''	,'항번'		) , width : 60  , align : 'center'
					},{	dataIndex: 'pdod_date'		, text : Language.get('pdod_date'	,'계획일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'prod_trst_dvcd'	, text : Language.get('prod_trst_dvcd'	,'생산구분'	) , width : 100 , align : 'center', xtype : 'lookupcolumn' , lookupValue:resource.lookup('prod_trst_dvcd')
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'	,'제품코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'center'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'	,'규격'		) , width : 100 , align : 'center'
					},{ dataIndex: 'acpt_qntt'		, text : Language.get('acpt_qntt'	,'주문수량'		) , width : 80  , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'stok_asgn_qntt'	, text : Language.get('stok_asgn_qntt'	,'재고수량'	) , width : 80  , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'plan_qntt'		, text : Language.get('plan_qntt'	,'생산계획량'	) , width : 80  , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'plan_baln_qntt'	, text : Language.get('plan_baln_qntt'	,'계획잔량'	) , width : 80  , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'	,'작업지시량'	) , width : 80  , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'stok_used'		, text : Language.get('stok_used'	,'원재료재고여부'	) , width : 100 , align : 'center', xtype : 'lookupcolumn' ,lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'특이사항'		) , flex  : 1   , align : 'center'
					},{ dataIndex: 'pckg_unit'		, text : Language.get('pckg_unit'	,'원재료재고여부'	) , hidden: true,
					},{ dataIndex: 'labl_qntt'		, text : Language.get('labl_qntt'	,'특이사항'		) , hidden: true,
					},{ dataIndex: 'make_mthd'		, text : Language.get('labl_qntt'	,'특이사항'		) , hidden: true,
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'	,'납기일자'		) , hidden: true,
					},
				]
			}
		;
		return item;
	},

	loadPopup: function(records) {
		var me = this,
			data = [],
			invc_numb = undefined,
			pror_numb = undefined;

		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'pror_mast'
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				pror_numb = result.records[0].seq;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});

		if (records.length > 1) {
			Ext.Msg.confirm("확인", "통합 생산지시를 하시겠습니까?", function(btn) {
				if (btn == 'yes') {
					popup = resource.loadPopup({
						widget	: 'module-sjflv-prodorder-popup',
						params	: {
							invc_numb : pror_numb,
							records   : records[0],
						}
					});
					Ext.Array.forEach(records, function(record){
						data.push(record.data);
					});
					popup.down('grid').getStore().add(data);
				}
			});
			console.log(records[0]);
		} else {
			popup = resource.loadPopup({
				widget	: 'module-sjflv-prodorder-popup',
				params	: {
					invc_numb : pror_numb,
					records   : records[0],
				}
			});
			Ext.Array.forEach(records, function(record){
				data.push(record.data);
			});
//			popup.down('grid').getStore().add(data);
		}
	},
});