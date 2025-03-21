 Ext.define('module.custom.iypkg.item.ppermast.view.PperMastEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-ppermast-editor',
	height		: 300,
	layout		: { type: 'border' },
	title		: '원지코드 정보',
	collapsible	: true,
	collapsed	: true ,
	defaultFocus : 'cust_nm',
	//64 +
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items       = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this;
		var item =
			{	xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'},
					'-'
				]
			};
		return item;
	},

	changeEdit : function( readonly ) {
		this.getForm().getFields().each (function (field) {
			if (field.onwerEditing) {
				field.setReadOnly (readonly);
			}
		});
	},

	/**
	 *
	 */
	createWest : function () {
		var me = this,
			item ={
				xtype		: 'form-panel',
				dock		: 'left',
				bodyStyle	: { padding: '5px' },
				width		: 330,
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
				items		: [
					{	name	: 'pper_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'pper_code', '원지코드' ),
								name		: 'pper_code',
								xtype		: 'textfield',
								maxLength	: 50,
								width		: 240,
								allowBlank	: false,
								required	: true,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue
							},{	name		: 'line_stat'  ,
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('line_stat'),
								width		: 70,
								editable	: false,
								margin		: '0 0 0 5',
							}
						]
					},{	fieldLabel	:  Language.get( 'pper_name' , '원지명'),
						name		: 'pper_name',
						xtype		: 'textfield',
						allowBlank	: false,
						required	: true,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	:  Language.get( 'pnyg_volm' , '평량(g/m2)'),
								name		: 'pnyg_volm',
								xtype		: 'numericfield',
								width		: 157,
								labelWidth	: 70,
							},{	fieldLabel	:  Language.get( 'stnd_leng' , '표준길이/m2'),
								name		: 'stnd_leng',
								xtype		: 'numericfield',
								width		: 157,
								labelWidth	: 70,
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '0 0 5 0' ,
						items	: [
							{	fieldLabel	:  Language.get( 'kgrm_pric' , '표준단가/Kg'),
								name		: 'kgrm_pric',
								xtype		: 'numericfield',
								width		: 157,
								labelWidth	: 70,
								listeners	: {
									change : function(){
										if(isNaN(this.getValue())!=true){ // 숫자체크
											me.down('[name=tons_pric]').setValue(this.getValue()*1000);
										}else{
											this.reset();
											me.down('[name=tons_pric]').reset();
										}
									},
								}
							},{	fieldLabel	:  Language.get( 'tons_pric' , '표준단가/Ton'),
								name		: 'tons_pric',
								xtype		: 'numericfield',
								width		: 157,
								labelWidth	: 70,
							}
						]
					},{	fieldLabel	:  Language.get( 'mxm2_pric' , '표준단가/m2'),
						name		: 'mxm2_pric',
						xtype		: 'numericfield',
						width		: 157,
						labelWidth	: 70,
					},{	name : 'change'   ,xtype : 'textfield', hidden : true
					},{	name : 'cstm_code',xtype : 'textfield', hidden : true
					},{	name : 'cstm_name',xtype : 'textfield', hidden : true
					}
				]
			}
		;
		return item;
	},
	/**
	 *
	 */


	createTabs : function () {
		var me = this,
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1(), me.createTab2() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '거래처 정보'),
			xtype	: 'module-ppermast-pric-lister',
		};
		return item;
	},
	/**
	 *
	 */
	createTab2 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , 'LOSS및 가공비'),
			xtype	: 'module-ppermast-cstm-lister',
		};
		return item;
	},

});

