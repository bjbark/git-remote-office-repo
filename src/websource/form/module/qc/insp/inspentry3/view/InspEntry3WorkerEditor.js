//var offe_dvcd = '2'

Ext.define('module.qc.insp.inspentry3.view.InspEntry3WorkerEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-inspentry3-worker-editor',
	height : 180,
	header : false,
	getStore : function() {
		return Ext.getStore( 'module.qc.insp.inspentry3.store.InspEntry3Invoice' );
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
				},{	fieldLabel	: Language.get('', '입고창고' ),
					name		: 'istt_wrhs_name',
					pair		: 'istt_wrhs_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					emptyText	: '',
					allowBlank	: false,
					clearable	: false,
					popup		: {
						widget	: 'lookup-wrhs-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('wrhs_name'));
								pairField.setValue(records[0].get('wrhs_idcd'));
								nameField.up('form').down('[name=dept_idcd]').setValue(records[0].get('dept_idcd'));
								nameField.up('form').down('[name=drtr_idcd]').setValue(records[0].get('drtr_idcd'));
								nameField.up('form').down('[name=drtr_name]').setValue(records[0].get('drtr_name'));
								nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
								nameField.up('form').down('[name=bzpl_name]').setValue(records[0].get('bzpl_name'));
						}
					}
				},{	name		: 'istt_wrhs_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '거래처명' ),
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						emptyText	: '',
						clearable	: false,
						allowBlank	: false,
						popup		: {
							widget	: 'lookup-cstm-popup',
							select	: 'SINGLE',
							params	: {	stor_grp  : _global.stor_grp, stor_id : _global.stor_id, line_stat : '0'
							},
							result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							},
						}
					},{	xtype		: 'textfield', name : 'cstm_idcd', hidden : true
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 205,
							fieldDefaults: { width : 200, labelWidth : 60, labelSeparator : '' },
							items	: [
								{	fieldLabel	: Language.get('', '입고번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									readOnly	: true,
									fieldCls	: 'requiredindex',
								},{	fieldLabel	: Language.get('', '입고일자'),
									xtype		: 'datefield',
									name		: 'invc_date',
									editable	: false,
									allowBlank	: false,
									//fieldCls   : 'requiredindex',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('', '입고담당' ),
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
							height	: 105 ,
							border	: 1,
							flex	: 1
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
							height 		: 140,
							width 		: 400,
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
