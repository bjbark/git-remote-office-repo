Ext.define('module.custom.komec.item.bommast.view.BomMastLister2', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-komec-bommast-lister2',
	store		: 'module.custom.komec.item.bommast.store.BomMastLister2',

	border		: 0  ,
	title		: Language.get('','리비전'),
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	//selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					{	xtype		: 'lookupfield',
						name		: 'revs_dvcd',
						editable	: false,
						width		: 100,
						lookupValue	: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? resource.lookup('revs_dvcd') : resource.lookup('').concat(resource.lookup('revs_dvcd').slice(0,1)),
						value		: '1',
						hidden		: true,
						listeners	:{
							change:function(obj, newValue, oldValue){
								var	search	= Ext.ComponentQuery.query('module-sjflv-bommast-search')[0],
									master	= Ext.ComponentQuery.query('module-sjflv-bommast-lister1')[0],
									lister2	= Ext.ComponentQuery.query('module-sjflv-bommast-lister2')[0],
									lister3	= Ext.ComponentQuery.query('module-sjflv-bommast-lister3')[0],
									record	= master.getSelectionModel().getSelection()[0]
								;
								if(record){
									if('1001' == record.get('acct_bacd') || '2003' == record.get('acct_bacd')) {
										if ('1' == newValue) {
											Ext.Msg.alert("알림", "계정이 " + ('1001' == record.get('acct_bacd') ? "원재료" : "품목보고" ) + "는 생산을 선택할 수 없습니다.");
						  					this.setValue('2');
											return;
									}
								}
									me.select({
										callback:function(records, operation, success) {
										}, scope:me
									},Ext.merge(search.getValues(),{
										hq_id		: _global.hq_id,
										item_idcd	: record.get('item_idcd') ,
										revs_dvcd	: this.getValue() ,
									}));
									lister3.getStore().clearData();
									lister3.getStore().removeAll();
								}

								if (this.value == '1') {
									lister2.down('[itemId=revUpdate]').show();
								} else {
									lister2.down('[itemId=revUpdate]').hide();
								}
							}
						}
					},'-','->',{	text : '<span class="write-button">리비전추가</span>', action : 'revInsertAction'	, cls: 'button-style'  ,width:70 , itemId:'insert'	} ,
					{	text : '<span class="write-button">리비전삭제</span>', action : 'revDeleteAction'	, cls: 'button1-style' ,width:70 , itemId:'delete'	} ,
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : "revUpdateAction" , cls: 'button-style', itemId:'revUpdate' },
				]
			}
		;
		return item ;

	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items  : [
					{	text : Language.get('revs_numb'			, 'No'			) , dataIndex: 'revs_numb'		, width : 30
					},{	text : Language.get('line_stat'			, '상태'			) , dataIndex: 'line_stat'		, width : 50, align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat'),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: false,
							lookupValue	: resource.lookup('line_stat'),
							/*listeners:{
								change : function(self, e) {
									var grid = this.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
								}
							}*/
						}
					},{	text : Language.get('adpt_date'			, '적용일자'		) , dataIndex: 'adpt_date'		, width : 80, align : 'center'
//					},{	text : Language.get('befr_splr_name'	, '(전)공급사'		) , dataIndex: 'befr_splr_name'	, width : 80,
//						tdCls : 'editingcolumn',
//						editor	: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: true,
//							enableKeyEvents : true,
//						},
//					},{	text : Language.get('splr_name'			, '(후)공급사'		) , dataIndex: 'splr_name'		, width : 80,
//						tdCls : 'editingcolumn',
//						editor	: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: true,
//							enableKeyEvents : true,
//						},
//					},{	text : Language.get('usag_qntt_memo'	, '사용량메모'		) , dataIndex: 'usag_qntt_memo'	, width : 80,
//						tdCls : 'editingcolumn',
//						editor	: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: true,
//							enableKeyEvents : true,
//						},
//					},{	text : Language.get('ecod_purp'			, '목적'			) , dataIndex: 'ecod_purp'	, width : 80,
//						tdCls : 'editingcolumn',
//						editor	: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: true,
//							enableKeyEvents : true,
//						},
					},{	text : Language.get('drtr_name'			, '담당자'			) , dataIndex: 'drtr_name'		, width : 80,
//					},{	text : Language.get('prnt_item_code'	, '상위코드'		) , dataIndex: 'item_code'		, width : 80,
//					},{	text : Language.get('prnt_item_name'	, '상위품명'		) , dataIndex: 'item_name'		, width : 200,
					},{	text : Language.get('remk_text'			, '비고'			) , dataIndex: 'remk_text'		, width : 200,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
						},
					}
				]
			};
		return item;
	}

});





