Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerEditor', { extend: 'Axt.form.Editor',
	alias	: 'widget.module-sorderlist1-lister-editor',
	height	: 390,
	layout	: {
	type	:'border'
	},

//	title		: Language.get('acpt_info','입출고 정보'),
	collapsible	: false	,
	collapsed	: false	,
	defaultFocus: 'invc_numb',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock()];
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
				]
			};
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [
					me.createTab2(),
					me.createTab3(),
					me.createTab4(),
					{ xtype:'module-sorderlist1-lister-mtrl',title:'투입자재'}
				]
			}
		;
		return item;
	},

	createTab2 : function() {
		var me = this,
			item = 
			{	xtype	: 'panel',
				layout	: 'border',
				region	: 'center',
				title	: '이미지',
				items	: [
					{	xtype : 'module-aone-sorderlist1-editorlister',
						flex	: 1,
						region	: 'center',
						spilt	:true,
						style	: Const.borderLine.right,
					},{	xtype : 'module-aone-sorderlist1-image',
						flex	: 1,
						region	: 'east',
						style	: Const.borderLine.left
					}
				]

			}
		;
		return item;
	},
	createTab3 : function() {
		var me = this,
			item = 
			{	xtype	: 'panel',
				layout	: 'border',
				region	: 'center',
				title	: '수리 후 이미지',
				items	: [
					{	xtype : 'module-aone-sorderlist1-editorlister2',
						flex	: 1,
						region	: 'center',
						spilt	:true,
						style	: Const.borderLine.right,
					},{	xtype : 'module-aone-sorderlist1-image2',
						flex	: 1,
						region	: 'east',
						style	: Const.borderLine.left
					}
				]

			}
		;
		return item;
	},

	createTab4 : function(){
		var me = this,
			item = {
				title	: '수리비 산출내역',
				xtype	: 'form-panel',
				name	: 'repr_info',
				itemId	: 'repr_info',
				dock	: 'left',
				region	: 'center',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : ''},
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items : [
									{	fieldLabel : Language.get('need_time','작업시간'),
										xtype      : 'numericfield',
										name       : 'need_time',
										format     : '#,##0',
										summaryType: 'sum',
										width      : 140,
										margin     : '5 0 0 0',
										labelWidth : 100,
										fieldCls   : 'requiredindex',
										readOnly   : true,
									},{	fieldLabel : Language.get('pric_time','X 시급'),
										xtype      : 'lookupfield',
										name       : 'pric_time',
										width      : 110,
										margin     : '5 0 0 0',
										labelWidth : 40,
										format     : '#,##0',
										fieldCls   : 'requiredindex',
										enableKeyEvents : true,
										readOnly   : true,
									},{	fieldLabel : Language.get('','='),
										xtype      : 'numericfield',
										name       : 'psep_exps_amnt',
										width      : 90,
										margin     : '5 0 0 0',
										labelWidth : 10,
										summaryType: 'sum',
										format     : '#,##0',
										fieldCls   : 'requiredindex',
										readOnly   : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items : [
									{	fieldLabel : Language.get('prts_repa_amnt','부품비 총액'),
										xtype      : 'numericfield',
										name       : 'prts_repa_amnt',
										width      : 340,
										labelWidth : 100,
										margin     : '5 0 0 0',
										fieldCls   : 'requiredindex',
										readOnly   : true,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items : [
									{	fieldLabel : Language.get('','공과 잡비(7%)'),
										xtype      : 'numericfield',
										name       : 'etcc_repa_amnt',
										width      : 340,
										labelWidth : 100,
										fieldCls   : 'requiredindex',
										summaryType: 'sum',
										format     : '#,##0',
										readOnly   : true,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items : [
									{	fieldLabel : Language.get('','기업이윤(15%)'),
										xtype      : 'numericfield',
										name       : 'entp_pfit_amnt',
										width      : 340,
										labelWidth : 100,
										format     : '#,##0',
										fieldCls   : 'requiredindex',
										readOnly   : true,
										enableKeyEvents : true,
									}
								]
							},{	fieldLabel : Language.get('invc_amnt','총액'),
								xtype      : 'numericfield',
								name       : 'invc_amnt',
								width      : 340,
								labelWidth : 100,
								fieldCls   : 'requiredindex',
								summaryType: 'sum',
								format     : '#,##0',
								readOnly   : true,
							}
						]
					}
				]
			}
		return item;
	},
});