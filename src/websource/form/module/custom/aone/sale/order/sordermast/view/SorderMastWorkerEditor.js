Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastWorkerEditor', { extend: 'Axt.form.Editor',
	alias	: 'widget.module-aone-sordermast-worker-editor',
	height	: 390,
	layout	: {
	type	:'border'
	},

	title		: Language.get('acpt_info','입출고 정보'),
	collapsible	: true	,
	collapsed	: true	,
	defaultFocus: 'invc_numb',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items       = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, itemId : 'btnUpdate', cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, itemId : 'btnCancel', cls: 'button-style' }, '-'
				]
			};
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				itemId			: 'mainForm',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', 'AoneCode' ),
								xtype		: 'textfield',
								name		: 'invc_numb',
								readOnly	: true,
								width		: 160,
								margin		: '7 0 0 0',
								fieldCls	: 'requiredindex',
//								hidden		: true
							},
							{	fieldLabel	: Language.get('', '진행상태' ),
								xtype		: 'lookupfield',
								name		: 'acpt_stat_dvcd',
								lookupValue	: resource.lookup('acpt_stat_dvcd'),
								value		: '0010',
								readOnly	: true,
								width		: 145,
								margin		: '7 0 0 0',
								fieldCls	: 'requiredindex'
							},{	xtype		: 'textfield',
								name		: 'amnd_degr',
								value		: '1',
								hidden		: true
							},{	xtype		: 'textfield',
								name		: 'line_seqn',
								hidden		: true
							},{	xtype		: 'textfield',
								name		: 'imge_chek1',
								value		: 'n',
								hidden		: true
							},{	xtype		: 'textfield',
								name		: 'imge_chek2',
								value		: 'n',
								hidden		: true
							},{	xtype		: 'textfield',
								name		: 'modify',
								value		: 'n',
								hidden		: true
							},{	xtype		: 'textfield',
								name		: 'item_idcd',
								hidden		: true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
//						items : [
//							{	fieldLabel	: Language.get('', '입고일자' ),
//								xtype		: 'datefield',
//								name		: 'invc_date',
//								pair		: 'deli_date2',
//								width		: 160,
//								readOnly	: true,
//								editable	: false,
//								format		: Const.DATE_FORMAT_YMD_BAR,
//								submitFormat: Const.DATE_FORMAT_YMD,
//								value		: new Date()
//							},{	fieldLabel	: Language.get('acpt_dvcd', '입고유형' ),
//								xtype		: 'lookupfield',
//								name		: 'acpt_dvcd',
//								lookupValue	: resource.lookup('acpt_dvcd'),
//								editable	: false,
//								width		: 145,
//								listeners	: {
//									change : function(val,val2,val3){
//										var panel	  = this.up('form'),
//											amnd_degr = panel.down('[name=amnd_degr]').getValue()
//										;
//										if (amnd_degr == 1) {
//											this.setLookupValue(resource.lookup('').concat(resource.lookup('acpt_dvcd').slice(0,1), resource.lookup('acpt_dvcd').slice(2,3), resource.lookup('acpt_dvcd').slice(4,5)));
//											this.setReadOnly(false);
//										}else{
//											this.setLookupValue(resource.lookup('acpt_dvcd'));
//											this.setReadOnly(true);
//										}
//									}
//								}
//							}
//						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	xtype		: 'textfield',
								name		: 'cstm_code',
								hidden		: true
							},{	fieldLabel	: Language.get('', '거래처코드' ),
								xtype		: 'popupfield',
								name		: 'cstm_idcd',
								pair		: 'cstm_name',
								width		: 305,
								editable	: true,
								clearable	: true,
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								enableKeyEvents : true,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1',select:true },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_idcd'));
										pairField.setValue(records[0].get('cstm_name'));
										setTimeout(function(){
											me.down('[name=item_code]').focus(true,10);
										}, 50)
									}
								},
								trigger1Cls : 'mastTrigger0001',
								listeners	: {
									keydown : function(self, e) {
										if(e.keyCode == e.ENTER){
											var trigger1 = Ext.dom.Query.select('.mastTrigger0001')[0];
											Ext.get(trigger1).dom.click();
										}
									},
									change	: function(self, value){
										if(value == ''){
											var panel = this.up('form');
											panel.down('[name=cstm_name]').setValue(null);
											panel.down('[name=cstm_code]').setValue(null);
										}
									}
								}
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '거래처명' ),
								xtype		: 'textfield',
								name		: 'cstm_name',
								width		: 305,
								readOnly	: true,
								clearable	: true,
								fieldCls	: 'requiredindex',
								}
							]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '품목코드' ),
								xtype		: 'popupfield',
								name		: 'item_code',
								pair		: 'item_name',
								width		: 305,
								editable	: true,
								clearable	: true,
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								enableKeyEvents : true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-aone',
									values	: { },
									option	: { direct_result : true },
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0',
												tble_name	: 'acpt'
