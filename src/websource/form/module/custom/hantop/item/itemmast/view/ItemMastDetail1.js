Ext.define('module.custom.hantop.item.itemmast.view.ItemMastDetail1', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-detail1',
	store		: 'module.custom.hantop.item.itemmast.store.ItemMastDetail1',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					'-',
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	''				, width:  50, align : 'left'   , text: Language.get( ''	, '사용'		),hidden : true,
						editor	: {
							maxLength		: 20,
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text : Language.get('line_seqn'	, '순번'		) ,hidden : true
					},{	dataIndex:	'colr_name'		, width: 160, align : 'left'    , text: Language.get( 'colr_name'	, '색상명'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '색상 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params:{
										prnt_idcd : '3105'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('colr_idcd',parent.data.base_code);
											record.set('colr_name',parent.data.user_memo);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'chge_colr_name'				, width: 160, align : 'left'   , text: Language.get( ''	, '대체 색상명'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '대체색상 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params:{
										prnt_idcd : '3105'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('chge_colr_idcd',parent.data.base_code);
											record.set('chge_colr_name',parent.data.base_name);
											me.plugins[0].startEdit(row, 2);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'cstm_name'	, width: 160, align : 'left'   , text: Language.get( ''	, '구매거래처'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '구매거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params:{
										stor_grp : _global.stor_grp, line_stat : '0'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('cstm_name',parent.data.cstm_name);
											record.set('cstm_idcd',parent.data.cstm_idcd);
											me.plugins[0].startEdit(row, 3);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'brnd_name'	, width: 160, align : 'left'   , text: Language.get( ''	, '브랜드명'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '브랜드 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params:{
										stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('base_name',parent.data.base_name);
											record.set('brnd_bacd',parent.data.base_code);
											me.plugins[0].startEdit(row, 4);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'stnd_pric'				, width: 160, align : 'right'   , text: Language.get( ''	, '표준단가'	), xtype: 'numericcolumn', sortable:true,filter:true,
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
					},{	dataIndex : 'cont_date'	, width:  90 , align : 'center' , text: Language.get( ''	, '계약일자'	),
						tdCls		: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
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
						},
						renderer:function(val){
							a =Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'remk_text'				, flex :   1, align : 'left'   , text: Language.get( ''	, '비고'	),
						editor	: {
							maxLength		: 20,
							selectOnFocus	: true,
							allowBlank		: true
						}
					},
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

	listeners: {


		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=change]').setValue('Y');
			me.cellEditAfter(editor, context);
		},
	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-itemmast-detail1')[0],
			store		= me.getStore(),
			record		= undefined,
			max_seq		= 0,
			lastidx		= store.count(),
			mlister		= Ext.ComponentQuery.query('module-itemmast-lister')[0],
			selectMaster = mlister.getSelectionModel().getSelection()[0],
			selectDetail= myform.getSelectionModel().getSelection()[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			grid		= me.down('grid')
		;

		if(!selectMaster && !selectDetail ){
			Ext.Msg.alert("알림", '자재코드목록을 선택해주세요' );
			return;
		}

		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;

		record = Ext.create( store.model.modelName , {
			item_idcd	: mrecord.get('item_idcd'),
			line_seqn	: max_seq,			//
			modify		: 'Y',
			cont_date	: new Date()
		});
		store.add(record);
		myform.plugins[0].startEdit(lastidx , 1);
	},

	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		myform		= Ext.ComponentQuery.query('module-itemmast-detail1')[0],
		mlister		= Ext.ComponentQuery.query('module-itemmast-lister')[0],
		selectMaster = mlister.getSelectionModel().getSelection()[0],
		selectDetail= myform.getSelectionModel().getSelection()[0]

		if(!selectDetail ){
			Ext.Msg.alert("알림", '선택된 자료가없습니다.' );
			return;
		}

		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
				}
			}
		});
		Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=change]').setValue('Y');
	},
 });
