Ext.define('module.workshop.sale.order.estimast.view.EstiMastSubItem', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-estimast-lister-subItem',
	store		: 'module.workshop.sale.order.estimast.store.EstiMastSubItem',

	split		: true,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function () {
		var me = this
			me.paging		= me.pagingItem();
			me.columns		= me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					 '-' ,
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : 'updateAction', cls: 'button-style' },
					{text : Const.CANCEL.text, iconCls: Const.CANCEL.icon, action : 'cancelAction', cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			acct_bacd = '부자재',
			item = {
				defaults	: {   style: 'text-align:center'},
				items		: [
					{	dataIndex:	'line_seqn'			, width:  60, align : 'center'	, text: Language.get( 'line_seqn'	, '순번'		), hidden :true,
					},{	dataIndex:	'assi_seqn'			, width:  370, align : 'left'	, text: Language.get( 'assi_seqn'	, '보조순번'		), hidden :true
					},{	dataIndex:	'proc_shet_idcd'	, width:  370, align : 'left'	, text: Language.get( 'proc_shet_idcd'	, '가공명'		), hidden :true
					},{	dataIndex:	'proc_shet_name'	, width:  250, align : 'left'	, text: Language.get( 'shet_name'	, '가공명'		),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '용지코드',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-item-clss-popup3',
										params:{ lcls_idcd:"000048" , mcls_idcd:"000052", scls_idcd:"000061" },
										result	: function(records) {
											var	parent = records[0];
											record.set('proc_shet_idcd',parent.data.shet_idcd);
											record.set('proc_shet_name',parent.data.shet_name);
											record.set('etcc_proc_amnt',parent.data.esti_pric);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'etcc_proc_amnt'			, width : 130, align : 'right'	, text: Language.get( 'etcc_proc_amnt',		'가공비'	), xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	},

	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			max_seq		= 0,
			lastidx		= store.count(),
			tree		= Ext.ComponentQuery.query('module-estimast-tree')[0],
			select		= tree.getSelectionModel().getSelection()[0]
			editor		= Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
			invc_numb	= editor.down('[name=invc_numb]').getValue(),
			line_seqn	= select.get('line_seqn')
		;
		max_seq = 0;
		store.each(function(findrecord) {
			if (findrecord.get('assi_seqn') > max_seq) {
				max_seq		= findrecord.get('assi_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			line_seqn	: line_seqn,
			assi_seqn	: max_seq,
			etcc_proc_amnt	: 0
		});

		// ROW 추가
		store.add(record);
		Ext.ComponentQuery.query('module-estimast-worker-editor4')[0].down('[name=modify]').setValue('Y');

		myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
	},
	/******************************************************************
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
					}
				}
			});
		}Ext.ComponentQuery.query('module-estimast-worker-editor4')[0].down('[name=modify]').setValue('Y');
	},
	cellEditAfter : function (editor, context) {
		var me = this,
			grid = this,
			pos = this.view.getSelectionModel().getCurrentPosition().row,
			models = grid.getStore().getRange()
		;
	},


//	listeners: {
////		validateedit : function (lister2, context, eOpts ) {
////			var me = this;
////			var field = context.field;
////			var value = context.value;
////			return true;
////		},
//		edit : function(lister2, context) {
//			var me = this;
//			me.cellEditAfter(lister2, context);
//		}
//	},
});
