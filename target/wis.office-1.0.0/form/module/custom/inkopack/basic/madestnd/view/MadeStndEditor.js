Ext.define('module.custom.inkopack.basic.madestnd.view.MadeStndEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-madestnd-editor',
	store		: 'module.custom.inkopack.basic.madestnd.store.MadeStnd2',
	height : 450,
	layout : {
		type: 'border'
	},

	title			: Language.get('item_info','품목 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			jig = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return jig;
	},

	createwest : function () {
		var me = this,
		item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 450,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_code','품목코드'),
								name		: 'item_code',
								xtype		: 'textfield',
								width		: 370,
								readOnly	: true
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								editable	: false,
								margin		: '0 0 0 5',
								readOnly	: true,
								lookupValue	: resource.lookup('line_stat')
							},{ fieldLabel	: Language.get('item_idcd','품목ID'),
								name		: 'item_idcd',
								xtype		: 'textfield',
								hidden		: true
							}
						]
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						width		: 430,
						readOnly	: true
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 430,
						readOnly	: true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('spec_horz','규격(가로)'),
								xtype		: 'numericfield',
								name		: 'spec_horz',
								labelWidth	: 80,
								width		: 150,
								readOnly	: true,
							},{	fieldLabel	: Language.get('spec_vrtl','(세로)'),
								labelWidth	: 60,
								width		: 130,
								margin		: '0 0 0 20',
								xtype		: 'numericfield',
								name		: 'spec_vrtl',
								readOnly	: true,
							},{	fieldLabel	: Language.get('spec_tick','(높이)'),
								xtype		: 'numericfield',
								name		: 'spec_tick',
								labelWidth	: 70,
								width		: 130,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('bath_qntt','batch 수량'),
								width		: 150,
								xtype		: 'numericfield',
								name		: 'bath_qntt',
								clearable	: false ,
								readOnly	: true,
							},{	fieldLabel	: Language.get('colr_ccnt','컬러도수'),
								xtype		: 'numericfield',
								name		: 'colr_ccnt',
								width		: 150,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('liqu_type','액형'),
								xtype		: 'textfield',
								name		: 'liqu_type',
								width		: 300,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('fabc_widh','원단폭'),
								xtype		: 'numericfield',
								name		: 'fabc_widh',
								width		: 150,
								readOnly	: true,
							},{	fieldLabel	: Language.get('ygls_tick','유광두께'),
								xtype		: 'numericfield',
								name		: 'ygls_tick',
								width		: 150,
								readOnly	: true,
							},{	fieldLabel	: Language.get('ngls_tick','무광두께'),
								xtype		: 'numericfield',
								name		: 'ngls_tick',
								labelWidth	: 70,
								width		: 130,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('proc_name','가공분류'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'proc_name',
								pair		: 'proc_bacd',
								clearable	: false ,
								width		: 300,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0', prnt_idcd : '8001' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name : 'proc_bacd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('nutc_valu','넛찌값'),
								xtype		: 'textfield',
								name		: 'nutc_valu',
								width		: 130,
								labelWidth	: 70,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('roll_perc_poch','Roll당파우치'),
								xtype		: 'numericfield',
								name		: 'roll_perc_poch',
								width		: 150,
								readOnly	: true,
							},{	fieldLabel	: Language.get('item_tick','품목두께'),
								xtype		: 'numericfield',
								name		: 'item_tick',
								width		: 150,
								readOnly	: true,
							},{	fieldLabel	: Language.get('real_item_tick','실품목두께'),
								xtype		: 'numericfield',
								name		: 'real_item_tick',
								margin		: '0 0 0 10',
								labelWidth	: 60,
								width		: 120,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('poch_wdth','파우치(가로)'),
								xtype		: 'numericfield',
								name		: 'poch_wdth',
								labelWidth	: 80,
								width		: 150,
								readOnly	: true,
							},{	fieldLabel	: Language.get('poch_hght','(세로)'),
								xtype		: 'numericfield',
								name		: 'poch_hght',
								margin		: '0 0 0 20',
								labelWidth	: 60,
								width		: 130,
								readOnly	: true,
							},{	fieldLabel	: Language.get('poch_tick','(두께)'),
								xtype		: 'numericfield',
								name		: 'poch_tick',
								margin		: '0 0 0 10',
								labelWidth	: 60,
								width		: 120,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('zipr_yorn','지퍼여부'),
								xtype		: 'checkboxfield',
								name		: 'zipr_yorn',
								width		: 150,
								inputValue	: 1,
								uncheckedValue : 0,
								readOnly	: true,
							},{	fieldLabel	: Language.get('hole_yorn','타공여부'),
								xtype		: 'checkboxfield',
								name		: 'hole_yorn',
								labelWidth	: 80,
								width		: 150,
								inputValue	: 1,
								uncheckedValue : 0,
								readOnly	: true,
							},{	fieldLabel	: Language.get('rond_yorn','라운드여부'),
								xtype		: 'checkboxfield',
								name		: 'rond_yorn',
								labelWidth	: 70,
								width		: 150,
								inputValue	: 1,
								uncheckedValue : 0,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('stnd_yorn','스탠드여부'),
								xtype		: 'checkboxfield',
								name		: 'stnd_yorn',
								width		: 150,
								inputValue	: 1,
								uncheckedValue : 0,
								readOnly	: true,
							},{	fieldLabel	: Language.get('uppr_open_yorn','상단오픈여부'),
								xtype		: 'checkboxfield',
								name		: 'uppr_open_yorn',
								width		: 150,
								inputValue	: 1,
								uncheckedValue : 0,
								readOnly	: true,
							},{	fieldLabel	: Language.get('lwrp_open_yorn','하단오픈여부'),
								xtype		: 'checkboxfield',
								name		: 'lwrp_open_yorn',
								labelWidth	: 70,
								width		: 150,
								inputValue	: 1,
								uncheckedValue : 0,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('left_open_yorn','좌측오픈여부'),
								xtype		: 'checkboxfield',
								name		: 'left_open_yorn',
								width		: 150,
								inputValue	: 1,
								uncheckedValue:0,
								readOnly	: true,
							},{	fieldLabel	: Language.get('righ_open_yorn','우측오픈여부'),
								xtype		: 'checkboxfield',
								name		: 'righ_open_yorn',
								width		: 150,
								inputValue	: 1,
								uncheckedValue:0,
								readOnly	: true,
							},{	fieldLabel	: Language.get('sgsp_sccs_yorn','분리배출여부'),
								xtype		: 'checkboxfield',
								name		: 'sgsp_sccs_yorn',
								width		: 150,
								labelWidth	: 70,
								inputValue	: 1,
								uncheckedValue:0,
								readOnly	: true,
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
				region	: 'center',
				margin	: 0,
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
						height		: 350,
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
});