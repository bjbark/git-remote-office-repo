Ext.define('module.custom.hantop.item.itemmast.view.ItemMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmast-editor',

	height : 390,
	layout : {
		type: 'border'
	},

	title			: Language.get('','자재코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 400,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 80, labelSeparator : '', margin : '5 0 0 0' },
				items			: [
					{	name	: 'item_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_code','품목코드'),
								name		: 'item_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '5 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('item_name','품목명'),
						xtype		: 'textfield',
						name		: 'item_name',
						width		: 340
					},{	fieldLabel	: Language.get('','약칭'),
						xtype		: 'textfield',
						name		: '',
						width		: 340,
						hidden		: true
					},{	fieldLabel	: Language.get('','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340
					},{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
						name		: 'brnd_name',
						xtype		: 'popupfield',
						editable	: false,
						enableKeyEvents : true,
						clearable	: true,
						pair		: 'brnd_bacd',
						width		: 340,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-base-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						},
						listeners	: {
							change	: function(value){
								var val = this.getValue();
//								if(val == _global.options.my_brand_name){
//									me.down('[name=rpst_item_name]').setReadOnly(true);
//								}else {
//									me.down('[name=rpst_item_name]').setReadOnly(false);
//								}
							}
						}
					},{ xtype	: 'textfield', name : 'brnd_bacd', hidden : true,
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	fieldLabel	: Language.get('acct_bacd','계정구분'),
								xtype		: 'popupfield',
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								width		: 180,
								editable	: false,
								clearable	: true,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
							},{	name		: 'acct_bacd', xtype : 'textfield' , hidden : true, value		: '3000',
							},{	fieldLabel	: Language.get('','자재구분'),
								xtype		: 'lookupfield',
								name		: 'item_dvcd',
								labelWidth	: 60,
								width		: 160,
								hidden		: true,
								lookupValue	: resource.lookup('item_dvcd'),
								editable	: false
							},{	fieldLabel	: Language.get('','단위'),
								xtype		: 'popupfield',
								name		: 'unit_name',
								labelWidth	: 60,
								width		: 160,
								editable	: false,
								enableKeyEvents : true,
								clearable	: true,
								pair		: 'unit_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
									}
								},
							},{	xtype : 'textfield', name : 'unit_idcd', hidden : true
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	fieldLabel	: Language.get('pkge_unit_qntt','포장단위'),
								xtype		: 'numericfield',
								name		: 'pkge_unit_qntt',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 180,
							},{	fieldLabel	: Language.get('pkge_qntt','포장수량'),
								xtype		: 'numericfield',
								name		: 'pkge_qntt',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								labelWidth	: 60,
								width		: 160,
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	fieldLabel	: Language.get('','대표품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'rpst_item_name',
								width		: 340,
								pair		: 'rpst_item_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wind-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , brnd_bacd : '00'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'rpst_item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('colr_name', '컬러' ),
								name		: 'colr_name',
								xtype		: 'popupfield',
								editable	: false,
								enableKeyEvents : true,
								clearable	: true,
								hidden		: true,
								pair		: 'colr_idcd',
								width		: 180,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3105' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
							},{ xtype	: 'textfield', name : 'colr_idcd', hidden : true,
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	fieldLabel	: Language.get('item_leng','길이'),
								xtype		: 'numericfield',
								name		: 'item_leng',
								width		: 150,
							},{	fieldLabel	: Language.get('item_widh','폭'),
								xtype		: 'numericfield',
								name		: 'item_widh',
								labelWidth	: 20,
								width		: 90,
							},{	fieldLabel	: Language.get('item_hght','높이'),
								xtype		: 'numericfield',
								name		: 'item_hght',
								labelWidth	: 30,
								width		: 100,
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
								{	fieldLabel	: Language.get('puch_pric','단가'),
									xtype		: 'numericfield',
									name		: 'puch_pric',
									width		: 150,
								}
							]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	xtype		: 'checkbox',
								boxLabel	: 'BF',
								name		: 'wdbf_yorn',
								margin		: '0 0 0 85',
								inputValue	: '1',
								width		: 90,
								style		: { color: 'Black'},
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: 'SF',
								name		: 'wdsf_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 0',
								inputValue	: '1',
								width		: 90,
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: 'MF',
								name		: 'wdmf_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 10',
								width		: 90,
								inputValue	: '1',
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	xtype		: 'checkbox',
								boxLabel	: 'MC',
								name		: 'wdmc_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 85',
								inputValue	: '1',
								width		: 90,
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: 'BF보강재',
								name		: 'bfrn_yorn',
								margin		: '0 0 0 0',
								inputValue	: '1',
								width		: 90,
								style		: { color: 'Black'},
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: 'SF보강재',
								name		: 'sfrn_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 10',
								width		: 90,
								inputValue	: '1',
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items		: [
							{	xtype		: 'checkbox',
								boxLabel	: 'MF보강재',
								name		: 'mfrn_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 85',
								inputValue	: '1',
								width		: 80,
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '유리',
								name		: 'glss_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 10',
								width		: 90,
								inputValue	: '1',
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '레핑',
								name		: 'wryp_yorn',
								style		: { color: 'Black'},
								margin		: '0 0 0 10',
								width		: 90,
								inputValue	: '1',
								listeners: {
									change: function(chkbox,newVal,oldVal){
										if(chkbox.getValue() == true){
											me.chk(chkbox.getValue(),this);
										}
									}
								}
							},{	name : 'change', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0	,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '',
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 255,
						flex		: 1
					},{	fieldLabel	: '',
						name		: 'lookup_val',
						xtype		: 'textarea',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},


	chk : function(val, obj){
		var me = this;
		var bf = me.down('[name=wdbf_yorn]');
		var sf = me.down('[name=wdsf_yorn]');
		var mf = me.down('[name=wdmf_yorn]');
		var mc = me.down('[name=wdmc_yorn]');
		var bfrn = me.down('[name=bfrn_yorn]');
		var sfrn = me.down('[name=sfrn_yorn]');
		var mfrn = me.down('[name=mfrn_yorn]');
		var glss = me.down('[name=glss_yorn]');


		if(obj.getName() == 'wdbf_yorn'){
			sf.setValue(false);
			mf.setValue(false);
			mc.setValue(false);
			bfrn.setValue(false);
			sfrn.setValue(false);
			mfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'wdsf_yorn'){
			bf.setValue(false);
			mf.setValue(false);
			mc.setValue(false);
			bfrn.setValue(false);
			sfrn.setValue(false);
			mfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'wdmf_yorn'){
			bf.setValue(false);
			sf.setValue(false);
			mc.setValue(false);
			bfrn.setValue(false);
			sfrn.setValue(false);
			mfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'wdmc_yorn'){
			bf.setValue(false);
			sf.setValue(false);
			mf.setValue(false);
			bfrn.setValue(false);
			sfrn.setValue(false);
			mfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'bfrn_yorn'){
			bf.setValue(false);
			sf.setValue(false);
			mf.setValue(false);
			mc.setValue(false);
			sfrn.setValue(false);
			mfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'sfrn_yorn'){
			bf.setValue(false);
			sf.setValue(false);
			mf.setValue(false);
			mc.setValue(false);
			bfrn.setValue(false);
			mfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'mfrn_yorn'){
			bf.setValue(false);
			sf.setValue(false);
			mf.setValue(false);
			mc.setValue(false);
			bfrn.setValue(false);
			sfrn.setValue(false);
			glss.setValue(false);
		}else if(obj.getName() == 'glss_yorn'){
			bf.setValue(false);
			sf.setValue(false);
			mf.setValue(false);
			mc.setValue(false);
			bfrn.setValue(false);
			sfrn.setValue(false);
			mfrn.setValue(false);
		}
	}
});