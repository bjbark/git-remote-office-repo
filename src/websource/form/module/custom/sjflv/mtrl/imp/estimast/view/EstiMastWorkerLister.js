Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-worker-lister',
	store		: 'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister3',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
							listeners: {
								click:function(self,e){
									me.lineDelete({});
								}
							}
					},
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' } ,
					{	text : Const.CANCEL.text, iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style' } ,
				],
				pagingButton:false
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
					{	dataIndex: 'item_code'	, width:  140 , text: Language.get('item_code'	, '품목코드'	) , align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						tdCls	: 'editingcolumn',
						name		: 'item_code',
						pair		: 'item_name',
						itemId		: 'initfocused' ,
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'MULTI',
									widget	: 'lookup-item-popup',
									params	: { stor_grp	: _global.stor_grp,
										stor_id		: _global.stor_id,
										line_stat	: '0',
//										acct_bacd	: '자재'  // 창고 구분에 따라 계정을 변경해 줘야 할 듯.....
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0]
											row = store.indexOf(selection);
										var lister2 = Ext.ComponentQuery.query('module-estimast-worker-lister2')[0],
										editor = Ext.ComponentQuery.query('module-estimast-worker-editor')[0]
										;
											record.set('item_name',parent.data.item_name);
											record.set('item_code',parent.data.item_code);
											record.set('item_spec',parent.data.item_spec);
											record.set('item_idcd',parent.data.item_idcd);
											record.set('unit_name',parent.data.unit_name);
											record.set('esti_qntt',parent.data.esti_qntt);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'item_name'	, width:  250 , text: Language.get('item_name'	, '품명'		) , align : 'left'
					},{	dataIndex: 'item_spec'	, width:  210 , text: Language.get('item_spec'	, '규격'		) , align : 'left'
					},{	dataIndex: 'unit_name'	, width:  210 , text: Language.get('unit_name'	, '단위'		) , align : 'left'
					},{	dataIndex: 'invc_numb'	, width:  250 , text: Language.get(''	, ''		) , align : 'left',hidden : true
					},{	dataIndex: 'line_seqn'	, width:  250 , text: Language.get(''	, ''		) , align : 'left',hidden : true
					}
				]
			};
		return item;
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0]

		;
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;

		record = Ext.create( store.model.modelName , {
			invc_numb	: editor.getValues().invc_numb,
			line_seqn	: seq,
			modify		: 'Y',
		});

		store.add(record);
		record.commit();
		Ext.ComponentQuery.query('module-estimast-worker-editor3')[0].down('[name=change]').setValue('Y');
	},


	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
					}
				}
			});
		}
	},
});
