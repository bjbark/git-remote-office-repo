	Ext.define('module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastWorkerEditor', { extend: 'Axt.form.Editor',

		alias	: 'widget.module-ordermast-worker-editor',
		height	: 205,
		header	: false,
		getStore: function() {
			return Ext.getStore( 'module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastInvoice' );
		},
		initComponent: function(config){
			var me = this;
			me.dockedItems = [ me.createWest() ] ;
//			me.items = me.createTabs();
			me.callParent(arguments);
		},
	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			region		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 1,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 5 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '0 0 3 0',
							items : [
								{	xtype : 'fieldset', layout: 'hbox', border : 0,
									items : [
										{	fieldLabel	: Language.get('invc_numb','Order No'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											width		: 280
										},{	xtype		: 'lookupfield',
											name		: 'line_stat',
											width		: 55,
											editable	: false,
											margin		: '6 0 0 0',
											lookupValue	: resource.lookup('line_stat')
										},{	fieldLabel	: Language.get('', '관리번호' ),
											name		: 'mngt_numb',
											xtype		: 'textfield',
											width		: 160,
											margin		: '6 0 0 25',
										},{	name	: 'fabc_idcd', xtype	: 'textfield', hidden : true
										},{	fieldLabel	: Language.get('', 'AMD' ),
											name		: '',
											xtype		: 'textfield',
											width		: 150,
											labelWidth	: 80,
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', '사업장' ),
											name		: 'bzpl_name',
											pair		: 'bzpl_idcd',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true ,
											width		: 340,
											popup		: {
												widget	: 'lookup-bzpl-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get(''));
													pairField.setValue(records[0].get(''));
												}
											}
										},{	name	: 'bzpl_idcd', xtype	: 'textfield', hidden : true
										},{	fieldLabel	: Language.get('incm_dvcd','수입구분'),
											xtype		: 'lookupfield',
											name		: 'incm_dvcd',
											width		: 160,
											margin		: '6 0 0 20',
											lookupValue	: resource.lookup('incm_dvcd'),
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', 'Vendor' ),
											name		: '',
											pair		: '',
											xtype		: 'textfield',
											width		: 340,
											labelWidth	: 50,
										},{	fieldLabel	: Language.get('','중개인'),
											xtype		: 'textfield',
											name		: 'mdtn_prsn',
											width		: 160,
											margin		: '6 0 0 20',
										},{	fieldLabel	: Language.get('drtr_name','담당자'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											clearable	: false ,
											width		: 220,
											labelWidth	: 80,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-user-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('ship_viaa_dvcd','Ship Via'),
											xtype		: 'lookupfield',
											name		: 'ship_viaa_dvcd',
											width		: 160,
											margin		: '6 0 0 20',
											lookupValue	: resource.lookup('ship_viaa_dvcd'),
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','단가조건'),
											xtype		: 'lookupfield',
											name		: 'pric_cond_dvcd',
											width		: 200,
											lookupValue	: resource.lookup('pric_cond_dvcd'),
										},{	fieldLabel	: Language.get('trde_stot_dvcd','결제방법'),
											xtype		: 'lookupfield',
											name		: 'trde_stot_dvcd',
											labelWidth	: 160,
											width		: 270,
											margin		: '6 0 0 50',
											lookupValue	: resource.lookup('trde_stot_dvcd'),
										},{	fieldLabel	: Language.get('stot_time_dvcd','결제시기'),
											xtype		: 'lookupfield',
											name		: 'stot_time_dvcd',
											width		: 220,
											labelWidth	: 80,
											margin		: '6 0 0 0',
											lookupValue	: resource.lookup('stot_time_dvcd'),
										},{	fieldLabel	: Language.get('','결제기한'),
											xtype		: 'textfield',
											name		: 'stot_ddln',
											width		: 160,
											margin		: '6 0 0 25',
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','화폐단위'),
											xtype		: 'lookupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'mney_unit',
											clearable	: false ,
											width		: 200,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=exrt]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=trde_trnt_dvcd]').focus(true , 10)
														}
													});
												}
											}

										},{	name		: '', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('exrt','적용환율'),
											xtype		: 'numericfield',
											name		: 'exrt',
											labelWidth	: 140,
											width		: 250,
											margin		: '6 0 0 70',
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=user_memo]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=mney_unit]').focus(true , 10)
														}
													});
												}
											}
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', 'Remarks' ),
											name		: 'user_memo',
											xtype		: 'textfield',
											width		: 930,
										},{	fieldLabel	: Language.get( 'change','change'),
											xtype		: 'textfield',
											name		: 'change',
											hidden		: true
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return item;
	},
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'panel',
				region	: 'center',
				header	: false,
				plain	: true,
				margin	: 0 ,
				items	: [ me.createWest() ]
			}
		;
		return tabs;
	},
});
