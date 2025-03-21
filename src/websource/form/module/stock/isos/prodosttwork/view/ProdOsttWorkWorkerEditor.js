//var offe_dvcd = '2'

Ext.define('module.stock.isos.prodosttwork.view.ProdOsttWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prodosttwork-worker-editor',
	height : 190,
	header : false,
	getStore : function() {
		return Ext.getStore( 'module.stock.isos.prodosttwork.store.ProdOsttWorkInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},


	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '6px' },
			width		: 356,
			fieldDefaults: { width : 345, labelWidth : 70, labelSeparator : '' },
			items		: [
				{	fieldLabel	: Language.get('', '작업지시번호' ),
					name		: 'orig_invc_numb',
					pair		: 'orig_seqn',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					clearable	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					popup		: {
						widget	: 'lookup-pror-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('invc_numb'));
								//pairField.setValue(records[0].get('pdod_date')); //2022.02.22 - 이강훈 - orig_seqn에 생산일자가 등록되어 주석처리
						}
					}
				},{	name		: 'orig_seqn', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '거래처구분' ),
					hidden		: true,
					xtype		: 'lookupfield',
					name		: 'cstm_dvcd',
					lookupValue	: resource.lookup('cstm_dvcd'),
				},{	fieldLabel	: Language.get('', '출고사업장' ),
					hidden		: true,
					name		: 'bzpl_name',
					pair		: 'bzpl_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					emptyText	: '',
					clearable	: false,
					popup		: {
						widget	: 'lookup-bzpl-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('bzpl_name'));
							pairField.setValue(records[0].get('bzpl_idcd'));
						}
					}
				},{	name		: 'bzpl_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '출고창고' ),
					name		: 'ostt_wrhs_name',
					pair		: 'ostt_wrhs_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					clearable	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					popup		: {
						widget	: 'lookup-wrhs-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('wrhs_name'));
							pairField.setValue(records[0].get('wrhs_idcd'));
							nameField.up('form').down('[name=dept_idcd]').setValue(records[0].get('dept_idcd'));
							nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
							nameField.up('form').down('[name=bzpl_name]').setValue(records[0].get('bzpl_name'));
						}
					}
				},{	name		: 'ostt_wrhs_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '출고처구분' ),
					hidden		: true,
					xtype		: 'lookupfield',
					name		: 'ostt_dvcd',
					editable	: false,
					lookupValue	: resource.lookup('ostt_dvcd'),
					params	: {	stor_grp  : _global.stor_grp, stor_id : _global.stor_id, ostt_dvcd : '1000'
					},
				},{	fieldLabel	: Language.get('', '공정' ),
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						clearable	: false,
						popup		: {
							widget	: 'lookup-wkct-popup',
							select	: 'SINGLE',
							params	: {	stor_grp  : _global.stor_grp, stor_id : _global.stor_id, line_stat : '0'
							},
							result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							},
						}
				},{	xtype		: 'textfield', name : 'cstm_idcd', hidden : true
				},{	fieldLabel	: Language.get('ostt_usge_name', '출고용도' ),
					name		: 'ostt_usge_name',
					pair		: 'ostt_usge_bacd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					//value		: '생산',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					clearable	: false,
					popup		: {
						widget	: 'lookup-base-popup',
						select	: 'SINGLE',
						params	: {	stor_grp  : _global.stor_grp, line_stat : '0',prnt_idcd : '3103'
						},
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('base_name'));
							pairField.setValue(records[0].get('base_code'));
						},
					},
					hidden		: true
				},{	name	: 'ostt_usge_bacd', xtype	: 'textfield', hidden : true
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 205,
							fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
							items	: [
								{	fieldLabel	: Language.get('', '출고번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									readOnly	: true,
									emptyText	: Const.invalid.emptyValue,
								},{	fieldLabel	: Language.get('', '출고일자'),
									xtype		: 'datefield',
									name		: 'invc_date',
									editable	: false,
									allowBlank	: false,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('', '출고담당' ),
									name		: 'drtr_name',
									pair		: 'drtr_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									emptyText	: '',
									clearable	: false,
									popup		: {
										widget	: 'lookup-user-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
											nameField.up('form').down('[name=dept_idcd]').setValue(records[0].get('dept_idcd'));
										}
									}
								},{	xtype		: 'textfield', name : 'drtr_idcd', hidden : true
								},{	xtype		: 'textfield', name : 'dept_idcd', hidden : true
								}
							]
						},{	xtype	: 'panel',
							height	: 95 ,
							border	:  1,
							flex	:  1
						}
					]
				}

		 	]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},


	/**
	 *
	 */
	createTab1 : function() {
		var item = {
			title 			: '메모사항',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{	xtype 		: 'textarea',
							name 		: 'user_memo',
							height 		: 180,
							width 		: 685,
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
						}
					]
				}
			]
		}
	;
	return item;
	}

});
