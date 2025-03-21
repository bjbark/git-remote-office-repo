Ext.define('module.workshop.print.basic.menumast.view.MenuMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-workshop-menu-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig : {
		plugins: {
			ptype: 'gridviewdragdrop',
		},
		listeners: {
			drop: function (node, data, dropRec, dropPosition) {
				var me = this;
				var i = 1;
				me.store.each(function(records){
					records.set('dspl_rank',i);
					i++;
				})
			}
		}
	},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{xtype:'button',text : '<span class ="btnTemp" style="color:green; font-size : 13px;">행추가</span>', iconCls: Const.INSERT.icon,handler: me.rowInsert },
					{xtype:'button',text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler: me.rowDelete },
					'-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style'}, '-'
				], pagingButton : false
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
					{	dataIndex:	'dspl_rank'			, width:  40, align : 'center' , text: Language.get( 'dspl_rank'		, '순위'			), xtype: 'numericcolumn'
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'   , text: Language.get( 'item_name'		, '제목'			),
						tdCls: 'editingcolumn',
						editor	: {
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
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}
								}
							}
						}
					},{	dataIndex:	'clss_desc'	, width: 220, align : 'left'   , text: Language.get( 'clss_desc'	, '품목분류'			),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						tdCls	: 'editingcolumn',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '분류 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-item-clss-popup',
									params:{
										otod_cstm_yorn:1
									},
									result	: function(records) {
										var	parent = records[0];
											record.set('clss_desc',parent.data.clss_desc);
											record.set('lcls_idcd',parent.data.lcls_idcd);
											record.set('mcls_idcd',parent.data.mcls_idcd);
											record.set('scls_idcd',parent.data.scls_idcd);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'pric_dvcd'			, width:  90, align : 'center' , text: Language.get( 'pric_dvcd'		, '단가구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'pric_dvcd' ),
						tdCls: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							lookupValue		: resource.lookup('pric_dvcd'),
							listeners:{
								change : function(self, e) {
									var grid = this.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
								}
							}
						}
					},{	dataIndex:	'lkup_kind_dvcd'			, width:  90, align : 'center' , text: Language.get( 'lkup_kind_dvcd'		, '종류구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'lkup_kind_dvcd' ),
						tdCls: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							lookupValue		: resource.lookup('lkup_kind_dvcd'),
							listeners:{
								change : function(self, e) {
									var grid = this.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[7]);
								}
							}
						}
					},{	dataIndex:	'feld_name'			, flex : 1 , minWidth: 150, align : 'left'   , text: Language.get( 'feld_name'		, '연결필드'		),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						tdCls	: 'editingcolumn',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '필드 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params:{
										prnt_idcd : '4000'
									},
									result	: function(records) {
										var	parent = records[0];
											record.set('feld_name',parent.data.base_name);
											record.set('feld_idcd',parent.data.base_idcd);
										},
									})
								},
								scope : me
							}
						]
					}
				]
			}
		;
		return item;
	},


	listeners: {
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();

							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	},
	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			max_dspl	= 0,
			select		= myform.getSelectionModel().getSelection()[0],
			lastidx		= store.count(),
			editor		= Ext.ComponentQuery.query('module-workshop-menu-worker-editor')[0],
			param		= editor.getRecord()
		;
		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}

			if (findrecord.get('dspl_rank') > max_dspl) {
				max_dspl		= findrecord.get('dspl_rank');   // 최종으로 사용한 순위를 찾는다.
			}
		});
		max_seq = max_seq + 1;
		max_dspl = max_dspl + 1;
		record = Ext.create( store.model.modelName , {
			updt_user_name	: _global.login_nm,
			updt_idcd		: _global.login_id,
			line_seqn		: max_seq,	//
			dspl_rank		: max_dspl,	//
			invc_numb		: param.get('invc_numb')
		});
		// ROW 추가
		store.add(record);
		myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
						var i = 1;
						myform.getStore().each(function(record){
							record.set('dspl_rank',i++);
						})
					}
				}
			});
		}
	}
});
