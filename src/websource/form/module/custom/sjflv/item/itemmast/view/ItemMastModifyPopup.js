Ext.define('module.custom.sjflv.item.itemmast.view.ItemMastModifyPopup', { extend: 'Axt.popup.Search',
	alias	: 'widget.module-itemmast-modify-popup',
//	store	: 'module.custom.sjflv.item.itemmast.store.ItemMastSelectPopup' ,

	title	: '일괄 정보 변경',
	closable: true,
	autoShow: true,
	width	: 450,
	height	: 400,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},


	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.createItem() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	createItem: function(){
		var me = this,
		form = {
			xtype	: 'form-panel',
			region	: 'center',
			layout	: 'vbox',
			defaults: { border: false, margin: 5 },
			items	: [
				{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	fieldLabel	: Language.get('clss_desc','품목분류'),
							width		: 370,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'clss_desc',
							pair		: 'lcls_idcd',
							clearable	: true ,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-item-clss-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									nameField.setValue(records[0].get('clss_desc'));
								}
							}
						},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
						},
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	fieldLabel	: Language.get('','제조국'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'make_natn_name',
							width		: 185,
							pair		: 'make_natn',
							clearable	: true,
//								margin		: '0 0 0 -1',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
								params : { stor_grp : _global.stor_grp,prnt_idcd : '3300' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							},
						},{	name : 'make_natn', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('','제조회사'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'make_cmpy_name2',
							width		: 180,
							pair		: 'make_cmpy_name',
							clearable	: true,
							margin		: '0 0 0 5',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
								params : { stor_grp : _global.stor_grp,prnt_idcd : '3200'  },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							},
						},{	name : 'make_cmpy_name', xtype : 'textfield' , hidden : true
						},{	name : 'make_cmpy_idcd', xtype : 'textfield' , hidden : true
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	fieldLabel	: Language.get('','내수/수출'),
							xtype		: 'lookupfield',
							name		: 'expt_dmst_dvcd',
							width		: 185,
							lookupValue	: resource.lookup('expt_dmst_dvcd'),
						},{	fieldLabel	: Language.get('','할랄'),
							xtype		: 'lookupfield',
							name		: 'hala_yorn',
							width		: 185,
							labelWidth	: 75,
							lookupValue	: resource.lookup('yorn'),
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	fieldLabel	: Language.get('','보관창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'stor_wrhs_name',
							width		: 185,
							pair		: 'stor_wrhs_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-wrhs-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));

									var Form = Ext.ComponentQuery.query('module-itemmast-editor')[0];
									Form.down('[name=stor_plac_name]').popup.params.wrhs_idcd = records[0].get('wrhs_idcd');
									Form.down('[name=stor_plac_idcd]').setValue(null);
									Form.down('[name=stor_plac_name]').setValue(null);
								}
							}
						},{	name : 'stor_wrhs_idcd', xtype : 'textfield' , hidden : true,
							listeners	: {
								change	: function(){
									var Form = Ext.ComponentQuery.query('module-itemmast-editor')[0];
									Form.down('[name=stor_plac_name]').popup.params.wrhs_idcd = this.getValue();
									if(this.value == ''){
										me.down('[name=stor_wrhs_idcd]').setValue(null);
										Form.down('[name=stor_plac_name]').popup.params.wrhs_idcd = null;
										Form.down('[name=stor_plac_idcd]').setValue(null);
										Form.down('[name=stor_plac_name]').setValue(null);
									}
								}
							}
						},
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	fieldLabel	: Language.get('','안전재고'),
							xtype		: 'numericfield',
							name		: 'safe_stok',
							width		: 185,
						},{	fieldLabel	: Language.get('lead_time','리드타임'),
							xtype		: 'numberfield',
							name		: 'lead_time',
							margin		: '0 5 0 5',
							width		: 165,
							labelWidth	: 70,
						},{	xtype	: 'label',
							text	: '일',
							margin	: '5 10 0 3'
						}
					]
				}
			]
		};
		return form
	},

	createGrid: function(lookupValues){
		var me = this,
//			master = Ext.ComponentQuery.query('module-komec-inspentry3-lister')[0],
//			selectMaster = master.getSelectionModel().getSelection()[0],
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'cellmodel'},
				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

//				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	dataIndex:	'pckg_bacd'			, width : 160, align : 'center'		, text: Language.get( 'pckg'		, '포장용기'	) , xtype : 'lookupcolumn' , lookupValue : lookupValues,
					},{	dataIndex:	'pckg_qntt'			, width : 100, align : 'right'		, text: Language.get( 'pckg_qntt'		, '포장수량'	), xtype : 'numericcolumn' ,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							minValue	: 0
						},
					},{ dataIndex: 'base_yorn'			, width :  60 , text : Language.get( 'base_yorn'		, '기본값'	), xtype : 'checkcolumn', processEvent:me.checkboxProcessEvent
					}
				]
			}
		;
		return grid;
	},

	checkboxProcessEvent : function(name, grid, view, rowIndex, colIndex) {
		if (name == 'click') {
			var select	= grid.store.getAt(rowIndex),
				store	= grid.getStore();
			;
			store.each(function(record){
				if(record.get('pckg_bacd')!=select.get('pckg_bacd')){
					record.set('base_yorn',0);
				}else{
					record.set('base_yorn',1);
				}
			});
			Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
	listeners:{
		edit:function(){
			Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
		}
	},

	createToolBar: function() {
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: Const.FINISH.text, iconCls: Const.FINISH.icon, action: Const.FINISH.action, cls: 'button-style' },
				'-',
				//{ text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, action: Const.CLOSER.action, cls: 'button-style' }
				{ text : Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close , cls: 'button-style'}
			]
		};
		return toolBar;
	},

});
