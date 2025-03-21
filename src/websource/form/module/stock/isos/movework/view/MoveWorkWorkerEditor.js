//var offe_dvcd = '2'

Ext.define('module.stock.isos.movework.view.MoveWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-movework-worker-editor',
	height : 170,
	header : false,
	getStore : function() {
		return Ext.getStore( 'module.stock.isos.movework.store.MoveWorkInvoice' );
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
			bodyStyle	: { padding: '5px' },
			width		: 330,
			fieldDefaults: { width : 320, labelWidth : 60, labelSeparator : '' },
			items		: [
				{	fieldLabel	: Language.get('', '입고사업장' ),
					hidden		: true,
					name		: 'istt_bzpl_name',
					pair		: 'istt_bzpl_idcd',
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
				},{	name		: 'istt_bzpl_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '입고창고' ),
					name		: 'istt_wrhs_name',
					pair		: 'istt_wrhs_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					emptyText	: '',
					clearable	: false,
					popup		: {
						widget	: 'lookup-wrhs-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('wrhs_name'));
							pairField.setValue(records[0].get('wrhs_idcd'));
							nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
							nameField.up('form').down('[name=istt_bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
							nameField.up('form').down('[name=istt_bzpl_name]').setValue(records[0].get('bzpl_name'));
						}
					}
				},{	name		: 'istt_wrhs_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '출고사업장' ),
					hidden		: true,
					name		: 'ostt_bzpl_name',
					pair		: 'ostt_bzpl_idcd',
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
				},{	name		: 'ostt_bzpl_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '출고창고' ),
					name		: 'ostt_wrhs_name',
					pair		: 'ostt_wrhs_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					emptyText	: '',
					clearable	: false,
					popup		: {
						widget	: 'lookup-wrhs-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('wrhs_name'));
							pairField.setValue(records[0].get('wrhs_idcd'));
							nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
							nameField.up('form').down('[name=ostt_bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
							nameField.up('form').down('[name=ostt_bzpl_name]').setValue(records[0].get('bzpl_name'));
						}
					}
				},{	name		: 'ostt_wrhs_idcd', xtype	: 'textfield', hidden : true
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 205,
							fieldDefaults: { width : 200, labelWidth : 60, labelSeparator : '' },
							items	: [
								{	fieldLabel	: Language.get('', '전표번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: Language.get('', '이동일자'),
									xtype		: 'datefield',
									name		: 'invc_date',
									editable	: false,
									allowBlank	: false,
									//fieldCls   : 'requiredindex',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('', '담당자' ),
									name		: 'proc_drtr_name',
									pair		: 'proc_drtr_idcd',
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
											nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
										}
									}
								},{	xtype		: 'textfield', name : 'proc_drtr_idcd', hidden : true
								},{	xtype		: 'textfield', name : 'proc_dept_idcd', hidden : true
							}
						]
						},{	xtype	: 'panel',
							height	: 77 ,
							border	:   1,
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
							height 		: 110,
							width 		: 625,
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
