Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkEntryMtrlPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-workentry-popup-mtrl'			,

	title: '생산시작',

	closable: true,
	autoShow: true,
	width	: 770,
	height	: 370,
	layout	: 'fit',

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-panel' ,
				layout		: 'border',
				border		: false,
				dockedItems	: [
					{	xtype : 'toolbar',
						dock  : 'bottom',
						items : [
							'->' ,
							{ text : '<span class="write-button">생산시작 </span>'	, scope: me , handler : me.startAction , cls: 'button1-style'},,'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items : [me.searchForm(),me.createGrid() ]
			};
		return form;
	},

	searchForm: function(){
		var me	= this,
		form = {
			xtype	: 'form-search',
			region	: 'north',
			border	:  0,
			margin	: '0 0 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'fieldset',
					layout	: 'hbox',
					margin	: '5 0 0 0 ',
					border	: 0,
					defaults: { width: 250, labelWidth: 65 },
					items	: [
						{	fieldLabel	: '지시번호',
							name		: 'invc_numb',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							value		: me.popup.params.get('invc_numb')
						},{	fieldLabel	: '거래처명',
							name		: 'cstm_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							value		: me.popup.params.get('cstm_name')
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					margin	: '5 0 3 0',
					border	: 0,
					defaults: { width: 250, labelWidth: 65 },
					items	: [
						{	fieldLabel	: '제품코드',
							name		: 'item_code',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							value		: me.popup.params.get('item_code')
						},{	fieldLabel	: '제품명',
							name		: 'item_name',
							xtype		: 'textfield',
							fieldCls	: 'readOnlyfield',
							readOnly	: true,
							value		: me.popup.params.get('item_name')
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				flex		: 1,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },
				store: Ext.create('module.custom.sjflv.prod.order.workbook.store.WorkBookMtrlPopup'),
				columns: [
					{	text : Language.get('item_code'	, '원료코드')	, dataIndex: 'item_code'	,  width : 100, align:'center'
					},{	text : Language.get('item_name'	, '원료명'	)	, dataIndex: 'item_name'	,  width : 120, align:'center'
					},{ text : Language.get('mixx_rate'	, '배합비'	)	, dataIndex: 'mixx_rate'	,  width : 80 , align:'center'
					},{ text : Language.get('need_qntt'	, '소용량'	)	, dataIndex: 'need_qntt'	,  width : 80 , align:'center'
					},{ text : Language.get('ivst_qntt', '투입량'	)	, dataIndex: 'ivst_qntt'	,  width : 80 , align:'center',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								},
							}
						}
					},{ text : Language.get(''	, '계량량'	)	, dataIndex: ''	,  width : 80  , align:'center',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
						}
					},{ text : Language.get('lott_numb'	, 'lot번호'	)	, dataIndex: 'lott_numb'	,  width : 100 , align:'center',
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									if(record.get('ivst_qntt')>0){
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-lott-popup-sjflv',
											title	: 'Batch No 찾기',
											params : { stor_grp : _global.stor_grp , line_stat : '0' ,item_idcd : record.get('item_idcd'),stok_type_dvcd : '1' ,dvcd : '1',qntt:record.get('ostt_qntt2'),acct_bacd:record.get('acct_bacd')},
											result	: function(records) {
												var	parent = records[0];
													record.set('ivst_qntt'		, parent.data.ostt_qntt);
													record.set('lott_numb' 		, parent.data.lott_numb);
													record.set('lott_numb_sum'	, parent.data.lott_numb_sum);
													record.set('used_yorn'		, '1');
//													me.cellEditAfter(grid, record, rowIndex);
											},
										})
									}else{
										Ext.Msg.alert('알림','투입수량이 없습니다.');
									}
								},
								scope : me
							},
						]
					},{ text : Language.get('lott_numb_sum'	, '소용량'	)	, dataIndex: 'lott_numb_sum'	,  hidden:true
					},{	text : Language.get('used_yorn'	, '사용여부')	, dataIndex: 'used_yorn'	,  width : 70 , align:'center',  xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							editable		: false,
							selectOnFocus	: true,
							enableKeyEvents : true,
							listeners:{

							}
						}
					},
				]
			}
		;
		return grid;
	},

	selectAction :  function(){
		var me = this,
			grid = me.down('grid-panel') // 그리드를 참조
		;

		grid.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, {invc_numb: me.popup.params.get('work_invc'), item_idcd: me.popup.params.get('item_idcd'), stor_id : _global.stor_id});
	}
});