//												acct_bacd	: '제품',
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_name'));
										panel.down('[name=item_idcd]').setValue(records[0].get('item_idcd'));
										panel.down('[name=item_spec]').setValue(records[0].get('item_spec'));
										setTimeout(function(){
											me.down('[name=sral_numb]').focus(true,10);
										}, 50)
									}
								},
								trigger1Cls : 'mastTrigger0002',
								listeners	: {
									keydown : function(self, e) {
										if(e.keyCode == e.ENTER){
											var trigger1 = Ext.dom.Query.select('.mastTrigger0002')[0];
											Ext.get(trigger1).dom.click();
										}
									},
									change : function(self, value){
										if(value == ''){
											var panel = this.up('form');
											panel.down('[name=item_name]').setValue(null);
											panel.down('[name=item_spec]').setValue(null);
											panel.down('[name=item_code]').setValue(null);
										}
									}
								},
							},{	xtype	: 'textfield',
								name	: 'item_code',
								hidden	: true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '품명' ),
								xtype		: 'textfield',
								name		: 'item_name',
								width		: 305,
								readOnly	: true,
								clearable	: true,
								fieldCls	: 'requiredindex',
							},
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '규격' ),
								xtype		: 'textfield',
								name		: 'item_spec',
								width		: 220,
								readOnly	: true,
								clearable	: true,
								fieldCls	: 'requiredindex',
							},{	fieldLabel	: Language.get('', '수량' ),
								xtype		: 'numericfield',
								name		: 'invc_qntt',
								value		: 1,
								labelWidth	: 30,
								width		: 85,
								allowBlank	: false,
								emptyText	: '필수입력',
								fieldCls	: 'requiredindex',
								enableKeyEvents : true,
								listeners	: {
									change	: function(self, value){
										if(value == '' || value < 1){
											Ext.Msg.alert("알림","수량을 다시 입력해주시기 바랍니다.");
											self.reset();
										}
									}
								},
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', 'Serial No.' ),
								name		: 'sral_numb',
								xtype		: 'textfield',
								width		: 305,
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								fieldCls	: 'requiredindex',
								enableKeyEvents : true,
								listeners	:{
									keydown : function(self, e) {
										if(e.keyCode==e.ENTER || e.keyCode == e.TAB){
											me.down('[name=deli_date2]').focus(true , 10);
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=item_code]').focus(true , 10)
											}
										});
									}
								}
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '출고예정일' ),
								xtype		: 'datefield',
								name		: 'deli_date2',
								pair		: 'invc_date',
								width		: 160,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, +7),
								editable	: false,
								enableKeyEvents : true,
								listeners	:{
									keydown : function(self, e) {
										if(e.keyCode==e.ENTER || e.keyCode == e.TAB){
											me.down('[name=remk_text]').focus(true , 10);
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=sral_numb]').focus(true , 10)
											}
										});
									}
								}
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('','고장증상'),
								xtype		: 'textarea',
								name		: 'remk_text',
								height		: 45,
								width		: 305,
								editable	: false,
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								fieldCls	: 'requiredindex',
								enableKeyEvents: true ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var button = me.down('[itemId=btnUpdate]');
											if(button){
												if(button.hidden==false){
													button.fireEvent('click');
												}
											}
										}
										this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
											scope: this,
											key: Ext.EventObject.TAB,
											shift:true,
											fn: function () {
												me.down('[name=deli_date2]').focus(true , 10)
											}
										});
									}
								}
							}
						]
					}
				]
			}
		return item;
	},

	createTabs : function () {
		var me = this,
			item =
			{	xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [
					{	xtype	: 'panel',
						layout	: 'border',
						title	: '이미지',
						items	: [
							{	xtype : 'module-aone-sordermast-worker-editorLister',
								flex	: 1,
								region	: 'center',
								spilt	:true,
								style	: Const.borderLine.right,
							},{	xtype : 'module-aone-sordermast-image',
								flex	: 1,
								region	: 'east',
								style	: Const.borderLine.left
							}
						]

					},

				]
			}
		;
		return item;
	},
});