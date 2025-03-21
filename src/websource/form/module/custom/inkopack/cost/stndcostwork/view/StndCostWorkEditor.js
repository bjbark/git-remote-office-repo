Ext.define('module.custom.inkopack.cost.stndcostwork.view.StndCostWorkEditor', { extend : 'Axt.form.Editor',

	alias: 'widget.module-stndcostwork-editor',

	height : 260,
	layout : {
	type: 'border'
	},

	title			: Language.get( '' , '표준 원가 정보'),
	collapsible		: true				,
	collapsed		: true				,
	defaultFocus	: 'cost_larg_bacd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
			xtype : 'toolbar',
			dock: 'bottom',
			items: [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action,cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action,cls: 'button-style' }, '-'
			]
		};
		return item;
	},

	createWest : function () {
		var me = this,
			item = {
				xtype : 'form-panel',
				dock 			: 'left',
				width 			: 550,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 230, labelWidth : 90, labelSeparator : '' },
				layout			: 'vbox',
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						layout	:'hbox',
						width	: 550,
						items : [
							{	fieldLabel	: Language.get('cost_larg_name', '원가 대분류' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cost_larg_name',
								pair		: 'cost_larg_bacd',
								allowBlank	: false,
								clearable	: false ,
								width		: 230,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' , prnt_idcd : '6501'},
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'cost_larg_bacd', xtype : 'textfield' , hidden : true
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 0 40',
								width	: 240,
								fieldDefaults	: { width : 230, labelWidth : 90, labelSeparator : '' },
								items	: [
									{	fieldLabel	: Language.get('cost_midl_name', '원가 중분류' ),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'cost_midl_name',
										pair		: 'cost_midl_bacd',
										allowBlank	: false,
										clearable	: false ,
										width		: 230,
										popup		: {
											select	: 'SINGLE',
											widget	: 'lookup-base-popup',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' , prnt_idcd : '6503'},
											result	: function(records, nameField, pairField){
												nameField.setValue(records[0].get('base_name'));
												pairField.setValue(records[0].get('base_code'));
											}
										}
									},{	name		: 'cost_midl_bacd', xtype : 'textfield' , hidden : true
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						layout	: 'vbox',
						width	: 550,
						items	: [
							{	fieldLabel	: Language.get( 'mtrl_item_name', '자재품명' ),
								allowBlank	: false,
								name		: 'mtrl_item_name' ,
								xtype		: 'textfield' ,
								width		: 500
							},{	fieldLabel	: Language.get( 'mtrl_spec', '자재규격' ),
								name		: 'mtrl_spec' ,
								xtype		: 'textfield' ,
								width		: 500
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						layout	: 'hbox',
						width	: 550,
						items : [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							width	: 230,
							fieldDefaults	: { width : 230, labelWidth : 90, labelSeparator : '' },
							items	: [
								{	fieldLabel	: Language.get( 'item_tick', '품목두께' ),
									name		: 'item_tick' ,
									xtype		: 'numericfield' ,
								},{	fieldLabel	: Language.get( 'item_leng', '품목길이' ),
									name		: 'item_leng' ,
									xtype		: 'numericfield' ,
								},{	fieldLabel	: Language.get( 'item_widh', '품목폭' ),
									name		: 'item_widh' ,
									xtype		: 'numericfield' ,
								},{	fieldLabel	: Language.get( 'item_spgr', '품목비중' ),
									name		: 'item_spgr' ,
									xtype		: 'numericfield' ,
								}
							]
						},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 40',
							width	: 240,
							fieldDefaults	: { width : 230, labelWidth : 90, labelSeparator : '' },
							items	: [
								{	fieldLabel	: Language.get( 'stnd_pric', '표준단가' ),
									name		: 'stnd_pric' ,
									xtype		: 'numericfield' ,
								},{	fieldLabel	: Language.get( 'prnt_ccnt', '인쇄도수' ),
									name		: 'prnt_ccnt' ,
									xtype		: 'numericfield' ,
								},{	fieldLabel	: Language.get( 'need_qntt', '소요수량' ),
									name		: 'need_qntt' ,
									xtype		: 'numericfield' ,
								},{	fieldLabel	: Language.get( 'cost_adpt_dvcd', '원가적용구분' ),
									name		: 'cost_adpt_dvcd' ,
									xtype		: 'lookupfield',
									maxLength	: 4,
									lookupValue	: resource.lookup('cost_adpt_dvcd' ),
								}
							]
						}
					]}
		 	 	]
			}
		return item;
	},

		createTabs : function () {
			var me = this,
				item = {
					xtype	: 'tabpanel',
					region	: 'center',
					margin	: 0,
					plain	: true,
					items	: [ me.createTab1() ]
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
					border		: 0,
					bodyStyle	: { padding: '5px' },
					items		: [
						{	fieldLabel	: '' 		,
							name		: 'user_memo',
							xtype		: 'textarea',
							emptyText	: '메모사항을 적어주십시오',
							height		: 167,
							flex		: 1
						},{	fieldLabel	: '' ,
							name		: 'lookup_val',
							xtype		: 'textarea'  ,
							readOnly	: true,
							hidden		: true
						}
					]
				}
			;
			return item;
	}
});

