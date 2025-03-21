//var offe_dvcd = '2'

Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-etcisttwork-worker-editor',
	height : 240,
	header : false,
	getStore : function() {
		return Ext.getStore( 'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkInvoice' );
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
				{	fieldLabel	: Language.get('', '입고유형' ),
					xtype		: 'lookupfield',
					name		: 'stok_type_dvcd',
					width		: 200,
					editable	: false,
					lookupValue	: resource.lookup('stok_type_dvcd'),
					hidden		: false,
					value		: '1'
				},{	fieldLabel	: Language.get('', '입고사업장' ),
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
					required	: true,
					fieldCls	: 'requiredindex',
					editable	: true,
					enableKeyEvents : true,
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					clearable	: false,
					popup		: {
						widget	: 'lookup-wrhs-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('wrhs_name'));
							pairField.setValue(records[0].get('wrhs_idcd'));
							nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
							nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
							nameField.up('form').down('[name=bzpl_name]').setValue(records[0].get('bzpl_name'));
						}
					}
				},{	name		: 'istt_wrhs_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '입고처구분' ),
					xtype		: 'lookupfield',
					name		: 'cstm_dvcd',
					fieldCls   : 'requiredindex',
					editable	: false,
					value		: '2',
					lookupValue	: resource.lookup('cstm_dvcd'),
					// 2023.08.07 - 이강훈 - 입고처가 거래처인 경우 거래처 찾기 화면이 팝업되도록 처리, 기존 입고처명 팝업 기능 주석 처리.
					listeners	: {
						change:function(val){
							this.up('form').down('[name=cstm_name]').setValue(null);
							this.up('form').down('[name=cstm_idcd]').setValue(null);

							if (val.getValue() == "3" || val.getValue() == "4" || val.getValue() == "5") {
								this.up('form').down('[name=cstm_name]').popup = {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: {	stor_grp  : _global.stor_grp, stor_id : _global.stor_id, line_stat : '0'
									},
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									},
									create : function (self ) {
										var cstm_dvcd = self.up('form').down('[name=cstm_dvcd]').getValue();
										if (cstm_dvcd == '' || cstm_dvcd == null ){
											Ext.Msg.alert("알림","입고처구분을 먼저 선택하여 주십시오.");
											self.close();
											return;
										} else {
											Ext.merge(self.popup.params, {
												otod_cstm_yorn : val.getValue() == "3" ? "1" : "",
												puch_cstm_yorn : val.getValue() == "4" ? "1" : "",
												sale_cstm_yorn : val.getValue() == "5" ? "1" : ""
											});
										}
									}
								}
							} else {
								this.up('form').down('[name=cstm_name]').popup = {
									widget	: 'lookup-offe-popup',
									select	: 'SINGLE',
									params	: {	stor_grp  : _global.stor_grp, stor_id : _global.stor_id, line_stat : '0'
									},
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('offe_name'));
										pairField.setValue(records[0].get('offe_idcd'));
									},
									create : function (self ) {
										var	cstm_dvcd = self.up('form').down('[name=cstm_dvcd]').getValue();
										if (cstm_dvcd == '' || cstm_dvcd == null ){
											Ext.Msg.alert("알림","입고처구분을 먼저 선택하여 주십시오.");
											self.close();
											return;
										} else {
											Ext.merge(self.popup.params, {
												cstm_dvcd : cstm_dvcd
											});
										}
									}
								}
							}
						}
					}
				},{	fieldLabel	: Language.get('', '입고처명' ),
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						emptyText	: '',
						clearable	: false,
						popup		: {
							widget	: 'lookup-offe-popup',
							select	: 'SINGLE',
							params	: {	stor_grp  : _global.stor_grp, stor_id : _global.stor_id, line_stat : '0'
							},
							result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('offe_name'));
								pairField.setValue(records[0].get('offe_idcd'));
							},
							create : function (self ) {
								var panel = self.up('form'),
									cstm_dvcd = panel.down('[name=cstm_dvcd]').getValue()
								Ext.merge(self.popup.params, {
									cstm_dvcd : cstm_dvcd
								});
							}
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
								},{	xtype		: 'textfield', name : 'modify', hidden : true
								},{	fieldLabel	: '입고구분',
									xtype		: 'lookupfield',
									name		: 'istt_dvcd',
									editable	: true,
									lookupValue	: resource.lookup('istt_dvcd' ),
								},{	name : 'change'   , xtype	: 'textfield', hidden : true
								}
							]
						},{	xtype	: 'panel',
							height	: 108 ,
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
							height 		: 169,
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
