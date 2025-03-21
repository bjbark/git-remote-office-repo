Ext.define('module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-purcordrndqt-lister1',
	store		: 'module.custom.sjflv.mtrl.po.purcordrndqt.store.PurcOrdrNdqtLister1',
	border		: 0,
	columnLines	: true,
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'cellediting-directinput' , clicksToEdit : 1 } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
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
					{	text : '<span class="write-button">초기화</span>', action : 'cancelAction'	, cls: 'button-style'} ,
					'-',
					'->',
					{	text : '<span class="write-button">행추가</span>', handler: me.rowInsert		, cls: 'button-style'} ,
					{	text : '<span class="write-button">행삭제</span>', handler: me.rowDelete		, cls: 'button1-style'} ,
					'-',
					{	text : '<span class="write-button">계산</span>', action : 'selectAction'	, cls: 'button-style'} ,
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
				items : [
					{	dataIndex:	'item_idcd'		, width: 80, align : 'center'    , text: Language.get( 'item_idcd'	, '품목id'	),hidden : true,
					},{	dataIndex:	'item_code'		, width: 80, align : 'left'    , text: Language.get( 'item_code'	, '품목코드'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-sjung',
									params:{
										stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'생산품'
									},
									result	: function(records) {
										var	parent = records[0];
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										var msg ="";
										store.each(function(findrecord){
											if(findrecord.get('item_idcd') == parent.data.item_idcd){
												msg = "이미 추가된 품목 입니다.";

											}
										});

										if(msg != ""){
											Ext.Msg.alert('알림',msg);
											return;
										}
										row = store.indexOf(selection);
											record.set('item_idcd',parent.data.item_idcd);
											record.set('item_code',parent.data.item_code);
											record.set('item_name',parent.data.item_name);
											record.set('item_spec',parent.data.item_spec);
											record.set('revs_numb',parent.data.revs_numb);
											record.set('loss_rate',parent.data.incm_loss_rate);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'item_name'	, width: 270, align : 'left'   , text: Language.get( 'item_name'	, '품명'	),
					},{	dataIndex:	'item_spec'	, width: 150, align : 'left'   , text: Language.get( 'item_spec'	, '규격'	),
					},{	dataIndex:	'revs_numb'	, width: 50, align : 'left'   , text: Language.get( 'revs_numb'	, 'REV'	),
					},{	dataIndex:	'mixx_qntt'				, width: 90, align : 'right'   , text: Language.get( ''	, '수량'	), xtype: 'numericcolumn', sortable:true,filter:true,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					}
					,{	dataIndex:	'loss_rate'				, width: 93, align : 'right'   , text: Language.get( ''	, '수율'	), xtype: 'numericcolumn', sortable:true,filter:true,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype		:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					}
				]
			};
		return item;
	},
	rowInsert : function (config) {
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-sjflv-purcordrndqt-lister1')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			lastidx		= store.count()
		;

		record = Ext.create( store.model.modelName , {
			modify		: 'Y'				//수정유무
		});

		// ROW 추가
		store.add(record);
	},

	rowDelete : function (config) {
		var myform	= Ext.ComponentQuery.query('module-sjflv-purcordrndqt-lister1')[0],
		records = myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
					}
				}
			});
		}
	},

});

